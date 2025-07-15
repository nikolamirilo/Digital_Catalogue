// @ts-nocheck
"use client"
import Toggle from "@/components/common/Toggle";
import MenuSection from "@/components/sections/MenuSection";
import data from "../../showcase.json";
import Navbar from "@/components/navigation/Navbar";
import theme from "@material-tailwind/react/theme";
import { useMainContext } from "@/context/MainContext";

const DigitalMenu: React.FC = () => {
  const {theme} = useMainContext();
  return (
    <>
      <Navbar />
      <div className={`min-h-screen text-text bg-background ${theme ? theme : "theme-luxury"}`}>
        <main>
          <section className="w-full bg-background pt-36 px-4 text-center flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-[800px] font-lora font-semibold text-foreground tracking-tight mb-4">
              Welcome to our interactive demo!
            </h1>
            <div className="w-60 h-[3px] bg-foreground mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-heading max-w-2xl font-lora leading-relaxed mb-6">
              Customize the look and feel by switching between different layouts and visual themes.
              Whether you prefer bold and modern or soft and elegant, explore how our menu adapts to match your brand’s unique vibe.
            </p>
          </section>

          <div className="flex flex-col justify-center items-center w-full mt-6">
            <Toggle />
          </div>

          {data && (
            <MenuSection
              menuData={data.menu}
              currency={data.currency}
              type="demo"
            />
          )}
        </main>
      </div>
    </>
  );
};

export default DigitalMenu;
