"use client"
import { useMainContext } from '@/context/MainContext';
import { Record } from '@/types';
import React from 'react';

const CardType1 = ({ record }: { record: Record }) => {
    const context = useMainContext();

    if (!context) return null;
    const { formatCurrency, currency, isLoading } = context;

    return (
        <div className="flex flex-row items-center bg-[#2E2E2E] border-[0.1px] border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] rounded-[16px] overflow-hidden md:max-w-xl">
            <div
                id="image"
                style={{ backgroundImage: `url(${record.image})` }}
                className="h-full w-[200px] md:w-[350px] md:h-full bg-center bg-cover"
            ></div>
            <div className="flex flex-col justify-between p-3 leading-normal w-full">
                <h5 className="mb-2 text-[28px] font-normal text-white font-playfair">
                    {record.name}
                </h5>
                <p className="mb-2 text-[16px] text-[#CCCCCC] font-normal font-playfair">
                    {record.description}
                </p>
                <span className="text-[24px] font-thin text-[#00BCD4] font-petrona">
                    {isLoading ? "" : formatCurrency(record.price, "USD", currency)}
                </span>
            </div>
        </div>
    );
};

export default CardType1;
