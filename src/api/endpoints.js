// export const API_ENDPOINTS = {
//   // Auth
//   LOGIN: "/auth/login",
//   REGISTER: "/auth/register",
//   SEND_OTP: "/auth/send-otp",
//   LOGOUT: "/auth/logout",
//   FORGOT_PASSWORD: "/auth/forgot-password",
//   RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
//   UPDATE_PASSWORD: "/auth/update-password",
//   REFRESH_TOKEN: "/auth/refresh-token",

//   // Public Course Routes
//   COURSES_PUBLIC: "/courses",

//   COURSES_MANAGE: "/courses/manage",
//   COURSE_DETAILS: (id) => `/courses/${id}`,
//   COURSE_PREVIEW: (id) => `/courses/${id}/preview`,

//   //Student
//   COURSE_CONTENT: (id) => `/courses/${id}/content`,

//   // Instructor Routes
//   INSTRUCTOR_MY_STUDENTS: "/instructor/students",
//   CREATE_COURSE: "/courses",
//   UPDATE_COURSE: (id) => `/courses/${id}`,
//   DELETE_COURSE: (id) => `/courses/${id}`,
//   GET_COURSE_BY_ID: (id) => `/courses/edit/${id}`,

//   // Enrollment

//   // Admin Routes
//   ADMIN_DASHBOARD_STATS: "/admin/dashboard",
//   ADMIN_TRANSACTIONS: "/admin/transactions",
//   ADMIN_APPROVE_COURSE: (id) => `/admin/courses/${id}/approve`,
//   ADMIN_REJECT_COURSE: (id) => `/admin/courses/${id}/reject`,
//   ADMIN_ALL_USERS: "/admin/users",
//   ADMIN_UPDATE_USER_STATUS: (id) => `/admin/users/${id}/status`,
//   ADMIN_DELETE_USER: (id) => `/admin/users/${id}`,

//   // Ratings
//   CREATE_REVIEW: (id) => `/courses/${id}/reviews`,

//   // Sections
//   CREATE_SECTION: (courseId) => `/courses/${courseId}/sections`,
//   UPDATE_SECTION: (courseId, sectionId) =>
//     `/courses/${courseId}/sections/${sectionId}`,
//   DELETE_SECTION: (courseId, sectionId) =>
//     `/courses/${courseId}/sections/${sectionId}`,

//   // Lessons

//   ENROLL: (courseId) => `/courses/${courseId}/enroll`,
//   CREATE_LESSON: (courseId, sectionId) =>
//     `/courses/${courseId}/sections/${sectionId}/lessons`,
//   UPDATE_LESSON: (courseId, sectionId, lessonId) =>
//     `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
//   DELETE_LESSON: (courseId, sectionId, lessonId) =>
//     `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,

//   // Categories
//   CATEGORIES: "/categories",
//   CREATE_CATEGORY: "/categories",
//   UPDATE_CATEGORY: (id) => `/categories/${id}`,
//   DELETE_CATEGORY: (id) => `/categories/${id}`,

//   // Assignments
//   ASSIGNMENTS: "/assignments",
//   SUBMIT_ASSIGNMENT: (id) => `/assignments/${id}/submit`,

//   // Quizzes
//   QUIZZES: "/quizzes",
//   SUBMIT_QUIZ: (id) => `/quizzes/${id}/submit`,

//   // Profile
//   GET_PROFILE: "/users/profile",
//   UPDATE_PROFILE: "/users/update-profile",
//   UPDATE_PHOTO: "/users/update-photo",
//   ENROLLED_COURSES: "/users/enrolled-courses",
// };

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
  PROFILE: "/users/profile",
  PROFILE_UPDATE: "/users/update-profile",
  PROFILE_PHOTO: "/users/update-photo",
  PROFILE_ENROLLED_COURSES: "/users/enrolled-courses",
};
