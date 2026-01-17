import { X } from "lucide-react";

interface FileInfoBarProps {
  isGif: boolean;
  imageWidth: number;
  imageHeight: number;
  originalSizeFormatted: string;
  onClear: () => void;
}

export function FileInfoBar({
  isGif,
  imageWidth,
  imageHeight,
  originalSizeFormatted,
  onClear,
}: FileInfoBarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            isGif
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isGif ? "GIF" : "Image"}
        </span>
        <span className="text-sm text-gray-600">
          {imageWidth} × {imageHeight} px
        </span>
        <span className="text-sm text-gray-400">|</span>
        <span className="text-sm text-gray-600">{originalSizeFormatted}</span>
      </div>
      <button
        onClick={onClear}
        className="text-gray-400 hover:text-red-500 transition-colors"
        title="Remove image"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
