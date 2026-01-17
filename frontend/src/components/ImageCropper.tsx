import { useState, useRef, useEffect } from "react";
import { useCrop, ASPECT_RATIOS } from "../hooks/useCrop";
import { Layout } from "./layout/Layout";
import {
  UploadArea,
  FileInfoBar,
  ControlPanel,
  CropArea,
  PreviewResult,
} from "./cropper";

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

  const [selectedAspect, setSelectedAspect] = useState<AspectRatioKey>("Livre");
  const [widthInput, setWidthInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [showGifSettings, setShowGifSettings] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const canGenerate = completedCrop && !isProcessing;

  // Auto scroll to preview when it appears
  useEffect(() => {
    if (preview && previewRef.current) {
      previewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [preview]);

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

  return (
    <Layout>
      {!imageSrc ? (
        <UploadArea onSelectFile={onSelectFile} />
      ) : (
        <div className="space-y-4">
          <FileInfoBar
            isGif={isGif}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            originalSizeFormatted={originalSizeFormatted}
            onClear={clearImage}
          />

          <ControlPanel
            selectedAspect={selectedAspect}
            onAspectChange={handleAspectChange}
            widthInput={widthInput}
            heightInput={heightInput}
            onWidthChange={handleWidthChange}
            onHeightChange={handleHeightChange}
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            isGif={isGif}
            gifSettings={gifSettings}
            setGifSettings={setGifSettings}
            showGifSettings={showGifSettings}
            setShowGifSettings={setShowGifSettings}
          />

          <CropArea
            imageSrc={imageSrc}
            imgRef={imgRef}
            crop={crop}
            setCrop={setCrop}
            completedCrop={completedCrop}
            setCompletedCrop={setCompletedCrop}
            aspectRatio={aspectRatio}
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            isProcessing={isProcessing}
            processingProgress={processingProgress}
            canGenerate={!!canGenerate}
            onGeneratePreview={generatePreview}
          />

          {preview && (
            <PreviewResult
              ref={previewRef}
              preview={preview}
              originalSize={originalSize}
              originalSizeFormatted={originalSizeFormatted}
              onDownload={downloadResult}
            />
          )}
        </div>
      )}
    </Layout>
  );
}
