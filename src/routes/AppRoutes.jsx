import { ROLES } from "../constants/roles";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "../components/PageLoader";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const VerifyOtp = lazy(() => import("../pages/auth/VerifyOtp"));
const Register = lazy(() => import("../pages/auth/Register"));
const CoursesPage = lazy(() => import("../pages/courses/CoursesPage"));
const CourseDetails = lazy(() => import("../pages/courses/CourseDetails"));

//Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import RoleProtectedRoute from "./RoleProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import PublicRoute from "./PublicRoute";
import InstructorAssignments from "../pages/dashboard/instructor/InstructorAssignments";

//Student
const StudentDashboard = lazy(
  () => import("../pages/dashboard/student/StudentDashboard")
);
const Assignments = lazy(
  () => import("../pages/dashboard/student/Assignments")
);
const LiveClasses = lazy(
  () => import("../pages/dashboard/student/LiveClasses")
);
const Wishlist = lazy(() => import("../pages/dashboard/student/Wishlist"));
const Community = lazy(() => import("../pages/dashboard/student/Community"));
const MyCourses = lazy(() => import("../pages/dashboard/student/MyCourses"));
const NotificationsPage = lazy(
  () => import("../pages/dashboard/student/NotificationsPage")
);
const ProfileSettings = lazy(() => import("../pages/profile/ProfileSettings"));

//Instructor
const InstructorDashboard = lazy(
  () => import("../pages/dashboard/instructor/InstructorDashboard")
);
const InstructorManageCourses = lazy(
  () =>
    import("../pages/dashboard/instructor/manageCourses/InstructorManageCourses")
);
const InstructorNotifications = lazy(
  () => import("../pages/dashboard/instructor/InstructorNotifications")
);
const InstructorEarnings = lazy(
  () => import("../pages/dashboard/instructor/InstructorEarnings")
);
const InstructorLiveClasses = lazy(
  () => import("../pages/dashboard/instructor/components/InstructorLiveClasses")
);
const InstructorManageUsers = lazy(
  () => import("../pages/dashboard/instructor/InstructorManageUsers")
);
const CourseBuilder = lazy(
  () => import("../pages/dashboard/instructor/CourseBuilder/CourseBuilder")
);

//Admin
const AdminDashboard = lazy(
  () => import("../pages/dashboard/admin/AdminDashboard")
);
const ManageUsers = lazy(() => import("../pages/dashboard/admin/ManageUsers"));
const AdminManageCourses = lazy(
  () => import("../pages/dashboard/admin/AdminManageCourses")
);
const TransactionsPage = lazy(
  () => import("../pages/dashboard/admin/TransactionsPage")
);
const AdminNotifications = lazy(
  () => import("../pages/dashboard/admin/AdminNotifications")
);
const SystemSettings = lazy(
  () => import("../pages/dashboard/admin/SystemSettings")
);
const CoursePreview = lazy(
  () => import("../pages/dashboard/shared/CoursePreview")
);
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ViewCourseLayout = lazy(
  () => import("../pages/dashboard/student/ViewCourse/ViewCourseLayout")
);
const ViewCoursePage = lazy(
  () => import("../pages/dashboard/student/ViewCourse/ViewCoursePage")
);
const CategoryManager = lazy(
  () => import("../pages/dashboard/admin/CategoryManager")
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
