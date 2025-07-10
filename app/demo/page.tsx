// @ts-nocheck
import Toggle from "@/components/common/Toggle";
import MenuSection from "@/components/sections/MenuSection";
import data from "../../showcase.json";
import Navbar from "@/components/navigation/Navbar";

export const dynamic = "force-dynamic";

const DigitalMenu: React.FC = async () => {
  return (
    <div className="product min-h-screen text-product-foreground bg-product-background">
      <Navbar />
      <main>
        <section className="w-full bg-hero-product-background py-24 px-4 text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-lora font-semibold text-product-primary tracking-tight mb-4">
            Digital Menu
          </h1>

          <div className="w-20 h-[3px] bg-product-primary mb-6 rounded-full"></div>

          <p className="text-lg sm:text-xl text-product-foreground-accent max-w-2xl font-lora leading-relaxed mb-6">
            Indulge in a journey through our exquisite culinary offerings, where
            every dish is a celebration of flavor, creativity, and tradition.
            Experience the best of our culinary delights, crafted by our
            talented chefs who pour their passion into each plate.
          </p>
        </section>

        <div className="flex flex-row justify-center items-center w-full mt-6">
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
  );
};

export default DigitalMenu;
