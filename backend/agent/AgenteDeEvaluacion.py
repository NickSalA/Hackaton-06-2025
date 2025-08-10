from typing import Dict, List, Any
import json
from langchain_core.prompts.prompt import PromptTemplate

class AgenteDeEvaluacion:
    """Evalúa si el alumno está listo y genera un cuestionario."""
    def __init__(self, llm, num_preguntas: int = 3):
        self.llm = llm
        self.num_preguntas = num_preguntas
        self.prompt_evaluacion = PromptTemplate.from_template(
            "Eres un asistente que decide si el estudiante comprendió la lección. "
            "Analiza la respuesta del profesor asistente y responde sólo con "
            '{"listo": true} o {"listo": false}. '
            "Respuesta: {respuesta}"
        )
        self.prompt_cuestionario = PromptTemplate.from_template(
            "Eres un asistente que genera {num_preguntas} preguntas sobre la lección. "
            "Devuelve sólo un JSON: {\"preguntas\": [\"p1\", \"p2\", ...]}. "
            "Lección: {leccion}"
        )

    def evaluar(self, respuesta: str) -> Dict[str, Any]:
        consulta = self.prompt_evaluacion.format(respuesta=respuesta)
        salida = self.llm.invoke(consulta).content
        salida = salida.replace("```json", "").replace("```", "").strip()
        return json.loads(salida)

    def generar_cuestionario(self, leccion: str) -> List[str]:
        consulta = self.prompt_cuestionario.format(leccion=leccion, num_preguntas=self.num_preguntas)
        salida = self.llm.invoke(consulta).content
        salida = salida.replace("```json", "").replace("```", "").strip()
        return json.loads(salida)["preguntas"]
