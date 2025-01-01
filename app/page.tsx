"use client"
import React, { useState } from 'react';
import SectionType1 from '@/components/sections/SectionType1';
import PageWrapper from '@/components/wrappers/PageWrapper';

const DigitalMenu: React.FC = () => {
  const [variant, setVariant] = useState(1);

  return (
        <PageWrapper>
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
              <li className="me-2">
                <button
                  onClick={() => {
                    setVariant(1);
                    console.log(variant);
                  }}
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                    variant === 1 ? 'active border-white' : ''
                  }`}
                >
                  Variant 1
                </button>
              </li>
            </ul>
          </div>

          {variant === 1 && <SectionType1 />}
        </PageWrapper>
  );
};

export default DigitalMenu;
