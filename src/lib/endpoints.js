export const API_ENDPOINTS = {
  //  AUTH
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_SEND_OTP: "/auth/send-otp",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
  AUTH_UPDATE_PASSWORD: "/auth/update-password",
  AUTH_REFRESH_TOKEN: "/auth/refresh-token",

  //  COURSES
  COURSES: "/courses", // public list
  COURSES_MANAGE: "/courses/manage", // admin/instructor list
  COURSE: (id) => `/courses/${id}`, // public detail
  COURSE_EDIT: (id) => `/courses/edit/${id}`, // instructor edit
  COURSE_PREVIEW: (id) => `/courses/${id}/preview`, // preview
  COURSE_CONTENT: (id) => `/courses/${id}/content`, // student content
  COURSE_CREATE: "/courses",
  COURSE_UPDATE: (id) => `/courses/${id}`,
  COURSE_DELETE: (id) => `/courses/${id}`,
  COURSE_ENROLL: (id) => `/courses/${id}/enroll`,

  //  SECTIONS
  SECTION_CREATE: (courseId) => `/courses/${courseId}/sections`,
  SECTION_UPDATE: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}`,
  SECTION_DELETE: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}`,

  //  LESSONS
  LESSON_CREATE: (courseId, sectionId) =>
    `/courses/${courseId}/sections/${sectionId}/lessons`,
  LESSON_UPDATE: (courseId, sectionId, lessonId) =>
    `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
  LESSON_DELETE: (courseId, sectionId, lessonId) =>
    `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,

  //  REVIEWS
  REVIEW_CREATE: (courseId) => `/courses/${courseId}/reviews`,

  //  ADMIN ──
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_TRANSACTIONS: "/admin/transactions",
  ADMIN_COURSE_APPROVE: (id) => `/admin/courses/${id}/approve`,
  ADMIN_COURSE_REJECT: (id) => `/admin/courses/${id}/reject`,
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_STATUS: (id) => `/admin/users/${id}/status`,
  ADMIN_USER_DELETE: (id) => `/admin/users/${id}`,

  //  INSTRUCTOR
  INSTRUCTOR_STUDENTS: "/instructor/students",

  //  CATEGORIES
  CATEGORIES: "/categories",
  CATEGORY_CREATE: "/categories",
  CATEGORY_UPDATE: (id) => `/categories/${id}`,
  CATEGORY_DELETE: (id) => `/categories/${id}`,

  // PROFILE
  PROFILE: "/users/me",
  PROFILE_UPDATE: "/users/update-profile",
  PROFILE_PHOTO: "/users/update-photo",
  PROFILE_ENROLLED_COURSES: "/users/enrolled-courses",
};
