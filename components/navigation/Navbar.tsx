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
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-lg border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-black ring-offset-2">
              <AvatarImage src="/logo.webp" alt="Logo" />
              <AvatarFallback className="bg-black text-white font-bold">DM</AvatarFallback>
            </Avatar>
          </div>
          <span className="font-bold text-xl text-black">Digital Menu</span>
        </Link>
      </div>
      
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" className="text-gray-800 hover:text-black hover:bg-gray-50 transition-colors">
            <FiHome className="mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost" className="text-gray-800 hover:text-black hover:bg-gray-50 transition-colors">
            <FiMail className="mr-2" />
            Contact
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="ghost" className="text-gray-800 hover:text-black hover:bg-gray-50 transition-colors">
            <FaRegCirclePlay className="mr-2" />
            Demo
          </Button>
        </Link>
        
        <div className="ml-4 flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link href="/admin/dashboard">
                <Button className="bg-black hover:bg-gray-900 text-white transition-colors shadow-md">
                  <FiGrid className="mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="ml-2">
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button>
                <FiUser className="mr-2" />
                Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button>
                  <FiUserPlus className="mr-2" />
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
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
        >
          <GiHamburgerMenu size={24} className="text-gray-800" />
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
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors"
          >
            <FiX size={24} className="text-gray-800" />
          </button>
        </div>
        
        {/* Mobile menu items */}
        <div className="flex flex-col p-6 gap-3">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <FiHome size={20} className="text-gray-600" />
              <span className="text-gray-800">Home</span>
            </button>
          </Link>
          
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <FiMail size={20} className="text-gray-600" />
              <span className="text-gray-800">Contact</span>
            </button>
          </Link>
          
          <Link href="/demo" onClick={() => setMobileOpen(false)}>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <FaRegCirclePlay size={20} className="text-gray-600" />
              <span className="text-gray-800">Demo</span>
            </button>
          </Link>
          
          {isSignedIn ? (
            <>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-900 text-white transition-colors">
                    <FiGrid size={20} />
                    <span>Dashboard</span>
                  </button>
                </Link>
                <div className="mt-4 flex items-center justify-center">
                  <UserButton />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                <Link href="/auth" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-800 hover:bg-gray-50">
                    <FiUser size={20} className="mr-3" />
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full justify-start bg-black hover:bg-gray-900 text-white">
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