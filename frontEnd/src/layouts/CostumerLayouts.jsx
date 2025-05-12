import { Outlet } from "react-router-dom";
import Footer from "@/components/layoutComponents/Footer";
import Navbaruser from "@/components/layoutComponents/ClientLayoutscomponents/Navbar";
// import { NavBar } from "@/components/layoutComponents/navbar";

export default function CostumerLayouts () {

    return(

        <>
        <Navbaruser/>
        <Outlet/>
        <Footer/>
        </>
    )
}