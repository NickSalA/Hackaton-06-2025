# backend/agent/AgenteDeEvaluacion.py
from __future__ import annotations
from typing import Dict, Any, Optional
import json
from langchain_core.prompts import PromptTemplate

def _strip_fences(s: str) -> str:
    # Quita ```json ... ``` y exceso de espacios
    return s.replace("```json", "").replace("```", "").strip()

def _safe_json(s: str) -> Optional[dict]:
    try:
        return json.loads(s)
    except Exception:
        return None

class AgenteDeEvaluacion:
    """
    Evalúa si el estudiante está listo para rendir un cuestionario.
    - Entrada: última respuesta del profesor asistente + (opcional) historial plano.
    - Salida SIEMPRE: dict con {"listo": bool, "motivo": str, "raw": str}
    """
    def __init__(self, llm, umbral_confianza: float = 0.0):
        self.llm = llm
        self.umbral_confianza = umbral_confianza

        # Pide JSON claro y minimalista
        self.prompt_evaluacion = PromptTemplate.from_template(
            (
                "Eres un evaluador pedagógico. Con el historial del chat y la última "
                "respuesta del profesor asistente, decide si el estudiante está listo "
                "para rendir un mini cuestionario sobre la lección.\n\n"
                "Criterios (todos ponderan):\n"
                "• Evidencia de comprensión de ideas clave.\n"
                "• Capacidad para parafrasear o aplicar el concepto correctamente.\n"
                "• No hay confusión/contradicciones recientes.\n\n"
                "Devuelve SOLO JSON válido con ESTE esquema exacto:\n"
                "{{\n"
                '  "listo": true|false,\n'
                '  "motivo": "explica breve por qué"\n'
                "}}\n\n"
                "Historial (texto plano, último al final):\n{historial}\n\n"
                "Última respuesta del profesor asistente:\n{respuesta}\n"
            )
        )

    def evaluar(self, respuesta: str, historial_texto: Optional[str] = None) -> Dict[str, Any]:
        """
        Retorna un dict SIEMPRE:
        {"listo": bool, "motivo": str, "raw": str}
        """
        consulta = self.prompt_evaluacion.format(
            historial=historial_texto or "",
            respuesta=respuesta or ""
        )
        try:
            raw = self.llm.invoke(consulta).content
        except Exception as e:
            # Si el LLM falla, nunca reventamos el flujo
            return {"listo": False, "motivo": f"Fallo de LLM: {e}", "raw": ""}

        raw = _strip_fences(raw)
        data = _safe_json(raw) or {}

        listo = bool(data.get("listo")) if isinstance(data, dict) else False
        motivo = ""
        if isinstance(data, dict):
            motivo = str(data.get("motivo") or "").strip()

        if not motivo:
            motivo = "Salida no estándar del modelo; se asume NO listo."

        return {"listo": listo, "motivo": motivo, "raw": raw}
