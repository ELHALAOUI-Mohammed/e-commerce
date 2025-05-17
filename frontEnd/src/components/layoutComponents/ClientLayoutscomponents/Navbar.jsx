import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHeart, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaListAlt 
} from 'react-icons/fa';
import { FaBoxes } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import ShoppingCart from '@/components/PublicConponents/ShoppingCart';

export const NavBarClient = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const navLinks = [
    { to: '/customer/home', title: 'Home', icon: <FaHome className="mr-2" /> },
    { to: '/customer/products', title: 'Products', icon: <FaBoxes className="mr-2" /> },
    { to: '/customer/categories', title: 'Categories', icon: <FaListAlt className="mr-2" /> },
  ];

  return (
    <nav className="sticky flex justify-around top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile menu and logo */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/image.png" className="h-8 w-auto" alt="Logo" />
                  <span className="font-bold">VotreMarque</span>
                </Link>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        className={`flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          location.pathname === link.to
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/50'
                        }`}
                      >
                        {link.icon}
                        {link.title === 'Home'
                          ? 'Accueil'
                          : link.title === 'Products'
                          ? 'Produits'
                          : link.title === 'Categories'
                          ? 'Catégories'
                          : link.title}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link to='/customer/favorites' className="flex items-center py-2 px-3 rounded-lg text-sm hover:bg-accent/50">
                      <FaHeart className="mr-2" /> Favoris
                    </Link>
                  </SheetClose>
                </div>
                <div className="mt-4">
                  <SheetClose asChild>
                    <Button variant="destructive" onClick={logout} className="w-full">
                      Se déconnecter
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center">
            <img src="/image.png" className="h-8 w-auto" alt="Logo" />
          </Link>
        </div>

        {/* Desktop logo */}
        <Link to="/" className="hidden md:flex items-center gap-2">
          <img src="/image.png" className="h-8 w-auto" alt="Logo" />
          <span className="font-bold">VotreMarque</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? 'text-foreground'
                  : 'text-foreground/60'
              }`}
            >
              {link.icon}
              {link.title === 'Home'
                ? 'Accueil'
                : link.title === 'Products'
                ? 'Produits'
                : link.title === 'Categories'
                ? 'Catégories'
                : link.title}
            </Link>
          ))}
          <Link to='/customer/favorites' className="flex items-center text-sm text-foreground/60 hover:text-primary">
            <FaHeart className="mr-2" /> Favoris
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <FaCartShopping className="h-4 w-4" />
                <span className="sr-only">Panier</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-auto !max-w-fit">
              <ShoppingCart />
            </DialogContent>
          </Dialog>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Profil</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Voir le profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
