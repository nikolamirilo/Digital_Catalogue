"use client"
import { useMainContext } from "@/context/MainContext";
import React from "react";
import { Button } from "../ui/button";

const Toggle = () => {
  const context = useMainContext();
  if (!context) return null;
  const { setLayout, layout } = context;

  const layouts = [
    { key: "variant_1", label: "Layout 1" },
    { key: "variant_2", label: "Layout 2" },
    { key: "variant_3", label: "Layout 3" },
    { key: "variant_4", label: "Layout 4" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <div className="inline-flex rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 p-1.5 shadow-lg border gap-2 border-orange-200/50" role="group">
        {layouts.map((layoutOption, index) => (
          <Button
            key={layoutOption.key}
            type="button"
            variant="ghost"
            size="sm"
            className={`
              relative px-3 py-2.5 text-sm font-semibold transition-all duration-300 ease-out
              ${layout === layoutOption.key 
                ? "bg-gradient-to-r from-orange-300 to-orange-500 text-white shadow-lg scale-105 transform" 
                : "text-orange-700 hover:text-orange-800 hover:bg-white/60"
              }
              rounded-xl
              hover:shadow-md hover:scale-102 transform
              active:scale-95
              backdrop-blur-sm
            `}
            onClick={() => setLayout(layoutOption.key)}
          >
            <span className="relative z-10">{layoutOption.label}</span>
            {layout === layoutOption.key && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-20 blur-sm" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;