// @ts-nocheck
import React from "react"
import Toggle from "@/components/common/Toggle";
import MenuSection from "@/components/sections/MenuSection";
import data from "../showcase.json"

export const dynamic = "force-dynamic"

const DigitalMenu: React.FC = async () => {
  return (
    <main>
      <div className="py-6 text-center flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold text-navigationMain">Digital Menu</h1>
        <p className="text-txtTertiary text-lg 2xl:text-xl px-5 max-w-[1000px]">
          Indulge in a journey through our exquisite culinary offerings, where every dish is a
          celebration of flavor, creativity, and tradition. Experience the best of our culinary
          delights, crafted by our talented chefs who pour their passion into each plate.
        </p>
      </div>

      <div className="text-sm font-medium text-center border-b mb-2 border-gray-200 dark:text-gray-300 dark:border-gray-700">
        <ul className="flex flex-wrap justify-center -mb-px items-center text-tertiary-50">
        </ul>
      </div>
      <div className="flex flex-row justify-center items-center w-full">
        <Toggle />
      </div>
      {data && <MenuSection menuData={data.menu} />}
    </main>
  );
};

export default DigitalMenu;
