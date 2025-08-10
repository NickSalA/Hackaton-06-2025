from __future__ import annotations
from typing import List, Dict, Any, Optional
import json
from langchain_core.prompts import PromptTemplate

def _strip_fences(s: str) -> str:
    return s.replace("```json", "").replace("```", "").strip()

def _safe_json_loads(s: str, default: Any) -> Any:
    try:
        return json.loads(s)
    except Exception:
        return default

class AgenteDeCuestionario:
    """
    Genera cuestionarios cortos y objetivos para verificar comprensión.
    NO califica; sólo genera items. (La corrección puede ser otro agente.)
    
    Salida SIEMPRE: dict con:
    {
      "preguntas": [ { "id": "q1", "tipo": "opcion_multiple|abierta|vf", "enunciado": "...",
                       "opciones": ["...","..."], "respuesta_correcta": null|indice|bool } ],
      "meta": { "leccion": str, "n": int }
    }
    - 'opciones' y 'respuesta_correcta' se incluyen sólo si aplica (ej. opción múltiple / V/F).
    - Por defecto las respuestas_correctas van como null para no “spoilear” en UI pública.
    """

    def __init__(
        self,
        llm,
        n: int = 3,
        incluir_respuesta_correcta: bool = False,
        permitir_tipos: Optional[List[str]] = None,
    ):
        self.llm = llm
        self.n = int(n)
        self.incluir_respuesta_correcta = bool(incluir_respuesta_correcta)
        self.permitir_tipos = permitir_tipos or ["opcion_multiple", "abierta", "vf"]

        # Prompt: fuerza JSON y esquema claro
        self.prompt_generar = PromptTemplate.from_template(
            (
                "Eres un generador de cuestionarios pedagógicos. Crea {n} preguntas "
                "cortas y objetivas sobre la siguiente lección/base.\n\n"
                "Reglas:\n"
                "- Usa ÚNICAMENTE estos tipos: {permitir_tipos}\n"
                "- 'opcion_multiple' debe incluir 3-5 opciones (breves y plausibles).\n"
                "- 'vf' es verdadero/falso con enunciado claro.\n"
                "- 'abierta' pide respuesta corta (1-2 frases).\n"
                "- Evita ambigüedades y jerga innecesaria.\n"
                "- Nivel: básico->intermedio, para verificación rápida.\n"
                "- Devuelve SOLO JSON válido con el esquema EXACTO:\n"
                "{{\n"
                '  "preguntas": [\n'
                '    {{ "id": "q1", "tipo": "opcion_multiple|abierta|vf", "enunciado": "..."'
                ', "opciones": ["...","..."], "respuesta_correcta": null|0|1|true|false }}\n'
                "  ]\n"
                "}}\n\n"
                "Importante:\n"
                "- Si el tipo es 'abierta', no incluyas 'opciones' y pon "
                "'respuesta_correcta': null.\n"
                "- Si 'incluir_respuesta_correcta' es false, pon siempre "
                "'respuesta_correcta': null.\n\n"
                "Lección/base (texto):\n{leccion}\n"
                "incluir_respuesta_correcta={incluir_respuesta_correcta}\n"
            )
        )

    # ---------- API ----------
    def generar(self, leccion: str) -> Dict[str, Any]:
        """
        Genera un bloque de preguntas. Nunca lanza: devuelve dict con 'preguntas' y 'meta'.
        """
        consulta = self.prompt_generar.format(
            n=self.n,
            permitir_tipos=self.permitir_tipos,
            leccion=leccion or "",
            incluir_respuesta_correcta=self.incluir_respuesta_correcta,
        )

        try:
            raw = self.llm.invoke(consulta).content
        except Exception as e:
            # Falla de LLM -> salida mínima segura
            return {"preguntas": [], "meta": {"leccion": leccion, "n": self.n, "error": str(e)}}

        raw = _strip_fences(raw)
        data = _safe_json_loads(raw, default={})
        preguntas = []

        if isinstance(data, dict) and isinstance(data.get("preguntas"), list):
            for i, q in enumerate(data["preguntas"], start=1):
                # Normalización robusta
                qid = str(q.get("id") or f"q{i}")
                tipo = str(q.get("tipo") or "").lower()
                enunciado = (q.get("enunciado") or "").strip()

                if tipo not in self.permitir_tipos or not enunciado:
                    continue  # descarta inválidas

                item: Dict[str, Any] = {"id": qid, "tipo": tipo, "enunciado": enunciado}

                if tipo == "opcion_multiple":
                    opciones = q.get("opciones") or []
                    if not isinstance(opciones, list) or len(opciones) < 3:
                        continue
                    item["opciones"] = [str(o).strip() for o in opciones if str(o).strip()]
                    # controla respuesta_correcta
                    if self.incluir_respuesta_correcta:
                        rc = q.get("respuesta_correcta")
                        # aceptamos índice (int) o null
                        item["respuesta_correcta"] = rc if isinstance(rc, int) else None
                    else:
                        item["respuesta_correcta"] = None

                elif tipo == "vf":
                    # enunciado y respuesta booleana si aplica
                    if self.incluir_respuesta_correcta:
                        rc = q.get("respuesta_correcta")
                        item["respuesta_correcta"] = True if rc is True else (False if rc is False else None)
                    else:
                        item["respuesta_correcta"] = None

                else:  # abierta
                    item["respuesta_correcta"] = None

                preguntas.append(item)

        return {"preguntas": preguntas[: self.n], "meta": {"leccion": leccion, "n": self.n, "raw_ok": bool(preguntas)}}
