"use client"
import { useMainContext } from "@/context/MainContext";
import React from "react";

const Toggle = () => {
  const context = useMainContext();
  if (!context) return null;
  const { currency, setCurrency, setLayout, layout } = context;
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <div className="inline-flex rounded-md shadow-xs gap-0" role="group">
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white" onClick={() => {
          setLayout("variant_1")
        }}>Layout 1</button><button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white" onClick={() => {
          setLayout("variant_2")
        }}>Layout 2</button><button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white" onClick={() => {
          setLayout("variant_3")
        }}>Layout 3</button><button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white" onClick={() => {
          setLayout("variant_4")
        }}>Layout 4</button>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <span className={`me-3 text-lg text-secondary ${currency == "USD" ? "font-bold" : ""}`}>
          USD
        </span>
        <input type="checkbox" value="" className="sr-only peer" onClick={() => {
          if (currency == "USD") {
            setCurrency("RSD")
          } else {
            setCurrency("USD")
          }
        }} />
        <div className="relative w-11 h-6 flex peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[0px] border-2 after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
        <span className={`ms-3 text-lg text-secondary ${currency == "RSD" ? "font-bold" : ""}`}>
          RSD
        </span>
      </label>
    </div>
  );
};

export default Toggle;
