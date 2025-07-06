'use client'
import { Record } from '@/types'
import React from 'react'

const CardType4 = ({ record, currency }: { record: Record, currency: string }) => {
  return (
    <div className="flex flex-col bg-card-bg text-card-text rounded-[16px] border border-card-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] w-[220px] sm:w-[260px] md:w-[320px] max-w-[90vw] flex-shrink-0">

    <div
      style={{ backgroundImage: `url(${record.image})` }}
      className="w-full aspect-[4/3] max-h-[140px] sm:max-h-[180px] bg-center bg-cover rounded-[16px]"
    ></div>

    <div className="flex flex-col justify-between p-2 sm:p-3 gap-1">
      <h5 className="text-[14px] sm:text-[20px] font-normal text-card-heading font-lora text-left truncate">
        {record.name}
      </h5>
      <p className="text-[12px] sm:text-[14px] text-card-description font-normal font-lora text-left overflow-hidden">
        {record.description}
      </p>
      <span className="text-[14px] sm:text-[18px] font-thin text-price font-lora-semibold text-left">
        {record.price} {currency}
      </span>
    </div>
  </div>
  )
}

export default CardType4
