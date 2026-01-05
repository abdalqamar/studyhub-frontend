import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.COURSES);
    return response.data.courses;
  },

  //get all courses for admin
  getAllCoursesAdmin: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN_ALL_COURSES);
    return response.data.courses;
  },

  getAllInstructorCourses: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.INSTRUCTOR_MY_COURSES
    );
    return response.data.courses;
  },

  // Get single course
  getCourseById: async (courseId) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GET_COURSE_BY_ID(courseId)
    );
    return response.data.course;
  },

  // Get course preview for admin and instructors
  getCoursePreview: async (id) => {
    const res = await axiosInstance.get(API_ENDPOINTS.COURSE_PREVIEW(id));
    return res.data.course;
  },

  // Get course details for public view
  getCourseDetails: async (id) => {
    const res = await axiosInstance.get(API_ENDPOINTS.COURSE_DETAILS(id));
    return res.data.course;
  },

  getCourseContent: async (id) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.COURSE_CONTENT(id));
    console.log("CourseContent RESPONSE =>", data);

    return data?.course;
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ENROLL(courseId));
    return response.data;
  },

  // Approve course (admin)
  approveCourse: async (id) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_APPROVE_COURSE(id)
    );
    return response.data.course;
  },

  // Reject course (admin)
  rejectCourse: async (courseId, feedback) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN_REJECT_COURSE(courseId),
      { feedback }
    );
    return response.data.course;
  },

  // Create new course (for instructors)
  createCourse: async (courseData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_COURSE,
      courseData
    );
    return response.data.course;
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
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_COURSE(courseId)
    );
    return response.data;
  },

  // Update lesson progress
  updateLessonProgress: async (courseId, lessonId, progress) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.LESSON_PROGRESS(courseId, lessonId),
      { progress }
    );
    return response.data;
  },

  // Search courses
  searchCourses: async (query) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.COURSES}/search`,
      {
        params: { q: query },
      }
    );
    return response.data;
  },

  // Get course by category
  getCoursesByCategory: async (categoryId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.COURSES, {
      params: { category: categoryId },
    });
    return response.data;
  },

  createSection: async (courseId, sectionData) => {
    console.log(sectionData, courseId);
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CREATE_SECTION(courseId),
      sectionData
    );

    return data;
  },

  updateSection: async (courseId, sectionId, sectionData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_SECTION(courseId, sectionId),
      sectionData
    );
    return response.data.updatedSection;
  },

  deleteSection: async (courseId, sectionId) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_SECTION(courseId, sectionId)
    );
    return response.data.sectionId;
  },

  createLesson: async (courseId, sectionId, lessonData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_LESSON(courseId, sectionId),
      lessonData
    );
    console.log(response);
    return response.data.newLesson;
  },

  updateLesson: async (sectionId, lessonId, lessonData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_LESSON(sectionId, lessonId),
      lessonData
    );

    return data.updatedLesson;
  },

  deleteLesson: async (sectionId, lessonId) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_LESSON(sectionId, lessonId)
    );
    return {};
  },
};
