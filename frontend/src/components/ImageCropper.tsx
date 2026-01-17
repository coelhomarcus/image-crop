import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useState } from "react";
import { useCrop, ASPECT_RATIOS } from "../hooks/useCrop";
import { Upload, Download, Crop, X, Loader2, Settings } from "lucide-react";

type AspectRatioKey = keyof typeof ASPECT_RATIOS;

export function ImageCropper() {
  const {
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    imageSrc,
    isGif,
    isProcessing,
    processingProgress,
    imgRef,
    onSelectFile,
    generatePreview,
    downloadResult,
    clearImage,
    fileName,
    cropWidth,
    cropHeight,
    setCropDimensions,
    aspectRatio,
    setAspectRatioAndUpdate,
    imageWidth,
    imageHeight,
    gifSettings,
    setGifSettings,
    preview,
    originalSize,
    originalSizeFormatted,
  } = useCrop();

  const [customFileName, setCustomFileName] = useState("");
  const [selectedAspect, setSelectedAspect] = useState<AspectRatioKey>("free");
  const [widthInput, setWidthInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [showGifSettings, setShowGifSettings] = useState(false);

  const canGenerate = completedCrop && !isProcessing;

  const handleAspectChange = (key: AspectRatioKey) => {
    setSelectedAspect(key);
    setAspectRatioAndUpdate(ASPECT_RATIOS[key]);
  };

  const handleWidthChange = (value: string) => {
    setWidthInput(value);
    const width = parseInt(value, 10);
    if (!isNaN(width) && width > 0) {
      if (aspectRatio) {
        setCropDimensions(width, Math.round(width / aspectRatio));
      } else {
        setCropDimensions(width, cropHeight || 100);
      }
    }
  };

  const handleHeightChange = (value: string) => {
    setHeightInput(value);
    const height = parseInt(value, 10);
    if (!isNaN(height) && height > 0) {
      if (aspectRatio) {
        setCropDimensions(Math.round(height * aspectRatio), height);
      } else {
        setCropDimensions(cropWidth || 100, height);
      }
    }
  };

  const compressionRatio = preview && originalSize > 0 
    ? ((1 - preview.size / originalSize) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
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

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Upload Section */}
        {!imageSrc ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/50">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" strokeWidth={1.5} />
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
        ) : (
          <div className="space-y-4">
            {/* File Info Bar */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isGif 
                    ? "bg-purple-100 text-purple-700" 
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {isGif ? "GIF" : "Image"}
                </span>
                <span className="text-sm text-gray-600">
                  {imageWidth} × {imageHeight} px
                </span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">{originalSizeFormatted}</span>
              </div>
              <button
                onClick={clearImage}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Aspect Ratio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aspect Ratio
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(ASPECT_RATIOS) as AspectRatioKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleAspectChange(key)}
                        className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
                          selectedAspect === key
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Manual Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho do recorte (pixels)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Width"
                        value={widthInput || (cropWidth > 0 ? Math.round(cropWidth) : "")}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-400 font-bold">×</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Height"
                        value={heightInput || (cropHeight > 0 ? Math.round(cropHeight) : "")}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GIF Settings */}
              {isGif && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowGifSettings(!showGifSettings)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações do GIF
                    <span className="text-xs text-gray-400">
                      {showGifSettings ? "▲" : "▼"}
                    </span>
                  </button>
                  
                  {showGifSettings && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Cores: {gifSettings.colors}
                        </label>
                        <input
                          type="range"
                          min="16"
                          max="256"
                          step="16"
                          value={gifSettings.colors}
                          onChange={(e) => setGifSettings({ ...gifSettings, colors: parseInt(e.target.value) })}
                          className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>16 (pequeno)</span>
                          <span>256 (qualidade)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

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
                    className="max-w-full max-h-[500px]"
                  />
                </ReactCrop>
              </div>
              
              {/* Crop info */}
              {completedCrop && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Tamanho da seleção: {Math.round(cropWidth)} × {Math.round(cropHeight)} px
                </p>
              )}
            </div>

            {/* File Name & Actions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                {/* File name input */}
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do arquivo de saída
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder={fileName || "cropped"}
                      value={customFileName}
                      onChange={(e) => setCustomFileName(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md">
                      .{isGif ? "gif" : "jpg"}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={generatePreview}
                    disabled={!canGenerate}
                    className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-md transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* Preview Result */}
            {preview && (
              <div className="bg-white rounded-lg border border-green-200 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 font-medium">Recortado com sucesso!</span>
                  {compressionRatio && (
                    <span className={`text-sm ${
                      parseFloat(compressionRatio) > 0 
                        ? "text-green-600" 
                        : "text-orange-600"
                    }`}>
                      ({parseFloat(compressionRatio) > 0 ? "−" : "+"}{Math.abs(parseFloat(compressionRatio))}% size)
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Preview image */}
                  <div className="bg-gray-100 rounded-lg p-3 flex-shrink-0">
                    <img
                      src={preview.url}
                      alt="Preview"
                      className="max-w-[200px] max-h-[200px] rounded"
                    />
                  </div>

                  {/* Info & Download */}
                  <div className="flex-1 space-y-3">
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">
                        <span className="font-medium">Tamanho Agora:</span> {preview.sizeFormatted}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tamanho Original:</span> {originalSizeFormatted}
                      </p>
                    </div>
                    
                    <button
                      onClick={downloadResult}
                      className="px-6 py-2.5 text-sm font-medium bg-green-600 text-white rounded-md transition-colors hover:bg-green-700 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Baixar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-sm text-gray-400 border-t border-gray-200">
        by <a className="underline text-blue-400 hover:text-blue-600"  href="https://marcuscoelho.com" target="_blank" rel="noopener noreferrer">@coelhomarcus</a>
      </footer>
    </div>
  );
}
