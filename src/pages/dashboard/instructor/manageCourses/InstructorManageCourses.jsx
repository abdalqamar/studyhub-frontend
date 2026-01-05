import CoursesManagement from "../../shared/CoursesManagement ";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useCategories } from "../../../../hooks/useCategories";
import {
  useDeleteCourse,
  useInstructorCourses,
} from "../../../../hooks/useCourses";

const InstructorManageCourses = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: categories = [] } = useCategories();
  const { data: courses = [], isLoading, isFetching } = useInstructorCourses();
  const deleteCourseMutation = useDeleteCourse();

  // Handle all course actions
  const handleCourseAction = async (action, course) => {
    console.log("Action:", action, "Course:", course);

    switch (action) {
      case "edit":
        handleEditCourse(course);
        break;

      case "delete":
        await handleDeleteCourse(course);
        break;

      case "preview":
        handlePreviewCourse(course);
        break;

      case "feedback":
        // Feedback modal is handled by CoursesManagement component
        // This case is just for logging or additional handling if needed
        console.log("Viewing feedback for:", course.courseName);
        break;

      default:
        console.log("Unknown action:", action);
    }
  };

  // Edit Course
  const handleEditCourse = (course) => {
    navigate(`/instructor/edit-course/${course._id}`);
  };

  // Delete Course
  const handleDeleteCourse = async (course) => {
    deleteCourseMutation.mutate(course._id);
  };

  // Preview Course
  const handlePreviewCourse = (course) => {
    navigate(`/${user?.role}/course/${course._id}`);
  };

  // Add New Course
  const handleAddCourse = () => {
    navigate("/instructor/add-course");
  };

  return (
    <div className="relative">
      {(deleteCourseMutation.isLoading || isFetching || isLoading) && (
        <LoadingSpinner />
      )}

      <CoursesManagement
        userType={user?.role}
        courses={courses}
        categories={categories}
        onCourseAction={handleCourseAction}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default InstructorManageCourses;
