// @ts-nocheck
"use client";
import React from 'react';
import data from '../../data.json';
import CardType1 from '../cards/CardType1';
import CardType2 from '../cards/CardType2';

const SectionType1 = () => {
  // Transform sectionsData
  const sectionsData = Object.keys(data.restaurants[0].menu).map((item) => ({
    title: item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' '),
    code: item,
  }));

  console.log(sectionsData);

  return (
    <main className="max-w-6xl mx-auto px-4">
      {sectionsData.map((item, index) => (
        <section key={item.code} className="mb-10" id={item.code}>
          <h2 className="text-3xl font-semibold border-b-2 border-borderPrimary pb-2">
            {item.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {data.restaurants[0].menu[item.code].map((record, i) => {
              if (record.image == "") {
                return <CardType1 key={i} record={record} />;
              } else {
                return <CardType2 key={i} record={record} />;
              }
            })}
          </div>
        </section>
      ))}
    </main>
  );
};

export default SectionType1;
