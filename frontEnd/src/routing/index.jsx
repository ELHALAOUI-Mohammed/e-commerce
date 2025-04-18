import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/public/LoginPage";
import SignUpPage from "../pages/public/SignUpPage";
import HomePage from "../pages/public/HomePage";
import Layouts from "../layouts/Layouts";



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


    ]
},
{
    path: '/SignUp',
    element: <SignUpPage/>
},

])