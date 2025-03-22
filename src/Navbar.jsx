import React, { useState } from "react";
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 sticky top-0 w-full z-50">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold tracking-wide">
          KRACKED<span className="text-sm align-super">®</span>
        </div>

        {/* Center: Navigation Links (Hidden on small screens) */}
        <div className="hidden md:flex space-x-6 text-gray-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
          <UserIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
          <div className="relative">
            <ShoppingBagIcon
              className="h-6 w-6 cursor-pointer hover:text-gray-400"
              onClick={onCartClick}
            />
            {/* Cart Badge */}
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </div>

          {/* Mobile Menu Button (Hidden on larger screens) */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible only when `isOpen` is true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-black py-4 space-y-3 border-t border-gray-700">
          <Link to="/" className="hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" className="hover:text-white" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/contact" className="hover:text-white" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
