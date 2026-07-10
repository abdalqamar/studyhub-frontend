import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogIn, Menu, X } from "lucide-react";

import NAVLINK from "@/constants/navLink";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { errorToast, successToast } from "../utils/toastUtils";
import UserPlaceholder from "../ui/UserPlaceholder";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [menuOpen, setMenuOpen] = useState(false);
  const { logoutMutation } = useAuth();
  const { profileQuery } = useProfile();
  const { data: user, isLoading } = profileQuery;

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
        clearAuth();
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
        className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-lg border-b border-border px-6 py-1 transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-gold to-[#a97e1f] flex items-center justify-center flex-shrink-0 font-display font-bold text-bg text-base">
                S
              </div>
              <div>
                <h2 className="font-display font-semibold text-[17px] leading-tight tracking-tight">
                  Study<span className="text-gold">Hub</span>
                </h2>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 font-mono">
              {NAVLINK.map((link, index) => (
                <NavLink
                  key={index}
                  to={link?.to}
                  className={({ isActive }) =>
                    `transition-colors duration-200 font-medium ${
                      isActive ? "text-gold" : "text-white hover:text-gold"
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
                  className="flex items-center gap-2 bg-gold text-bg px-5 py-2 rounded-lg hover:shadow-gold-glow transition-all duration-200 font-semibold"
                >
                  <LogIn size={20} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gold transition-all duration-200 p-2 hover:bg-white/10 rounded-lg relative z-50"
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
            className="fixed top-16 left-0 right-0 bottom-0 bg-surface z-40 overflow-y-auto md:hidden animate-slideDown"
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
                          ? "bg-gold/10 text-gold border border-gold/30"
                          : "text-text-2 hover:bg-surface-2/60 hover:text-white border border-transparent"
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
                        ? "bg-gold/10 text-gold border border-gold/30"
                        : "text-text-2 hover:bg-surface-2/60 hover:text-white border border-transparent"
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
                <div className="w-full py-3 px-5 bg-surface-2/50 rounded-lg animate-pulse" />
              ) : user ? (
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full py-3 px-5 bg-danger text-white rounded-lg font-semibold text-base transition-colors duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Logout"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold hover:from-gold-dim hover:to-gold text-white px-5 py-3 rounded-lg transition-all duration-200 font-medium text-base"
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
