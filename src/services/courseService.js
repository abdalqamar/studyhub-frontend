import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const courseService = {
  getAllCourses: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSES_MANAGE, {
      params,
    });

    return data;
  },

  // Get all Approved courses
  fetchAllApprovedCourses: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSES_PUBLIC, {
      params,
    });

    return data;
  },

  // Get single course
  getCourseById: async (courseId) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.GET_COURSE_BY_ID(courseId)
    );
    return data.course;
  },

  // Get course preview for admin and instructors
  getCoursePreview: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_PREVIEW(id));
    return data.course;
  },

  // Get course details for public view
  getCourseDetails: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_DETAILS(id));
    return data.course;
  },

  getCourseContent: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_CONTENT(id));

    return data.course;
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ENROLL(courseId));
    return data;
  },

  // Approve course (admin)
  approveCourse: async (id) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_APPROVE_COURSE(id)
    );
    return data.course;
  },

  // Reject course (admin)
  rejectCourse: async (courseId, feedback) => {
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_REJECT_COURSE(courseId),
      { feedback }
    );
    return data.course;
  },

  // Create new course (for instructors)
  createCourse: async (courseData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CREATE_COURSE,
      courseData
    );
    return data.course;
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_COURSE(courseId),
      courseData
    );

    return data.course;
  },

  // Delete course
  deleteCourse: async (courseId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_COURSE(courseId)
    );
    return data;
  },

  // Update lesson progress
  updateLessonProgress: async (courseId, lessonId, progress) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.LESSON_PROGRESS(courseId, lessonId),
      { progress }
    );
    return data;
  },

  // Get course by category
  getCoursesByCategory: async (categoryId) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSES, {
      params: { category: categoryId },
    });
    return data;
  },

  createSection: async (courseId, sectionData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CREATE_SECTION(courseId),
      sectionData
    );

    return data;
  },

  updateSection: async (courseId, sectionId, sectionData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_SECTION(courseId, sectionId),
      sectionData
    );
    return data.updatedSection;
  },

  deleteSection: async (courseId, sectionId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_SECTION(courseId, sectionId)
    );
    return data.sectionId;
  },

  createLesson: async (courseId, sectionId, lessonData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CREATE_LESSON(courseId, sectionId),
      lessonData
    );

    return data.newLesson;
  },

  updateLesson: async (sectionId, lessonId, lessonData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_LESSON(sectionId, lessonId),
      lessonData
    );

    return data.updatedLesson;
  },

  deleteLesson: async (sectionId, lessonId) => {
    const { data } = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_LESSON(sectionId, lessonId)
    );
    return data.lessonId;
  },
};
