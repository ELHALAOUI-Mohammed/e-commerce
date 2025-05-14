import { Outlet } from "react-router-dom";
import Footer from "@/components/layoutComponents/Footer";
import  { NavBarClient } from "@/components/layoutComponents/ClientLayoutscomponents/Navbar";
// import { NavBar } from "@/components/layoutComponents/navbar";

export default function CostumerLayouts () {

    return(

        <>
        <NavBarClient/>
        <Outlet/>
        <Footer/>
        </>
    )
}