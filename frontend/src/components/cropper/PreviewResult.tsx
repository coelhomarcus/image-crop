import { forwardRef } from "react";
import { Download, FileImage, FileDown } from "lucide-react";

interface PreviewData {
  url: string;
  size: number;
  sizeFormatted: string;
}

interface PreviewResultProps {
  preview: PreviewData;
  originalSize: number;
  originalSizeFormatted: string;
  onDownload: () => void;
}

export const PreviewResult = forwardRef<HTMLDivElement, PreviewResultProps>(
  ({ preview, originalSize, originalSizeFormatted, onDownload }, ref) => {
    const compressionRatio =
      originalSize > 0
        ? ((1 - preview.size / originalSize) * 100).toFixed(1)
        : null;

    return (
      <div
        ref={ref}
        className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Recortado com sucesso!</h3>
            {compressionRatio && (
              <p
                className={`text-sm ${
                  parseFloat(compressionRatio) > 0
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {parseFloat(compressionRatio) > 0
                  ? "Redução de"
                  : "Aumento de"}{" "}
                {Math.abs(parseFloat(compressionRatio))}% no tamanho
              </p>
            )}
          </div>
        </div>

        {/* Preview Content */}
        <div>
          <div className="flex flex-col items-center gap-6">
            {/* Preview Image */}
            <div>
              <div className="bg-gray-100 rounded-lg p-2">
                <img
                  src={preview.url}
                  alt="Preview"
                  className="max-w-[280px] max-h-[280px] rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <FileImage className="w-4 h-4 text-gray-500" />
                <div className="text-sm">
                  <span className="text-gray-500">Original:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {originalSizeFormatted}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                <FileDown className="w-4 h-4 text-green-600" />
                <div className="text-sm">
                  <span className="text-green-600">Novo:</span>{" "}
                  <span className="font-semibold text-green-700">
                    {preview.sizeFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={onDownload}
              className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-green-600 text-white rounded-lg transition-all hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Baixar Imagem
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PreviewResult.displayName = "PreviewResult";
