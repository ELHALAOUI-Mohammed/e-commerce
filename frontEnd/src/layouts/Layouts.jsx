import { Outlet } from "react-router-dom";
// import NavBar from "../components/layoutComponents/navbar";
import Footer from "@/components/layoutComponents/Footer";
import { NavBar } from "@/components/layoutComponents/navbar";

export default function Layouts () {

    return(

        <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    )   
}