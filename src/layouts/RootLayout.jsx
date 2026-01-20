import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { API_ENDPOINTS } from "../api/endpoints";
import {
  setUser,
  setToken,
  clearAuth,
  setAuthChecked,
} from "../features/auth/authSlice";
import axiosInstance from "../api/axiosInstance";

// const RootLayout = () => {
//   const dispatch = useDispatch();
//   const { isInitializing } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const { data } = await axiosInstance.post(API_ENDPOINTS.REFRESH_TOKEN);

//         dispatch(setToken(data.accessToken));
//         dispatch(setUser(data.user));
//       } catch (err) {
//         dispatch(clearAuth());
//       } finally {
//         dispatch(finishLoading());
//       }
//     };

//     init();
//   }, [dispatch]);

//   return (
//     <>
//       {isInitializing && <LoadingSpinner />}
//       <Outlet />
//     </>
//   );
// };

// export default RootLayout;

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.REFRESH_TOKEN)
      .then(({ data }) => {
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.user));
      })
      .catch(() => {
        dispatch(clearAuth());
      })
      .finally(() => {
        dispatch(setAuthChecked());
      });
  }, [dispatch]);

  return <Outlet />;
};

export default RootLayout;
