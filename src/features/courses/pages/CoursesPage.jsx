import { useState, useCallback, useMemo, useEffect } from "react";
import { Search, BookOpen, AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCourses } from "../hooks";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { errorToast } from "@/shared/utils/toastUtils";
import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import SearchBar from "@/shared/layout/SearchBar";
import Pagination from "@/shared/components/Pagination";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const ITEMS_PER_PAGE = 12;

  const {
    data: coursesData,
    isFetching: coursesFetching,
    isError: coursesError,
    error: coursesErrorMsg,
  } = useCourses({
    search: debouncedSearch,
    category: category === "All" ? "" : category,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useCategories();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (coursesError) {
      errorToast(coursesErrorMsg?.message || "Failed to load courses");
    }
  }, [coursesError, coursesErrorMsg]);

  const courses = useMemo(
    () => coursesData?.courses || [],
    [coursesData?.courses]
  );
  const categories = useMemo(() => categoriesData || [], [categoriesData]);
  const pagination = coursesData?.pagination;

  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          const shouldDelete =
            !value ||
            value === "All" ||
            (key === "page" && (value === "1" || value === 1));
          if (shouldDelete) params.delete(key);
          else params.set(key, String(value));
        });
        return params;
      });
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setCurrentPage(1);
      updateSearchParams({ search: value, page: 1 });
    },
    [updateSearchParams]
  );

  const handleCategoryChange = useCallback(
    (categoryName) => {
      setCategory(categoryName);
      setCurrentPage(1);
      updateSearchParams({ category: categoryName, page: 1 });
    },
    [updateSearchParams]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      updateSearchParams({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateSearchParams]
  );

  if (categoriesLoading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold-soft border border-gold-dim rounded-full mb-5">
            <BookOpen size={14} className="text-gold" />
            <span className="text-xs font-mono text-gold font-medium">
              Course Catalog
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-text-1 leading-tight">
            Explore our courses
          </h1>

          <p className="text-text-2 max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with expert-led courses across development,
            design, and data science.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto py-6 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="w-full md:w-72"
          />

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto bg-surface-2 border border-border rounded-xl p-1">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap flex-shrink-0 transition-all duration-150 ${
                category === "All"
                  ? "bg-gold text-bg font-semibold"
                  : "text-text-2 hover:text-text-1"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat._id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap flex-shrink-0 transition-all duration-150 ${
                  category === cat._id
                    ? "bg-gold text-bg font-semibold"
                    : "text-text-2 hover:text-text-1"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto py-6 px-6 pb-16">
        {coursesError && !coursesFetching && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-danger-soft flex items-center justify-center">
              <AlertCircle size={22} className="text-danger" />
            </div>
            <p className="text-text-1 font-medium">
              Oops! Something went wrong.
            </p>
            <p className="text-sm text-text-3">
              {coursesErrorMsg?.message ||
                "Kuch problem aa gayi, thodi der baad try karo."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 px-4 py-2 rounded-lg bg-gold hover:bg-gold-dim text-bg text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!coursesError && (
          <>
            {coursesFetching ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>

                {courses.length === 0 && (
                  <div className="text-center text-text-3 mt-16">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-2 border border-border mb-4">
                      <Search size={20} className="text-text-3" />
                    </div>
                    <p className="text-text-2">No courses found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}

                {pagination?.totalPages > 1 && (
                  <div className="pb-6 mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
