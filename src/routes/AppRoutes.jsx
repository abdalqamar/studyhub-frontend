import { ROLES } from "../constants/roles";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

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
import PaymentProcessing from "@/features/student/pages/PaymentProcessing";
import RouteLoader from "@/shared/ui/RouteLoader";

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
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

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
              <Suspense fallback={<RouteLoader />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "about",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <About />
              </Suspense>
            ),
          },
          {
            path: "courses",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CoursesPage />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CourseDetails />
              </Suspense>
            ),
          },
          {
            path: "/payment-processing",
            element: <PaymentProcessing />,
          },
          {
            path: "contact",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <Contact />
              </Suspense>
            ),
          },

          {
            path: "help",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <HelpCenter />
              </Suspense>
            ),
          },
          {
            path: "privacy-policy",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <PrivacyPolicy />
              </Suspense>
            ),
          },
          {
            path: "terms",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <TermsOfService />
              </Suspense>
            ),
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <Suspense fallback={<RouteLoader />}>
                  <Login />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "register",
            element: (
              <PublicRoute>
                <Suspense fallback={<RouteLoader />}>
                  <Register />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "verify-otp",
            element: (
              <PublicRoute>
                <Suspense fallback={<RouteLoader />}>
                  <VerifyOtp />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <PublicRoute>
                <Suspense fallback={<RouteLoader />}>
                  <ForgotPassword />
                </Suspense>
              </PublicRoute>
            ),
          },
          {
            path: "reset-password/:token",
            element: (
              <PublicRoute>
                <Suspense fallback={<RouteLoader />}>
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
              <Suspense fallback={<RouteLoader />}>
                <StudentDashboard />
              </Suspense>
            ),
          },
          {
            path: "my-courses",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <MyCourses />
              </Suspense>
            ),
          },
          {
            path: "assignments",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <Assignments />
              </Suspense>
            ),
          },
          {
            path: "live-classes",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <LiveClasses />
              </Suspense>
            ),
          },
          {
            path: "wishlist",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <Wishlist />
              </Suspense>
            ),
          },
          {
            path: "community",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <Community />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <NotificationsPage />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ProfileSettings />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<RouteLoader />}>
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
            <Suspense fallback={<RouteLoader />}>
              <ViewCourseLayout />
            </Suspense>
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ViewCoursePage />
              </Suspense>
            ),
          },

          {
            path: "sections/:sectionId/lessons/:lessonId",
            element: (
              <Suspense fallback={<RouteLoader />}>
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
              <Suspense fallback={<RouteLoader />}>
                <InstructorDashboard />
              </Suspense>
            ),
          },
          {
            path: "add-course",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CourseBuilder />
              </Suspense>
            ),
          },
          {
            path: "edit-course/:courseId",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CourseBuilder />
              </Suspense>
            ),
          },
          {
            path: "manage-courses",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorManageCourses />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CoursePreview />
              </Suspense>
            ),
          },
          {
            path: "assignments",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorAssignments />
              </Suspense>
            ),
          },
          {
            path: "live-classes",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorLiveClasses />
              </Suspense>
            ),
          },
          {
            path: "manage-students",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorManageUsers />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorNotifications />
              </Suspense>
            ),
          },
          {
            path: "earnings",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <InstructorEarnings />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<RouteLoader />}>
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
              <Suspense fallback={<RouteLoader />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ManageUsers />
              </Suspense>
            ),
          },
          {
            path: "courses",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <AdminManageCourses />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CoursePreview />
              </Suspense>
            ),
          },
          {
            path: "transactions",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <TransactionsPage />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <AdminNotifications />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <SystemSettings />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ProfileSettings />
              </Suspense>
            ),
          },
          {
            path: "category",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <CategoryManager />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "unauthorized",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Unauthorized />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
