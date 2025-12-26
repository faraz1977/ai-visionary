
import { GoogleGenAI } from "@google/genai";
import { ToolType } from "../types";

export const processImageWithAI = async (
  imageData: string,
  tool: ToolType
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const toolPrompts = {
    [ToolType.WATERMARK]: "Please analyze this image and generate an identical version but remove any visible watermarks, text overlays, or logos. Output ONLY the edited image.",
    [ToolType.BACKGROUND]: "Please generate an identical version of this image but with a solid, pure transparent background (or pure white if transparency is not possible). Focus on isolating the main subject.",
    [ToolType.ENHANCE]: "Please enhance the colors, brightness, and contrast of this image to make it look professionally shot and edited. Maintain natural look but boost vibrance.",
    [ToolType.UPSCALE]: "Please generate a high-fidelity, sharpened, and high-resolution version of this image, preserving and reconstructing fine details."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/png' } },
          { text: toolPrompts[tool] }
        ]
      }
    });

    let resultBase64 = '';
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        resultBase64 = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!resultBase64) {
      // Fallback if no image part returned - sometimes happens if it just describes it
      throw new Error("AI did not return an edited image part.");
    }

    return resultBase64;
  } catch (error) {
    console.error("AI Processing Error:", error);
    throw error;
  }
};
