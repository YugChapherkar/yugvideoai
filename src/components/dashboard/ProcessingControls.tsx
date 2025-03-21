import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Download, Share2, Cloud, Play, Settings, Layers } from "lucide-react";

interface ProcessingControlsProps {
  onProcess?: () => void;
  onBatchProcess?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onSaveToCloud?: () => void;
  isProcessing?: boolean;
  isVideoUploaded?: boolean;
}

const ProcessingControls = ({
  onProcess = () => {},
  onBatchProcess = () => {},
  onDownload = () => {},
  onShare = () => {},
  onSaveToCloud = () => {},
  isProcessing = false,
  isVideoUploaded = true,
}: ProcessingControlsProps) => {
  const [processingProgress, setProcessingProgress] = useState(0);

  // Simulate processing progress when the process button is clicked
  const handleProcess = () => {
    onProcess();
    if (!isProcessing) {
      setProcessingProgress(0);
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col space-y-4">
        {/* Main processing controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleProcess}
                    disabled={!isVideoUploaded || isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    size="lg"
                  >
                    <Play size={16} />
                    {isProcessing ? "Processing..." : "Process Video"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Process the video with current settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onBatchProcess}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={!isVideoUploaded || isProcessing}
                  >
                    <Layers size={16} />
                    Batch Process
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Process multiple videos at once</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={!isVideoUploaded || isProcessing}
                  >
                    <Settings size={16} />
                    Advanced Settings
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure advanced processing options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onDownload}
                    variant="secondary"
                    className="flex items-center gap-2"
                    disabled={processingProgress < 100}
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download processed video</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onShare}
                    variant="secondary"
                    className="flex items-center gap-2"
                    disabled={processingProgress < 100}
                  >
                    <Share2 size={16} />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share processed video</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onSaveToCloud}
                    variant="secondary"
                    className="flex items-center gap-2"
                    disabled={processingProgress < 100}
                  >
                    <Cloud size={16} />
                    Save to Cloud
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save to cloud storage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Processing progress bar */}
        {isProcessing || processingProgress > 0 ? (
          <div className="w-full mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Processing video...</span>
              <span>{processingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {processingProgress < 100
                ? "AI is optimizing your video for selected platforms..."
                : "Processing complete! Your video is ready."}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProcessingControls;
