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
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow text-gray-900 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/logo.webp" alt="Logo" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
        </Link>
        <span className="font-bold text-xl text-primary">Digital Menu</span>
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/pricing">
          <Button variant="ghost">
            <FiDollarSign />
            Pricing
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">
            <FiMail />
            Contact
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="ghost">
            <FaRegCirclePlay />
            Demo
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">
            <FiHome />
            Home
          </Button>
        </Link>
        {isSignedIn ? (
          <>
            <Link href="/admin/dashboard" className="text-white">
              <Button>
                <FiGrid />
                Dashboard
              </Button>
            </Link>
            <div className="mx-4">
              <UserButton />
            </div>
          </>
        ) : (
          <>
            <Link href="/auth">
              <Button variant="outline">
                <FiUser className="mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth?mode=signup" className="text-white">
              <Button>
                <FiUserPlus className="mr-2" />
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="focus:outline-none"
        >
          <GiHamburgerMenu size={28} />
        </button>
      </div>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* Mobile menu */}
      <div
        className={`fixed flex flex-col justify-start gap-6 items-center py-4 top-0 right-0 h-full w-fit px-1 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className=" text-gray-800 focus:outline-none"
        >
          <FiX size={28} />
        </button>
        <div className="flex flex-col p-6 gap-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <button className="w-full justify-start">
              <FiHome size={25} color="black" />
            </button>
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
          <button className="w-full justify-start">
              <FiMail size={25} color="black" />
            </button>
          </Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>
          <button className="w-full justify-start">
              <FiDollarSign size={25} color="black" />
            </button>
          </Link>
          {isSignedIn ? (
            <>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileOpen(false)}
              >
                <button className="w-full justify-start">
                  <FiGrid size={25} color="black"/>
                </button>
              </Link>
              <div className="mt-2 flex items-center">
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <FiUser size={22} />
                </Button>
              </Link>
              <Link
                href="/auth?mode=signup"
                className="text-white"
                onClick={() => setMobileOpen(false)}
              >
                <Button className="w-full justify-start">
                  <FiUserPlus size={22} />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
