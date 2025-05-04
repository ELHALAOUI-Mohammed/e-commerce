
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ShoppingCart from '../PublicConponents/ShoppingCart';
  




export default function NavBar() {
    const location = useLocation();

    const navLinks = [
        { to: '/home', title: 'Home' },
        { to: '/products', title: 'Products' },
        { to: '/categories', title: 'Categories' },
    ];

    const actionButtons = [
      {
          to: '/signup',
          label: 'Signup',
          var: 'ghost',
          active: '',
      },
        {
            to: '/login',
            label: 'Login',
            var: 'default',
            
        },
    ];

    return (
        <nav className="flex justify-between items-center bg-white p-4 text-black">
            <Link to="/">
                <img src="/image.png" className="h-10 w-auto mx-4" alt="Logo" />
            </Link>

            <ul className="flex space-x-4 items-center">

                {navLinks.map((link) => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className={`hover:text-gray-300 ${
                              location.pathname === link.to ? 'border-b-1 border-b-black border-b-solid' : ''
                          }`}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
                  <li>
                      <Link to="/favorites" >
                          <FaHeart  className="h-5 w-5 mr-1  hover:text-gray-300 " />
                      </Link>
                  </li>
                <li>
                    
                                    <Dialog>
                                <DialogTrigger ><FaCartShopping  className="h-5 w-5 mt-1.5 hover:text-gray-300  " /></DialogTrigger>
                                <DialogContent>
                                <ShoppingCart/>
                                         </DialogContent>
                                            </Dialog>

                </li>

                
                {actionButtons.map((btn) => (
                    <li key={btn.to}>
                        <Link
                            to={btn.to}

                            >
                            <Button variant={btn.var}>{btn.label}</Button>
                        
                            
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
