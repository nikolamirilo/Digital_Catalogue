"use client";
import React, { useState } from 'react';
import data from '../../data.json';
import { NavbarProps } from '@/types';

const Navbar = ({ type="menu", restaurant }: NavbarProps) => {
  const [selectedSection, setSelectedSection] = useState('breakfast'); // Default selected section
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = Object.keys(data.restaurants[0].menu).map((item) => {
    return {
      title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' '),
      code: item,
    };
  });

  const selectSection = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <header className="fixed top-0 right-0 w-full z-50 text-white">
      <nav
        className={`bg-primary shadow-lg overflow-hidden md:px-10 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
      >
        {type === "menu" ? (
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="flex w-full items-center py-4 justify-between">
              <div className="hidden lg:flex justify-center items-center w-full">
                <div className="flex md:gap-4 lg:gap-8 relative w-full justify-center items-center">
                  {navItems.map((item) => (
                    <a
                      key={item.code}
                      href={`#${item.code}`}
                      className={`text-lg text-txtPrimary transition duration-300 after:border-b-[3px] after:border-b-tertiary-300 ${selectedSection === item.code ? 'selected' : ''}`}
                      onClick={() => selectSection(item.code)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <button
                className="lg:hidden text-txtPrimary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="block w-6 h-1 text-white mb-1"></span>
                <span className="block w-6 h-1 text-white mb-1"></span>
                <span className="block w-6 h-1 text-white mb-1"></span>
              </button>
            </div>
            {isMobileMenuOpen && (
              <div className="flex flex-col space-y-2 py-4 lg:hidden overflow-hidden animate-fade-in">
                {navItems.map((item) => (
                  <a
                    key={item.code}
                    href={`#${item.code}`}
                    className={`text-lg text-txtPrimary transition duration-300 after:border-b-[3px] after:border-b-tertiary ${selectedSection === item.code ? 'selected' : ''}`}
                    onClick={() => {
                      selectSection(item.code);
                      setIsMobileMenuOpen(false); // Close menu on item click
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : type === "dashboard" ? (
          <div className="w-full relative text-left flex justify-end flex-row min-h-16 items-center">
                  <a
                    href={`/admin/${restaurant}/edit`}
                    className="block px-4 py-2 hover:border-b-4 hover:border-secondary text-secondary text-lg"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Edit Menu
                  </a>
                  <a
                    href="/contact"
                    className="block px-4 py-2 hover:border-b-4 hover:border-secondary text-secondary text-lg"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Contact Support
                  </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
