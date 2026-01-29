import { useState, useCallback, useMemo, useEffect } from "react";
import { Search, Clock, Book, X, BookOpen } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useCategories } from "../../hooks/useCategories";
import { formatDuration } from "../../utils/formatDuration";
import { errorToast } from "../../utils/toastUtils";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../dashboard/shared/Pagination";

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
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

  const ITEMS_PER_PAGE = 1;

  // Fetch data
  const {
    data: coursesData,
    isLoading: coursesLoading,
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

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Error handling
  useEffect(() => {
    if (coursesError) {
      errorToast(coursesErrorMsg?.message || "Failed to load courses");
    }
  }, [coursesError, coursesErrorMsg]);

  // Memoized values
  const courses = useMemo(
    () => coursesData?.courses || [],
    [coursesData?.courses]
  );
  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  const pagination = coursesData?.pagination;

  // Update URL params helper
  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (value && value !== "All") {
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
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setCurrentPage(1);
      updateSearchParams({ search: value, page: "1" });
    },
    [updateSearchParams]
  );

  const handleCategoryChange = useCallback(
    (categoryName) => {
      setCategory(categoryName);
      setCurrentPage(1);
      updateSearchParams({ category: categoryName, page: "1" });
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

  // Loading state
  const isLoading = coursesLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {isLoading && <LoadingSpinner />}

      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3b82f620,_transparent_60%)]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 mt-5 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Course Catalog
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Explore Our Courses
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with expert-led courses across development,
              design, and data science.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}

          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="md:w-80"
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {/* All button */}
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === cat._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-700 hover:border-blue-500/30 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.category && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-blue-600/90 text-white text-xs rounded-full">
                    {course.category.name}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1 truncate">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  {/* Duration */}
                  {course.totalDuration > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock className="text-gray-400" />
                      <span>{formatDuration(course.totalDuration)}</span>
                    </div>
                  )}

                  {/* Lessons */}
                  {course.totalLectures > 0 && (
                    <div className="flex items-center gap-1">
                      <Book className="text-gray-400" />
                      <span>{course.totalLectures} lessons</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-2">
                  {/* Rating */}
                  {course.averageRating > 0 && (
                    <>
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-300">
                        {course.averageRating.toFixed(1)}
                      </span>
                    </>
                  )}

                  {/* Enrolled count */}
                  {course.enrolledCount > 0 && (
                    <span className="text-xs text-gray-500">
                      ({course.enrolledCount} students)
                    </span>
                  )}
                </div>

                {/* Price  Button */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <span className="text-xl font-bold text-white">
                    ₹{course.price || 0}
                  </span>

                  <Link
                    to={`/course/${course._id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 mt-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <Search className="text-3xl text-gray-500" />
            </div>
            <p className="text-lg">No courses found.</p>
            <p className="text-sm mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <div className="pb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
