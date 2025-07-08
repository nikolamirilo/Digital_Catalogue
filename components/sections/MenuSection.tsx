// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import data from "../../data.json";
import CardType1 from "../cards/CardType1";
import CardType2 from "../cards/CardType2";
import CardType3 from "../cards/CardType3";
import { useMainContext } from "@/context/MainContext";
import Toggle from "../common/Toggle";
import CardType4 from "../cards/CardType4";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const MenuSection = ({ menuData, currency, layout, type }: { menuData: any, currency: string, layout:string, type: "demo" | "restaurant" }) => {
  // Transform sectionsData
  const [variant, setVariant] = useState("variant_1")
  const context = useMainContext()
  const sectionsData = Object.keys(menuData).map((item) => ({
    title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, " "),
    code: item,
  }));

  const customOrder = ['breakfast', 'lunch', 'snacks', 'desserts'];

  const sortedSections = sectionsData.sort((a, b) => {
    const aIndex = customOrder.indexOf(a.code);
    const bIndex = customOrder.indexOf(b.code);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  //Obrati paznju - tu se radi positioning kartica
  function returnVariantStyle(variant){
    switch (variant){
      case "variant_1":
        return "grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
      case "variant_2":
        return "flex flex-wrap justify-start gap-3 mx-auto sm:gap-4 md:gap-6 mt-4"

      case "variant_3":
        return "grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
      case "variant_4":
  return ""
    
      default:
        return "flex flex-row flex-wrap gap-6 mt-4"
    }
  }

  // Toggle expand/collapse for a section
  const handleToggleSection = (code: string) => {
    setExpandedSections((prev) => {
      const isExpanding = !prev[code];
      return { [code]: isExpanding };
    });
  };
  useEffect(() => {
    if(type=="demo"){
      setVariant(context.layout)
    }else{
      setVariant(layout)
    }
  }, [context.layout, type])

  //console.log(sortedSections)
  if (menuData)
    return (
      <main className="max-w-6xl mx-auto px-4 py-4">
        {sortedSections.map((item, index) => (
          <section key={item.code} className="mb-10" id={item.code}>
<button
  className=" w-full flex items-center justify-between 
    px-4 py-3 text-xl sm:text-2xl md:text-3xl font-semibold 
    border border-section-border 
    text-section-heading bg-section-bg 
    hover:bg-section-hover 
    rounded-xl shadow-md 
    transition-colors duration-200 group"
  onClick={() => handleToggleSection(item.code)}
  aria-expanded={!!expandedSections[item.code]}
  aria-controls={`section-content-${item.code}`}
  type="button"
>
  <span className="truncate font-lora">{item.title}</span>
  <FiChevronDown
    className={`
      ml-4 text-3xl transition-transform duration-300 
      text-section-icon ${expandedSections[item.code] ? 'rotate-180' : 'rotate-0'}`}
    aria-hidden="true"
  />
</button>
            <AnimatePresence initial={false}>
              {expandedSections[item.code] && (
                <motion.div
                  id={`section-content-${item.code}`}
                  key={item.code}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  {variant === "variant_4" ? (
                  <Swiper
                          spaceBetween={12}  slidesPerView={'auto'}  className="mt-4 !px-2"
                        >
                          {menuData[item.code].map((record, i) => (
                            <SwiperSlide
                              key={i}
                              className="!w-[220px] sm:!w-[260px] md:!w-[320px]flex flex-col max-w-[90vw]"
                            >
                              <CardType4 record={record} currency={currency} />
                            </SwiperSlide>
                          ))}
                   </Swiper>
) : (
  <div className={`${returnVariantStyle(variant)}`}>
    {menuData[item.code].map((record, i) => {
      switch (variant) {
        case "variant_1":
          return <CardType1 key={i} record={record} currency={currency} />;
        case "variant_2":
          return <CardType2 key={i} record={record} currency={currency}/>;
        case "variant_3":
          return <CardType3 key={i} record={record} currency={currency}/>;
        default:
          return <CardType1 key={i} record={record} currency={currency}/>;
      }
    })}
  </div>
)}

                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </main>
    );
};

export default MenuSection;
