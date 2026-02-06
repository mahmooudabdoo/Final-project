import { API_ENDPOINTS } from "@/api";

type EndpointResponse = {
  prediction: string;
  confidence: string;
  confidence_score: number;
  filename: string;
  model_type: string;
  all_classes: string[];
};

export async function checkBrain(image: File): Promise<EndpointResponse> {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(API_ENDPOINTS.BRAIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brain prediction");
  }

  const data = await response.json();
  console.log("Brain prediction response:", data);
  return data;
}
