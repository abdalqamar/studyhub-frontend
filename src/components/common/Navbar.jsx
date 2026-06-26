import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { LogIn, ShoppingCart, Menu, X } from "lucide-react";
import NAVLINK from "../../constants/navLink";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { clearAuth } from "../../features/auth/authSlice";
import { successToast, errorToast } from "../../utils/toastUtils";
import UserPlaceholder from "../ui/UserPlaceholder";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logoutMutation } = useAuth();
  const { profileQuery } = useProfile();
  const { data: user, isLoading } = profileQuery;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());
        successToast("You've been signed out. See you soon!");
        navigate("/login", { replace: true });
        setMenuOpen(false);
      },
      onError: () => {
        errorToast("Logout failed. Try again.");
      },
    });
  };

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6 py-1 transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="transition-transform hover:scale-105 duration-200 relative z-50"
              aria-label="StudyHub Home"
            >
              <img
                src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
                loading="lazy"
                alt="StudyHub"
                className="w-20 h-15 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 font-['JetBrains_Mono']">
              {NAVLINK.map((link, index) => (
                <NavLink
                  key={index}
                  to={link?.to}
                  className={({ isActive }) =>
                    `transition-colors duration-200 font-medium ${
                      isActive
                        ? "text-primary-text"
                        : "text-white hover:text-primary-text"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {isLoading ? (
                <UserPlaceholder />
              ) : user ? (
                <Dropdown user={user} handleLogout={handleLogout} />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-accent-color text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
                >
                  <LogIn size={20} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-primary-text transition-all duration-200 p-2 hover:bg-white/10 rounded-lg relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu  */}
      {menuOpen && (
        <>
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 bottom-0 bg-slate-900 z-40 overflow-y-auto md:hidden animate-slideDown"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-5 py-5 pb-16">
              <div className="space-y-1.5 mb-6">
                {NAVLINK.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-3 px-5 rounded-lg transition-colors duration-200 font-medium text-base ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Dashboard Link for logged in users */}
              {user && (
                <NavLink
                  to={`/${user.role}`}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block py-3 px-5 rounded-lg transition-colors duration-200 font-medium text-base mb-4 ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {/* Divider */}
              <div className="h-px bg-white/10 my-6" />

              {/* Auth Actions */}
              {isLoading ? (
                <div className="w-full py-3 px-5 bg-slate-800/50 rounded-lg animate-pulse" />
              ) : user ? (
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isLoading}
                  className="w-full py-3 px-5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg font-semibold text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Logout"
                >
                  {logoutMutation.isLoading ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-5 py-3 rounded-lg transition-all duration-200 font-medium text-base"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
