import AppLayout from "./layout/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Animation = lazy(() => import("./pages/Animation"));
const Comp = lazy(() => import("./pages/ComponentW6"));
const Todo = lazy(() => import("./pages/Todo"));
const AuthPage = lazy(() => import("./auth/page"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute"));

export const router = createBrowserRouter([
  { path: "/auth", element: <AuthPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/calc", element: <Calculator /> },
          { path: "/anim", element: <Animation /> },
          { path: "/comp", element: <Comp /> },
          { path: "/todo", element: <Todo /> },
          { path: "/products", element: <Products /> },
          { path: "/cart", element: <Cart /> },
        ],
      },
    ],
  },
], {
  basename: "/csi205",
});
