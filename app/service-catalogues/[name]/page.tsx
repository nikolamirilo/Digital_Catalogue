//@ts-nocheck
import React from "react";
import ServicesSection from "@/components/sections/ServicesSection";
import CatalogueHeader from "@/components/navigation/CatalogueHeader";
import CatalogueFooter from "@/components/navigation/CatalogueFooter";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("service_catalogues").select().eq("name", name);
  
  if (data[0]) {
    let item: any = data[0];
    
    return (
      <main className={`${item.theme || "theme-elegant"} bg-background text-foreground min-h-screen`}>
        <CatalogueHeader />
        <div className="pt-40 pb-24 text-center flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-lora font-semibold text-heading drop-shadow-sm">
            {item.title}
          </h1>
          <p className="text-text text-base sm:text-lg md:text-xl px-5 max-w-[900px] font-lora font-normal leading-relaxed">
            {item.subtitle}
          </p>
        </div>
        {item && (
          <ServicesSection
            servicesData={item.services}
            currency={item.currency}
            type="item"
          />
        )}
        <CatalogueFooter />
      </main>
    );
  }
};

export default page;

