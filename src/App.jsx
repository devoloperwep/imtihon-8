// react
import { useEffect } from "react";

// page
import { CreateRecipe, EditProfile, Home, Login, Register } from "./page";
import { action as RegisterAction } from "./page/Register";
import { action as LoginAction } from "./page/Login";
// components
import ProtectedRoutes from "./components/ProtectedRoutes";
// react-router-dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// layout
import MainLayout from "./layout/MainLayout";
// ✅ Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// redux
import { useDispatch, useSelector } from "react-redux";
import { isAuthReady, login } from "./app/feature/userSlice";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  const dispatch = useDispatch();

  const { user, authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/createRecipe",
          element: <CreateRecipe />,
        },
        {
          path: "editProfile",
          element: <EditProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <>{authReady && <RouterProvider router={routes} />}</>
    </>
  );
}

export default App;
