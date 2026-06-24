import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { errorToast, successToast } from "../utils/toastUtils";

// for admin & istructors to get all courses with filters and pagination
export const fetchAllCourses = ({
  instructor,
  search,
  status,
  category,
  page,
  limit,
}) => {
  return useQuery({
    queryKey: ["Allcourses", instructor, search, status, category, page, limit],
    queryFn: () =>
      courseService.getAllCourses({
        instructor,
        search,
        status,
        category,
        page,
        limit,
      }),
    keepPreviousData: true,
  });
};

// Get all approved courses
export const useCourses = ({ search, category, page, limit }) => {
  return useQuery({
    queryKey: ["courses", search, category, page, limit],
    queryFn: () =>
      courseService.fetchAllApprovedCourses({ search, category, page, limit }),
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
      errorToast(error?.response?.data?.message || "Failed to approve course");
    },
  });
};

export const useRejectCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedback }) => courseService.rejectCourse(id, feedback),

    onSuccess: () => {
      successToast("Course rejected!");
      queryClient.invalidateQueries(["adminCourses"]);
    },

    onError: (error) => {
      errorToast(error?.response?.data?.message || "Failed to reject course");
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
      errorToast(error.response?.data?.message || "Failed to fetch course");
    },
  });
};

export const useCoursePreview = (id) => {
  return useQuery({
    queryKey: ["coursePreview", id],
    queryFn: () => courseService.getCoursePreview(id),
    enabled: !!id,
    onError: (error) => {
      errorToast("Failed to load course preview");
    },
  });
};

export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: ["courseDetails", id],
    queryFn: () => courseService.getCourseDetails(id),
    enabled: !!id,
    onError: (error) => {
      errorToast(
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
      successToast("Course created successfully!");
      queryClient.invalidateQueries(["InstructorCourses"]);
    },

    onError: (err) => {
      errorToast("Failed to create course", err?.response?.data?.message);
    },
  });
};

export const useCourseById = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseService.getCourseById(courseId),
    enabled: !!courseId,
    onError: (error) => {
      errorToast(error.message);
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
      successToast("Course deleted successfully!");
    },
    onError: (error) => {
      errorToast(error.response?.data?.message || "Failed to delete course");
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
      successToast("Successfully enrolled in course!");
    },
    onError: (error) => {
      errorToast(error.response?.data?.message || "Enrollment failed");
    },
  });
};

export const useCourseContent = (courseId) => {
  return useQuery({
    queryKey: ["course-content", courseId],
    queryFn: () => courseService.getCourseContent(courseId),

    enabled: !!courseId,

    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Failed to load course content"
      );
    },
  });
};

// Create lesson
export const useCreateSection = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionName }) =>
      courseService.createSection(courseId, { sectionName }),
    onMutate: async ({ sectionName }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);

      // Optimistic update
      queryClient.setQueryData(["course", courseId], (old) => ({
        ...old,
        courseContent: [
          ...(old?.courseContent || []),
          {
            _id: "temp-section-id", // temporary id
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

// Delete Section
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

// Update Section
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

// Create Lesson
export const useCreateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
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
      errorToast("Failed to create lesson");
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

      successToast("Lesson created succesfull");
    },

    //  refetch
    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

// Update Lesson
export const useUpdateLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, lessonId, formData }) =>
      courseService.updateLesson(courseId, sectionId, lessonId, formData),

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

// Delete Lessson
export const useDeleteLesson = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    // API call
    mutationFn: ({ sectionId, lessonId }) =>
      courseService.deleteLesson(courseId, sectionId, lessonId),

    // Optimistic update
    onMutate: async ({ sectionId, lessonId }) => {
      await queryClient.cancelQueries(["course", courseId]);

      const prevCourse = queryClient.getQueryData(["course", courseId]);
      if (!prevCourse) return { prevCourse: null };

      // Remove lesson from UI
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
      errorToast("Failed to delete lesson");
      if (ctx?.prevCourse) {
        queryClient.setQueryData(["course", courseId], ctx.prevCourse);
      }
    },

    // Success
    onSuccess: () => {
      successToast("Lesson deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["course", courseId]);
    },
  });
};

// Course review and rating
export const useCreateCourseReview = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rating, review }) =>
      courseService.createCourseReview(courseId, { rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      successToast("Review submitted successfully");
    },
    onError: (error) => {
      errorToast(error.response?.data?.message);
    },
  });
};
