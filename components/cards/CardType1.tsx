'use client'
import { Record } from '@/types'
import React from 'react'

const CardType1 = ({
  record,
  currency,
}: {
  record: Record
  currency: string
}) => {
  return (
   <div className="flex flex-row bg-card-bg text-card-text rounded-[12px] border border-card-border 
shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden max-w-full min-h-[110px] sm:min-h-[150px]">
  
  <div
    style={{ backgroundImage: `url(${record.image})` }}
    className="w-[40%] min-w-[90px] sm:min-w-[120px] aspect-[4/3] bg-center bg-cover flex-shrink-0"
  ></div>

  <div className="flex flex-col p-1.5 sm:p-3 flex-1 gap-1 sm:gap-2 min-w-0">
    <h3 className="text-[13px] sm:text-[22px] font-normal text-card-heading font-lora leading-tight truncate">
      {record.name}
    </h3>
    <p className="text-[11px] sm:text-[16px] text-card-description font-normal font-lora leading-snug overflow-hidden">
      {record.description}
    </p>
    <div className="pt-0 sm:pt-1 mt-auto">
      <span className="text-[13px] sm:text-[20px] font-thin text-price font-lora-semibold">
        {record.price} {currency}
      </span>
    </div>
  </div>
</div>
  )
}

export default CardType1
