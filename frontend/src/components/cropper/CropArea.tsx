import ReactCrop from "react-image-crop";
import type { Crop } from "react-image-crop";
import type { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Crop as CropIcon, Loader2 } from "lucide-react";
import type { RefObject } from "react";

interface CropAreaProps {
  imageSrc: string;
  imgRef: RefObject<HTMLImageElement | null>;
  crop: Crop | undefined;
  setCrop: (crop: Crop) => void;
  completedCrop: PixelCrop | undefined;
  setCompletedCrop: (crop: PixelCrop) => void;
  aspectRatio: number | undefined;
  cropWidth: number;
  cropHeight: number;
  isProcessing: boolean;
  processingProgress: number;
  canGenerate: boolean;
  onGeneratePreview: () => void;
}

export function CropArea({
  imageSrc,
  imgRef,
  crop,
  setCrop,
  completedCrop,
  setCompletedCrop,
  aspectRatio,
  cropWidth,
  cropHeight,
  isProcessing,
  processingProgress,
  canGenerate,
  onGeneratePreview,
}: CropAreaProps) {
  return (
    <>
      {/* Crop Area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center min-h-[300px]">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Image to crop"
              className="max-w-full"
              style={{ minHeight: "20vh", maxHeight: "70vh" }}
            />
          </ReactCrop>
        </div>

        {/* Crop info */}
        {completedCrop && (
          <p className="text-center text-sm text-gray-500 mt-3">
            Tamanho da seleção: {Math.round(cropWidth)} ×{" "}
            {Math.round(cropHeight)} px
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex justify-center">
          <button
            onClick={onGeneratePreview}
            disabled={!canGenerate}
            className="px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {Math.round(processingProgress * 100)}%
              </>
            ) : (
              <>
                <CropIcon className="w-4 h-4" />
                Recortar Imagem
              </>
            )}
          </button>
        </div>

        {/* Progress */}
        {isProcessing && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-150"
                style={{ width: `${processingProgress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
