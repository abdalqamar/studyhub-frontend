import { Link } from "react-router-dom";
import { useCategories } from "@/features/categories/hooks/useCategories";

// icon set cycled per category — purely decorative, doesn't depend on category name
const ICONS = [
  // code brackets
  <path key="dev" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  // palette (design)
  <path
    key="design"
    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C22 6.012 17.461 2 12 2z"
  />,
  // bar chart (data)
  <path key="data" d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />,
  // megaphone (marketing)
  <path
    key="marketing"
    d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"
  />,
  // briefcase (business)
  <path
    key="business"
    d="M2 7h20v14H2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  />,
  // camera (photography)
  <path
    key="photo"
    d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586"
  />,
];

const CategoryIcons = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading || !categories.length) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5 mb-[30px]">
      {categories.slice(0, 6).map((category, i) => (
        <Link
          key={category._id}
          to={`/courses?page=1&category=${category._id}`}
          className="bg-surface border border-border hover:border-gold-dim hover:bg-gold-soft rounded-sm py-[18px] px-3 text-center transition-colors"
        >
          <div className="w-[34px] h-[34px] mx-auto mb-2.5 rounded-md bg-surface-2 flex items-center justify-center text-gold">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[i % ICONS.length]}
            </svg>
          </div>
          <div className="text-[11.5px] font-semibold truncate">
            {category.name}
          </div>
          <div className="font-mono text-[9.5px] text-text-3 mt-0.5">
            {category.courses ?? 0} courses
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryIcons;
