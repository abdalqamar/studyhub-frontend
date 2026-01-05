import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { LogIn, ShoppingCart } from "lucide-react";
import NAVLINK from "../../constants/navLink";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { clearAuth } from "../../features/auth/authSlice";
import { successToast } from "../../utils/toastUtils";

const Navbar = () => {
  const [cartItems, setCartItems] = useState(3);
  const { logoutMutation } = useAuth();
  const { profileQuery } = useProfile();
  const { data: user } = profileQuery;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());
        successToast("You’ve been signed out. See you soon!");
        navigate("/login", { replace: true });
      },
      onError: () => {
        errorToast("Logout failed. Try again.");
      },
    });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6">
      <div className="flex  flex-row justify-between items-center py-2 max-w-7xl mx-auto">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
            loading="lazy"
            alt="StudyHub"
            className="w-20 h-15 object-contain "
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-lg font-semibold ">
          {NAVLINK.map((link, index) => (
            <NavLink
              key={index}
              to={link?.to}
              className={({ isActive }) =>
                isActive ? "text-primary-text " : "text-white"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-x-4 items-center">
          {user && user.role !== "instructor" && user.role !== "admin" && (
            <Link to="/dashboard/cart" className="relative">
              <ShoppingCart className="text-white text-2xl relative" />
              {cartItems > 0 && (
                <span className="absolute top-[-8px] right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                  {cartItems}
                </span>
              )}
            </Link>
          )}

          {!user && (
            <Link to={"/login"}>
              <button className="flex items-center gap-x-1 bg-btn-primary hover:bg-btn-primary-hover hover:to-indigo-400 text-white  font-semibold transition group-hover:shadow-blue-500/25 px-5 py-2 rounded-xl  transform hover:scale-105 shadow-lg ">
                <LogIn className="text-sm" />
                Login
              </button>
            </Link>
          )}

          {user && (
            <Dropdown
              user={user}
              handleLogout={handleLogout}
              isLoading={logoutMutation.isPending}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
