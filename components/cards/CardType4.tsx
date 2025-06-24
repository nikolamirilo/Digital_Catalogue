'use client'
import { Record } from '@/types'
import React from 'react'

const CardType4 = ({ record, currency }: { record: Record, currency: string }) => {

  return (
    <div className="flex flex-col bg-[#2E2E2E] rounded-[16px] border border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] w-full max-w-[350px]">

      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-full aspect-[4/3] max-h-[160px] sm:max-h-[220px] bg-center bg-cover rounded-t-lg"
      ></div>

      <div className="flex flex-col justify-between p-3">
        <h5 className="mb-2 text-[18px] sm:text-[28px] font-normal text-white font-playfair text-left">
          {record.name}
        </h5>
        <p className="mb-2 text-[14px] sm:text-[16px] text-[#CCCCCC] font-normal font-playfair text-left">
          {record.description}
        </p>
        <span className="text-[18px] sm:text-[24px] font-thin text-[#00BCD4] font-petrona text-left">
        {record.price} {currency}
        </span>
      </div>
    </div>
  )
}

export default CardType4
