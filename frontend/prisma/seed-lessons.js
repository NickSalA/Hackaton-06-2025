const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const lessons = [
  {
    id: "leccion1",
    title: "Prompt Engineering Fundamentals",
    description:
      "Basic concepts and essential principles of prompt engineering.",
    content:
      "This section explains the fundamentals, definitions, and the reasons behind the discipline.",
    chatWelcomeMessage:
      "Hello! I'm your learning assistant 🤖. Ready to discover the fundamentals of Prompt Engineering? If you have questions or want examples, just message me and we'll start together!",
    infoPanel: `# Fundamentos

  Prompt Engineering is the discipline focused on designing, crafting, and optimizing instructions (prompts) to guide language models in generating accurate, relevant, and consistent responses. It is an emerging field that combines an understanding of how language models behave, clear communication skills, and the ability to structure information in a way that the model can interpret effectively.

  At its core, Prompt Engineering aims to reduce ambiguity and maximize the effectiveness of the interaction between the user and the model. This involves not only writing instructions but also providing context, defining roles, and setting clear limits regarding format, style, or response length.

  **Benefits of mastering Prompt Engineering include:**

  **Fundamental principles:**
  1. **Clarity:** A prompt should be direct and unambiguous, describing the task or question precisely.
  2. **Context:** Provide additional information that helps the model understand the framework of the request.
  3. **Role specification:** Assign the model a specific function or persona (e.g., 'You are a historian specializing in the Middle Ages').
  4. **Constraints:** Set limits on content, style, length, or output format.
  5. **Output format:** Indicate the expected structure, such as JSON, numbered lists, tables, or plain text.
  6. **Iterative refinement:** Adjust and improve the prompt based on the responses obtained.

  **Common techniques:**

  **Importance in the current context:**
  With the expansion of language models in applications such as chatbots, virtual assistants, content generation, text summarization, or data analysis, Prompt Engineering has become an essential skill. Proper prompt engineering not only improves output quality but also optimizes computational resources and reduces the need for manual post-editing.`,
  },
  {
    id: "historia-evolucion",
    title: "History and Evolution of Prompt Engineering",
    description: "An overview of the evolution of prompt engineering.",
    content:
      "From the first language models to modern prompt engineering techniques.",
    chatWelcomeMessage:
      "Hi again! Today we'll explore the history and evolution of Prompt Engineering. Ask me about key milestones or share your thoughts to start the conversation.",
    infoPanel: `# Historia y Evolución del Prompt Engineering

The history and evolution of Prompt Engineering reflect the rapid development of large language models (LLMs) and the growing understanding of how to interact with them effectively.

## Origins
Prompt Engineering emerged informally during the early experiments with natural language models, when users realized that phrasing and context significantly influenced the quality of responses. Early interactions relied on simple, direct commands, often without additional context or structured formatting.

## Evolution of Techniques
As LLMs became more capable, prompt design evolved from basic zero-shot requests to more advanced methods. The introduction of few-shot prompting allowed users to provide examples, improving accuracy in complex tasks. Later, advanced strategies like Chain-of-Thought prompting encouraged step-by-step reasoning, while ReAct combined reasoning with external actions to solve multi-step problems.

## Impact of Model Advancements
The growth in model size and training data led to higher linguistic and contextual understanding, making prompt engineering both more powerful and more necessary. Complex tasks, domain-specific knowledge, and multi-lingual applications demanded more precise and structured prompts.

## Professionalization
Today, Prompt Engineering is recognized as a professional skill. Companies employ prompt engineers to develop optimized prompts for chatbots, content generation, data analysis, and other AI-driven workflows. Specialized tools and prompt libraries are now part of the ecosystem.

## Future Trends
Research continues to explore new patterns such as Tree-of-Thought reasoning, automated prompt optimization, and integration with autonomous AI agents. The role of prompt engineering will likely expand as models become more autonomous and embedded in everyday applications.`,
  },
  {
    id: "elementos-prompt",
    title: "Elements of a Prompt",
    description: "Key parts that make up an effective prompt.",
    content:
      "Structure, instructions, context, and examples in prompt construction.",
    chatWelcomeMessage:
      "Hello! I'm your chatbot guide. In this lesson, we'll talk about the elements of a good prompt. Want to know where to start? Ask me or share your experience!",
    infoPanel: `# Elementos de un Prompt

The elements of a prompt are the core components that determine how a large language model (LLM) interprets and responds to a request. Understanding these elements allows prompt engineers to design instructions that are precise, context-aware, and aligned with the desired outcome.

## Main Elements
1. **Instruction:** The explicit statement of the task or question the model must address. Clear, action-oriented instructions reduce ambiguity and help the model focus on the objective.
2. **Context:** Supplemental information that frames the request, such as background details, relevant data, or scenario descriptions. Context ensures that the model has enough information to produce relevant and accurate outputs.
3. **Input Data:** The specific material the model should process, which could include text, numbers, lists, or structured data. Well-prepared input data minimizes misunderstandings.
4. **Output Indicator:** A description of the expected response format, style, or level of detail. This might include requesting bullet points, tables, JSON objects, or narrative text.

## Importance of Element Alignment
When all four elements are carefully designed and aligned, the likelihood of obtaining high-quality, actionable responses increases significantly. Each element plays a unique role in shaping the model’s interpretation and output.

## Advanced Considerations
For complex tasks, additional elements such as **role specification** (e.g., assigning the model the persona of a domain expert) or **constraints** (e.g., word count limits, tone guidelines) can be integrated into the prompt to further control the output.

Effective prompt engineering involves balancing these elements in a way that matches the capabilities of the model with the requirements of the task.`,
  },
  {
    id: "optimizacion-prompts",
    title: "Prompt Optimization Techniques",
    description: "How to improve prompt effectiveness.",
    content: "Strategies and adjustments to get better responses from models.",
    chatWelcomeMessage:
      "Welcome! Would you like to learn how to optimize your prompts? I'm here to help with tips and examples. Let's talk about how to improve your results!",
    infoPanel: `# Técnicas de Optimización de Prompts

Prompt optimization techniques are strategies used to improve the clarity, effectiveness, and reliability of prompts for large language models (LLMs). These techniques help refine the interaction process and ensure the generated outputs meet the desired standards.

## Key Techniques
1. **Iterative Refinement:** Continuously adjusting and testing prompts based on output analysis. Each iteration aims to eliminate ambiguities, enhance context, or improve structure.
2. **Feedback Loops:** Using the model’s output to inform prompt adjustments, either manually or through automated systems.
3. **Parameter Tuning:** Adjusting model parameters such as temperature, max tokens, and top-p to influence creativity, length, and variability in responses.
4. **Progressive Prompting:** Breaking down complex tasks into smaller, manageable prompts and combining results for the final output.
5. **Role and Scenario Refinement:** Fine-tuning the role specification or contextual framing to better match the intended task.
6. **Constraint Application:** Adding explicit limits on style, tone, length, or content to increase precision.

## Benefits of Optimization
Applying these techniques leads to outputs that are more relevant, accurate, and consistent. It also reduces the need for manual post-processing and increases the efficiency of automated workflows.

## Advanced Considerations
Prompt optimization is an ongoing process. As LLM capabilities evolve, the strategies for optimization will also adapt, incorporating new patterns, model-specific features, and tools for automated evaluation and refinement.`,
  },
  {
    id: "patrones-basico",
    title: "Prompt Patterns: Basic Level",
    description: "Common and simple patterns to start creating prompts.",
    content: "Examples and templates of basic prompts for frequent tasks.",
    chatWelcomeMessage:
      "Hello! I'm your virtual assistant. Today we'll look at basic prompt patterns. If you want to practice or need examples, just say 'Show me an example!'",
    infoPanel: `# Prompt Patterns: Basic Level

Basic prompt patterns are reusable structures that help create effective prompts for common tasks when working with large language models (LLMs). These patterns serve as templates, making it easier to design clear and consistent instructions.

## Common Basic Patterns

1. **Q&A Pattern**
   - **Structure:** Ask a direct question.
   - **Example:** "What are the three main causes of climate change?"
   - **Use Case:** Quick factual answers or short explanations.

2. **Instruction Pattern**
   - **Structure:** Give a clear command describing the task.
   - **Example:** "Summarize the following article in three bullet points."
   - **Use Case:** Direct task execution without ambiguity.

3. **Fill-in-the-Blank Pattern**
   - **Structure:** Provide a sentence or text with missing parts.
   - **Example:** "The capital of France is _____."
   - **Use Case:** Knowledge recall, quizzes, or completion tasks.

4. **List Generation Pattern**
   - **Structure:** Ask for a numbered or bulleted list.
   - **Example:** "List five benefits of renewable energy."
   - **Use Case:** Idea generation, brainstorming, or structured information.

5. **Rewriting Pattern**
   - **Structure:** Request a rephrasing or reformatting of given content.
   - **Example:** "Rewrite the following paragraph in simpler terms: [text]."
   - **Use Case:** Adaptation for different audiences or clarity.

## Benefits of Using Basic Patterns
- Improves clarity and reduces ambiguity in prompts.
- Saves time by reusing effective structures.
- Makes it easier for beginners to craft prompts without starting from scratch.

By mastering these basic patterns, prompt engineers can quickly design instructions that work well across a wide variety of tasks.`,
  },
  {
    id: "patrones-avanzado",
    title: "Prompt Patterns: Advanced Level",
    description: "Complex patterns and advanced techniques.",
    content: "How to design sophisticated prompts for specialized tasks.",
    chatWelcomeMessage:
      "Hello! Ready for advanced challenges? In this lesson, I'll help you create complex prompts. Ask me about techniques or share your own challenges!",
    infoPanel: `# Patrones de Prompt: Nivel Avanzado

Advanced prompt patterns are sophisticated design strategies intended to maximize the capabilities of large language models (LLMs) for complex, multi-step, and high-precision tasks. These patterns go beyond the basic methods of zero-shot, one-shot, and few-shot prompting, and instead focus on structured reasoning, exploration of alternative answers, and integration with external resources.

## Main Advanced Patterns

1. **Chain-of-Thought Prompting**  
   Encourages the model to explicitly articulate its reasoning process step-by-step before delivering the final answer. This method improves accuracy for logical, mathematical, and decision-making tasks.

2. **Self-Consistency**  
   Generates multiple independent reasoning paths, then selects the most common or consistent result. This helps reduce random output variations and enhances reliability.

3. **ReAct (Reasoning and Acting)**  
   Combines internal reasoning steps with calls to external tools, APIs, or databases to complete tasks requiring real-time information or computational support.

4. **Tree-of-Thoughts**  
   Extends Chain-of-Thought into a branching reasoning structure, enabling the model to explore several solution paths in parallel before evaluating and selecting the optimal answer.

5. **Meta-Prompting**  
   Directs the model to design its own optimized prompt for a given problem, leveraging its ability to reflect on and refine its approach.

## Advantages of Advanced Patterns
- Greater accuracy in complex, high-stakes, or ambiguous tasks.
- Better adaptability to domain-specific applications.
- Increased transparency in reasoning processes.

## Limitations
Advanced patterns may require more computational resources, result in longer processing times, and demand precise prompt design to avoid irrelevant or overly verbose outputs.

## Application Tip
Use advanced patterns for tasks where reasoning transparency and output accuracy are critical. Combining multiple advanced patterns can further strengthen results.`,
  },
  {
    id: "ingenieria-contexto",
    title: "Context Engineering",
    description: "How context influences the model's response.",
    content: "Techniques to provide relevant context and improve accuracy.",
    chatWelcomeMessage:
      "Hello! I'm your chatbot. Today we'll talk about the importance of context in prompts. Want an example of how context changes the answer? Just ask!",
    infoPanel: `# Ingeniería de Contexto

Context engineering is the process of strategically designing and providing relevant background information to guide a large language model (LLM) toward producing outputs that are accurate, relevant, and aligned with the desired objective. Context acts as a framework that shapes the model’s understanding of the task.

## Key Aspects of Context Engineering
1. **Relevance:** Include only information directly related to the task.
2. **Specificity:** Provide precise, unambiguous details that clearly define the scope.
3. **Scope Management:** Balance between giving enough detail and avoiding overwhelming the model.
4. **Consistency:** Maintain a stable context across multi-turn interactions to prevent contradictory responses.

## Benefits
- Increases accuracy and reduces irrelevant outputs.
- Helps maintain focus in complex or multi-step tasks.
- Supports domain-specific customization.

## Advanced Use
Dynamic context building can involve retrieving relevant data from external sources or previous conversation turns, ensuring the model always operates with the most up-to-date and relevant information.`,
  },
  {
    id: "ingenieria-instrucciones",
    title: "Instruction Engineering",
    description: "The art of giving clear and precise instructions.",
    content: "How to formulate effective instructions to guide the model.",
    chatWelcomeMessage:
      "Hello! In this lesson, you'll learn how to give clear instructions. If you have a specific task, tell me and I'll help you craft the best instruction.",
    infoPanel: `# Ingeniería de Instrucciones

Instruction engineering is the discipline of crafting explicit, actionable, and well-structured directives that communicate exactly what a large language model (LLM) should do. Effective instruction engineering is critical because it reduces ambiguity, guides the model’s reasoning, and ensures outputs align with the intended goals.

## Core Principles of Instruction Engineering
1. **Clarity:** Avoid vague or ambiguous language. Use direct and concise wording to define the task.
2. **Action Orientation:** Phrase instructions as specific actions or deliverables (e.g., "Summarize the following text in exactly three bullet points").
3. **Completeness:** Provide all necessary details, including constraints, context, and output expectations.
4. **Sequencing:** For multi-step tasks, break down instructions into a clear order of execution.
5. **Consistency:** Maintain a stable structure and phrasing when generating repeated outputs to ensure uniformity.

## Advanced Strategies
- **Conditional Instructions:** Incorporate logic into the instruction, telling the model how to behave under different conditions.
- **Role-Enhanced Instructions:** Combine role specification with the main task (e.g., "As a cybersecurity expert, explain the risks...").
- **Multi-Constraint Instructions:** Apply multiple layers of requirements, such as word limits, tone restrictions, and output formatting.
- **Instruction Chaining:** Link multiple related instructions in a sequence to accomplish complex tasks.

## Benefits
- Improves the relevance, accuracy, and completeness of responses.
- Facilitates automation by ensuring outputs meet predefined specifications.
- Reduces post-processing time and the need for human corrections.

## Common Pitfalls and How to Avoid Them
- **Overloading Instructions:** Avoid cramming too many requirements into a single instruction, which can confuse the model.
- **Under-Specifying:** Not providing enough detail often leads to generic or incomplete outputs.
- **Ignoring Output Validation:** Always cross-check outputs against the original instruction to ensure compliance.

## Professional Application
Instruction engineering is widely used in chatbot design, automated content generation, customer service responses, and data extraction tasks. As LLM capabilities evolve, instruction engineering will increasingly incorporate adaptive and dynamic instruction sets that adjust in real-time based on user interaction or external data.`,
  },

  {
    id: "salida-estructurada",
    title: "Prompts for Structured Output",
    description: "How to get responses in specific formats.",
    content:
      "Designing prompts for JSON, lists, tables, and other structured formats.",
    chatWelcomeMessage:
      "Hello! Want to know how to get answers in table, list, or JSON format? Tell me your case and I'll show you how to do it.",
    infoPanel: `# Prompts para Salida Estructurada

Structured output prompts are a specialized category of prompt engineering aimed at producing outputs in a precise, machine-readable format. This is essential for scenarios where the output will be directly consumed by another system, application, or database, ensuring both consistency and compatibility.

## Core Characteristics
1. **Explicit Format Definition:** Clearly define the structure of the output (e.g., JSON, XML, CSV, Markdown tables, bullet lists).
2. **Schema Enforcement:** Specify exact field names, keys, or labels that must be present in the output.
3. **Style and Content Rules:** Set explicit constraints for tone, word choice, numerical formats, and value ranges.
4. **Error Handling Instructions:** Define how the model should behave when certain information is unavailable (e.g., use 'null' or 'N/A').
5. **Data Validation Guidance:** Instruct the model to check that its output adheres to the specified schema.

## Advantages
- Facilitates integration with structured data systems such as APIs, CRMs, or analytics dashboards.
- Reduces the need for manual reformatting or post-processing.
- Increases accuracy in downstream automation processes.
- Ensures predictability of the output for consistent processing.

## Advanced Techniques
- **Output Schema Embedding:** Include a sample schema directly within the prompt to guide output formatting.
- **Multi-Step Validation:** Have the model generate the output and then re-validate it against the format requirements.
- **Hybrid Prompts:** Combine natural language responses with structured data for enhanced usability.

## Common Use Cases
- Extracting structured data (e.g., contact information, product details) from unstructured text.
- Generating standardized compliance or audit reports.
- Producing API-ready JSON payloads from plain language requests.
- Creating CSV or table-based summaries for business intelligence tools.

## Professional Application
Structured output prompting is critical in fields such as business automation, data science, and system integration. As LLMs are increasingly embedded in operational workflows, the ability to reliably produce structured outputs will remain a core competency for prompt engineers.`,
  },
  {
    id: "evaluacion-calidad",
    title: "Prompt Quality Evaluation",
    description: "How to measure and improve prompt quality.",
    content: "Metrics, tests, and criteria to evaluate prompts.",
    chatWelcomeMessage:
      "Hello! I'm your assistant. Today we'll learn how to evaluate prompt quality. If you have a prompt and want to know how to improve it, share it with me!",
    infoPanel: `# Evaluación de la Calidad de un Prompt

Evaluating the quality of a prompt is a critical step in prompt engineering, as it determines how effectively a large language model (LLM) can interpret and respond to the request. High-quality prompts yield outputs that are accurate, relevant, consistent, and aligned with the intended objectives, while poorly designed prompts can result in vague, irrelevant, or misleading outputs.

## Core Evaluation Criteria
1. **Accuracy:** The degree to which the model’s response meets factual correctness and task-specific requirements.
2. **Relevance:** The extent to which the output addresses the user’s query without diverging into unrelated content.
3. **Clarity:** The ease with which the model interprets the prompt, influenced by unambiguous language and well-defined instructions.
4. **Completeness:** Ensuring that the response covers all requested aspects without omitting essential details.
5. **Consistency:** The ability of the prompt to yield similar quality results across multiple runs or variations.
6. **Factuality:** Verification that all claims or data points in the response are truthful and supported by evidence.
7. **Format Compliance:** The degree to which the output adheres to specified structural requirements (e.g., JSON schema, bullet points).

## Evaluation Methods
- **Manual Review:** Human evaluation of responses based on the above criteria.
- **Automated Testing:** Using scripts or validators to check structural compliance and detect errors.
- **A/B Prompt Testing:** Comparing two or more prompt versions to determine which yields better performance.
- **Benchmarking:** Measuring prompt performance using standard datasets or predefined test cases.
- **Error Analysis:** Identifying patterns in incorrect outputs to refine prompt design.

## Advanced Evaluation Strategies
- **Multi-Metric Scoring:** Assigning weighted scores to different evaluation criteria for a more nuanced performance assessment.
- **Longitudinal Testing:** Evaluating prompt performance over time to ensure stability and robustness.
- **Cross-Domain Testing:** Ensuring that prompts perform well across varied contexts and subject matter.
- **Stress Testing:** Using edge cases or ambiguous inputs to evaluate prompt resilience.
- **Model Comparisons:** Testing the same prompt across multiple LLMs to identify architecture-specific performance differences.

## Benefits of Prompt Evaluation
- Increases confidence in prompt reliability.
- Reduces the risk of flawed outputs in critical workflows.
- Enables systematic improvement of prompt engineering practices.

## Professional Application
Prompt evaluation is essential in industries like law, healthcare, finance, and technical documentation, where accuracy, consistency, and compliance are non-negotiable. Continuous evaluation processes allow organizations to adapt prompts to evolving model capabilities and changing user requirements.`,
  },

  {
    id: "multilingue-transcultural",
    title: "Multilingual and Cross-cultural Prompt Engineering",
    description:
      "Challenges and techniques for prompts in different languages and cultures.",
    content: "Adapting prompts for global and multilingual contexts.",
    chatWelcomeMessage:
      "Hello! Today we're exploring how to adapt prompts to different languages and cultures. Do you have a specific case? Tell me and we'll analyze it together!",
    infoPanel: `# Prompt Engineering Multilingüe y Transcultural

Multilingual and cross-cultural prompt engineering focuses on designing prompts that work effectively across different languages and cultural contexts. As large language models (LLMs) are deployed globally, their ability to understand, interpret, and generate content in a culturally sensitive and linguistically accurate way becomes essential.

## Core Considerations
1. **Linguistic Nuances:** Each language has its own idioms, syntax, grammar rules, and stylistic conventions. Prompts must be adapted to preserve meaning, tone, and context.
2. **Dialect and Regional Variations:** Even within the same language, regional differences in vocabulary and expression can impact the clarity and relevance of model outputs.
3. **Cultural Context:** Background knowledge, social norms, and historical references vary widely across cultures. Prompts must be tailored to avoid misunderstandings or cultural insensitivity.
4. **Script and Encoding Differences:** Some languages use non-Latin scripts or special characters, requiring prompt formatting that ensures correct interpretation.
5. **Translation Accuracy:** Literal translations may fail to capture the intended meaning; prompts often need conceptual translation rather than word-for-word rendering.

## Strategies for Effective Multilingual and Cross-Cultural Prompts
- **Localized Prompt Design:** Create language-specific versions of prompts rather than relying solely on translation.
- **Contextual Adaptation:** Incorporate local references, examples, and idiomatic expressions to improve relatability.
- **Inclusive Language:** Avoid culturally biased or exclusionary terms, and adopt language that is respectful and inclusive.
- **Cultural Sensitivity Checks:** Evaluate prompts for potential cultural misunderstandings before deployment.
- **Code-Switching Awareness:** In some multilingual contexts, mixing languages may improve clarity for the target audience.

## Evaluation Methods
- **Native Speaker Review:** Collaborate with fluent speakers to assess accuracy and cultural appropriateness.
- **Comparative Testing:** Evaluate prompt performance across multiple languages to identify strengths and weaknesses.
- **Back-Translation:** Translate prompts back to the original language to ensure meaning consistency.

## Benefits
- Expands the applicability of LLM solutions to global audiences.
- Improves trust and engagement by respecting linguistic and cultural diversity.
- Reduces the risk of producing outputs that are culturally inappropriate or misunderstood.

## Professional Application
Multilingual and cross-cultural prompt engineering is critical in fields such as international customer service, global marketing, cross-border e-commerce, multilingual knowledge bases, and diplomatic communications. By embedding linguistic and cultural awareness into prompt design, organizations can ensure effective communication and higher-quality interactions across diverse audiences.`,
  },

  {
    id: "etica-sesgos",
    title: "Ethics and Bias in Prompt Engineering",
    description: "Ethical considerations and how to avoid bias in prompts.",
    content: "Best practices to minimize bias and promote fairness in AI.",
    chatWelcomeMessage:
      "Hello! I'm your chatbot. In this lesson, we'll talk about ethics and bias in AI. If you have questions about making prompts fairer, just ask!",
    infoPanel: `# Ética y Sesgos en el Prompt Engineering

Ethics and bias in prompt engineering address the moral responsibilities and fairness considerations involved in designing prompts for large language models (LLMs). Because prompts directly influence model outputs, they can unintentionally reinforce or amplify harmful stereotypes, cultural biases, or discriminatory practices if not carefully crafted.

## Core Ethical Considerations
1. **Fairness:** Ensure prompts do not privilege one group over another or exclude minority perspectives.
2. **Transparency:** Communicate clearly how prompts are constructed and the intended purpose of the model’s output.
3. **Accountability:** Maintain responsibility for how prompts are used and the consequences of their outputs.
4. **Privacy:** Avoid including sensitive or personally identifiable information in prompts.
5. **Harm Prevention:** Design prompts to minimize the risk of generating harmful, offensive, or misleading content.

## Understanding Bias in Prompt Engineering
- **Data-Driven Bias:** Many biases originate from the datasets used to train the model, which can reflect historical and societal prejudices.
- **Prompt-Induced Bias:** The wording, context, or framing of a prompt can unintentionally guide the model toward biased outputs.
- **Cultural Bias:** Prompts may overrepresent certain cultural norms, values, or perspectives, marginalizing others.

## Strategies to Mitigate Bias
- **Inclusive Prompt Design:** Use neutral and balanced language that avoids reinforcing stereotypes.
- **Representation Testing:** Evaluate outputs across different demographic, cultural, and geographic scenarios.
- **Adversarial Testing:** Intentionally stress-test prompts with edge cases to identify hidden biases.
- **Iterative Review:** Continuously refine prompts based on bias detection and user feedback.
- **Ethical Guidelines:** Develop and follow prompt engineering ethics frameworks within organizations.

## Evaluation Methods for Ethical Compliance
- **Bias Audits:** Regularly review prompts and outputs for signs of discrimination or exclusion.
- **Impact Assessments:** Analyze potential societal effects of prompt deployment in different contexts.
- **Diverse Reviewer Panels:** Include evaluators from varied backgrounds to identify issues that homogeneous teams might miss.

## Benefits of Ethical Prompt Engineering
- Builds trust among users and stakeholders.
- Enhances the inclusivity and accessibility of AI applications.
- Reduces the risk of reputational harm and legal liability.

## Professional Application
Ethical and bias-aware prompt engineering is critical in sectors such as law, education, healthcare, public policy, and media. By integrating fairness, transparency, and accountability into prompt design, developers can ensure that AI systems serve all users equitably and responsibly.`,
  },
];

async function main() {
  // Crea un curso de ejemplo para asociar las lecciones
  const course = await prisma.course.upsert({
    where: { slug: "prompt-engineering" },
    update: {},
    create: {
      slug: "prompt-engineering",
      title: "Prompt Engineering",
      summary: "Curso de fundamentos y técnicas de prompt engineering",
    },
  });

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.id },
      update: {
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        infoPanel: lesson.infoPanel,
        chatWelcomeMessage: lesson.chatWelcomeMessage,
        courseId: course.id,
      },
      create: {
        slug: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        chatWelcomeMessage: lesson.chatWelcomeMessage,
        courseId: course.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
