"use client";
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX, FiHome, FiMail } from "react-icons/fi";
import { NavbarProps } from '@/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const RestaurantNavbar = ({ restaurantData }: NavbarProps) => {
  const [selectedSection, setSelectedSection] = useState('breakfast'); // Default selected section
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [type, setType] = useState<string>("menu")
  const [restaurant, setRestaurant] = useState<string>("")
  const pathname = usePathname()

  const navItems = Object.keys(restaurantData.menu).map((item) => {
    return {
      title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' '),
      code: item,
    };
  });

  const selectSection = (section: string) => {
    setSelectedSection(section);
  };

  function matchThemeColor(theme:string){
    switch(theme){
      case "light_1":
        return "bg-white text-black"
      case "light_2":
        return "bg-gray-100 text-black"
      case "dark_1":
        return "bg-gray-900"
      case "dark_2":
        return "bg-primary"
    }
  }

  useEffect(()=>{
    if(pathname.includes("admin")){
      setType("dashboard")
      const name = pathname.split("/")
      setRestaurant(name[3])
    }else{
      setType("menu")
    }
    console.log(pathname)
  },[])

  // Smooth scroll and expand section
  const handleSectionClick = (code: string) => {
    setSelectedSection(code);
    const el = document.getElementById(code);
    if (el) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 8; // 8px extra spacing
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow text-gray-900 fixed top-0 left-0 z-50">
      {/* Logo and App Name */}
      <div className="flex items-center pl-4">
        <Link href="/">
          <div className="h-12 w-12 relative">
            <Image src={restaurantData.logo || "/logo.webp"} alt="Logo" fill style={{objectFit:'contain'}} />
          </div>
        </Link>
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.code}
            onClick={() => handleSectionClick(item.code)}
            className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:bg-gray-100 ${selectedSection === item.code ? "bg-gray-200 text-primary" : "text-gray-900"}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="focus:outline-none"
        >
          <GiHamburgerMenu size={28} />
        </button>
      </div>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Mobile menu */}
      <div
        className={`fixed flex flex-col justify-start gap-6 items-center py-4 top-0 right-0 h-full w-fit px-1 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-gray-800 focus:outline-none"
        >
          <FiX size={28} />
        </button>
        <div className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <button
              key={item.code}
              onClick={() => handleSectionClick(item.code)}
              className="w-full justify-start px-2 py-2 rounded-md hover:bg-gray-100 text-left"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
