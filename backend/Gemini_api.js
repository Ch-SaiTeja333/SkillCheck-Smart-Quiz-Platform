import axios from "axios";
import "dotenv/config";

/* =================================
   GROQ API CALL
================================= */

export const runApi = async (promptText) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // model: "llama-3.3-70b-versatile",
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: promptText }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("Groq Error:", error.message);
    return null;
  }
};

/* =================================
   BASIC TOPIC VALIDATION
================================= */

export const basicTopicValidation = (topic) => {
  if (!topic) return false;
  const clean = topic.trim();
  if (clean.length < 3) return false;
  if (!/[a-zA-Z]/.test(clean)) return false;
  return true;
};

/* =================================
   AI TOPIC VALIDATION
================================= */

export const validateTopic = async (topic) => {
  const cleanTopic = (topic ?? "").trim();

  if (!basicTopicValidation(cleanTopic)) {
    return false;
  }

  const prompt = `
Determine if the following text is a valid academic or professional topic.

Topic: "${cleanTopic}"

Valid examples:
Math
DBMS
SQL
React
Machine Learning
Cardiology

Invalid examples:
abc
xyz
123
asdfgh

Return ONLY JSON:

{
 "valid": true or false
}
`;

  try {
    const response = await runApi(prompt);

    if (!response) {
      console.warn(
        "Topic validation fallback enabled because AI validation failed.",
      );
      return true;
    }

    const clean = response.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return parsed.valid === true;
  } catch (error) {
    console.warn(
      "Topic validation parse failed; allowing topic as valid fallback.",
      error.message,
    );
    return true;
  }
};

/* =================================
   QUESTION GENERATION PROMPT
================================= */
export const buildPrompt = (topic, difficultyLevel, numberOfQuestions) => `
You are an expert exam question generator.

Generate EXACTLY ${numberOfQuestions} multiple-choice questions (MCQs)
on the topic "${topic}".

Difficulty level: ${difficultyLevel}

Difficulty rules:
- EASY → basic definitions and beginner concepts.
- MEDIUM → conceptual understanding and application.
- HARD → advanced, tricky, scenario-based or analytical questions.

STRICT RULES:
- Generate EXACTLY ${numberOfQuestions} questions. Not more, not less.
- Each question must have exactly 4 options.
- Only one option must be correct.
- Avoid repeated questions.
- Do NOT include explanations.
- Output MUST be valid JSON only.

JSON format:

[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string"
  }
]

Remember:
Return EXACTLY ${numberOfQuestions} questions.
Do NOT return any extra text.
`;

/* =================================
   FEEDBACK GENERATION PROMPT
================================= */

export const buildFeedbackPrompt = (obj) => `
A user attempted a quiz.

Topic: ${obj.topic}
Difficulty Level: ${obj.difficultyLevel}
Score: ${obj.score}
Percentage: ${obj.percentage}%

Questions and Answers:

${obj.questions
  .map(
    (q, i) => `
Question ${i + 1}: ${q}

Options: ${obj.options.availableOptions[i].join(", ")}

Correct Answer: ${obj.options.correctOptions[i]}

User Answer: ${obj.options.userOptions[i] || "Not Answered"}
`,
  )
  .join("\n")}

Instructions:

- Analyze the user's performance carefully.
- Explain the overall performance in 3-4 sentences.
- Mention strengths.
- Explain weak areas clearly.
- Provide useful suggestions for improvement.
- Do NOT repeat questions.
- Return ONLY valid JSON.

Format:

{
  "overallFeedback": "string",
  "strengths": ["string","string","string"],
  "weakAreas": ["string","string","string"],
  "suggestions": ["string","string","string"]
}
`;

/* =================================
   SAFE JSON PARSER
================================= */

export const parseAIJSON = (text) => {
  try {
    const clean = text.replace(/```json|```/g, "");

    return JSON.parse(clean);
  } catch (error) {
    console.log("JSON Parse Error:", error);

    return null;
  }
};

/* =================================
   TEST DATA
================================= */

const quiz = {
  topic: "DSA",
  difficultyLevel: "easy",
  score: 2,
  percentage: 66.67,
  questions: [
    "Which data structure stores elements in a linear sequence?",
    "What is an algorithm primarily used for?",
    "Which data structure follows LIFO?",
  ],
  options: {
    correctOptions: ["Array", "Solving a computational problem", "Stack"],
    userOptions: ["Linked List", "Solving a computational problem", "Queue"],
    availableOptions: [
      ["Linked List", "Tree", "Array", "Graph"],
      [
        "Storing data permanently",
        "Defining syntax",
        "Solving a computational problem",
        "Designing UI",
      ],
      ["Queue", "Stack", "Linked List", "Array"],
    ],
  },
};

/* =================================
   TEST FEEDBACK
================================= */

// const prompt = buildFeedbackPrompt(quiz);

// const feedback = await runApi(prompt);

// const parsedFeedback = parseAIJSON(feedback);

// console.log(parsedFeedback);

/* =================================
   TEST QUESTION GENERATION
================================= */

// const topic = "abcdef";

// if (!basicTopicValidation(topic)) {
//   console.log("Invalid topic");
// } else {
//   const valid = await validateTopic(topic);

//   if (!valid) {
//     console.log("Topic not recognized");
//   } else {
//     const prompt = buildPrompt(topic, "MEDIUM", 5);

//     const questions = await runApi(prompt);

//     const parsed = parseAIJSON(questions);

//     console.log(parsed);
//   }
// }
