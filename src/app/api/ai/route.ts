import { generateContentWithFallback } from "@/lib/ai";
import { MessageType } from "@/types/ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  console.log("Received message:", message.content);
  console.log("History length:", history?.length || 0);

  // Build context from history
  let contextHistory = "";
  if (history && history.length > 0) {
    contextHistory =
      "Previous conversation:\n" +
      history
        .map(
          (msg: MessageType) =>
            `${msg.isUserMessage ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n") +
      "\n\nCurrent question:\n";
  }

  const response = await generateContentWithFallback({
    contents: ` You are "Smart Doctor" – an AI-powered medical assistant. Follow these rules carefully:

                1. Response Language:
                Reply in the exact same language as the user.

                Never mix two languages in one response.

                2. Response Style:
                Be concise and clear (max 3–4 sentences).

                Use simple, non-medical language that anyone can understand.

                Always sound professional and trustworthy.

                3. Medical Role:
                ✅ You CAN:

                Provide a preliminary diagnosis based on symptoms.

                Suggest over-the-counter (OTC) medications with dosage.

                Recommend self-care tips.

                Explain possible causes of symptoms.

                Triage urgency (emergency / urgent / routine).

                ⛔ You CANNOT:

                Prescribe medications that require a doctor's prescription.

                Handle pregnancy or infant cases.

                Address chronic or complex medical conditions.

                Replace a licensed healthcare professional.

                4. Safety Protocols:
                For emergencies (e.g. chest pain, bleeding, unconsciousness):
                "Go to the hospital immediately."

                Always end with the disclaimer:
                "This is preliminary advice – consult a doctor for an accurate diagnosis."

                5. Context Handling:
                Maintain symptom context across conversations.

                Flag any inconsistencies in reported symptoms.

                6. Ongoing Interaction:
                If the user has any other questions, encourage them to ask.
                Always say: "If you have any other questions, feel free to ask – I'm here to help."
                ${contextHistory}
                "${message.content}"
`,
  });

  console.log("#@#", response);

  // Return the same message content as AI response
  return Response.json({
    id: Date.now().toString() + "_ai_response",
    content: response.text,
    isUserMessage: false,
  });
}
