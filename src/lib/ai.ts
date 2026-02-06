import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_PRIORITY = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

const RETRY_DELAY_MS = 2000;

const isRateOrQuotaError = (error: unknown) => {
  if (!error) return false;

  const maybeAny = error as {
    status?: number;
    code?: number;
    message?: string;
  };
  const message = maybeAny.message?.toLowerCase() ?? "";

  return (
    maybeAny.status === 429 ||
    maybeAny.code === 429 ||
    maybeAny.status === 503 ||
    maybeAny.code === 503 ||
    message.includes("rate limit") ||
    message.includes("resource exhausted") ||
    message.includes("quota")
  );
};

type GenerateContentPayload = Parameters<
  GoogleGenAI["models"]["generateContent"]
>[0];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type SafeFallbackResponse = { text: string; error: true };

export async function generateContentWithFallback(
  payload: Omit<GenerateContentPayload, "model">
) {
  let lastError: unknown;

  for (const model of MODEL_PRIORITY) {
    try {
      return await ai.models.generateContent({
        ...payload,
        model,
      });
    } catch (error) {
      lastError = error;

      if (isRateOrQuotaError(error)) {
        console.warn(
          `[AI] Model "${model}" failed due to rate/quota limits. Trying next fallback.`
        );
        await sleep(RETRY_DELAY_MS);
        continue;
      }

      break;
    }
  }

  console.error("[AI] All Gemini models failed.", lastError);

  const safeResponse: SafeFallbackResponse = {
    text: "عذراً، نواجه ضغطاً كبيراً على الخوادم حالياً. يرجى الانتظار دقيقة واحدة ثم المحاولة مرة أخرى.",
    error: true,
  };

  return safeResponse;
}
