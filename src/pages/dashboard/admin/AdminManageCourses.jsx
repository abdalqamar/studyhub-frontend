import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import CoursesManagement from "../shared/CoursesManagement ";
import {
  useAdminCourses,
  useApproveCourse,
  useDeleteCourse,
  useRejectCourse,
} from "../../../hooks/useCourses";
import { useCategories } from "../../../hooks/useCategories";
import { errorToast, successToast } from "../../../utils/toastUtils";

const AdminManageCourses = () => {
  const navigate = useNavigate();
  const { data: courses = [], isLoading } = useAdminCourses();
  const { data: categories = [] } = useCategories();

  const approveCourse = useApproveCourse();
  const rejectCourse = useRejectCourse();
  const deleteCourse = useDeleteCourse();
  const { user } = useSelector((state) => state.auth);

  const handleCourseAction = (action, course) => {
    switch (action) {
      case "approve":
        handleApproveCourse(course);
        break;

      case "reject":
        handleRejectCourse(course);
        break;

      case "delete":
        handleDeleteCourse(course);
        break;

      case "preview":
        navigate(`/${user?.role}/course/${course._id}`);
        break;

      case "approve-all":
        handleApproveAllPending();
        break;

      case "generate-report":
        handleGenerateReport();
        break;

      default:
        toast.error("Unknown action");
    }
  };

  const handleApproveCourse = (course) => {
    approveCourse.mutate(course._id);
  };

  const handleRejectCourse = (course) => {
    if (!course.feedback) {
      errorToast("Please provide rejection feedback");
      return;
    }

    rejectCourse.mutate({
      id: course._id,
      feedback: course.feedback,
    });
  };

  const handleDeleteCourse = (course) => {
    deleteCourse.mutate(course._id);
  };

  const handleApproveAllPending = () => {
    const pendingCourses = courses.filter((c) => c.status === "pending");

    if (pendingCourses.length === 0) {
      errorToast("No pending courses to approve");
      return;
    }

    pendingCourses.forEach((course) => {
      approveCourse.mutate(course._id);
    });

    successToast("All pending courses processed!");
  };

  const handleGenerateReport = () => {
    const csvData = courses.map((course) => ({
      Title: course.courseName,
      Instructor: `${course.instructor?.firstName} ${course.instructor?.lastName}`,
      Category: course.category?.name,
      Students: course.enrolledCount,
      Rating: course.rating || "N/A",
      Status: course.status,
      Price: course.price,
      Duration: course.duration,
    }));

    const headers = Object.keys(csvData[0]).join(",");
    const rows = csvData.map((row) => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courses-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast.success("Report downloaded");
  };

  return (
    <div className="relative min-h-screen">
      {isLoading && <LoadingSpinner />}
      <CoursesManagement
        userType={user?.role}
        courses={courses}
        categories={categories}
        onCourseAction={handleCourseAction}
      />
    </div>
  );
};

export default AdminManageCourses;
