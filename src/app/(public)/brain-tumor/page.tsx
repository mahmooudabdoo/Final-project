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
import { CheckCircle, AlertCircle, Brain } from "lucide-react";
import Image from "next/image";

type PredictionResponse = {
  result: string;
  has_tumor: boolean;
  segmented_image: string | null;
  filename: string;
};

export default function BrainTumorPage() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusIcon = (hasTumor: boolean) => {
    if (hasTumor) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (hasTumor: boolean) => {
    if (hasTumor) {
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
              <Brain /> Brain Tumor Analysis
            </CardTitle>
            <CardDescription>
              Upload a brain MRI image for tumor detection and analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              onUpload={async (file) => {
                setIsLoading(true);
                setPrediction(null);
                setImageLoading(false);
                setImageError(false);

                try {
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch(
                    "https://mostafa3x-brain-tumor1.hf.space/predict-tumor/",
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

                  // Start loading the segmented image if it exists
                  if (result.segmented_image) {
                    setImageLoading(true);
                    setImageError(false);
                  }
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
                {getStatusIcon(prediction.has_tumor)}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Prediction */}
              <div className="flex justify-between items-center bg-muted/50 p-4 border rounded-lg">
                <div>
                  <p className="text-muted-foreground text-sm">Result</p>
                  <p
                    className={`text-lg font-semibold ${
                      !prediction.has_tumor ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {prediction.result}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    prediction.has_tumor
                  )} font-medium`}
                >
                  {prediction.has_tumor ? "Tumor Detected" : "No Tumor"}
                </Badge>
              </div>

              {/* Tumor Status */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tumor Detection</span>
                  <span
                    className={`font-medium ${
                      prediction.has_tumor ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {prediction.has_tumor ? "Positive" : "Negative"}
                  </span>
                </div>
              </div>

              {/* File Information */}
              <div className="pt-4 border-t">
                <div>
                  <p className="text-muted-foreground text-sm">File Name</p>
                  <p className="font-medium text-sm truncate">
                    {prediction.filename}
                  </p>
                </div>
              </div>

              {/* Segmented Image */}
              {prediction.segmented_image && (
                <div className="pt-4 border-t">
                  <p className="mb-2 text-muted-foreground text-sm">
                    Segmented Analysis
                  </p>
                  <div className="bg-muted/50 p-4 border rounded-lg">
                    {imageLoading && (
                      <div className="flex justify-center items-center py-8">
                        <div className="text-center">
                          <div className="mx-auto mb-2 border-primary border-b-2 rounded-full w-6 h-6 animate-spin"></div>
                          <p className="text-muted-foreground text-xs">
                            Loading segmented image...
                          </p>
                        </div>
                      </div>
                    )}

                    {imageError && (
                      <div className="flex flex-col justify-center items-center py-8 text-center">
                        <AlertCircle className="mb-2 w-8 h-8 text-red-500" />
                        <p className="font-medium text-red-600 text-sm">
                          Failed to load segmented image
                        </p>
                        <p className="mt-1 text-muted-foreground text-xs">
                          The analysis was completed, but the segmented image
                          could not be displayed.
                        </p>
                        <button
                          onClick={() => {
                            setImageError(false);
                            setImageLoading(true);
                          }}
                          className="bg-primary hover:bg-primary/90 mt-3 px-3 py-1 rounded text-primary-foreground text-xs transition-colors"
                        >
                          Retry Loading
                        </button>
                      </div>
                    )}

                    {!imageError && (
                      <div className="relative">
                        <Image
                          width={500}
                          height={500}
                          src={`data:image/png;base64,${prediction.segmented_image}`}
                          alt="Segmented brain scan showing tumor analysis"
                          className={`shadow-sm mx-auto rounded-lg w-full max-w-md transition-opacity duration-300 ${
                            imageLoading ? "opacity-0" : "opacity-100"
                          }`}
                          onLoadingComplete={() => setImageLoading(false)}
                          onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                          }}
                          onLoad={() => setImageLoading(false)}
                          priority={false}
                          unoptimized={true}
                        />

                        {/* Image overlay with additional info */}
                        <div className="flex justify-between items-center mt-3 text-muted-foreground text-xs">
                          <span>Segmented Analysis Result</span>
                          <span className="bg-background/80 px-2 py-1 border rounded">
                            AI Processed
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Health Advisory */}
              {prediction.has_tumor && (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Important:</strong> This analysis indicates the
                    presence of abnormal tissue. This is an AI-generated
                    analysis for informational purposes only. Please consult
                    with a qualified medical professional immediately for proper
                    evaluation, diagnosis, and treatment.
                  </p>
                </div>
              )}

              {!prediction.has_tumor && (
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Good news:</strong> No tumor was detected in this
                    analysis. However, this is an AI-generated analysis for
                    informational purposes only. Regular medical check-ups and
                    professional consultations are still recommended.
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
                  Analyzing brain scan for tumor detection...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
