import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { LogIn, ShoppingCart, Menu, X } from "lucide-react";
import NAVLINK from "../../constants/navLink";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { clearAuth } from "../../features/auth/authSlice";
import { successToast, errorToast } from "../../utils/toastUtils";

const Navbar = () => {
  const [cartItems] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logoutMutation } = useAuth();
  const { profileQuery } = useProfile();
  const { data: user } = profileQuery;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showCart = user && user.role !== "instructor" && user.role !== "admin";

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

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="transition-transform hover:scale-105 duration-200"
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
                  `transition-colors duration-200 ${
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
            {/* Cart sirf logged in users ke liye  */}
            {showCart && (
              <Link
                to="/cart"
                className="relative text-white hover:text-primary-text transition-all duration-200 transform hover:scale-110"
              >
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-color text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform hover:scale-110">
                    {cartItems}
                  </span>
                )}
              </Link>
            )}

            {/* Agar user nahi hai to Login button dikhao */}
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-accent-color text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}

            {/* Agar user hai to Dropdown dikhao */}
            {user && <Dropdown user={user} handleLogout={handleLogout} />}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-primary-text transition-all duration-200 p-2 hover:bg-white/10 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 shadow-2xl z-40 min-h-screen animate-fadeIn">
          <div className="px-6 py-6">
            {/* Menu Items */}
            <div className="space-y-3 mb-8">
              {NAVLINK.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-blue-600 bg-opacity-30 text-white border border-blue-500 border-opacity-40 shadow-lg"
                        : "bg-blue-600 bg-opacity-5 text-white hover:bg-opacity-25 border border-blue-500 border-opacity-20 hover:shadow-md"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {user && (
              <NavLink
                to={user?.role}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-4 px-6 rounded-xl transition-all duration-200 font-medium text-lg mb-5 transform hover:scale-[1.02] ${
                    isActive
                      ? "bg-blue-600 bg-opacity-30 text-white border border-blue-500 border-opacity-40 shadow-lg"
                      : "bg-blue-600 bg-opacity-5 text-white hover:bg-opacity-25 border border-blue-500 border-opacity-20 hover:shadow-md"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Divider */}
            <div className="h-px bg-white bg-opacity-10 my-8"></div>

            {showCart && (
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-4 px-6 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all duration-200 font-medium text-lg mb-5 bg-white bg-opacity-5 transform hover:scale-[1.02] hover:shadow-md"
              >
                <ShoppingCart size={24} />
                <span>Cart ({cartItems})</span>
              </Link>
            )}

            {/* Conditional rendering based on login status */}
            {user ? (
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
              >
                {logoutMutation.isLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              // Login Button for non-logged in users
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-200 font-medium text-lg transform hover:scale-[1.02] hover:shadow-lg active:scale-95"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
