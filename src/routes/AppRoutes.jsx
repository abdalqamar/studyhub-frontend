import { ROLES } from "../constants/roles";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "../shared/ui/PageLoader";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const ResetPassword = lazy(() => import("@/features/auth/pages/ResetPassword"));
const ForgotPassword = lazy(
  () => import("@/features/auth/pages/ForgotPassword")
);
const VerifyOtp = lazy(() => import("@/features/auth/pages/VerifyOtp"));
const Register = lazy(() => import("@/features/auth/pages/Register"));
const CoursesPage = lazy(() => import("@/features/courses/pages/CoursesPage"));
const CourseDetails = lazy(
  () => import("@/features/courses/pages/CourseDetails")
);

//Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import RoleProtectedRoute from "./RoleProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import PublicRoute from "./PublicRoute";
import InstructorAssignments from "@/features/instructor/pages/InstructorAssignments";

//Student
const StudentDashboard = lazy(
  () => import("@/features/student/pages/StudentDashboard")
);
const Assignments = lazy(() => import("@/features/student/pages/Assignments"));
const LiveClasses = lazy(() => import("@/features/student/pages/LiveClasses"));
const ViewCourseLayout = lazy(
  () => import("@/features/student/pages/ViewCourse/ViewCourseLayout")
);
const ViewCoursePage = lazy(
  () => import("@/features/student/pages/ViewCourse/ViewCoursePage")
);
const Wishlist = lazy(() => import("@/features/student/pages/Wishlist"));
const Community = lazy(() => import("@/features/student/pages/Community"));
const MyCourses = lazy(() => import("@/features/student/pages/MyCourses"));
const NotificationsPage = lazy(
  () => import("@/features/student/pages/NotificationsPage")
);
const ProfileSettings = lazy(
  () => import("@/features/profile/pages/ProfileSettings")
);

//Instructor
const InstructorDashboard = lazy(
  () => import("@/features/instructor/pages/InstructorDashboard")
);
const InstructorManageCourses = lazy(
  () => import("@/features/instructor/pages/InstructorManageCourses")
);
const InstructorNotifications = lazy(
  () => import("@/features/instructor/pages/InstructorNotifications")
);
const InstructorEarnings = lazy(
  () => import("@/features/instructor/pages/InstructorEarnings")
);
const InstructorLiveClasses = lazy(
  () => import("@/features/instructor/pages/InstructorLiveClasses")
);
const InstructorManageUsers = lazy(
  () => import("@/features/instructor/pages/InstructorManageUsers")
);
const CourseBuilder = lazy(
  () => import("@/features/course-builder/CourseBuilder")
);

//Admin
const AdminDashboard = lazy(
  () => import("@/features/admin/pages/AdminDashboard")
);
const ManageUsers = lazy(() => import("@/features/admin/pages/ManageUsers"));
const AdminManageCourses = lazy(
  () => import("@/features/admin/pages/AdminManageCourses")
);
const TransactionsPage = lazy(
  () => import("@/features/admin/pages/TransactionsPage")
);
const AdminNotifications = lazy(
  () => import("@/features/admin/pages/AdminNotifications")
);
const SystemSettings = lazy(
  () => import("@/features/admin/pages/SystemSettings")
);
const CoursePreview = lazy(() => import("@/shared/pages/CoursePreview"));
const CategoryManager = lazy(
  () => import("@/features/admin/pages/CategoryManager")
);

const HelpCenter = lazy(() => import("../pages/HelpCenter"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "about",
            element: (
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            ),
          },
          {
            path: "courses",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CoursesPage />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CourseDetails />
              </Suspense>
            ),
          },
          {
            path: "contact",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            ),
          },

          {
            path: "help",
            element: (
              <Suspense fallback={<PageLoader />}>
                <HelpCenter />
              </Suspense>
            ),
          },
          {
            path: "privacy-policy",
            element: (
              <Suspense fallback={<PageLoader />}>
                <PrivacyPolicy />
              </Suspense>
            ),
          },
          {
            path: "terms",
            element: (
              <Suspense fallback={<PageLoader />}>
                <TermsOfService />
              </Suspense>
            ),
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <Login />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "register",
            element: (
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <Register />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "verify-otp",
            element: (
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <VerifyOtp />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <ForgotPassword />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "reset-password/:token",
            element: (
              <PublicRoute>
                <Suspense fallback={<PageLoader />}>
                  <ResetPassword />
                </Suspense>
              </PublicRoute>
            ),
          },
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
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <StudentDashboard />
              </Suspense>
            ),
          },
          {
            path: "my-courses",
            element: (
              <Suspense fallback={<PageLoader />}>
                <MyCourses />
              </Suspense>
            ),
          },
          {
            path: "assignments",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Assignments />
              </Suspense>
            ),
          },
          {
            path: "live-classes",
            element: (
              <Suspense fallback={<PageLoader />}>
                <LiveClasses />
              </Suspense>
            ),
          },
          {
            path: "wishlist",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Wishlist />
              </Suspense>
            ),
          },
          {
            path: "community",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Community />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<PageLoader />}>
                <NotificationsPage />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfileSettings />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CoursePreview />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "/student/view-course/:courseId",
        element: (
          <RoleProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <Suspense fallback={<PageLoader />}>
              <ViewCourseLayout />
            </Suspense>
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ViewCoursePage />
              </Suspense>
            ),
          },

          {
            path: "sections/:sectionId/lessons/:lessonId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ViewCoursePage />
              </Suspense>
            ),
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
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorDashboard />
              </Suspense>
            ),
          },
          {
            path: "add-course",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CourseBuilder />
              </Suspense>
            ),
          },
          {
            path: "edit-course/:courseId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CourseBuilder />
              </Suspense>
            ),
          },
          {
            path: "manage-courses",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorManageCourses />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CoursePreview />
              </Suspense>
            ),
          },
          {
            path: "assignments",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorAssignments />
              </Suspense>
            ),
          },
          {
            path: "live-classes",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorLiveClasses />
              </Suspense>
            ),
          },
          {
            path: "manage-students",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorManageUsers />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorNotifications />
              </Suspense>
            ),
          },
          {
            path: "earnings",
            element: (
              <Suspense fallback={<PageLoader />}>
                <InstructorEarnings />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfileSettings />
              </Suspense>
            ),
          },
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
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ManageUsers />
              </Suspense>
            ),
          },
          {
            path: "courses",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminManageCourses />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CoursePreview />
              </Suspense>
            ),
          },
          {
            path: "transactions",
            element: (
              <Suspense fallback={<PageLoader />}>
                <TransactionsPage />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminNotifications />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<PageLoader />}>
                <SystemSettings />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfileSettings />
              </Suspense>
            ),
          },
          {
            path: "category",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CategoryManager />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
