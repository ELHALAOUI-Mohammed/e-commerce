import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"


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
                <img src="image.png" className="h-10 w-auto mx-4" alt="Logo" />
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
                      <Link to="/favorites" className="hover:text-gray-300 flex items-center">
                          <FontAwesomeIcon icon={faHeart} className="h-5 w-5 mr-1" />
                      </Link>
                  </li>
                <li>
                    <Link to="/cart" className="hover:text-gray-300 flex items-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
                    </Link>
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
