import { Settings } from "lucide-react";
import { ASPECT_RATIOS } from "../../hooks/useCrop";
import type { GifSettings } from "../../hooks/useCrop";

type AspectRatioKey = keyof typeof ASPECT_RATIOS;

interface ControlPanelProps {
  selectedAspect: AspectRatioKey;
  onAspectChange: (key: AspectRatioKey) => void;
  widthInput: string;
  heightInput: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  cropWidth: number;
  cropHeight: number;
  isGif: boolean;
  gifSettings: GifSettings;
  setGifSettings: (settings: GifSettings) => void;
  showGifSettings: boolean;
  setShowGifSettings: (show: boolean) => void;
}

export function ControlPanel({
  selectedAspect,
  onAspectChange,
  widthInput,
  heightInput,
  onWidthChange,
  onHeightChange,
  cropWidth,
  cropHeight,
  isGif,
  gifSettings,
  setGifSettings,
  showGifSettings,
  setShowGifSettings,
}: ControlPanelProps) {
  return (
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
                onClick={() => onAspectChange(key)}
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
                value={
                  widthInput || (cropWidth > 0 ? Math.round(cropWidth) : "")
                }
                onChange={(e) => onWidthChange(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <span className="text-gray-400 font-bold">×</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Height"
                value={
                  heightInput || (cropHeight > 0 ? Math.round(cropHeight) : "")
                }
                onChange={(e) => onHeightChange(e.target.value)}
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
                  onChange={(e) =>
                    setGifSettings({
                      ...gifSettings,
                      colors: parseInt(e.target.value),
                    })
                  }
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
  );
}
