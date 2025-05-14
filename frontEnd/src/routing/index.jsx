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
import ProductForm from "../components/AdmineComponents/ProductForm";
import FavoritePage from "@/pages/client/FavoritesPage";
import ProductsDetails from "@/pages/public/ProductDetails";
import SignupPage from "../pages/public/SignUpPage";
import DashBoard from "@/pages/admin/DashBoard";
import AdmineLayouts from "@/layouts/AdmineLayouts";
import OrdersTable from "@/components/AdmineComponents/OrdersTable";
import UsersTable from "@/components/AdmineComponents/UsersTable";
import CategoriesTable from "@/components/AdmineComponents/CategoriesTable";
import ProductsTable from "@/components/AdmineComponents/ProductsTable";
import CategoryForm from "@/components/AdmineComponents/CategoryForm";
import EditCategory from "@/components/AdmineComponents/EditCategory";
import EditProduct from "@/components/AdmineComponents/EditProduct";
import PublicRoute from "@/pages/public/PublicRoute";
import CostumerLayouts from "@/layouts/CostumerLayouts";
// import CostumerLayouts from "@/layouts/CostumerLayouts";
// import EditProduct from "@/components/AdmineComponents/EditProduct";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute>

      <Layouts />
    </PublicRoute>,
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
    element: <ProductForm />
  },
  {
    path: '/admin',
    element: <ProtectedRoute>
      <AdmineLayouts />

    </ProtectedRoute> ,
    children: [
      {
        path: '/admin',
        element: <Navigate to={'/admin/dashboard'} />
      },
      {
        path: '/admin/dashboard',
        element: <DashBoard />
      },
      {
        path: '/admin/products',
        element: <ProductsTable />
      },
      {
        path: '/admin/products/add',
        element: <ProductForm />
      },
      {
        path: '/admin/products/edit/:id',
        element: <EditProduct />
      },
      {
        path: '/admin/categories',
        element: <CategoriesTable />
      },
      {
        path: '/admin/categories/add',
        element: <CategoryForm />
      },
      {
        path: '/admin/categories/edit/:id',
        element: <EditCategory />
      },      
      {
        path: '/admin/users',
        element: <UsersTable />
      },
      {
        path: '/admin/orders',
        element: <OrdersTable />
      }
    ],
  }  ,
    {
    path: '/customer',
    element: (
      <ProtectedRoute>
        <CostumerLayouts />
       </ProtectedRoute>
    ),
    children: [
      { path: '/customer', element: <Navigate to="/customer/home" /> },
      { path: '/customer/home', element: <HomePage /> },
      {
        path: '/customer/favorites',
        element: <FavoritePage />
      },
      {
        path: '/customer/products',
        element: <ProductsPage />,
      },
      {
        path: '/customer/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/customer/product/:id',
        element: <ProductsDetails />,
      },
      // { path: '/customer/cart', element: <ShoppingCart /> },
      // { path: '/customer/orders', element: <OrdersPage /> },
    ],
  },
]);