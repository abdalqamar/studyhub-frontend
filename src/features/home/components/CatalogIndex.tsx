import { Link } from "react-router-dom";
import { useCategories } from "@/features/categories/hooks/useCategories";

const CatalogIndex = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <div className="w-7 h-7 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <p className="text-text-3 text-sm py-8">
        No categories yet — check back soon.
      </p>
    );
  }

  return (
    <div className="border-t border-border">
      {categories.map((category, i) => (
        <Link
          key={category._id}
          to={`/courses?page=1&category=${category._id}`}
          className="grid grid-cols-[60px_1fr_24px] sm:grid-cols-[110px_1fr_140px_24px] items-center gap-3 sm:gap-3.5 py-[18px] px-1.5 border-b border-border hover:bg-gold-soft transition-colors group"
        >
          <span className="font-mono text-[11px] text-gold tracking-wide">
            PATH {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display font-bold text-base sm:text-[17px]">
            {category.name}
          </span>
          <span className="hidden sm:block font-mono text-[11.5px] text-text-3 text-right">
            {category.courses ?? 0} courses
          </span>
          <span className="text-gold text-right transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CatalogIndex;
