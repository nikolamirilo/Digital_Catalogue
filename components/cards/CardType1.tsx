"use client"
import { useMainContext } from '@/context/MainContext';
import { Record } from '@/types'
import React from 'react'

const CardType1 = ({ record }: { record: Record }) => {
    const context = useMainContext();

    if (!context) return null;
    const { formatCurrency, currency, isLoading } = context;

    return (
        <div className="flex flex-col items-center bg-white border rounded-lg border-none md:flex-row md:max-w-xl">
            <div
                id="image"
                style={{ backgroundImage: `url(${record.image})` }}
                className="relative w-[250px] min-w-[200px] border-none outline-none h-full rounded-lg bg-center bg-cover"
            ></div>
            <div className="flex flex-col justify-between p-2 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{record.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base">{record.description}</p>
                <span className="text-2xl font-semibold text-right text-black">
                    {isLoading
                        ? ""
                        : formatCurrency(record.price, "USD", currency)}
                </span>
            </div>
        </div>
    )
}

export default CardType1