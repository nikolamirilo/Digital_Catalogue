import { Record } from '@/types'
import React from 'react'

const CardType3 = ({ record, currency }: { record: Record, currency: string }) => {
  return (
   <div className="bg-card-bg rounded-[12px] p-2 sm:p-4 text-card-text flex flex-col
    sm:flex-row sm:flex-wrap border border-card-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)]
     gap-1.5 sm:gap-2 sm:items-center sm:justify-between">


<div className="flex flex-col flex-1 gap-0.5 sm:gap-1 min-w-0">
    <h3 className="text-[14px] sm:text-[24px] font-normal text-card-heading font-lora leading-tight ">
      {record.name}
    </h3>
    <p className="text-[12px] sm:text-[16px] text-card-description font-normal font-lora leading-snug overflow-hidden">
      {record.description}
    </p>
  </div>

  <div className="pt-1 sm:pt-0 sm:pl-4 flex-shrink-0 text-right">
    <span className="text-[14px] sm:text-[22px] font-thin text-price font-lora-semibold block">
      {record.price} {currency}
    </span>
  </div>
</div>

  )
}

export default CardType3
