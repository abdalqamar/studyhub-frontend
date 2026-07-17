import { Play, Upload, X } from "lucide-react";
import { useState, useRef } from "react";

type FileType = "image" | "video" | "pdf";

const ACCEPT_TYPES: Record<FileType, string> = {
  image: "image/*",
  video: "video/*",
  pdf: ".pdf",
};

const PLACEHOLDER_TEXT: Record<FileType, string> = {
  image: "Upload an image",
  video: "Upload video file",
  pdf: "Upload PDF file",
};

const HINT_TEXT: Record<FileType, string> = {
  image: "PNG, JPG, GIF up to 10MB",
  video: "MP4, MOV up to 100MB",
  pdf: "PDF up to 50MB",
};

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

interface UploadOverlayProps {
  progress: number;
}

type CurrentFile = File | string | null;

interface FileUploaderProps {
  type?: FileType;
  onFileChange: (file: File | null) => void;
  currentFile?: CurrentFile;
  className?: string;
  disabled?: boolean;
  uploadProgress?: number;
}

const ProgressRing = ({
  value,
  size = 64,
  strokeWidth = 5,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  );
};

const UploadOverlay = ({ progress }: UploadOverlayProps) => (
  <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2">
    <div className="relative flex items-center justify-center">
      <ProgressRing value={progress} />
      <span className="absolute font-mono text-xs text-white">
        {Math.round(progress)}%
      </span>
    </div>
    <span className="text-white/80 text-xs">
      {progress < 100 ? "Uploading…" : "Processing…"}
    </span>
  </div>
);

const FileUploader = ({
  type = "image",
  onFileChange,
  currentFile = null,
  className = "",
  disabled = false,
  uploadProgress,
}: FileUploaderProps) => {
  const isUploading = typeof uploadProgress === "number";
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (file: File | null): void => {
    if (file && !disabled) onFileChange(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return;
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  const handleRemove = (): void => {
    if (disabled) return;
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleContainerClick = (): void => {
    if (disabled || currentFile) return;
    inputRef.current?.click();
  };

  const handleVideoPreviewClick = (): void => {
    if (disabled || type !== "video" || !currentFile) return;
    setShowVideoModal(true);
  };

  const handleModalClose = (): void => {
    setShowVideoModal(false);
    videoRef.current?.pause();
  };

  const getFilePreview = (file: CurrentFile) =>
    file instanceof File ? URL.createObjectURL(file) : file || "";

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_TYPES[type] || ""}
        onChange={handleInputChange}
        disabled={disabled}
        className="hidden"
      />

      {currentFile ? (
        <div
          className={`border rounded-lg p-4 transition-opacity ${
            isUploading
              ? "border-teal/50 bg-teal-soft"
              : disabled
                ? "border-border-strong bg-surface-2 opacity-60"
                : "border-teal/50 bg-teal-soft"
          }`}
        >
          <div className="space-y-4">
            {type === "image" && (
              <div className="relative w-full aspect-video flex items-center justify-center bg-surface-2 rounded-lg overflow-hidden">
                <img
                  src={getFilePreview(currentFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {isUploading && <UploadOverlay progress={uploadProgress} />}
              </div>
            )}

            {type === "video" && (
              <div className="space-y-3">
                <div
                  className={`relative w-full aspect-video bg-surface-2 rounded-lg overflow-hidden group ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
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

                  {isUploading ? (
                    <UploadOverlay progress={uploadProgress} />
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-colors ${
                          !disabled && "group-hover:bg-black/20"
                        }`}
                      >
                        {!disabled && (
                          <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                            <Play className="text-white" size={24} />
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="text-white text-sm font-medium truncate">
                          {currentFile instanceof File
                            ? currentFile.name
                            : "Uploaded video"}
                        </div>
                        {!disabled && (
                          <div className="text-white/70 text-xs">
                            Click to preview
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {currentFile instanceof File && (
                  <div className="text-center text-text-2 text-xs font-mono">
                    {currentFile.name} ·{" "}
                    {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                )}
              </div>
            )}

            {type === "pdf" && currentFile instanceof File && (
              <div className="text-center py-2">
                <div className="text-teal font-medium truncate text-sm">
                  {currentFile.name}
                </div>
                <div className="text-text-3 text-xs font-mono mt-1">
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                aria-label="Remove file"
                className="flex items-center gap-1.5 bg-danger text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-danger/85 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-danger"
              >
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border border-dashed rounded-lg p-8 text-center transition-colors ${
            disabled
              ? "border-border-strong opacity-50 cursor-not-allowed"
              : dragActive
                ? "border-gold bg-gold-soft cursor-pointer"
                : "border-border-strong hover:border-gold/50 cursor-pointer"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleContainerClick}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-text-3" />
            <div className="text-text-2 font-medium text-sm">
              {PLACEHOLDER_TEXT[type] || "Upload file"}
            </div>
            <div className="text-text-3 text-xs">
              Drag & drop or click to upload
            </div>
            <div className="text-text-3 text-xs font-mono">
              {HINT_TEXT[type]}
            </div>
          </div>
        </div>
      )}

      {showVideoModal && currentFile && type === "video" && !disabled && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              aria-label="Close preview"
              className="absolute -top-12 right-0 text-white hover:text-text-2 z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <X size={18} />
            </button>

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

            {currentFile instanceof File && (
              <div className="mt-3 text-white text-center">
                <div className="font-medium text-sm">{currentFile.name}</div>
                <div className="text-xs text-text-3 font-mono">
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
