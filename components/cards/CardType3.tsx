import { Record } from '@/types'
import React from 'react'

const CardType3 = ({ record }: { record: Record }) => {
  return (
    <div className="bg-[#2E2E2E] rounded-[12px] p-3 sm:p-4 text-white flex flex-col sm:flex-row border border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] gap-2 sm:items-center sm:justify-between">

      <div className="flex flex-col flex-1 gap-1">
        <h3 className="text-[18px] sm:text-[24px] font-normal text-white font-playfair leading-tight">
          {record.name}
        </h3>
        <p className="text-[14px] sm:text-[16px] text-[#CCCCCC] font-normal font-playfair leading-snug">
          {record.description}
        </p>
      </div>

      <div className="pt-2 sm:pt-0 sm:pl-4 flex-shrink-0 text-right">
        <span className="text-[18px] sm:text-[22px] font-thin text-[#00BCD4] font-petrona block">
          ${record.price}
        </span>
      </div>
    </div>
  )
}

export default CardType3
