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
import { CheckCircle, AlertCircle, Eye } from "lucide-react";

type PredictionResponse = {
  prediction: string;
  confidence: string;
  confidence_score: number;
  filename: string;
  model_type: string;
  all_classes: string[];
};

export default function EyeDiagnosisPage() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusIcon = (prediction: string) => {
    switch (prediction.toLowerCase()) {
      case "normal":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "glaucoma":
      case "cataract":
      case "diabetic_retinopathy":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Eye className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (prediction: string) => {
    switch (prediction.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      case "glaucoma":
      case "cataract":
      case "diabetic_retinopathy":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const formatPredictionName = (prediction: string) => {
    return prediction
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-[calc(100vh-53px)]">
      <div className="space-y-6 w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Eye /> Eye Diagnosis
            </CardTitle>
            <CardDescription>
              Upload an image of your eye for diagnosis.
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
                    "https://mostafa3x-eye-model.hf.space/eye-predict/",
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
                  <p className="text-muted-foreground text-sm">Prediction</p>
                  <p
                    className={`text-lg font-semibold ${
                      prediction.prediction.toLowerCase() === "normal"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatPredictionName(prediction.prediction)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    prediction.prediction
                  )} font-medium`}
                >
                  {prediction.confidence}
                </Badge>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confidence Score</span>
                  <span className="font-medium">
                    {(prediction.confidence_score * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="bg-muted rounded-full w-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      prediction.confidence_score > 0.8
                        ? "bg-green-500/50"
                        : prediction.confidence_score > 0.6
                        ? "bg-yellow-500/50"
                        : "bg-red-500/50"
                    }`}
                    style={{ width: `${prediction.confidence_score * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* All Classes */}
              <div className="pt-4 border-t">
                <p className="mb-2 text-muted-foreground text-sm">
                  Available Classifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {prediction.all_classes.map((className) => (
                    <Badge
                      key={className}
                      variant={
                        className === prediction.prediction
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {formatPredictionName(className)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Health Advisory */}
              {prediction.prediction.toLowerCase() !== "normal" && (
                <div className="bg-amber-50 p-4 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Important:</strong> This is an AI-generated
                    diagnosis for informational purposes only. Please consult
                    with a qualified eye care professional for proper medical
                    evaluation and treatment.
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
                  Analyzing your image...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
