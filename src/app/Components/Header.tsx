"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Website Name */}
        <h1 className="text-2xl font-bold text-teal-700">Website Name</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-600">
          <NavItem label="Home" href="/" />
          <NavItem label="About" href="/about" />
          <NavItem label="user dashboard" href="/dashboard" />
          <NavItem label="Notifications" href="/notifications" />
          <NavItem label="Contact Us" href="/contact" />
          <NavItem label="FAQ" href="/faq" />
        </nav>

        {/* Profile & Mobile Menu Button */}
        <div className="flex items-center space-x-10">
          <div className="md:hidden pt-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-teal-700">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className="md:flex items-center space-x-2">
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"
        } w-full bg-white shadow-md`}
      >
        <ul className="flex flex-col space-y-4 p-4 text-gray-600">
          <NavItem label="logout" href="/logout" />
          <NavItem label="Home" href="/Home" />
          <NavItem label="About" href="/about" />
          <NavItem label="Notifications" href="/notifications" />
          <NavItem label="Contact Us" href="/contact" />
          <NavItem label="user dashboard" href="/dashboard" />
          <NavItem label="FAQ" href="/faq" />
        </ul>
      </div>
    </header>
  );
};

// Reusable Nav Item Component with Next.js Link
const NavItem = ({ label, href }: { label: string; href: string }) => (
  <li>
    <Link href={href} className="hover:text-teal-600 cursor-pointer">
      {label}
    </Link>
  </li>
);

export default Header;
