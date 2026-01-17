import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import toast from "react-hot-toast";
import { successToast } from "../utils/toastUtils";

export const fetchAllCourses = (params) => {
  return useQuery({
    queryKey: [
      "Allcourses",
      params.instructor,
      params.search,
      params.status,
      params.category,
      params.page,
      params.limit,
    ],
    queryFn: () => courseService.getAllCourses(params),
    keepPreviousData: true,
  });
};

// Get all approved courses
export const useCourses = (params) => {
  return useQuery({
    queryKey: [
      "courses",
      params.search,
      params.category,
      params.page,
      params.limit,
    ],
    queryFn: () => courseService.fetchAllApprovedCourses(params),
    keepPreviousData: true,
  });
};

// Approve course
export const useApproveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => courseService.approveCourse(id),
    onSuccess: () => {
      successToast("Course approved!");
      queryClient.invalidateQueries(["adminCourses"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to approve course");
    },
  });
};

export const useRejectCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedback }) => courseService.rejectCourse(id, feedback),

    onSuccess: () => {
      toast.success("Course rejected!");
      queryClient.invalidateQueries(["adminCourses"]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to reject course");
    },
  });
};

// Get single course By id with details for authenticated users
export const useCourse = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch course");
    },
  });
};

export const useCoursePreview = (id) => {
  return useQuery({
    queryKey: ["coursePreview", id],
    queryFn: () => courseService.getCoursePreview(id),
    enabled: !!id,
    onError: (error) => {
      toast.error("Failed to load course preview");
    },
  });
};

export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: ["courseDetails", id],
    queryFn: () => courseService.getCourseDetails(id),
    enabled: !!id,
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to fetch course details"
      );
    },
  });
};

//FOR INSTRUCTOR
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData) => courseService.createCourse(courseData),

    onSuccess: (createdCourse) => {
      queryClient.setQueryData(["course", createdCourse._id], createdCourse);

      toast.success("Course created successfully!");

      // Instructor courses invalidate
      queryClient.invalidateQueries(["InstructorCourses"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create course");
    },
  });
};

export const useCourseById = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseService.getCourseById(courseId),
    enabled: !!courseId,
    onError: (error) => {
      console.log(error);
    },
  });
};

// Update course
export const useUpdateCourse = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData) =>
      courseService.updateCourse(courseId, courseData),

    onSuccess: (updatedCourse) => {
      queryClient.setQueryData(["course", courseId], updatedCourse);

      queryClient.invalidateQueries(["InstructorCourses"]);
    },

    onError: () => {},
  });
};

// Delete course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => courseService.deleteCourse(id),
    onSuccess: () => {
      ["courses", "adminCourses", "instructorCourses"].forEach((key) =>
        queryClient.invalidateQueries([key])
      );
      toast.success("Course deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
};

// Enroll in course
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => courseService.enrollInCourse(courseId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Successfully enrolled in course!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Enrollment failed");
    },
  });
};

export const useCourseContent = (courseId) => {
  return useQuery({
    queryKey: ["course-content", courseId],
    queryFn: () => courseService.getCourseContent(courseId),

    enabled: !!courseId,

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to load course content"
      );
    },
  });
};
// Update lesson progress
export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lessonId, progress }) =>
      courseService.updateLessonProgress(courseId, lessonId, progress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", variables.courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["enrolledCourses"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update progress");
    },
  });
};

// Search courses
export const useSearchCourses = (query) => {
  return useQuery({
    queryKey: ["courses", "search", query],
    queryFn: () => courseService.searchCourses(query),
    enabled: !!query && query.length > 2, // Only search if query > 2 chars
    onError: (error) => {
      toast.error("Search failed");
    },
  });
};

export const useCreateSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionName }) =>
      courseService.createSection(courseId, { sectionName }),
    onMutate: async ({ sectionName }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      // UI me new section instantly dikhega
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: [
          ...(old?.courseContent || []),
          {
            _id: "temp-section-id", // temporary
            sectionName,
            lesson: [],
          },
        ],
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      queryClient.setQueryData(["course", courseId], ctx.prevCourse);
    },

    onSuccess: (newSection) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === "temp-section-id" ? newSection : sec
        ),
      }));
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

export const useDeleteSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId }) =>
      courseService.deleteSection(courseId, sectionId),

    onMutate: async ({ sectionId }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      // If no previous course in cache, skip optimistic update
      if (!prevCourse) {
        return { prevCourse: null };
      }

      // Optimistic delete
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.filter((sec) => sec._id !== sectionId),
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      // Rollback full course if available
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

export const useUpdateSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, sectionName }) =>
      courseService.updateSection(courseId, sectionId, { sectionName }),

    onMutate: async ({ sectionId, sectionName }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      if (!prevCourse) return { prevCourse: null };

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId ? { ...sec, sectionName } : sec
        ),
      }));

      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

export const useCreateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Correct API call
    mutationFn: ({ sectionId, formData }) =>
      courseService.createLesson(courseId, sectionId, formData),

    // Optimistic Update
    onMutate: async ({ sectionId, formData }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);
      if (!prevCourse) return { prevCourse: null };

      const tempLesson = {
        _id: "temp-lesson-id",
        title: formData.get("title"),
        description: formData.get("description"),
        videoUrl: null,
      };

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: [...(sec.lesson || []), tempLesson],
              }
            : sec
        ),
      }));

      return { prevCourse };
    },

    // Rollback on error
    onError: (err, vars, ctx) => {
      toast.error("Failed to create lesson");
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    onSuccess: (newLesson, { sectionId }) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((ls) =>
                  ls._id === "temp-lesson-id" ? newLesson : ls
                ),
              }
            : sec
        ),
      }));

      toast.success("Lesson created");
    },

    // Always refetch
    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

export const useUpdateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, lessonId, formData }) =>
      courseService.updateLesson(sectionId, lessonId, formData),

    onMutate: async ({ sectionId, lessonId, formData }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      const newTitle = formData.get("title");
      const newDesc = formData.get("description");

      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((l) =>
                  l._id === lessonId
                    ? { ...l, title: newTitle, description: newDesc }
                    : l
                ),
              }
            : sec
        ),
      }));

      return { prevCourse };
    },

    onError: (error, vars, prevCourse) => {
      if (prevCourse) {
        queryClient.setQueryData(["course", courseId], prevCourse);
      }
    },

    onSuccess: ({ updatedLesson, sectionId }) => {
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.map((l) =>
                  l._id === updatedLesson._id ? updatedLesson : l
                ),
              }
            : sec
        ),
      }));
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

export const useDeleteLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    // API call
    mutationFn: ({ sectionId, lessonId }) =>
      courseService.deleteLesson(sectionId, lessonId),

    // Optimistic update
    onMutate: async ({ sectionId, lessonId }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);
      if (!prevCourse) return { prevCourse: null };

      // Remove lesson from UI instantly
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: old.courseContent.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                lesson: sec.lesson.filter((ls) => ls._id !== lessonId),
              }
            : sec
        ),
      }));

      return { prevCourse };
    },

    // Rollback on error
    onError: (err, vars, ctx) => {
      toast.error("Failed to delete lesson");
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    // Success
    onSuccess: () => {
      toast.success("Lesson deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};
