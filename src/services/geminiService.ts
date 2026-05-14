import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY as string
});

const MODEL = "gemini-3-flash-preview";

export async function explainPoem(poemTitle: string, content: string) {
  const prompt = `You are a literature expert specializing in Kannada poetry. Explain this Kannada poem titled "${poemTitle}" in simple Kannada and English. Focus on the core meaning, philosophical depth, and cultural context. Use a supportive and informative tone.

Poem Content:
${content}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  return response.text;
}

export async function translatePoem(poemTitle: string, content: string) {
  const prompt = `Translate this Kannada poem titled "${poemTitle}" into poetic English. 
Your goal is to preserve the emotion, rhythm, and metaphors of the original Kannada text. 
Provide just the translation without any introductory text.

Original Poem:
${content}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  return response.text;
}

export async function generateSimilarPoem(mood: string) {
  const prompt = `Write a short original Kannada poem with the mood of ${mood}. 
The theme should be nature, spirituality, or folk life. 
Provide a title in Kannada and then the poem content in Kannada.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  return response.text;
}

export async function generateQuiz(poemTitle: string, content: string) {
  const prompt = `Generate a 3-question multiple-choice quiz based on this Kannada poem titled "${poemTitle}". 
The questions should focus on the meaning, metaphors, or the poet's intent. 

Poem:
${content}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The quiz question in simple Kannada" },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Four multiple choice options"
            },
            answerIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
            explanation: { type: Type.STRING, description: "Brief explanation of why the answer is correct in Kannada" }
          },
          required: ["question", "options", "answerIndex", "explanation"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI returned empty response");
  
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse quiz response:", text);
    throw err;
  }
}

export async function chatAboutPoem(poemTitle: string, content: string, history: any[], message: string) {
  const chat = ai.chats.create({
    model: MODEL,
    config: {
      systemInstruction: `You are a literature professor specializing in Kannada poetry. We are discussing the poem "${poemTitle}". 
Poem Content: 
${content}

Answer user questions accurately, poetically, and insightfully in Kannada. If they ask in English, you can provide a bi-lingual response but keep the heart in Kannada. 
Help them understand the deeper layers of the poem.`
    },
    history: history
  });

  const response = await chat.sendMessage({
    message: message
  });
  return response.text;
}
