// page
import { CreateRecipe, EditProfile, Home, Login, Register } from "./page";
import { action as RegisterAction } from "./page/Register";
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

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
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
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
