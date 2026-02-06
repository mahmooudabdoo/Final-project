"use client";

import React, { useState } from "react";
import { FileUploader } from "./_components/EyeFileUploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";

type PredictionResponse = {
  prediction: string;
};

export default function SkinDiagnosisPage() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to determine if the prediction indicates a concerning condition
  const isConcerning = (predictionText: string) => {
    const concerningConditions = [
      "carcinoma",
      "melanoma",
      "cancer",
      "malignant",
      "tumor",
      "suspicious",
    ];
    return concerningConditions.some((condition) =>
      predictionText.toLowerCase().includes(condition)
    );
  };

  const getStatusIcon = (predictionText: string) => {
    if (isConcerning(predictionText)) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (predictionText: string) => {
    if (isConcerning(predictionText)) {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-green-100 text-green-800 border-green-200";
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-[calc(100vh-53px)] overflow-y-auto">
      <div className="space-y-6 w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield /> Skin Lesion Analysis
            </CardTitle>
            <CardDescription>
              Upload a skin lesion image for dermatological analysis and
              diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              onUpload={async (file) => {
                setIsLoading(true);
                setPrediction(null);

                try {
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch(
                    "https://mostafa3x-ahmed-predict-image.hf.space/predict-image/",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.detail || "Upload failed");
                  }

                  const result = await res.json();
                  console.log("Prediction:", result);
                  setPrediction(result);
                } catch (error) {
                  console.error("Error:", error);
                  throw error;
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Results Card */}
        {prediction && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(prediction.prediction)}
                Diagnosis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Prediction */}
              <div className="flex justify-between items-center bg-muted/50 p-4 border rounded-lg">
                <div>
                  <p className="text-muted-foreground text-sm">Diagnosis</p>
                  <p
                    className={`text-lg font-semibold ${
                      !isConcerning(prediction.prediction)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {prediction.prediction}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    prediction.prediction
                  )} font-medium`}
                >
                  {isConcerning(prediction.prediction)
                    ? "Requires Attention"
                    : "Benign"}
                </Badge>
              </div>

              {/* Condition Status */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk Assessment</span>
                  <span
                    className={`font-medium ${
                      isConcerning(prediction.prediction)
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {isConcerning(prediction.prediction)
                      ? "High Priority"
                      : "Low Risk"}
                  </span>
                </div>
              </div>

              {/* Prediction Details */}
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Condition Type
                  </p>
                  <p className="font-medium text-sm">
                    {prediction.prediction.includes("Carcinoma")
                      ? "Skin Cancer"
                      : prediction.prediction.includes("Melanoma")
                      ? "Melanoma"
                      : prediction.prediction.includes("Benign")
                      ? "Benign Lesion"
                      : "Skin Condition"}
                  </p>
                </div>
              </div>

              {/* Health Advisory */}
              {isConcerning(prediction.prediction) && (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Important:</strong> This analysis indicates a
                    potentially serious skin condition. This is an AI-generated
                    analysis for informational purposes only. Please consult
                    with a qualified dermatologist or medical professional
                    immediately for proper evaluation, diagnosis, and treatment.
                  </p>
                </div>
              )}

              {!isConcerning(prediction.prediction) && (
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Good news:</strong> This analysis suggests a benign
                    condition. However, this is an AI-generated analysis for
                    informational purposes only. Regular skin checks and
                    professional consultations are still recommended for ongoing
                    skin health monitoring.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="flex justify-center items-center py-8">
              <div className="text-center">
                <div className="mx-auto mb-2 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                <p className="text-muted-foreground text-sm">
                  Analyzing skin lesion for dermatological diagnosis...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
