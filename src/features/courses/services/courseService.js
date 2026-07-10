import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const courseService = {
  //  PUBLIC

  // GET /courses — sab approved courses
  getCourses: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSES, { params });
    return data;
  },

  // GET /courses/manage   for admin/instructor
  getManageCourses: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSES_MANAGE, {
      params,
    });
    return data;
  },

  // GET /courses/:id — public detail page
  getCourseDetails: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE(id));
    return data.course;
  },

  // GET /courses/:id/preview — admin/instructor preview
  getCoursePreview: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_PREVIEW(id));
    return data.course;
  },

  // GET /courses/edit/:id — instructor edit
  getCourseById: async (courseId) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.COURSE_EDIT(courseId)
    );
    return data.course;
  },

  // GET /courses/:id/content — enrolled student
  getCourseContent: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_CONTENT(id));
    return data.course;
  },

  //  CRUD ──

  createCourse: async (courseData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.COURSE_CREATE,
      courseData
    );
    return data.course;
  },

  updateCourse: async (courseId, courseData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.COURSE_UPDATE(courseId),
      courseData
    );
    return data.course;
  },

  deleteCourse: async (courseId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.COURSE_DELETE(courseId)
    );
    return data;
  },

  //  ENROLLMENT

  enrollCourse: async (courseId) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.COURSE_ENROLL(courseId)
    );
    return data;
  },

  //  ADMIN ACTIONS

  approveCourse: async (id) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_COURSE_APPROVE(id)
    );
    return data.course;
  },

  rejectCourse: async (courseId, feedback) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_COURSE_REJECT(courseId),
      { feedback }
    );
    return data.course;
  },

  //  SECTIONS

  createSection: async (courseId, sectionData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.SECTION_CREATE(courseId),
      sectionData
    );
    return data;
  },

  updateSection: async (courseId, sectionId, sectionData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.SECTION_UPDATE(courseId, sectionId),
      sectionData
    );
    return data.updatedSection;
  },

  deleteSection: async (courseId, sectionId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.SECTION_DELETE(courseId, sectionId)
    );
    return data.sectionId;
  },

  //  LESSONS

  createLesson: async (courseId, sectionId, lessonData, onUploadProgress) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.LESSON_CREATE(courseId, sectionId),
      lessonData,
      {
        timeout: 120000,
        onUploadProgress: (e) => {
          if (!onUploadProgress || !e.total) return;
          onUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      }
    );
    return data.lesson;
  },

  updateLesson: async (
    courseId,
    sectionId,
    lessonId,
    lessonData,
    onUploadProgress
  ) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.LESSON_UPDATE(courseId, sectionId, lessonId),
      lessonData,
      {
        timeout: 120000,
        onUploadProgress: (e) => {
          if (!onUploadProgress || !e.total) return;
          onUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      }
    );
    return data.updatedLesson;
  },

  deleteLesson: async (courseId, sectionId, lessonId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.LESSON_DELETE(courseId, sectionId, lessonId)
    );
    console.log(data);
    return data.lessonId;
  },

  //  REVIEWS

  createReview: async (courseId, reviewData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.REVIEW_CREATE(courseId),
      reviewData
    );
    return data;
  },
};
