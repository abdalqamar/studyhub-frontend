import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import CoursesManagement from "../shared/CoursesManagement ";
import {
  fetchAllCourses,
  useApproveCourse,
  useDeleteCourse,
  useRejectCourse,
} from "../../../hooks/useCourses";
import { useCategories } from "../../../hooks/useCategories";
import { errorToast, successToast } from "../../../utils/toastUtils";

const AdminManageCourses = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Mutations
  const approveCourse = useApproveCourse();
  const rejectCourse = useRejectCourse();
  const deleteCourse = useDeleteCourse();

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
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const {
    data,
    isLoading: coursesLoading,
    isError,
    error,
  } = fetchAllCourses({
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
      setCurrentPage(1);

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (searchTerm) {
          params.set("search", searchTerm);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        return params;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams]);

  // Error handling
  useEffect(() => {
    if (isError) {
      errorToast(error?.message || "Failed to load courses");
    }
  }, [isError, error]);

  // Memoized values
  const courses = useMemo(() => data?.courses || [], [data?.courses]);
  const pagination = useMemo(() => data?.pagination, [data?.pagination]);

  // Update URL params helper
  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (value) {
            params.set(key, String(value));
          } else {
            params.delete(key);
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  // Handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

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
  const handleApproveCourse = useCallback(
    async (course) => {
      if (
        !window.confirm(
          `Are you sure you want to approve "${course.courseName}"?`
        )
      ) {
        return;
      }

      try {
        await approveCourse.mutateAsync(course._id);
        successToast("Course approved successfully");
      } catch (error) {
        errorToast(error?.message || "Failed to approve course");
      }
    },
    [approveCourse]
  );

  const handleRejectCourse = useCallback(
    async (course) => {
      if (!course.feedback) {
        errorToast("Please provide rejection feedback");
        return;
      }

      try {
        await rejectCourse.mutateAsync({
          id: course._id,
          feedback: course.feedback,
        });
        successToast("Course rejected successfully");
      } catch (error) {
        errorToast(error?.message || "Failed to reject course");
      }
    },
    [rejectCourse]
  );

  const handleDeleteCourse = useCallback(
    async (course) => {
      try {
        await deleteCourse.mutateAsync(course._id);
        successToast("Course deleted successfully");
      } catch (error) {
        errorToast(error?.message || "Failed to delete course");
      }
    },
    [deleteCourse]
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
        approve: () => handleApproveCourse(course),
        reject: () => handleRejectCourse(course),
        delete: () => handleDeleteCourse(course),
        preview: () => handlePreviewCourse(course),
      };

      const actionHandler = actions[action];
      if (actionHandler) {
        await actionHandler();
      } else {
        errorToast("Unknown action");
      }
    },
    [
      handleApproveCourse,
      handleRejectCourse,
      handleDeleteCourse,
      handlePreviewCourse,
    ]
  );

  // Loading state
  const isLoading =
    coursesLoading ||
    categoriesLoading ||
    approveCourse.isLoading ||
    rejectCourse.isLoading ||
    deleteCourse.isLoading;

  return (
    <div className="relative min-h-screen">
      {isLoading && <LoadingSpinner />}

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
      />
    </div>
  );
};

export default AdminManageCourses;
