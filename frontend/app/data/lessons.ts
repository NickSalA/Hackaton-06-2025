export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const lessons: Lesson[] = [
  {
    id: "fundamentos",
    title: "Fundamentos del Prompt Engineering",
    description: "Conceptos básicos y principios esenciales del prompt engineering.",
    content: "Aquí se explican los fundamentos, definiciones y el porqué de la disciplina.",
  },
  {
    id: "historia-evolucion",
    title: "Historia y evolución del Prompt Engineering",
    description: "Un recorrido por la evolución de la ingeniería de prompts.",
    content: "Desde los primeros modelos de lenguaje hasta las técnicas modernas de prompt engineering.",
  },
  {
    id: "elementos-prompt",
    title: "Elementos de un prompt",
    description: "Partes clave que componen un prompt efectivo.",
    content: "Estructura, instrucciones, contexto y ejemplos en la construcción de prompts.",
  },
  {
    id: "optimizacion-prompts",
    title: "Técnicas de optimización de prompts",
    description: "Cómo mejorar la efectividad de los prompts.",
    content: "Estrategias y ajustes para obtener mejores respuestas de los modelos.",
  },
  {
    id: "patrones-basico",
    title: "Patrones de prompt: nivel básico",
    description: "Patrones comunes y sencillos para empezar a crear prompts.",
    content: "Ejemplos y plantillas de prompts básicos para tareas frecuentes.",
  },
  {
    id: "patrones-avanzado",
    title: "Patrones de prompt: nivel avanzado",
    description: "Patrones complejos y técnicas avanzadas.",
    content: "Cómo diseñar prompts sofisticados para tareas especializadas.",
  },
  {
    id: "ingenieria-contexto",
    title: "Ingeniería de contexto",
    description: "Cómo el contexto influye en la respuesta del modelo.",
    content: "Técnicas para proporcionar contexto relevante y mejorar la precisión.",
  },
  {
    id: "ingenieria-instrucciones",
    title: "Ingeniería de instrucciones",
    description: "El arte de dar instrucciones claras y precisas.",
    content: "Cómo formular instrucciones efectivas para guiar al modelo.",
  },
  {
    id: "salida-estructurada",
    title: "Prompts para salida estructurada",
    description: "Cómo obtener respuestas en formatos específicos.",
    content: "Diseño de prompts para JSON, listas, tablas y otros formatos estructurados.",
  },
  {
    id: "evaluacion-calidad",
    title: "Evaluación de la calidad de un prompt",
    description: "Cómo medir y mejorar la calidad de los prompts.",
    content: "Métricas, pruebas y criterios para evaluar prompts.",
  },
  {
    id: "multilingue-transcultural",
    title: "Prompt Engineering multilingüe y transcultural",
    description: "Desafíos y técnicas para prompts en diferentes idiomas y culturas.",
    content: "Adaptación de prompts para contextos globales y multilingües.",
  },
  {
    id: "etica-sesgos",
    title: "Ética y sesgos en el Prompt Engineering",
    description: "Consideraciones éticas y cómo evitar sesgos en los prompts.",
    content: "Buenas prácticas para minimizar sesgos y promover la equidad en IA.",
  },
];
