import FileUploader from "@/shared/components/FileUploader";

const CourseThumbnailField = ({ thumbnail, thumbnailError, onChange, isEditMode }) => (
  <div>
    <label className="block mb-2 font-medium text-text-2 text-sm">Course thumbnail *</label>
    <FileUploader
      type="image"
      currentFile={thumbnail}
      onFileChange={onChange}
      required={!isEditMode}
    />
    {thumbnailError && <p className="text-danger text-sm mt-1">{thumbnailError}</p>}
  </div>
);

export default CourseThumbnailField;
