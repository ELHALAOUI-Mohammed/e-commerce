import { Outlet } from "react-router-dom";
import NavBar from "../components/layoutComponents/navbar";

export default function Layouts () {

    return(

        <>
        <NavBar/>
        <Outlet/>
        <p>footer</p>
        </>
    )
}