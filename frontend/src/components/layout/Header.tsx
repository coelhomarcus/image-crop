import { Crop } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-gray-800">
          <Crop className="inline-block w-5 h-5 mr-2 text-blue-600" />
          Recortar Imagem / GIF
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Recorte suas imagens e GIFs de forma rápida e simples.
        </p>
      </div>
    </header>
  );
}
