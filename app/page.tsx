// @ts-nocheck
import Toggle from "@/components/common/Toggle";
import MenuSection from "@/components/sections/MenuSection";
import data from "../showcase.json";
import { saEvent } from "@/utils/analytics";
import Navbar from "@/components/navigation/Navbar";

export const dynamic = "force-dynamic";

const DigitalMenu: React.FC = async () => {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        Landing Page
      </main>
    </>
  );
};

export default DigitalMenu;
