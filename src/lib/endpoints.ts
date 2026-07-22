export const API_ENDPOINTS = {
  //  AUTH
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_SEND_OTP: "/auth/send-otp",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
  AUTH_UPDATE_PASSWORD: "/auth/update-password",
  AUTH_REFRESH_TOKEN: "/auth/refresh-token",
  AUTH_ME: "/users/me",

  //  COURSES
  COURSES: "/courses", // public list
  COURSES_MANAGE: "/courses/manage", // admin/instructor list
  COURSE: (id: string) => `/courses/${id}`, // public detail
  COURSE_EDIT: (id: string) => `/courses/edit/${id}`, // instructor edit
  COURSE_PREVIEW: (id: string) => `/courses/${id}/preview`, // preview
  COURSE_CONTENT: (id: string) => `/courses/${id}/content`, // student content
  COURSE_CREATE: "/courses",
  COURSE_UPDATE: (id: string) => `/courses/${id}`,
  COURSE_DELETE: (id: string) => `/courses/${id}`,
  COURSE_ENROLL: (id: string) => `/courses/${id}/enroll`,

  //  SECTIONS
  SECTION_CREATE: (courseId: string) => `/courses/${courseId}/sections`,
  SECTION_UPDATE: (courseId: string, sectionId: string) =>
    `/courses/${courseId}/sections/${sectionId}`,
  SECTION_DELETE: (courseId: string, sectionId: string) =>
    `/courses/${courseId}/sections/${sectionId}`,

  //  LESSONS
  LESSON_CREATE: (courseId: string, sectionId: string) =>
    `/courses/${courseId}/sections/${sectionId}/lessons`,
  LESSON_UPDATE: (courseId: string, sectionId: string, lessonId: string) =>
    `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
  LESSON_DELETE: (courseId: string, sectionId: string, lessonId: string) =>
    `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,

  //  REVIEWS
  REVIEW_CREATE: (courseId: string) => `/courses/${courseId}/reviews`,

  //  ADMIN
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_TRANSACTIONS: "/admin/transactions",
  ADMIN_COURSE_APPROVE: (id: string) => `/admin/courses/${id}/approve`,
  ADMIN_COURSE_REJECT: (id: string) => `/admin/courses/${id}/reject`,
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_STATUS: (id: string) => `/admin/users/${id}/status`,
  ADMIN_USER_DELETE: (id: string) => `/admin/users/${id}`,

  //  INSTRUCTOR
  INSTRUCTOR_STUDENTS: "/instructor/students",

  //  CATEGORIES
  CATEGORIES: "/categories",
  CATEGORY_CREATE: "/categories",
  CATEGORY_UPDATE: (id: string) => `/categories/${id}`,
  CATEGORY_DELETE: (id: string) => `/categories/${id}`,

  // PROFILE
  PROFILE: "/users/me",
  PROFILE_UPDATE: "/users/update-profile",
  PROFILE_PHOTO: "/users/update-photo",
  PROFILE_ENROLLED_COURSES: "/users/enrolled-courses",

  // ASSIGNMENTS
  ASSIGNMENT_SUBMIT: (id: string) => `/assignments/${id}/submit`,
} as const;
