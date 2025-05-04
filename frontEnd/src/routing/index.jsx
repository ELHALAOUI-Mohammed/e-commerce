import { createBrowserRouter, Navigate } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import HomePage from "../pages/public/HomePage";
import ProductPage from "../pages/public/Test";
import ProductsPage from "../pages/public/productsPage";
import CategoriesPage from "../pages/public/CategoriesPage";
// import ShoppingCart from "../publicComponents/shoppingCart";
import ShoppingCart from "@/components/PublicConponents/ShoppingCart";
import ProtectedRoute from "../pages/public/protectedRoute";
import LoginPage from "../pages/public/LoginPage";
import ProductForm from "../pages/admin/productForm";
import FavoritePage from "@/pages/client/FavoritesPage";
import ProductsDetails from "@/pages/public/ProductDetails";
import SignupPage from "../pages/public/SignUpPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/home'} />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/test',
        element: <ProductPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/favorites',
        element: <ProtectedRoute><FavoritePage /></ProtectedRoute>,
      },
      {
        path: '/cart',
        element: <ProtectedRoute><ShoppingCart /></ProtectedRoute>,
      },
      {
        path: '/product/:id',
        element: <ProductsDetails />,
      },
    ],
  },
  {
    path: '/pform',
    element: <ProtectedRoute adminOnly><ProductForm /></ProtectedRoute>,
  },
]);