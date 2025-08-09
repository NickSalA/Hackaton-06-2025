export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const lessons: Lesson[] = [
  {
    id: "intro",
    title: "Introducción al Prompt Engineering",
    description: "¿Qué es el prompt engineering y por qué es importante?",
    content: "El prompt engineering es el arte de diseñar instrucciones efectivas para modelos de IA. En esta lección aprenderás los conceptos básicos y su impacto en los resultados de los modelos de lenguaje.",
  },
  {
    id: "tipos-prompts",
    title: "Tipos de Prompts",
    description: "Explora los diferentes tipos de prompts y sus aplicaciones.",
    content: "Existen prompts directos, de contexto, de ejemplo, y más. Cada uno tiene ventajas y casos de uso específicos. Veremos ejemplos prácticos de cada tipo.",
  },
  {
    id: "mejores-practicas",
    title: "Mejores Prácticas",
    description: "Consejos para escribir prompts claros y efectivos.",
    content: "Usa lenguaje claro, especifica el formato de respuesta, limita la ambigüedad y prueba diferentes variantes para obtener mejores resultados.",
  },
  // Puedes agregar más lecciones aquí
];
