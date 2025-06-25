"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";

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
        <Link href="/contact">
          <Button variant="ghost">Contact Us</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="ghost">Pricing</Button>
        </Link>
        {isSignedIn ? (
          <>
            <Link href="/admin/dashboard" className="text-white">
              <Button>Dashboard</Button>
            </Link>
            <div className="mx-4">
              <UserButton />
            </div>
          </>
        ) : (
          <>
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth?mode=signup" className="text-white">
              <Button>Sign Up</Button>
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
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
      )}
      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-gray-700 hover:text-primary focus:outline-none"
        >
          <FiX size={28} />
        </button>
        <div className="flex flex-col p-6 gap-4 pt-16">
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Contact Us</Button>
          </Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Pricing</Button>
          </Link>
          {isSignedIn ? (
            <>
              <Link href="/admin/dashboard" className="text-white" onClick={() => setMobileOpen(false)}>
                <Button className="w-full justify-start">Dashboard</Button>
              </Link>
              <div className="mt-2 flex items-center">
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full justify-start">Sign In</Button>
              </Link>
              <Link href="/auth?mode=signup" className="text-white" onClick={() => setMobileOpen(false)}>
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
