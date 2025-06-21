'use client'
import { useMainContext } from '@/context/MainContext'
import { Record } from '@/types'
import React from 'react'

const CardType4 = ({ record }: { record: Record }) => {
    const context = useMainContext()

    if (!context) return null
    const { formatCurrency, currency, isLoading } = context

    return (
        <div className="flex flex-col bg-[#2E2E2E] rounded-[16px] border-[0.1px] border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] lg:max-w-xs w-full">
            <div
                style={{ backgroundImage: `url(${record.image})` }}
                className="w-full aspect-[4/3] bg-center bg-cover rounded-t-lg"
            ></div>

            <div className="flex flex-col justify-between p-2">
                <h5 className="mb-2 text-[32px] pl-3 font-normal text-white font-playfair">
                    {record.name}
                </h5>
                <p className="mb-2 text-[16px] pl-3 text-[#CCCCCC] font-normal font-playfair">
                    {record.description}
                </p>
                <span className="text-[24px] p-3 font-thin text-[#00BCD4] font-petrona">
                    {isLoading ? '' : formatCurrency(record.price, 'USD', currency)}
                </span>
            </div>
        </div>
    )
}

export default CardType4
