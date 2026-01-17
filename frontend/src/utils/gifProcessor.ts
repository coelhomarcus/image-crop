import type { PixelCrop } from "react-image-crop";
import type { CropResult } from "./imageProcessor";

export interface GifProcessingOptions {
  onProgress?: (progress: number) => void;
  colors?: number; // default 256
  skipFrames?: number;
}

const API_URL = import.meta.env.VITE_API_URL || "";

export async function cropGif(
  image: HTMLImageElement,
  crop: PixelCrop,
  file: File,
  options: GifProcessingOptions = {},
): Promise<CropResult> {
  const { onProgress, colors = 256 } = options;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const cropX = Math.round(crop.x * scaleX);
  const cropY = Math.round(crop.y * scaleY);
  const cropWidth = Math.round(crop.width * scaleX);
  const cropHeight = Math.round(crop.height * scaleY);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("x", cropX.toString());
  formData.append("y", cropY.toString());
  formData.append("width", cropWidth.toString());
  formData.append("height", cropHeight.toString());
  formData.append("colors", colors.toString());

  onProgress?.(0.1);

  const response = await fetch(`${API_URL}/api/gif/crop`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(error.message || error.error || "Failed to process GIF");
  }

  onProgress?.(0.9);

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  onProgress?.(1);

  return { blob, url };
}

export function isGifFile(file: File): boolean {
  return file.type === "image/gif";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
