// page
import { CreateRecipe, EditProfile, Home, Login, Signup } from "./page";
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

function App() {
  const user = true;

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
          index: "/",
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
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
