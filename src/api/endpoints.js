export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  SEND_OTP: "/auth/send-otp",
  LOGOUT: "/auth/logout",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  UPDATE_PASSWORD: "/auth/update-password",
  REFRESH_TOKEN: "/auth/refresh-token",

  // Public Course Routes
  COURSES: "/courses", // all approved courses
  COURSE_DETAILS: (id) => `/courses/${id}`,
  COURSE_PREVIEW: (id) => `/courses/${id}/preview`,

  //Student
  COURSE_CONTENT: (id) => `/courses/${id}/content`,

  // Instructor Routes
  INSTRUCTOR_MY_COURSES: "/courses/instructor/my-courses",
  CREATE_COURSE: "/courses",
  UPDATE_COURSE: (id) => `/courses/${id}`,
  DELETE_COURSE: (id) => `/courses/${id}`,
  GET_COURSE_BY_ID: (id) => `/courses/edit/${id}`,

  // Admin Routes
  ADMIN_ALL_COURSES: "/admin/courses",
  ADMIN_APPROVE_COURSE: (id) => `/admin/courses/${id}/approve`,
  ADMIN_REJECT_COURSE: (id) => `/admin/courses/${id}/reject`,

  // Ratings
  COURSE_REVIEWS: (id) => `/courses/${id}/reviews`,

  // Sections
  CREATE_SECTION: (courseId) => `/courses/${courseId}/sections`,
  UPDATE_SECTION: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}`,
  DELETE_SECTION: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}`,

  // Lessons
  CREATE_LESSON: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}/lessons`,
  UPDATE_LESSON: (sectionId, lessonId) =>
    `/courses/sections/${sectionId}/lessons/${lessonId}`,
  DELETE_LESSON: (sectionId, lessonId) =>
    `/courses/${sectionId}/lessons/${lessonId}`,

  // Categories
  CATEGORIES: "/categories",
  UPDATE_CATEGORY: (id) => `/categories/${id}`,
  DELETE_CATEGORY: (id) => `/categories/${id}`,

  // Assignments
  ASSIGNMENTS: "/assignments",
  SUBMIT_ASSIGNMENT: (id) => `/assignments/${id}/submit`,

  // Quizzes
  QUIZZES: "/quizzes",
  SUBMIT_QUIZ: (id) => `/quizzes/${id}/submit`,

  // Profile
  GET_PROFILE: "/users/profile",
  UPDATE_PROFILE: "/users/update-profile",
  UPDATE_PHOTO: "/users/update-photo",
  ENROLLED_COURSES: "/users/enrolled-courses",
};
