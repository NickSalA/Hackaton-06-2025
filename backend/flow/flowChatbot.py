from __future__ import annotations

import logging
from typing import Any, Dict, Optional


from langgraph.graph import StateGraph, END

from backend.util.util_llm import obtenerModelo

# Agente de Contexto
from backend.agent.AgenteDeContexto import AgenteDeContexto

# Agente de Memoria a largo plazo
from backend.agent.AgenteDeMemoriaLargoPlazo import AgenteDeMemoriaLargoPlazo

# Agente de Chatbot
from backend.agent.AgenteDeChatbot import AgenteDeChatbot

# Agente de Análisis
from backend.agent.AgenteDeAnalisis import AgenteDeAnalisis

# Agente de Resumen
from backend.agent.AgenteDeResumen import AgenteDeResumen

# Agente de Supervisión
from backend.agent.AgenteDeSupervision import AgenteDeSupervision

logger = logging.getLogger(__name__)


class FlowChatbot:
    """Orquesta agentes con un grafo de estados (LangGraph).

    Argumentos:
        archivoDeUsuario: ruta del archivo para info persistente del usuario.
        basesDeConocimiento: identificadores o paths de KB (se pasan al AgenteDeChatbot).
    """

    def __init__(
        self,
        archivoDeUsuario: Optional[str] = None,
        basesDeConocimiento: Optional[Any] = None,
    ) -> None:
        self.archivoDeUsuario = archivoDeUsuario
        self.basesDeConocimiento = basesDeConocimiento

        # --- Instancias de agentes ---
        self.agenteDeContexto = AgenteDeContexto(
            llm=obtenerModelo(temperature=0.2),
            condiciones=(
                """
                Como mínimo debe cumplirse TODAS estas condiciones a la vez:

                - Es un mensaje relacionado a lo que se esperaría en una conversación normal
                - Es un mensaje que no contiene palabras groseras o que se consideren faltas de respeto
                - Es un mensaje que tiene sentido y no es texto aleatorio sin significado (como: "asdasdasdhjlkasjdlkasjdlkajsdsadd", "qwerty123", "ajshdjahsdjas", etc.)
                - Es un mensaje escrito en un idioma reconocible (español, inglés, portugués.)
                - Es un mensaje que contiene palabras reales y no solo caracteres aleatorios o gibberish
                """
            ),
        )

        self.agenteDeMemoriaLargoPlazo = AgenteDeMemoriaLargoPlazo(
            llm=obtenerModelo(temperature=0.2),
            condiciones=(
                """
                - El nombre del usuario
                - La edad del usuario
                - El sexo del usuario
                """
            ),
        )

        informacionDelUsuario = self._leerArchivo()

        self.agenteDeChatbot = AgenteDeChatbot(
            llm=obtenerModelo(),
            basesDeConocimiento=basesDeConocimiento,
            contexto=f"""
            Eres “Profesor Asistente” para una clase de Ingeniería de Prompts. Respondes SOLO usando la base de conocimiento conectada (KB). 
            Si no encuentras evidencia suficiente en la KB, responde exactamente: "Lo siento, no puedo responder esto".

            Reglas:
            1) Usa únicamente información presente en la KB recuperada por el sistema. No inventes ni uses conocimiento general.
            2) Si la pregunta no está relacionada con la clase/tema, responde: "Lo siento, no puedo responder esto".
            3) Si la pregunta está relacionada pero la KB no contiene suficiente evidencia, responde: "Lo siento, no puedo responder esto".
            4) Escribe en el mismo idioma del usuario. Estilo: formal, amable y conciso.
            5) Interpreta preguntas con faltas ortográficas o gramaticales; no repitas errores en tu respuesta.
            6) No divagues. Prioriza precisión y brevedad. Máximo 6 oraciones, o viñetas si conviene.
            7) Si el usuario pide pasos o definiciones, estructura la respuesta en listas claras. 
            8) Si hay múltiples pasajes en la KB, integra y no te contradigas. Si hay conflicto, di que la evidencia es inconsistente y rehúsa.

            Formato de salida:
            - Respuesta directa (breve y precisa).
            - (Opcional) Lista corta de puntos clave si ayuda a la claridad.

            Frase de rechazo (usa tal cual):
            "Lo siento, no puedo responder esto"

            Contexto de usuario (útil para tono o personalización, no para hechos): 
            {informacionDelUsuario}
            """,
        )

        self.agenteDeAnalisis = AgenteDeAnalisis(
            llm=obtenerModelo(temperature=0.2),
            descripcion=(
                """
                Para un texto, si hay informacion que se contradicen entre sí
                trata de darle coherencia, quedandote con la información más reciente,
                dentro del texto. Sólo dame las lineas de este texto
                según las indicaciones que te di en la variable json "textoCoherente"
                Esta variable "textoCoherente" es del tipo "str", si ha varias líneas,
                sepáralas con un enter
                """
            ),
        )

        self.agenteDeResumen = AgenteDeResumen(llm=obtenerModelo())
        self.AgenteDeSupervision = AgenteDeSupervision(llm=obtenerModelo(temperature=0))

        # --- Construcción del grafo ---
        self._construir_grafo()

    # =====================
    # Construcción del grafo
    # =====================
    def _construir_grafo(self) -> None:
        constructor: StateGraph = StateGraph(dict)

        # ---- Nodos ----
        def node_a1_agenteDeContexto(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a1_agenteDeContexto...")
            output = dict(state)
            output["node_a1_agenteDeContexto"] = {}
            prompt = state["prompt"]
            respuesta = self.agenteDeContexto.enviarMensaje(prompt)
            output["node_a1_agenteDeContexto"] = respuesta
            return output

        def node_a2_promptNoValido(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a2_promptNoValido...")
            output = dict(state)
            output["output"] = {
                "respuesta": state["node_a1_agenteDeContexto"]["message"]
            }
            return output

        def node_a3_agenteDeMemoriaLargoPlazo(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a3_agenteDeMemoriaLargoPlazo...")
            output = dict(state)
            output["node_a3_agenteDeMemoriaLargoPlazo"] = {}
            prompt = state["prompt"]
            respuesta = self.agenteDeMemoriaLargoPlazo.ejecutar(prompt)
            output["node_a3_agenteDeMemoriaLargoPlazo"] = respuesta
            return output

        def node_a4_informacionPorRecordar(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a4_informacionPorRecordar...")
            output = dict(state)
            informacionDelUsuario = self._leerArchivo()
            informacionPorRecordar = state["node_a3_agenteDeMemoriaLargoPlazo"][
                "informacion"
            ]
            informacionCombinada = (
                f"{informacionDelUsuario}\n{informacionPorRecordar}".strip()
            )
            informacionCoherente = self.agenteDeAnalisis.ejecutar(informacionCombinada)
            self._escribirArchivo(informacionCoherente.get("textoCoherente", ""))
            return output

        def nodo_a5_agenteDeSupervision(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_router...")
            salida = dict(state)
            mensaje = state["prompt"]["contenido"]
            accion = self.AgenteDeSupervision.clasificar(mensaje)
            salida["accion"] = accion
            return salida

        def node_a6_agenteDeChatbot(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a5_agenteDeChatbot...")
            output = dict(state)
            output["output"] = {}
            contenido = state["prompt"]["contenido"]
            base = state["base"]
            respuesta = self.agenteDeChatbot.enviarMensaje(contenido, base)
            output["output"]["respuesta"] = respuesta
            return output

        def node_a7_agenteDeResumen(state: Dict[str, Any]) -> Dict[str, Any]:
            logger.debug("Ejecutando node_a7_agenteDeResumen...")
            output = dict(state)
            output["output"] = {}
            historial = self.agenteDeChatbot.chat_sin_kb.memory.chat_memory.messages
            resumen = self.agenteDeResumen.resumir(historial)
            output["output"]["respuesta"] = resumen
            return output

        # ---- Wiring ----
        constructor.add_node("nodo_a5_agenteDeSupervision", nodo_a5_agenteDeSupervision)
        constructor.add_node("node_a1_agenteDeContexto", node_a1_agenteDeContexto)
        constructor.add_node("node_a2_promptNoValido", node_a2_promptNoValido)
        constructor.add_node(
            "node_a3_agenteDeMemoriaLargoPlazo", node_a3_agenteDeMemoriaLargoPlazo
        )
        constructor.add_node(
            "node_a4_informacionPorRecordar", node_a4_informacionPorRecordar
        )
        constructor.add_node("node_a6_agenteDeChatbot", node_a6_agenteDeChatbot)
        constructor.add_node("node_a7_agenteDeResumen", node_a7_agenteDeResumen)

        constructor.set_entry_point("node_a1_agenteDeContexto")

        constructor.add_conditional_edges(
            "node_a1_agenteDeContexto",
            lambda state: state["node_a1_agenteDeContexto"]["status"],
            {
                "PROMPT_VALIDO": "node_a3_agenteDeMemoriaLargoPlazo",
                "PROMPT_NO_VALIDO": "node_a2_promptNoValido",
            },
        )

        constructor.add_conditional_edges(
            "node_a3_agenteDeMemoriaLargoPlazo",
            lambda state: state["node_a3_agenteDeMemoriaLargoPlazo"]["status"],
            {
                "INFORMACION_POR_RECORDAR": "node_a4_informacionPorRecordar",
                "NO_INFORMACION_POR_RECORDAR": "nodo_a5_agenteDeSupervision",
            },
        )

        constructor.add_edge(
            "node_a4_informacionPorRecordar", "nodo_a5_agenteDeSupervision"
        )
        constructor.add_conditional_edges(
            "node_router",
            lambda state: state["accion"],
            {"RESUMEN": "node_a7_agenteDeResumen", "CHAT": "node_a5_agenteDeChatbot"},
        )

        constructor.set_finish_point("node_a5_agenteDeChatbot")
        constructor.set_finish_point("node_a2_promptNoValido")
        constructor.set_finish_point("node_a7_agenteDeResumen")

        self.constructor = constructor
        self.grafo = constructor.compile()

    # =====================
    # API pública
    # =====================
    @staticmethod
    def preparar_prompt(promptUsuario: Any) -> Dict[str, Any]:
        """Normaliza el prompt a {"tipo": str, "contenido": Any}."""
        if isinstance(promptUsuario, dict) and "tipo" in promptUsuario:
            return promptUsuario
        return {"tipo": "texto", "contenido": promptUsuario}

    def ejecutar(
        self, prompt: Any, base: Any, config = None
    ):
        """Ejecuta el grafo con un prompt y base dados."""
        respuesta = self.grafo.invoke(
            {"prompt": prompt, "base": base}, config=config
        )
        return respuesta.get("output", {})

    def reiniciar_memoria_del_chatbot(self) -> None:
        logger.info("Reiniciando la memoria del chatbot...")
        if hasattr(self, "agenteDeChatbot"):
            self.agenteDeChatbot.reiniciar_memoria()

    # =====================
    # Persistencia de info de usuario
    # =====================
    def _leerArchivo(self) -> str:
        if not self.archivoDeUsuario:
            return "SIN INFORMACION ADICIONAL"
        try:
            with open(self.archivoDeUsuario, "r", encoding="utf-8") as archivo:
                return archivo.read()
        except FileNotFoundError:
            return "SIN INFORMACION ADICIONAL"
        except Exception as exc:
            logger.exception("Error leyendo archivo de usuario: %s", exc)
            return "SIN INFORMACION ADICIONAL"

    def _escribirArchivo(self, texto: str) -> None:
        if not self.archivoDeUsuario:
            logger.warning("archivoDeUsuario no configurado; no se escribirá nada")
            return
        try:
            with open(self.archivoDeUsuario, "w", encoding="utf-8") as archivo:
                archivo.write((texto or "").strip() + "\n")
        except Exception as exc:
            logger.exception("Error escribiendo archivo de usuario: %s", exc)
