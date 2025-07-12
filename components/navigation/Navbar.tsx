"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegCirclePlay } from "react-icons/fa6";
import {
  FiX,
  FiHome,
  FiDollarSign,
  FiMail,
  FiUser,
  FiUserPlus,
  FiGrid,
} from "react-icons/fi";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="w-full flex items-center justify-between px-6 font-lora py-4 bg-product-background shadow-lg border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:scale-105 hover:opacity-80 group">
          <div className="relative">
            <Avatar className="w-20 h-auto transition-all duration-200 group-hover:shadow-md">
              <AvatarImage src="/logo.svg" alt="Logo" />
              <AvatarFallback className="bg-product-foreground text-white font-bold">DM</AvatarFallback>
            </Avatar>
          </div>
          <span className="font-bold text-xl text-black transition-colors duration-200 group-hover:text-product-primary">Digital Menu</span>
        </Link>
      </div>
      
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-2">
        <Link href="/">
          <Button variant="navbar" className="font-semibold">
            <FiHome  />
            Home
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="navbar" className="font-semibold">
            <FiMail  />
            Contact
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="navbar" className="font-semibold">
            <FaRegCirclePlay  />
            Demo
          </Button>
        </Link>
        
        <div className="ml-4 flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link href="/admin/dashboard">
                <Button className="bg-product-primary text-product-foreground hover:bg-primary-accent hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200 shadow-md font-semibold">
                  <FiGrid  />
                  Dashboard
                </Button>
              </Link>
              <div className="ml-2 flex items-center gap-1 text-base">
                <UserButton/>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button className="bg-white text-product-foreground border-2 border-product-primary hover:bg-product-primary hover:text-white hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200 font-semibold">
                <FiUser  />
                Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button className="bg-product-primary text-product-foreground hover:bg-primary-accent hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200 font-semibold">
                  <FiUserPlus  />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
        >
          <GiHamburgerMenu size={24} className="text-product-foreground" />
        </button>
      </div>
      
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu */}
      <div
        className={`fixed flex flex-col top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="font-bold text-lg text-black">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
          >
            <FiX size={24} className="text-product-foreground" />
          </button>
        </div>
        
        {/* Mobile menu items */}
        <div className="flex flex-col p-6 gap-3">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-navbar-button-hover-bg hover:text-navbar-button-hover-text text-left transition-all duration-200 hover:shadow-md hover:scale-105 hover:transform hover:-translate-y-1 border border-transparent hover:border-navbar-button-hover-border hover:font-bold">
              <FiHome size={20} className="text-gray-600" />
              <span className="text-product-foreground font-medium">Home</span>
            </button>
          </Link>
          
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-navbar-button-hover-bg hover:text-navbar-button-hover-text text-left transition-all duration-200 hover:shadow-md hover:scale-105 hover:transform hover:-translate-y-1 border border-transparent hover:border-navbar-button-hover-border hover:font-bold">
              <FiMail size={20} className="text-gray-600" />
              <span className="text-product-foreground font-medium">Contact</span>
            </button>
          </Link>
          
          <Link href="/demo" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-navbar-button-hover-bg hover:text-navbar-button-hover-text text-left transition-all duration-200 hover:shadow-md hover:scale-105 hover:transform hover:-translate-y-1 border border-transparent hover:border-navbar-button-hover-border hover:font-bold">
              <FaRegCirclePlay size={20} className="text-gray-600" />
              <span className="text-product-foreground font-medium">Demo</span>
            </button>
          </Link>
          
          {isSignedIn ? (
            <>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-product-primary text-product-foreground transition-colors">
                    <FiGrid size={20} />
                    Dashboard
                  </button>
                </Link>
                <div className="mt-4 flex items-center justify-center">
                  <UserButton showName={true}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                <Link href="/auth" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start mb-3 border-gray-300 text-product-foreground ">
                    <FiUser size={20} className="mr-3" />
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full justify-start bg-black  text-white">
                    <FiUserPlus size={20} className="mr-3" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;