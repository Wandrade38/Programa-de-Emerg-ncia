
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // In a real app, you might have a fallback or a more robust error handling
      console.error("API_KEY environment variable not set.");
      return "MISSING_API_KEY";
    }
    return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const getReassuringMessage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Gere uma mensagem curta, calmante e tranquilizadora para um idoso que acabou de pressionar um botão de emergência. A mensagem deve dizer que a ajuda está a caminho e que eles devem tentar manter a calma e aguardar em um local seguro. Fale em português do Brasil.',
    });
    
    const text = response.text;
    if (text) {
        return text;
    }
    throw new Error("No text response from Gemini API.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback message in case of API error
    return "A ajuda já foi acionada e está a caminho. Por favor, tente manter a calma e aguarde em um local seguro.";
  }
};
