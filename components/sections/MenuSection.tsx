// @ts-nocheck
"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useMainContext } from "@/context/MainContext";
import CardsSwitcher from "../cards";
import SectionHeader from "./SectionHeader";
import { contentVariants, getGridStyle } from "./helpers";

const MenuSection = ({
  menuData,
  currency,
  type,
}: {
  menuData: any;
  currency: string;
  type: "demo" | "restaurant";
}) => {
  const { layout } = useMainContext();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const sectionsData = useMemo(() => {
    if (!menuData) return [];
    const customOrder = ["breakfast", "lunch", "snacks", "desserts"];
    
    return Object.keys(menuData)
      .map((item) => ({
        title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, " "),
        code: item,
      }))
      .sort((a, b) => {
        const aIndex = customOrder.indexOf(a.code);
        const bIndex = customOrder.indexOf(b.code);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      });
  }, [menuData]);

  const handleToggleSection = (code: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  if (!menuData) return null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-4">
      {sectionsData.map((item) => {
        // The 'layout' variable now comes directly from the context
        const currentLayout = type === "demo" ? layout : menuData[item.code]?.layout;

        return (
          <section key={item.code} className="mb-5" id={item.code}>
            <SectionHeader
              title={item.title}
              code={item.code}
              isExpanded={!!expandedSections[item.code]}
              onToggle={handleToggleSection}
            />
            
            <AnimatePresence initial={false}>
              {expandedSections[item.code] && (
                <motion.div
                  id={`section-content-${item.code}`}
                  key="content"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  {currentLayout === "variant_4" ? (
                    <Swiper
                      spaceBetween={12}
                      slidesPerView={"auto"}
                      className="mt-4 px-2"
                    >
                      {menuData[item.code].items.map((record, i) => (
               <SwiperSlide
                      key={i}
                      className="!w-[180px] sm:!w-[220px] md:!w-[260px] lg:!w-[320px] flex-shrink-0 flex flex-col !h-auto"
                    >
                      <CardsSwitcher
                        variant={currentLayout}
                        record={record}
                        currency={currency}
                        i={i}
                      />
                    </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className={getGridStyle(currentLayout)}>
                      {menuData[item.code].items.map((record, i) => (
                        <CardsSwitcher
                          key={i}
                          variant={currentLayout}
                          record={record}
                          currency={currency}
                          i={i}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </main>
  );
};

export default MenuSection;