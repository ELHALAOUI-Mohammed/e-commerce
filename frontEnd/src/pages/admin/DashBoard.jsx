import { LogOut } from "lucide-react";
import axiosClient from '@/api/axiosClient';
import { useAuth } from "@/context/AuthContext";




export default function DashBoard () {

    const {logout} = useAuth()



    
    return(
    <>
        <p>this is the DashBoard</p>
        
        <button onClick={logout}>log out</button>
        </>
    )
} 