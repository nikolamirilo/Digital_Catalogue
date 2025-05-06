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

const MenuSection = ({ menuData }: { menuData: any }) => {
  // Transform sectionsData
  const { currency, layout } = useMainContext();
  console.log(currency);
  const sectionsData = Object.keys(menuData.menu).map((item) => ({
    title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, " "),
    code: item,
  }));

  console.log(sectionsData);

  //Obrati paznju - tu se radi positioning kartica
  function returnVariantStyle(variant){
    switch (variant){
      case "variant_1":
        return "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
      case "variant_2":
        return "flex flex-row flex-wrap gap-6 mt-4"
      case "variant_3":
        return "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
      case "variant_4":
        return "flex flex-row flex-wrap gap-6 mt-4 justify-center md:justify-start"
      default:
        return "flex flex-row flex-wrap gap-6 mt-4"
    }
  }

  if (menuData)
    return (
      <main className="max-w-6xl mx-auto px-4">
        {sectionsData.map((item, index) => (
          <section key={item.code} className="mb-10" id={item.code}>
            <h2 className="text-3xl font-semibold border-b-2 border-borderPrimary pb-2">
              {item.title}
            </h2>
            <div className={`${returnVariantStyle(layout)}`}>
              {menuData.menu[item.code].map((record, i) => {
                switch (layout) {
                  case "variant_1":
                    return <CardType1 key={i} record={record} />;
                  case "variant_2":
                    return <CardType2 key={i} record={record} />;
                  case "variant_3":
                    return <CardType3 key={i} record={record} />;
                  case "variant_4":
                    return <CardType4 key={i} record={record} />;
                  default:
                    return <CardType1 key={i} record={record} />;
                }
              })}

            </div>
          </section>
        ))}
      </main>
    );
};

export default MenuSection;
