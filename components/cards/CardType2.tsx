'use client'
import { useMainContext } from '@/context/MainContext'
import { Record } from '@/types'
import React from 'react'

const CardType2 = ({ record }: { record: Record }) => {
    const context = useMainContext()

    if (!context) return null
    const { formatCurrency, currency, isLoading } = context

    return (
        <div className="flex flex-col bg-[#2E2E2E] rounded-[16px] border-[0.1px] border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden w-[250px] ">

            <div
                id="image"
                style={{ backgroundImage: `url(${record.image})` }}
                className="h-[250px] bg-center bg-cover"
            ></div>

            <div className="flex flex-col justify-between p-3 pb-0 leading-normal">
                <h3 className="mb-2 text-[28px] font-normal text-white font-playfair">
                    {record.name}
                </h3>
                    <p className="mb-2 text-[16px] text-[#CCCCCC] font-normal font-playfair">{record.description}</p>
                       
            </div>

          <div className="mt-auto p-4">
            <span className="text-[24px] font-thin text-[#00BCD4] font-petrona">
                {isLoading ? '' : formatCurrency(record.price, 'USD', currency)}
            </span>
            </div>
            
        </div>

    )
}

export default CardType2
