"use client";
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarProps } from '@/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

const Navbar = ({ restaurantData }: NavbarProps) => {
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

  return (
    <header className="fixed top-0 right-0 w-full z-50 text-white">
      <nav
        className={`${matchThemeColor(restaurantData.theme)} shadow-lg overflow-hidden md:px-10 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
      >
        {type === "menu" ? (
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="flex w-full items-center py-4 justify-between relative">
              <Image src={restaurantData.logo} width={50} height={50} className='absolute left-2 top-0 h-full w-auto' alt='Logo'/>
              <div className={`flex justify-center items-center w-full`}>
                <div className="hidden lg:flex md:gap-4 lg:gap-8 relative w-full justify-center items-center transition-all ease-out duration-200">
                  {navItems.map((item) => (
                    <a
                      key={item.code}
                      href={`#${item.code}`}
                      className={`text-lg text-white transition duration-300 after:border-b-[3px] after:border-b-tertiary-300 ${selectedSection === item.code ? 'selected' : ''}`}
                      onClick={() => selectSection(item.code)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <button
                className="lg:hidden flex text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <GiHamburgerMenu size={30} />
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
                    href={`/admin/restaurants/${restaurant}/edit`}
                    className="block px-4 py-2 hover:border-b-[3px] hover:border-secondary text-secondary text-lg"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Edit Menu
                  </a>
                  <a
                    href="/contact"
                    className="block px-4 py-2 hover:border-b-[3px] hover:border-secondary text-secondary text-lg"
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
