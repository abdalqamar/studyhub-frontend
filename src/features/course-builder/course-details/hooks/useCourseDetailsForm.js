import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { courseDetailsSchema } from "../../schemas/courseDetailsSchema";
import { useUpdateCourse } from "./useUpdateCourse";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  price: 0,
  category: "",
  tags: [],
  whatYouWillLearn: ["", "", ""],
  requirements: "",
  instructions: "",
};

const toTextareaValue = (value) => {
  if (Array.isArray(value)) return value.join("\n");
  return value || "";
};

export const useCourseDetailsForm = ({
  course,
  isEditMode,
  createCourse,
  onCreated,
  onNext,
}) => {
  const updateCourse = useUpdateCourse(course?._id);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState("");

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(courseDetailsSchema),
    mode: "onTouched",
  });
  const {
    reset,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    if (isEditMode && course) {
      reset({
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || 0,
        category: course?.category?._id || course?.category || "",
        tags: course?.tags || [],
        whatYouWillLearn:
          course?.whatYouWillLearn?.length > 0
            ? course.whatYouWillLearn
            : ["", "", ""],
        requirements: toTextareaValue(course?.requirements),
        instructions: toTextareaValue(course?.instructions),
      });
      setThumbnail(course.thumbnail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      reset(DEFAULT_VALUES);
      setThumbnail(null);
      setThumbnailError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  const validateThumbnail = () => {
    if (!thumbnail && !(isEditMode && course?.thumbnail)) {
      setThumbnailError("Thumbnail is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (isEditMode && !isDirty && !(thumbnail instanceof File)) {
      onNext();
      return;
    }
    if (!validateThumbnail()) {
      errorToast("Please upload a thumbnail");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (data.requirements?.trim())
      formData.append("requirements", data.requirements.trim());
    if (data.instructions?.trim())
      formData.append("instructions", data.instructions.trim());
    data.tags?.forEach((tag) => formData.append("tags", tag));
    data.whatYouWillLearn
      ?.filter((item) => item.trim())
      .forEach((item) => formData.append("whatYouWillLearn", item));
    if (thumbnail instanceof File)
      formData.append("courseThumbnail", thumbnail);

    try {
      if (!isEditMode) {
        const response = await createCourse.mutateAsync(formData);
        const createdId = response?._id;
        if (!createdId) {
          errorToast("Something went wrong, no course ID returned");
          return;
        }
        onCreated(createdId);
        onNext();
        return;
      }
      await updateCourse.mutateAsync(formData);
      successToast("Course updated successfully!");
      onNext();
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to save course");
    }
  };

  return {
    ...form,
    thumbnail,
    thumbnailError,
    setThumbnail,
    setThumbnailError,
    isEditMode,
    isPending: updateCourse.isPending || createCourse.isPending,
    onSubmit,
  };
};
