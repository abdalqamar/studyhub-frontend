const CategoryStats = ({ categories }) => {
  const totalCourses = categories.reduce(
    (total, category) => total + (category.courses || 0),
    0
  );

  return (
    <div className="mt-8 pt-6 border-t border-slate-700">
      <h3 className="text-lg font-medium text-slate-300 mb-4">
        Category Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-100">
            {categories.length}
          </div>
          <div className="text-sm text-slate-400">Total Categories</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-100">
            {totalCourses}
          </div>
          <div className="text-sm text-slate-400">Total Courses</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
