// import { useState } from "react";
// import { FiSearch, FiClock, FiBook } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useCourses } from "../../hooks/useCourses";
// import LoadingSpinner from "../../components/common/LoadingSpinner";
// import { useCategories } from "../../hooks/useCategories";
// import { formatDuration } from "../../utils/formatDuration";

// const CoursesPage = () => {
//   useCourses({
//     search,
//     category,
//     page,
//     limit,
//   });

//   const { data: courses = [], isLoading } = useCourses({});
//   const { data: categories = [] } = useCategories();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("All");

//   return (
//     <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
//       {isLoading && <LoadingSpinner />}

//       <section>
//         <div className="text-center py-16  px-6 bg-slate-900  shadow-2xl border border-slate-800">
//           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent tracking-tight">
//             The Catalog of Excellence
//           </h1>
//           <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-400 font-light">
//             Unlock your potential with expert-led courses across development,
//             design, and data science.
//           </p>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="max-w-7xl mx-auto py-8 px-6">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="relative w-full md:w-80">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search courses..."
//               value={searchTerm}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             />
//           </div>

//           {/* Category */}
//           <div className="flex flex-wrap gap-2 ">
//             {/* All button */}
//             <button
//               key="all"
//               onClick={() => setCategory("All")}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                 category === "All"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//               }`}
//             >
//               All
//             </button>

//             {categories.map((cat) => (
//               <button
//                 key={cat._id}
//                 onClick={() => setCategory(cat.name)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                   category === cat.name
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Course Grid */}
//       <section className="max-w-7xl mx-auto px-6">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filtered.map((c) => (
//             <div
//               key={c._id}
//               className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-700 hover:border-blue-500/30"
//             >
//               <img
//                 src={c.thumbnail}
//                 alt={c.title}
//                 className="w-full h-40 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-white line-clamp-2">
//                   {c.title}
//                 </h3>

//                 <p className="text-sm text-gray-400 mt-1">{c.instructor}</p>

//                 <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
//                   <div className="flex items-center gap-1">
//                     <FiClock className="text-gray-400" />
//                     <span>{formatDuration(c.totalDuration)}</span>
//                   </div>

//                   {/* Lessons */}
//                   <div className="flex items-center gap-1">
//                     <FiBook className="text-gray-400" />
//                     <span>{c.totalLectures} lessons</span>
//                   </div>
//                 </div>

//                 {/* Price + Button */}
//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-xl font-bold text-white">
//                     ₹{c.price}
//                   </span>

//                   <Link
//                     to={`/course/${c._id}`}
//                     className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
//                   >
//                     View Course
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center text-gray-400 mt-16">
//             <p className="text-lg">No courses found.</p>
//             <p className="text-sm mt-2">
//               Try adjusting your search or filter criteria.
//             </p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default CoursesPage;

import { useState, useCallback, useMemo, useEffect } from "react";
import { Search, Clock, Book, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useCategories } from "../../hooks/useCategories";
import { formatDuration } from "../../utils/formatDuration";
import { errorToast } from "../../utils/toastUtils";
import SearchBar from "../../components/common/SearchBar";

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

  const ITEMS_PER_PAGE = 12;

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
  const pagination = useMemo(
    () => coursesData?.pagination,
    [coursesData?.pagination]
  );

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
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateSearchParams]
  );

  // Loading state
  const isLoading = coursesLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      {isLoading && <LoadingSpinner />}

      {/* Hero Section */}
      <section>
        <div className="text-center py-16 px-6 bg-slate-900 shadow-2xl border border-slate-800">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent tracking-tight">
            The Catalog of Excellence
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-400 font-light">
            Unlock your potential with expert-led courses across development,
            design, and data science.
          </p>
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
      <section className="max-w-7xl mx-auto px-6">
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
                  onError={(e) => {
                    e.target.src = "/placeholder-course.jpg";
                  }}
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
                  <div className="flex items-center gap-1">
                    <Clock className="text-gray-400" />
                    <span>{formatDuration(course.totalDuration)}</span>
                  </div>

                  {/* Lessons */}
                  <div className="flex items-center gap-1">
                    <Book className="text-gray-400" />
                    <span>{course.totalLectures || 0} lessons</span>
                  </div>
                </div>

                {/* Rating */}

                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-300">
                    {course.averageRating}
                  </span>
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
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
