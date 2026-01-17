import { Upload } from "lucide-react";

interface UploadAreaProps {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadArea({ onSelectFile }: UploadAreaProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <label className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/50">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="hidden"
        />
        <Upload
          className="w-16 h-16 mx-auto mb-4 text-gray-400"
          strokeWidth={1.5}
        />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Envie sua imagem
        </p>
        <p className="text-sm text-gray-500">
          ou arraste e solte um arquivo aqui
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Suportamos: PNG, JPG, GIF, WebP
        </p>
      </label>
    </div>
  );
}
