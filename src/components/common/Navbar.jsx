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

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());
        successToast("You’ve been signed out. See you soon!");
        navigate("/login", { replace: true });
        setMenuOpen(false);
      },
      onError: () => {
        errorToast("Logout failed. Try again.");
      },
    });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6">
      <div className="flex justify-between items-center py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
            loading="lazy"
            alt="StudyHub"
            className="w-20 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-semibold">
          {NAVLINK.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-primary-text" : "text-white"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/*  Right Actions */}
        <div className="flex items-center gap-x-4">
          {user && user.role !== "instructor" && user.role !== "admin" && (
            <Link to="/dashboard/cart" className="relative hidden md:block">
              <ShoppingCart className="text-white text-2xl" />
              {cartItems > 0 && (
                <span className="absolute -top-2 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                  {cartItems}
                </span>
              )}
            </Link>
          )}

          {!user && (
            <Link to="/login" className="hidden md:block">
              <button className="flex items-center gap-x-1 bg-btn-primary hover:bg-btn-primary-hover text-white font-semibold px-5 py-2 rounded-xl transition transform hover:scale-105 shadow-lg">
                <LogIn size={20} />
                Login
              </button>
            </Link>
          )}

          {user && (
            <div className="hidden md:block">
              <Dropdown
                user={user}
                handleLogout={handleLogout}
                isLoading={logoutMutation.isPending}
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700">
          <div className="flex flex-col px-6 py-4 space-y-4 text-lg font-semibold">
            {NAVLINK.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-primary-text" : "text-white"
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user && user.role !== "instructor" && user.role !== "admin" && (
              <Link
                to="/dashboard/cart"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Cart ({cartItems})
              </Link>
            )}

            {!user && (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-btn-primary  flex items-center justify-center gap-2 bg-accent-color text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-medium ">
                  <LogIn size={20} />
                  Login
                </button>
              </Link>
            )}

            {user && (
              <button onClick={handleLogout} className="text-red-400 text-left">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { useProfile } from "../../hooks/useProfile";
// import { LogIn, ShoppingCart, Menu, X } from "lucide-react";
// import NAVLINK from "../../constants/navLink";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import Dropdown from "./Dropdown";
// import { clearAuth } from "../../features/auth/authSlice";
// import { successToast, errorToast } from "../../utils/toastUtils";

// const Navbar = () => {
//   const [cartItems] = useState(3);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { logoutMutation } = useAuth();
//   const { profileQuery } = useProfile();
//   const { data: user } = profileQuery;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutMutation.mutate(undefined, {
//       onSuccess: () => {
//         dispatch(clearAuth());
//         successToast("You've been signed out. See you soon!");
//         navigate("/login", { replace: true });
//         setMenuOpen(false);
//       },
//       onError: () => {
//         errorToast("Logout failed. Try again.");
//       },
//     });
//   };

//   const showCart = user && user.role !== "instructor" && user.role !== "admin";

//   return (
//     <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="text-2xl font-bold text-primary-text hover:opacity-90 transition-opacity"
//           >
//             BrandName
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-8">
//             {NAVLINK.map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `transition-colors font-medium ${
//                     isActive
//                       ? "text-primary-text"
//                       : "text-white hover:text-primary-text"
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right Actions */}
//           <div className="hidden md:flex items-center space-x-6">
//             {showCart && (
//               <Link
//                 to="/cart"
//                 className="relative text-white hover:text-primary-text transition-colors"
//               >
//                 <ShoppingCart size={24} />
//                 {cartItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-accent-color text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartItems}
//                   </span>
//                 )}
//               </Link>
//             )}

//             {!user && (
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 bg-accent-color text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium"
//               >
//                 <LogIn size={20} />
//                 Login
//               </Link>
//             )}

//             {user && (
//               <div>
//                 <Dropdown user={user} handleLogout={handleLogout} />
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white hover:text-primary-text transition-colors p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden absolute top-16 left-0 right-0 bg-primary-bg border-t border-gray-700 shadow-xl z-40">
//           <div className="px-4 py-4 space-y-3">
//             {NAVLINK.map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link.path}
//                 onClick={() => setMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `block py-2 px-3 rounded-lg transition-colors font-medium ${
//                     isActive
//                       ? "text-primary-text bg-gray-800"
//                       : "text-white hover:text-primary-text hover:bg-gray-800"
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}

//             {showCart && (
//               <Link
//                 to="/cart"
//                 onClick={() => setMenuOpen(false)}
//                 className="block py-2 px-3 text-white hover:text-primary-text hover:bg-gray-800 rounded-lg transition-colors font-medium"
//               >
//                 Cart ({cartItems})
//               </Link>
//             )}

//             {!user && (
//               <Link
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center justify-center gap-2 bg-accent-color text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-medium mt-2"
//               >
//                 <LogIn size={20} />
//                 Login
//               </Link>
//             )}

//             {user && (
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left py-2 px-3 text-white hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors font-medium"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
