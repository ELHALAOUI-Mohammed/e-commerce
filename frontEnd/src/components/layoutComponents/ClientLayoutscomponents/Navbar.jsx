import React from 'react';
import { useAuth } from '@/context/AuthContext';



const Navbaruser = () => {
    const {logout} = useAuth()
        return (
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <div className="text-xl font-bold">MyLogo</div>
                <ul className="flex space-x-6">
                    <li><a href="#home" className="text-white hover:text-gray-400">Home</a></li>
                    <li><a href="#about" className="text-white hover:text-gray-400">About</a></li>
                    <li><a href="#contact" className="text-white hover:text-gray-400">Contact</a></li>
                    <li><button type='button' onClick={logout}>log out</button></li>
                </ul>
            </nav>
        );
    };

    export default Navbaruser; 