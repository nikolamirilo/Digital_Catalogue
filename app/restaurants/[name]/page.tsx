//@ts-nocheck
import React from "react";
import MenuSection from "@/components/sections/MenuSection";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navigation/RestaurantNavbar";

const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("restaurants").select().eq("name", name);
  const theme = "theme-elegant "; // menjas temu ovde da testiras, inace ce doci iz baze
  if (data[0]) {
    let restaurant: any = data[0];
    return (
      <main className={`${theme} bg-background text-foreground min-h-screen`}>

      
        <div className="pt-24 text-center flex flex-col justify-center items-center gap-4">
       <h1 className="text-3xl sm:text-4xl md:text-5xl font-lora font-semibold text-heading drop-shadow-sm">
          {restaurant.title}
        </h1>
          <p className="text-text text-base sm:text-lg md:text-xl px-5 max-w-[900px] font-lora font-normal leading-relaxed">
             {restaurant.subtitle}
          </p>
        </div>
        {restaurant && (
          <MenuSection
            menuData={restaurant.menu}
            currency={restaurant.currency}
            type="restaurant"
          />
        )}
      </main>
    );
  }
};

export default page;

