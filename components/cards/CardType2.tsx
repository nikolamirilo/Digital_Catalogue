'use client'
import { useMainContext } from '@/context/MainContext'
import { Record } from '@/types'
import React from 'react'

const CardType2 = ({ record }: { record: Record }) => {
    const context = useMainContext()
    if (!context) return null
    const { formatCurrency, currency, isLoading } = context

    return (
        <div className="flex flex-col bg-[#2E2E2E] rounded-[12px] border border-[#E9F5FE]/15 
        shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden w-[48%] max-w-[220px] sm:max-w-[240px] md:max-w-[260px]">

            <div
                id="image"
                style={{ backgroundImage: `url(${record.image})` }}
                className="aspect-[4/3] bg-center bg-cover w-full"
            ></div>

            <div className="flex flex-col justify-between flex-1 p-2 sm:p-3 md:p-4 gap-2">
                <div>
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-normal text-white font-playfair leading-tight">
                        {record.name}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#CCCCCC] font-normal font-playfair leading-snug">
                        {record.description}
                    </p>
                </div>
                <div>
                    <span className="text-[18px] sm:text-[20px] md:text-[22px] font-thin text-[#00BCD4] font-petrona">
                        {isLoading ? '' : formatCurrency(record.price, 'USD', currency)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CardType2
