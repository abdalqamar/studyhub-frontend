// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { useProfile } from "../../hooks/useProfile";
// import { LogIn, ShoppingCart } from "lucide-react";
// import NAVLINK from "../../constants/navLink";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import Dropdown from "./Dropdown";
// import { clearAuth } from "../../features/auth/authSlice";
// import { successToast } from "../../utils/toastUtils";

// const Navbar = () => {
//   const [cartItems, setCartItems] = useState(3);
//   const { logoutMutation } = useAuth();
//   const { profileQuery } = useProfile();
//   const { data: user } = profileQuery;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutMutation.mutate(undefined, {
//       onSuccess: () => {
//         dispatch(clearAuth());
//         successToast("You’ve been signed out. See you soon!");
//         navigate("/login", { replace: true });
//       },
//       onError: () => {
//         errorToast("Logout failed. Try again.");
//       },
//     });
//   };

//   return (
//     <header className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6">
//       <div className="flex  flex-row justify-between items-center py-2 max-w-7xl mx-auto">
//         <Link to="/">
//           <img
//             src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
//             loading="lazy"
//             alt="StudyHub"
//             className="w-20 h-15 object-contain "
//           />
//         </Link>

//         <nav className="flex items-center space-x-6 text-lg font-semibold ">
// {NAVLINK.map((link, index) => (
//   <NavLink
//     key={index}
//     to={link?.to}
//     className={({ isActive }) =>
//       isActive ? "text-primary-text " : "text-white"
//     }
//   >
//     {link.label}
//   </NavLink>
// ))}
//         </nav>
//         <div className="flex gap-x-4 items-center">
//           {user && user.role !== "instructor" && user.role !== "admin" && (
//             <Link to="/dashboard/cart" className="relative">
//               <ShoppingCart className="text-white text-2xl relative" />
//               {cartItems > 0 && (
//                 <span className="absolute top-[-8px] right-0 bg-red-500 text-white rounded-full px-1 text-xs">
//                   {cartItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {!user && (
//             <Link to={"/login"}>
//               <button className="flex items-center gap-x-1 bg-btn-primary hover:bg-btn-primary-hover hover:to-indigo-400 text-white  font-semibold transition group-hover:shadow-blue-500/25 px-5 py-2 rounded-xl  transform hover:scale-105 shadow-lg ">
//                 <LogIn className="text-sm" />
//                 Login
//               </button>
//             </Link>
//           )}

//           {user && (
//             <Dropdown
//               user={user}
//               handleLogout={handleLogout}
//               isLoading={logoutMutation.isPending}
//             />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

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
//     <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6 ">
//       <div className="max-w-7xl mx-auto ">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/">
//             <img
//               src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
//               loading="lazy"
//               alt="StudyHub"
//               className="w-20 h-15 object-contain "
//             />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-8">
//             {NAVLINK.map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link?.to}
//                 className={({ isActive }) =>
//                   isActive ? "text-primary-text " : "text-white"
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

//             {user && <Dropdown user={user} handleLogout={handleLogout} />}
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

//       {/* Mobile Menu*/}
//       {menuOpen && (
//         <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 shadow-2xl z-40 min-h-screen">
//           <div className="px-6 py-6">
//             {/* Menu Items */}
//             <div className="space-y-3 mb-8 ">
//               {NAVLINK.map((link, index) => (
//                 <NavLink
//                   key={index}
//                   to={link.path}
//                   onClick={() => setMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `block py-4 px-6 rounded-xl transition-all font-medium text-lg ${
//                       isActive
//                         ? "bg-blue-600 bg-opacity-30 text-white border border-blue-500 border-opacity-40"
//                         : "bg-blue-600 bg-opacity-15 text-white hover:bg-opacity-25 border border-blue-500 border-opacity-20"
//                     }`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}
//             </div>

//             {/* Divider */}
//             <div className="h-px bg-white bg-opacity-10 my-8"></div>

//             {/* Cart - Screenshot Style */}
//             {showCart && (
//               <Link
//                 to="/cart"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-3 py-4 px-6 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all font-medium text-lg mb-5 bg-white bg-opacity-5"
//               >
//                 <ShoppingCart size={24} />
//                 <span>Cart ({cartItems})</span>
//               </Link>
//             )}

//             {/* Logout Button - Screenshot Style */}
//             {user && (
//               <button
//                 onClick={handleLogout}
//                 disabled={logoutMutation.isLoading}
//                 className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {logoutMutation.isLoading ? "Logging out..." : "Logout"}
//               </button>
//             )}

//             {/* Login Button for non-logged in users */}
//             {!user && (
//               <Link
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-opacity-90 transition-all font-medium text-lg mt-2"
//               >
//                 <LogIn size={20} />
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

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
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-lg border-b border-slate-700 px-6 ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
              loading="lazy"
              alt="StudyHub"
              className="w-20 h-15 object-contain "
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
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
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart sirf logged in users ke liye  */}
            {showCart && (
              <Link
                to="/cart"
                className="relative text-white hover:text-primary-text transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-color text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>
            )}

            {/* Agar user nahi hai to Login button dikhao */}
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-accent-color text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium"
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
            className="md:hidden text-white hover:text-primary-text transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 shadow-2xl z-40 min-h-screen">
          <div className="px-6 py-6">
            {/* Menu Items */}
            <div className="space-y-3 mb-8">
              {NAVLINK.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-6 rounded-xl transition-all font-medium text-lg ${
                      isActive
                        ? "bg-blue-600 bg-opacity-30 text-white border border-blue-500 border-opacity-40"
                        : "bg-blue-600 bg-opacity-5 text-white hover:bg-opacity-25 border border-blue-500 border-opacity-20"
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
                  `block py-4 px-6 rounded-xl transition-all font-medium text-lg mb-5 ${
                    isActive
                      ? "bg-blue-600 bg-opacity-30 text-white border border-blue-500 border-opacity-40"
                      : "bg-blue-600 bg-opacity-5 text-white hover:bg-opacity-25 border border-blue-500 border-opacity-20"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Divider */}
            <div className="h-px bg-white bg-opacity-10 my-8"></div>

            {/* Cart - Mobile me bhi sirf logged in users ke liye */}
            {showCart && (
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-4 px-6 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all font-medium text-lg mb-5 bg-white bg-opacity-5"
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
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {logoutMutation.isLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              // Login Button for non-logged in users
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-opacity-90 transition-all font-medium text-lg"
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
