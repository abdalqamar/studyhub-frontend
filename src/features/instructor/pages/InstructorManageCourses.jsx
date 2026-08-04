import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useDeleteCourse } from "@/features/courses/hooks/useDeleteCourse";
import { useManageCourses } from "@/features/courses/hooks/useManageCourses";
import CoursesManagement from "@/shared/components/CoursesManagement";
import LoadingSpinner from "@/shared/layout/LoadingSpinner";
import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const InstructorManageCourses = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const deleteCourseMutation = useDeleteCourse();

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const ITEMS_PER_PAGE = 12;

  // Fetch data
  const { data: categories = [] } = useCategories();
  const {
    data,
    isLoading: coursesLoading,
    isError,
    error,
  } = useManageCourses({
    instructor: "me",
    search: debouncedSearch,
    status: statusFilter,
    category: categoryFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Error handling
  useEffect(() => {
    if (isError) {
      errorToast(error?.message || "Failed to load courses");
    }
  }, [isError, error]);

  const courses = data?.courses || [];
  const pagination = data?.pagination;

  // Update URL params helper
  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value) params.set(key, value);
          else params.delete(key);
        });
        return params;
      });
    },
    [setSearchParams]
  );

  // Handlers
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setCurrentPage(1);
      updateSearchParams({ search: value, page: "1" });
    },
    [updateSearchParams]
  );

  const handleStatusChange = useCallback(
    (status) => {
      setStatusFilter(status);
      setCurrentPage(1);
      updateSearchParams({ status, page: "1" });
    },
    [updateSearchParams]
  );

  const handleCategoryChange = useCallback(
    (categoryId) => {
      setCategoryFilter(categoryId);
      setCurrentPage(1);
      updateSearchParams({ category: categoryId, page: "1" });
    },
    [updateSearchParams]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      updateSearchParams({ page: String(page) });
    },
    [updateSearchParams]
  );

  // Course Actions
  const handleEditCourse = useCallback(
    (course) => {
      navigate(`/instructor/edit-course/${course._id}`);
    },
    [navigate]
  );

  const handleDeleteCourse = useCallback(
    async (course) => {
      try {
        await deleteCourseMutation.mutateAsync(course._id);
        successToast("Course deleted successfully");
      } catch (error) {
        errorToast(error?.message || "Failed to delete course");
      }
    },
    [deleteCourseMutation]
  );

  const handlePreviewCourse = useCallback(
    (course) => {
      navigate(`/${user?.role}/course/${course._id}`);
    },
    [navigate, user?.role]
  );

  const handleCourseAction = useCallback(
    async (action, course) => {
      const actions = {
        edit: () => handleEditCourse(course),
        delete: () => handleDeleteCourse(course),
        preview: () => handlePreviewCourse(course),
      };

      const actionHandler = actions[action];
      if (actionHandler) {
        await actionHandler();
      } else {
        console.warn("Unknown action:", action);
      }
    },

    [handleEditCourse, handleDeleteCourse, handlePreviewCourse]
  );

  const handleAddCourse = useCallback(() => {
    navigate("/instructor/add-course");
  }, [navigate]);

  if (coursesLoading) return <SkeletonLoader />;

  return (
    <div className="relative">
      <CoursesManagement
        userType={user?.role}
        courses={courses}
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={handleCategoryChange}
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        onStatusChange={handleStatusChange}
        onCourseAction={handleCourseAction}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default InstructorManageCourses;
