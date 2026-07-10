import FileUploader from "@/shared/components/FileUploader";

// Progress now renders as an overlay on the video preview itself
// (inside FileUploader) rather than a separate box below it.
const LessonVideoUpload = ({ videoFile, onChange, isUploading, uploadProgress }) => (
  <div>
    <label className="block text-sm font-medium text-text-2 mb-2">Video file *</label>
    <FileUploader
      type="video"
      currentFile={videoFile}
      onFileChange={onChange}
      disabled={isUploading}
      uploadProgress={isUploading ? uploadProgress : undefined}
    />
  </div>
);

export default LessonVideoUpload;
