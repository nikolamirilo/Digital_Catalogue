'use client'
import { Record } from '@/types'
import React from 'react'

const CardType4 = ({ record, currency }: { record: Record, currency: string }) => {
  return (
    <div className="flex flex-col !h-full bg-card-bg text-card-text rounded-[16px] border border-card-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] 
      w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px]  max-w-[90vw] flex-shrink-0 overflow-hidden">

      <div 
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-full aspect-[4/3] max-h-[120px] sm:max-h-[140px] md:max-h-[180px] bg-center bg-cover "
      ></div>

      <div className="flex flex-col justify-start p-2 sm:p-3 gap-1 flex-grow">

        <div className="flex flex-col gap-1 flex-grow min-h-[60px]">
          <h5 className="text-[12px] sm:text-[14px] md:text-[18px] font-normal text-card-heading font-lora text-left truncate">
            {record.name}
          </h5>
          <p className="text-[10px] sm:text-[12px] md:text-[14px] text-card-description font-normal font-lora text-left overflow-hidden leading-snug">
            {record.description}
          </p>
        </div>

        <span className="text-[12px] sm:text-[14px] md:text-[18px] font-thin text-price font-lora-semibold text-left mt-auto">
          {record.price} {currency}
        </span>
      </div>
    </div>
  )
}

export default CardType4
