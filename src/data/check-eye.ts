import { API_ENDPOINTS } from "@/api";

type EndpointResponse = {
  prediction: string;
  confidence: string;
  confidence_score: number;
  filename: string;
  model_type: string;
  all_classes: string[];
};

export async function checkEye(image: File): Promise<EndpointResponse> {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch(API_ENDPOINTS.EYE, {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to fetch eye prediction: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Eye prediction response:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Network error: Please check if the API endpoint is accessible and CORS is properly configured"
      );
    }
    throw error;
  }
}
