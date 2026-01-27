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
  const [cartItems] = useState(3);

  const showCart = user && user.role !== "instructor" && user.role !== "admin";

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
        className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6 transition-all duration-300"
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
            <div className="hidden md:flex items-center space-x-8">
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
              {/* Cart - only for logged in students */}
              {showCart && (
                <Link
                  to="/cart"
                  className="relative text-white hover:text-primary-text transition-all duration-200 transform hover:scale-110"
                  aria-label={`Shopping cart with ${cartItems} items`}
                >
                  <ShoppingCart size={24} />
                  {cartItems > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-accent-color text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform hover:scale-110"
                      aria-label={`${cartItems} items in cart`}
                    >
                      {cartItems > 99 ? "99+" : cartItems}
                    </span>
                  )}
                </Link>
              )}

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

      {/* Mobile Menu Overlay */}
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
            <div className="px-6 py-6 pb-20">
              {/* Menu Items */}
              <div className="space-y-3 mb-8">
                {NAVLINK.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg transform hover:scale-[1.02] ${
                        isActive
                          ? "bg-blue-600/30 text-white border border-blue-500/40 shadow-lg"
                          : "bg-blue-600/5 text-white hover:bg-blue-600/25 border border-blue-500/20 hover:shadow-md"
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
                    `block py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg mb-5 transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-blue-600/30 text-white border border-blue-500/40 shadow-lg"
                        : "bg-blue-600/5 text-white hover:bg-blue-600/25 border border-blue-500/20 hover:shadow-md"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {/* Divider */}
              <div className="h-px bg-white/10 my-8"></div>

              {/* Cart Link */}
              {showCart && (
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-4 px-6 text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium text-lg mb-5 bg-white/5 transform hover:scale-[1.02] hover:shadow-md"
                  aria-label={`View cart with ${cartItems} items`}
                >
                  <ShoppingCart size={24} />
                  <span>Cart ({cartItems})</span>
                </Link>
              )}

              {/* Auth Actions */}
              {isLoading ? (
                <div className="w-full py-4 px-6 bg-slate-700/50 rounded-xl animate-pulse" />
              ) : user ? (
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
                  aria-label="Logout"
                >
                  {logoutMutation.isLoading ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-200 font-medium text-lg transform hover:scale-[1.02] hover:shadow-lg active:scale-95"
                >
                  <LogIn size={20} />
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
