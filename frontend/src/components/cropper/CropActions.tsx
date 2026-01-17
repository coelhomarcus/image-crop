import { Crop, Loader2 } from "lucide-react";

interface CropActionsProps {
  onCrop: () => void;
  isProcessing: boolean;
  processingProgress: number;
  canGenerate: boolean;
}

export function CropActions({
  onCrop,
  isProcessing,
  processingProgress,
  canGenerate,
}: CropActionsProps) {
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <button
          onClick={onCrop}
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
              <Crop className="w-4 h-4" />
              Recortar Imagem
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
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
  );
}
