import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema } from "../../../schemas/lessonSchema";
import { errorToast } from "@/shared/utils/toastUtils";
import { useCreateLesson } from "./useCreateLesson";
import { useUpdateLesson } from "./useUpdateLesson";

export const useLessonForm = ({ sectionId, courseId, isEditing, editingLesson, onCancel }) => {
  const [lessonVideoFile, setLessonVideoFile] = useState(
    isEditing ? editingLesson?.videoUrl : null
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  const createLessonMutation = useCreateLesson(courseId);
  const updateLessonMutation = useUpdateLesson(courseId);
  const isUploading = createLessonMutation.isPending || updateLessonMutation.isPending;

  const form = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: isEditing
      ? { title: editingLesson?.title || "", description: editingLesson?.description || "" }
      : { title: "", description: "" },
  });

  const handleSaveLesson = async (data) => {
    if (!lessonVideoFile) {
      errorToast("Please upload a lesson video file");
      return;
    }

    setUploadProgress(0);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (lessonVideoFile instanceof File) formData.append("videoFile", lessonVideoFile);

    try {
      if (isEditing) {
        await updateLessonMutation.mutateAsync({
          sectionId,
          lessonId: editingLesson._id,
          formData,
          onUploadProgress: setUploadProgress,
        });
      } else {
        await createLessonMutation.mutateAsync({ sectionId, formData, onUploadProgress: setUploadProgress });
      }
      setUploadProgress(100);
      setTimeout(() => {
        setUploadProgress(0);
        onCancel();
      }, 500);
    } catch {
      setUploadProgress(0);
      // error toast already shown by the mutation hook
    }
  };

  return {
    ...form,
    lessonVideoFile,
    setLessonVideoFile,
    uploadProgress,
    isUploading,
    handleSaveLesson,
  };
};
