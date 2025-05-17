import { LogOut } from "lucide-react";
import axiosClient from '@/api/axiosClient';
import { useAuth } from "@/context/AuthContext";




export default function DashBoard () {

    const {logout} = useAuth()



    
    return(
    <>
        <p>Voici le tableau de bord.</p>
        
        <button onClick={logout}>log out</button>
        </>
    )
} 