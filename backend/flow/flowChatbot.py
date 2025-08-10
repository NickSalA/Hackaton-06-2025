from langgraph.graph import StateGraph, END

# Utilitarios para llm
from backend.util.util_llm import *

# Agente de Contexto
from backend.agent.AgenteDeContexto import *

# Agente de Memoria a largo plazo
from backend.agent.AgenteDeMemoriaLargoPlazo import *

# Agente de Chatbot
from backend.agent.AgenteDeChatbot import *

# Agente de Análisis
from backend.agent.AgenteDeAnalisis import *

# Agente de Resumen
from backend.agent.AgenteDeResumen import *

# Agente de Supervisión
from backend.agent.AgenteDeSupervision import *

from backend.agent.AgenteDeEvaluacion import AgenteDeEvaluacion
from backend.agent.AgenteDeCuestionario import AgenteDeCuestionario

# ...


class FlowChatbot:

    # Instaciamos los objetos necesarios
    def __init__(self, archivoDeUsuario=None, basesDeConocimiento=None):
        # Creamos los objetos del flujo
        self.creacionDeObjetos(
            archivoDeUsuario=archivoDeUsuario, basesDeConocimiento=basesDeConocimiento
        )

        # Implementamos los nodos
        self.implementacionDeNodos()

        # Dibujamos el grafo
        self.dibujadoDeGrafo()

    # Crea los objetos para el flujo
    def creacionDeObjetos(self, archivoDeUsuario=None, basesDeConocimiento=None):
        # Guardamos los atributos
        self.archivoDeUsuario = archivoDeUsuario
        self.basesDeConocimiento = basesDeConocimiento

        # Creamos un agente de contexto
        self.agenteDeContexto = AgenteDeContexto(
            llm=obtenerModelo(),
            condiciones="""
        Como mínimo debe cumplirse TODAS estas condiciones a la vez:

        - Es un mensaje relacionado a lo que se esperaría en una conversación normal
        - Es un mensaje que no contiene palabras groseras o que se consideren faltas de respeto
        - Es un mensaje que tiene sentido y no es texto aleatorio sin significado (como: "asdasdasdhjlkasjdlkasjdlkajsdsadd", "qwerty123", "ajshdjahsdjas", etc.)
        - Es un mensaje escrito en un idioma reconocible (español, inglés, portugués.)
        - Es un mensaje que contiene palabras reales y no solo caracteres aleatorios o gibberish

      """,
        )

        # Creamos un agente de memoria a largo plazo
        self.agenteDeMemoriaLargoPlazo = AgenteDeMemoriaLargoPlazo(
            llm=obtenerModelo(),
            condiciones="""
        - El nombre del usuario
        - La edad del usuario
        - El sexo del usuario
      """,
        )

        # Leemos la base de conocimiento del usuario
        informacionDelUsuario = self.leerArchivo()

        # Creamos un agente de chatbot
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

        # Creamos el agente de analisis
        self.agenteDeAnalisis = AgenteDeAnalisis(
            llm=obtenerModelo(),
            descripcion="""
        Para un texto, si hay informacion que se contradicen entre sí
        trata de darle coherencia, quedandote con la información más reciente,
        dentro del texto. Sólo dame las lineas de este texto
        según las indicaciones que te di en la variable json "textoCoherente"
        Esta variable "textoCoherente" es del tipo "str", si ha varias líneas,
        sepáralas con un enter
      """,
        )

        self.agenteDeResumen = AgenteDeResumen(llm=obtenerModelo())

        self.agenteSupervisor = AgenteDeSupervision(llm=obtenerModelo())

        self.agenteDeEvaluacion = AgenteDeEvaluacion(llm=obtenerModelo())

        self.agenteDeCuestionario = AgenteDeCuestionario(
            llm=obtenerModelo(),
            n=3,  # o el número que quieras
            incluir_respuesta_correcta=False,  # no “spoilear” en UI
            permitir_tipos=["opcion_multiple", "abierta", "vf"],
        )

    # Implementamos los nodos
    def implementacionDeNodos(self):

        def node_a1_agenteDeContexto(state: dict) -> dict:
            print("Ejecutando node_a1_agenteDeContexto...")
            output = dict(state)
            output["node_a1_agenteDeContexto"] = {}
            prompt = state["prompt"]
            respuesta = self.agenteDeContexto.enviarMensaje(prompt)
            output["node_a1_agenteDeContexto"] = respuesta
            return output

        def node_a2_promptNoValido(state: dict) -> dict:
            print("Ejecutando node_a2_promptNoValido...")
            output = dict(state)
            output["output"] = {"respuesta": state["node_a1_agenteDeContexto"]["message"]}
            return output

        def node_a3_agenteDeMemoriaLargoPlazo(state: dict) -> dict:
            print("Ejecutando node_a3_agenteDeMemoriaLargoPlazo...")
            output = dict(state)
            output["node_a3_agenteDeMemoriaLargoPlazo"] = {}
            prompt = state["prompt"]
            respuesta = self.agenteDeMemoriaLargoPlazo.ejecutar(prompt)
            output["node_a3_agenteDeMemoriaLargoPlazo"] = respuesta
            return output

        def node_a4_informacionPorRecordar(state: dict) -> dict:
            print("Ejecutando node_a4_informacionPorRecordar...")
            output = dict(state)
            informacionDelUsuario = self.leerArchivo()
            info = state["node_a3_agenteDeMemoriaLargoPlazo"].get("informacion", "")
            informacionCombinada = f"{informacionDelUsuario}\n{info}".strip()
            informacionCoherente = self.agenteDeAnalisis.ejecutar(informacionCombinada)
            self.escribirArchivo(informacionCoherente.get("textoCoherente", ""))
            return output

        def node_a5_agenteDeSupervision(state: dict) -> dict:
            print("Ejecutando node_a5_agenteDeSupervision...")
            mensaje = state["prompt"]["contenido"]
            accion = self.agenteSupervisor.clasificar(mensaje)
            salida = dict(state)
            salida["accion"] = accion
            return salida

        def node_a6_agenteDeChatbot(state: dict) -> dict:
            print("Ejecutando node_a6_agenteDeChatbot...")
            output = dict(state)
            output["output"] = {}
            contenido = state["prompt"]["contenido"]
            base = state["base"]
            respuesta = self.agenteDeChatbot.enviarMensaje(contenido, base)
            output["output"]["respuesta"] = respuesta
            return output

        def node_a7_agenteDeResumen(state: dict) -> dict:
            print("Ejecutando node_a7_agenteDeResumen...")
            output = dict(state)
            output["output"] = {}
            historial = self.agenteDeChatbot.chat_sin_kb.memory.chat_memory.messages
            resumen = self.agenteDeResumen.resumir(historial)
            output["output"]["respuesta"] = resumen
            return output

        def node_a8_agenteDeEvaluacion(state: dict) -> dict:
            print("Ejecutando node_a8_agenteDeEvaluacion...")
            output = dict(state)
            try:
                msgs = self.agenteDeChatbot.chat_sin_kb.memory.chat_memory.messages
                historial_texto = "\n".join(getattr(m, "content", "") for m in msgs)
            except Exception:
                historial_texto = ""
            respuesta = state["output"]["respuesta"]
            evaluacion = self.agenteDeEvaluacion.evaluar(
                respuesta=respuesta, historial_texto=historial_texto
            )
            output["evaluacion"] = evaluacion
            return output

        def node_a9_generarCuestionario(state: dict) -> dict:
            print("Ejecutando node_a9_generarCuestionario...")
            output = dict(state)
            leccion = state["base"]
            paquete = self.agenteDeCuestionario.generar(leccion=str(leccion))
            output["output"] = {
                "respuesta": state["output"]["respuesta"],
                "cuestionario": paquete.get("preguntas", []),
                "meta": paquete.get("meta", {"leccion": leccion, "n": 0}),
            }
            return output

        # Registrar nodos
        self.constructor = StateGraph(dict)
        self.constructor.add_node("node_a5_agenteDeSupervision", node_a5_agenteDeSupervision)
        self.constructor.add_node("node_a1_agenteDeContexto", node_a1_agenteDeContexto)
        self.constructor.add_node("node_a2_promptNoValido", node_a2_promptNoValido)
        self.constructor.add_node("node_a3_agenteDeMemoriaLargoPlazo", node_a3_agenteDeMemoriaLargoPlazo)
        self.constructor.add_node("node_a4_informacionPorRecordar", node_a4_informacionPorRecordar)
        self.constructor.add_node("node_a6_agenteDeChatbot", node_a6_agenteDeChatbot)
        self.constructor.add_node("node_a7_agenteDeResumen", node_a7_agenteDeResumen)
        self.constructor.add_node("node_a8_agenteDeEvaluacion", node_a8_agenteDeEvaluacion)
        self.constructor.add_node("node_a9_generarCuestionario", node_a9_generarCuestionario)
        # Dibujamos el grafo
    def dibujadoDeGrafo(self):
        self.constructor.set_entry_point("node_a1_agenteDeContexto")

        self.constructor.add_conditional_edges(
            "node_a1_agenteDeContexto",
            lambda state: state["node_a1_agenteDeContexto"]["status"],
            {
                "PROMPT_VALIDO": "node_a3_agenteDeMemoriaLargoPlazo",
                "PROMPT_NO_VALIDO": "node_a2_promptNoValido",
            },
        )

        self.constructor.add_conditional_edges(
            "node_a3_agenteDeMemoriaLargoPlazo",
            lambda state: state["node_a3_agenteDeMemoriaLargoPlazo"]["status"],
            {
                "INFORMACION_POR_RECORDAR": "node_a4_informacionPorRecordar",
                "NO_INFORMACION_POR_RECORDAR": "node_a5_agenteDeSupervision",
            },
        )

        self.constructor.add_edge("node_a4_informacionPorRecordar", "node_a5_agenteDeSupervision")

        self.constructor.add_conditional_edges(
            "node_a5_agenteDeSupervision",
            lambda state: state["accion"],
            {"RESUMEN": "node_a7_agenteDeResumen", "CHAT": "node_a6_agenteDeChatbot"},
        )

        # Siempre evaluar después de responder o resumir
        self.constructor.add_edge("node_a6_agenteDeChatbot", "node_a8_agenteDeEvaluacion")
        self.constructor.add_edge("node_a7_agenteDeResumen", "node_a8_agenteDeEvaluacion")

        # Ruteo de evaluación
        self.constructor.add_conditional_edges(
            "node_a8_agenteDeEvaluacion",
            lambda s: "LISTO" if bool(s.get("evaluacion", {}).get("listo")) else "NO_LISTO",
            {
                "LISTO": "node_a9_generarCuestionario",
                "NO_LISTO": END,  # termina con la respuesta del chatbot/resumen
            },
        )

        # puntos de fin
        self.constructor.set_finish_point("node_a2_promptNoValido")
        self.constructor.set_finish_point("node_a9_generarCuestionario")

        self.grafo = self.constructor.compile()


    def preparar_prompt(self, promptUsuario):
        if isinstance(promptUsuario, dict) and "tipo" in promptUsuario:
            # Ya viene en formato correcto
            return promptUsuario

        # Si el usuario envía simplemente un string, lo formateamos como texto
        return {"tipo": "texto", "contenido": promptUsuario}

    # Ejecución
    def ejecutar(self, prompt, base, config=None):

        # Ejecutamos el grafo
        respuesta = self.grafo.invoke({"prompt": prompt, "base": base}, config=config)

        # Devolvemos la respuesta
        return respuesta["output"]

    # Lee el archivo de información del usuario
    def leerArchivo(self):
        contenido = ""

        try:
            with open(self.archivoDeUsuario, "r", encoding="utf-8") as archivo:
                contenido = archivo.read()
        except FileNotFoundError:
            contenido = "SIN INFORMACION ADICIONAL"

        return contenido

    # Escribe información sobre el usuario en su archivo
    def escribirArchivo(self, texto):
        try:
            with open(self.archivoDeUsuario, "w", encoding="utf-8") as archivo:
                archivo.write((texto or "") + "\n")
        except Exception:
            pass  # no alteramos el flujo si falla la persistencia

    def reiniciar_memoria_del_chatbot(self):
        """Pasa la orden de reinicio al agente de chatbot."""
        print("Reiniciando la memoria del chatbot...")
        if hasattr(self, "agenteDeChatbot"):
            self.agenteDeChatbot.reiniciar_memoria()
