"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Clipboard } from "lucide-react";
import { useState, useRef, type ChangeEvent, useEffect } from "react";
import Image from "next/image";

interface FileUploadProps {
  onUpload?: (file: File, base64: string) => Promise<void>;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
}

export function FileUploader({
  onUpload,
  accept = "image/*",
  maxSize = 5,
  className = "",
  disabled = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add clipboard paste event listener
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (disabled) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      // Reset states
      setError(null);
      setSuccess(false);

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (!file) continue;

          // Validate file size
          if (file.size > maxSize * 1024 * 1024) {
            setError(`File size must be less than ${maxSize}MB`);
            return;
          }

          setSelectedFile(file);

          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [disabled, maxSize]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setSuccess(false);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix to get just the base64 string
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const base64 = await convertToBase64(selectedFile);

      // Create FormData
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("base64", base64);
      formData.append("fileName", selectedFile.name);
      formData.append("fileType", selectedFile.type);
      formData.append("fileSize", selectedFile.size.toString());

      // Call the upload handler if provided
      if (onUpload) {
        await onUpload(selectedFile, base64);
      } else {
        // Default upload simulation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="space-y-4">
        <Label htmlFor="file-upload" className="font-medium text-sm">
          Upload Image
        </Label>

        {!selectedFile ? (
          <Card
            className="border-2 border-muted-foreground/25 hover:border-muted-foreground/50 border-dashed transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="flex flex-col justify-center items-center p-6 text-center">
              <Upload className="mb-4 w-10 h-10 text-muted-foreground" />
              <p className="mb-2 text-muted-foreground text-sm">
                Click to upload or drag and drop
              </p>
              <p className="text-muted-foreground text-xs">
                PNG, JPG, GIF up to {maxSize}MB
              </p>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Clipboard className="w-3 h-3 mr-1" />
                <span>You can also paste from clipboard (Ctrl+V)</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {preview && (
                  <div className="flex-shrink-0">
                    <Image
                      width={500}
                      height={500}
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="rounded-md w-16 h-16 object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {success && (
                    <p className="mt-1 text-green-600 text-xs">
                      ✓ Upload successful
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {selectedFile && !success && (
          <Button
            onClick={handleUpload}
            disabled={isUploading || disabled}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 w-4 h-4" />
                Upload File
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
