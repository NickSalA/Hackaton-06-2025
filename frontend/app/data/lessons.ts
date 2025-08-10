export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const lessons: Lesson[] = [
  {
    id: "fundamentos",
  title: "Prompt Engineering Fundamentals",
  description: "Basic concepts and essential principles of prompt engineering.",
  content: "This section explains the fundamentals, definitions, and the reasons behind the discipline.",
  },
  {
    id: "historia-evolucion",
  title: "History and Evolution of Prompt Engineering",
  description: "An overview of the evolution of prompt engineering.",
  content: "From the first language models to modern prompt engineering techniques.",
  },
  {
    id: "elementos-prompt",
  title: "Elements of a Prompt",
  description: "Key parts that make up an effective prompt.",
  content: "Structure, instructions, context, and examples in prompt construction.",
  },
  {
    id: "optimizacion-prompts",
  title: "Prompt Optimization Techniques",
  description: "How to improve prompt effectiveness.",
  content: "Strategies and adjustments to get better responses from models.",
  },
  {
    id: "patrones-basico",
  title: "Prompt Patterns: Basic Level",
  description: "Common and simple patterns to start creating prompts.",
  content: "Examples and templates of basic prompts for frequent tasks.",
  },
  {
    id: "patrones-avanzado",
  title: "Prompt Patterns: Advanced Level",
  description: "Complex patterns and advanced techniques.",
  content: "How to design sophisticated prompts for specialized tasks.",
  },
  {
    id: "ingenieria-contexto",
  title: "Context Engineering",
  description: "How context influences the model's response.",
  content: "Techniques to provide relevant context and improve accuracy.",
  },
  {
    id: "ingenieria-instrucciones",
  title: "Instruction Engineering",
  description: "The art of giving clear and precise instructions.",
  content: "How to formulate effective instructions to guide the model.",
  },
  {
    id: "salida-estructurada",
  title: "Prompts for Structured Output",
  description: "How to get responses in specific formats.",
  content: "Designing prompts for JSON, lists, tables, and other structured formats.",
  },
  {
    id: "evaluacion-calidad",
  title: "Prompt Quality Evaluation",
  description: "How to measure and improve prompt quality.",
  content: "Metrics, tests, and criteria to evaluate prompts.",
  },
  {
    id: "multilingue-transcultural",
  title: "Multilingual and Cross-cultural Prompt Engineering",
  description: "Challenges and techniques for prompts in different languages and cultures.",
  content: "Adapting prompts for global and multilingual contexts.",
  },
  {
    id: "etica-sesgos",
  title: "Ethics and Bias in Prompt Engineering",
  description: "Ethical considerations and how to avoid bias in prompts.",
  content: "Best practices to minimize bias and promote fairness in AI.",
  },
];
