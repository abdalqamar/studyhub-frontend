import { ROLES } from "../constants/roles";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Register from "../pages/auth/Register";
import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetails from "../pages/courses/CourseDetails";
import NewDashboard from "../components/common/NewDashboard";

//Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import RoleProtectedRoute from "./RoleProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import PublicRoute from "./PublicRoute";

//Student
import StudentDashboard from "../pages/dashboard/student/StudentDashboard";
import Assignments from "../pages/dashboard/student/Assignments";
import LiveClasses from "../pages/dashboard/student/LiveClasses";
import Wishlist from "../pages/dashboard/student/Wishlist";
import Community from "../pages/dashboard/student/Community";
import MyCourses from "../pages/dashboard/student/MyCourses";
import NotificationsPage from "../pages/dashboard/student/NotificationsPage";
import ProfileSettings from "../pages/profile/ProfileSettings";

//Instructor
import InstructorDashboard from "../pages/dashboard/instructor/InstructorDashboard";
import InstructorManageCourses from "../pages/dashboard/instructor/manageCourses/InstructorManageCourses";
import InstructorNotifications from "../pages/dashboard/instructor/InstructorNotifications";
import InstructorEarnings from "../pages/dashboard/instructor/InstructorEarnings";
import InstructorLiveClasses from "../pages/dashboard/instructor/components/InstructorLiveClasses";
import InstructorManageUsers from "../pages/dashboard/instructor/InstructorManageUsers";
import CourseBuilder from "../pages/dashboard/instructor/CourseBuilder/CourseBuilder";

//Admin
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdminManageCourses from "../pages/dashboard/admin/AdminManageCourses";
import TransactionsPage from "../pages/dashboard/admin/TransactionsPage";
import AdminNotifications from "../pages/dashboard/admin/AdminNotifications";
import SystemSettings from "../pages/dashboard/admin/SystemSettings";
import CoursePreview from "../pages/dashboard/shared/CoursePreview";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ViewCourseLayout from "../pages/dashboard/student/ViewCourse/ViewCourseLayout";
import ViewCoursePage from "../pages/dashboard/student/ViewCourse/ViewCoursePage";
import CourseDetailsWithAI from "../pages/dashboard/instructor/CourseBuilder/CourseWithAi";
import CategoryManager from "../pages/dashboard/admin/CategoryManager";
import HelpCenter from "../pages/HelpCenter";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "student/courses", element: <CoursesPage /> },
          { path: "course/:courseId", element: <CourseDetails /> },
          { path: "contact", element: <Contact /> },
          { path: "aisuggestion", element: <CourseDetailsWithAI /> },
          { path: "newdashboard", element: <NewDashboard /> },
          { path: "help", element: <HelpCenter /> },
          { path: "privacy-policy", element: <PrivacyPolicy /> },
          { path: "terms", element: <TermsOfService /> },
          {
            path: "login",
            element: (
              <PublicRoute>
                <Login />
              </PublicRoute>
            ),
          },
          {
            path: "register",
            element: (
              <PublicRoute>
                <Register />
              </PublicRoute>
            ),
          },
          {
            path: "verify-otp",
            element: (
              <PublicRoute>
                <VerifyOtp />
              </PublicRoute>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            ),
          },
          {
            path: "reset-password/:token",
            element: (
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            ),
          },
          { path: "*", element: <NotFound /> },
        ],
      },

      {
        path: "/student",
        element: (
          <RoleProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: "my-courses", element: <MyCourses /> },
          { path: "assignments", element: <Assignments /> },
          { path: "live-classes", element: <LiveClasses /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "community", element: <Community /> },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "profile", element: <ProfileSettings /> },
          { path: "course/:courseId", element: <CoursePreview /> },
        ],
      },

      {
        path: "/student/view-course/:courseId",
        element: (
          <RoleProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ViewCourseLayout />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <ViewCoursePage />,
          },

          {
            path: "sections/:sectionId/lessons/:lessonId",
            element: <ViewCoursePage />,
          },
        ],
      },

      {
        path: "/instructor",
        element: (
          <RoleProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <InstructorDashboard /> },
          { path: "add-course", element: <CourseBuilder /> },
          { path: "edit-course/:courseId", element: <CourseBuilder /> },
          { path: "manage-courses", element: <InstructorManageCourses /> },
          { path: "course/:courseId", element: <CoursePreview /> },
          { path: "live-classes", element: <InstructorLiveClasses /> },
          { path: "manage-students", element: <InstructorManageUsers /> },
          { path: "notifications", element: <InstructorNotifications /> },
          { path: "earnings", element: <InstructorEarnings /> },
          { path: "profile", element: <ProfileSettings /> },
        ],
      },

      {
        path: "/admin",
        element: (
          <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <ManageUsers /> },
          { path: "courses", element: <AdminManageCourses /> },
          { path: "course/:courseId", element: <CoursePreview /> },
          { path: "transactions", element: <TransactionsPage /> },
          { path: "notifications", element: <AdminNotifications /> },
          { path: "settings", element: <SystemSettings /> },
          { path: "profile", element: <ProfileSettings /> },
          { path: "category", element: <CategoryManager /> },
        ],
      },
    ],
  },
]);

export default router;
