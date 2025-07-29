import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY_ENV_VAR || "default_key",
  dangerouslyAllowBrowser: true
});

export async function generateChefResponse(
  userMessage: string, 
  chefPersonality: string, 
  chefName: string, 
  recipeTitle: string
): Promise<string> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are ${chefName}, a friendly AI cooking assistant with personality: ${chefPersonality}. You're helping cook "${recipeTitle}". Be encouraging, helpful, and stay in character. Keep responses concise but warm. Respond in JSON format: {"message": "your response"}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{"message": "I\'m here to help!"}');
    return result.message;
  } catch (error) {
    // Handle OpenAI API errors gracefully
    return "I'm having trouble responding right now, but keep cooking! You're doing great!";
  }
}
