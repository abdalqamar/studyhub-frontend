import { FileText, Image, Play, Upload, Video } from "lucide-react";
import { useState, useRef } from "react";

const FileUploader = ({
  type = "image",
  onFileChange,
  currentFile = null,
  className = "",
  disabled,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) {
      onFileChange(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (!currentFile && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleVideoPreviewClick = () => {
    if (type === "video" && currentFile) {
      setShowVideoModal(true);
    }
  };

  const handleModalClose = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const getAcceptType = () => {
    const types = {
      image: "image/*",
      video: "video/*",
      pdf: ".pdf",
    };
    return types[type] || "";
  };

  const getPlaceholderText = () => {
    const texts = {
      image: "Upload an image",
      video: "Upload video file",
      pdf: "Upload PDF file",
    };
    return texts[type] || "Upload file";
  };

  const getFilePreview = (file) => {
    if (!file) return "";
    return file instanceof File ? URL.createObjectURL(file) : file;
  };

  return (
    <div className={className}>
      {/* File Input - Hidden */}
      <input
        ref={inputRef}
        type="file"
        accept={getAcceptType()}
        onChange={handleInputChange}
        className="hidden"
      />

      {currentFile ? (
        // Preview Mode
        <div className="border-2 border-green-500 bg-green-500/10 rounded-lg p-4 overflow-x-hidden">
          <div className="space-y-4">
            {/* Preview Content */}
            {type === "image" && (
              <div className="w-full aspect-video flex items-center justify-center bg-slate-800 rounded-lg">
                <img
                  src={getFilePreview(currentFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {type === "video" && (
              <div className="space-y-3">
                <div
                  className="relative w-full aspect-video bg-slate-800 rounded-lg cursor-pointer group overflow-hidden"
                  onClick={handleVideoPreviewClick}
                >
                  <video
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  >
                    <source
                      src={getFilePreview(currentFile)}
                      type={
                        currentFile instanceof File
                          ? currentFile.type
                          : "video/mp4"
                      }
                    />
                  </video>

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                      <div className="text-2xl text-white">
                        <Play />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white font-medium truncate">
                      {currentFile instanceof File
                        ? currentFile.name
                        : "Uploaded video"}
                    </div>
                    <div className="text-white/70 text-sm">
                      Click to preview video
                    </div>
                  </div>
                </div>

                {/* File size info (only for new uploads) */}
                {currentFile instanceof File && (
                  <div className="text-center text-slate-400 text-sm">
                    {currentFile.name} •{" "}
                    {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                )}
              </div>
            )}

            {type === "pdf" && (
              <div className="text-center py-4">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-green-400 font-medium truncate">
                  {currentFile.name}
                </div>
                <div className="text-slate-400 text-sm">
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            )}

            {/* Remove Button */}
            <div className="flex justify-center">
              <button
                disabled={disabled}
                type="button"
                onClick={handleRemove}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Upload Mode - Clickable Area
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-600 hover:border-slate-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleContainerClick}
        >
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />

            <div className="text-slate-300 font-medium">
              {getPlaceholderText()}
            </div>
            <div className="text-slate-400 text-sm">
              Drag & drop or click to upload
            </div>
            <div className="text-slate-500 text-xs">
              {type === "image" && "PNG, JPG, GIF up to 10MB"}
              {type === "video" && "MP4, MOV up to 100MB"}
              {type === "pdf" && "PDF up to 50MB"}
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {showVideoModal && currentFile && type === "video" && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Video Player Container with 16:9 Aspect Ratio */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full h-full"
                controlsList="nodownload"
              >
                <source
                  src={getFilePreview(currentFile)}
                  type={
                    currentFile instanceof File ? currentFile.type : "video/mp4"
                  }
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="mt-4 text-white text-center overflow-hidden">
              <div className="font-medium">{currentFile.name}</div>
              <div className="text-sm text-gray-400">
                {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
