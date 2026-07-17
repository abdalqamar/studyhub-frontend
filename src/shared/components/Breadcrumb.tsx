import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  name: string;
  path: string;
}

const Breadcrumb = () => {
  const location = useLocation();

  const formatName = (segment: string): string =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const generateBreadcrumbs = (): Crumb[] => {
    const paths = location.pathname.split("/").filter(Boolean);
    const crumbs: Crumb[] = [];

    for (let i = 0; i < paths.length; i++) {
      const pathSegment = paths[i];
      const fullPath = "/" + paths.slice(0, i + 1).join("/");

      if (/^[a-f\d]{24}$/i.test(pathSegment) || /^\d+$/.test(pathSegment)) {
        continue;
      }

      crumbs.push({
        name: formatName(pathSegment),
        path: fullPath,
      });
    }

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <div className="bg-surface-2/40 backdrop-blur-sm border-b border-border/30 px-6 py-3">
      <div className="flex items-center gap-2 text-sm">
        <NavLink to="/" className="text-gray-400 hover:text-white transition">
          Home
        </NavLink>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-600" />
            <NavLink
              to={crumb.path}
              className={`transition ${
                index === breadcrumbs.length - 1
                  ? "text-gold font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {crumb.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
