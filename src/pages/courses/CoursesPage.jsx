import { useState } from "react";
import { FiSearch, FiClock, FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useCategories } from "../../hooks/useCategories";
import { formatDuration } from "../../utils/formatDuration";

const CoursesPage = () => {
  const { data: courses = [], isLoading } = useCourses();
  const { data: categories = [] } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      {isLoading && <LoadingSpinner />}

      <section>
        <div className="text-center py-16 bg-slate-900  shadow-2xl border border-slate-800">
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
      <section className="max-w-7xl mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {/* All button */}
            <button
              key="all"
              onClick={() => setCategory("All")}
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
                onClick={() => setCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === cat.name
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
      <section className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <div
              key={c._id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-700 hover:border-blue-500/30"
            >
              <img
                src={c.thumbnail}
                alt={c.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {c.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">{c.instructor}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiClock className="text-gray-400" />
                    <span>{formatDuration(c.totalDuration)}</span>
                  </div>

                  {/* Lessons */}
                  <div className="flex items-center gap-1">
                    <FiBook className="text-gray-400" />
                    <span>{c.totalLectures} lessons</span>
                  </div>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-white">
                    ₹{c.price}
                  </span>

                  <Link
                    to={`/course/${c._id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 mt-16">
            <p className="text-lg">No courses found.</p>
            <p className="text-sm mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
