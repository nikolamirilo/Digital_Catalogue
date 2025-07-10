"use client"
import { useMainContext } from "@/context/MainContext";
import React from "react";
import { Button } from "../ui/button";
import { layouts, themes } from "@/constants/client";

const Toggle = () => {
  const context = useMainContext();
  if (!context) return null;
  const { setLayout, layout, theme, setTheme } = context;

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {/* Layout Section */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-lg font-semibold text-heading">Pick Layout</h3>
        <div className="inline-flex rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 p-1.5 shadow-lg border gap-2 border-orange-200/50" role="group">
          {layouts.map((layoutOption) => (
            <Button
              key={layoutOption.key}
              type="button"
              variant="ghost"
              size="sm"
              className={`
                relative px-7 py-2.5 text-sm transition-all duration-300 ease-out
                ${layout === layoutOption.key 
                  ? "bg-product-primary text-white shadow-lg scale-105 transform" 
                  : "text-product-foreground hover:bg-white/60"
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
                <div className="absolute inset-0 rounded-xl bg-product-primary opacity-20 blur-sm" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Section */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-lg font-semibold text-heading">Pick Theme</h3>
        <div className="inline-flex rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 p-1.5 shadow-lg border gap-2 border-orange-200/50" role="group">
          {themes.map((themeOption) => (
            <Button
              key={themeOption.key}
              type="button"
              variant="ghost"
              size="sm"
              className={`
                relative px-5 py-2.5 text-sm transition-all duration-300 ease-out
                ${theme === themeOption.key 
                  ? "bg-product-primary text-white shadow-lg scale-105 transform" 
                  : "text-product-foreground hover:bg-white/60"
                }
                rounded-xl
                hover:shadow-md hover:scale-102 transform
                active:scale-95
                backdrop-blur-sm
              `}
              onClick={() => setTheme(themeOption.key)}
            >
              <span className="relative z-10">{themeOption.label}</span>
              {theme === themeOption.key && (
                <div className="absolute inset-0 rounded-xl bg-product-primary opacity-20 blur-sm" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toggle;