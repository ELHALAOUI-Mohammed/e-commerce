import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/public/LoginPage";
import SignUpPage from "../pages/public/SignUpPage";
import HomePage from "../pages/public/HomePage";
import Layouts from "../layouts/Layouts";
import ProductPage from "@/pages/public/Test";
import ProductForm from "@/pages/admin/productForm";
import ProductsPage from "@/pages/public/ProductsPage";
import CategoriesPage from "@/pages/public/CategoriesPage";



export const router = createBrowserRouter ([
{
    path: '/',
    element: <Layouts/> , 
    children : [
        {
            path:'/',
            element : <Navigate to={'/home'}/> ,
        },
        {
            path:'/home',
            element : <HomePage/> ,
        },
        {
            path:'/test',
            element : <ProductPage/> ,
        },
        {
            path:'/products',
            element : <ProductsPage/> ,
        },
        {
            path:'/categories',
            element : <CategoriesPage/> ,
        },
        {
            path: '/SignUp',
            element: <SignUpPage/>
        },
        {
            path: '/login',
            element: <LoginPage/>
        },
    ]
},
{
    path: '/pform',
    element: <ProductForm/>
},

])