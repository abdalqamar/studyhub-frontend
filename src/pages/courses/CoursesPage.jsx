import { useState, useCallback, useMemo, useEffect } from "react";
import { Search, Clock, Book, BookOpen, AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCourses } from "../../hooks/courses/index";
import { useCategories } from "../../hooks/useCategories";
import { formatDuration } from "../../utils/formatDuration";
import { errorToast } from "../../utils/toastUtils";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../dashboard/shared/Pagination";
import renderStars from "../../components/ui/renderStars";
import PageLoader from "../../components/PageLoader";

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
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorMsg,
  } = useCourses({
    search: debouncedSearch,
    category: category === "All" ? "" : category,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });
  console.log(coursesData);
  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useCategories();

  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  //  Error Handling
  useEffect(() => {
    if (coursesError) {
      errorToast(coursesErrorMsg?.message || "Failed to load courses");
    }
  }, [coursesError, coursesErrorMsg]);

  // Memoized values to avoid unnecessary re-renders
  const courses = useMemo(
    () => coursesData?.courses || [],
    [coursesData?.courses]
  );
  const categories = useMemo(() => categoriesData || [], [categoriesData]);
  const pagination = coursesData?.pagination;

  // Update search params in URL based on state changes
  const updateSearchParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          const shouldDelete =
            !value ||
            value === "All" ||
            (key === "page" && (value === "1" || value === 1));

          if (shouldDelete) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
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

  if (categoriesLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/*   Header  */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3b82f620,_transparent_60%)]" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 mt-5 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">
              Course Catalog
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Explore Our Courses
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with expert-led courses across development,
            design, and data science.
          </p>
        </div>
      </section>

      {/*  Filters  */}
      <section className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="w-full md:w-80"
          />

          {/* categories horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${
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

      {/*  Course Grid  */}
      <section className="max-w-7xl mx-auto py-8 px-6">
        {coursesLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {coursesError && !coursesLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-lg text-white font-medium">
              Oops! Something went wrong.
            </p>
            <p className="text-sm text-gray-400">
              {coursesErrorMsg?.message ||
                "Kuch problem aa gayi, thodi der baad try karo."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
            >
              Retry
            </button>
          </div>
        )}
        {/* Render courses only if not loading and no error */}
        {!coursesLoading && !coursesError && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-700 hover:border-blue-500/30 group flex flex-col"
                >
                  {/* Thumbnail */}
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

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-semibold text-white line-clamp-2 min-h-[3rem] mb-1">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-400 truncate">
                      {course.instructor?.firstName}{" "}
                      {course.instructor?.lastName}
                    </p>

                    {/* Duration + Lessons */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      {course.totalDuration > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.totalDuration)}</span>
                        </div>
                      )}
                      {course.totalLectures > 0 && (
                        <div className="flex items-center gap-1">
                          <Book className="w-4 h-4" />
                          <span>{course.totalLectures} lessons</span>
                        </div>
                      )}
                    </div>

                    {(course.averageRating > 0 ||
                      course.enrolledStudents > 0) && (
                      <div className="mt-3 space-y-1">
                        {course.averageRating > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {renderStars(course.averageRating)}
                            </div>
                            <span className="text-white font-semibold text-sm">
                              {course.averageRating.toFixed(1)}
                            </span>
                            <span className="text-slate-500 text-xs">/5.0</span>
                          </div>
                        )}
                        {course.enrolledStudents > 0 && (
                          <p className="text-xs text-gray-400">
                            {course.enrolledStudents.toLocaleString()} students
                            enrolled
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                      <span className="text-xl font-bold text-white">
                        {course.price > 0 ? `₹${course.price}` : "Free"}
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
            {courses.length === 0 && (
              <div className="text-center text-gray-400 mt-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                  <Search className="w-7 h-7 text-gray-500" />
                </div>
                <p className="text-lg">No courses found</p>
                <p className="text-sm mt-2">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {/* Pagination */}
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
      </section>
    </div>
  );
};

export default CoursesPage;
