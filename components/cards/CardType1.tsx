'use client'
import { useMainContext } from '@/context/MainContext'
import { Record } from '@/types'
import React from 'react'

const CardType1 = ({ record }: { record: Record }) => {
  const context = useMainContext()
  if (!context) return null
  const { formatCurrency, currency, isLoading } = context

  return (
    <div className="flex flex-row bg-[#2E2E2E] rounded-[12px] border border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden max-w-full">

      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-[40%] min-w-[120px] aspect-[4/3] bg-center bg-cover flex-shrink-0"
      ></div>

      <div className="flex flex-col p-3 flex-1 gap-2 min-w-0">
        <h3 className="text-[16px] sm:text-[22px] font-normal text-white font-playfair leading-tight truncate">
          {record.name}
        </h3>
        <p className="text-[13px] sm:text-[16px] text-[#CCCCCC] font-normal font-playfair leading-snug overflow-hidden">
          {record.description}
        </p>
        <div className="pt-1 mt-auto">
          <span className="text-[16px] sm:text-[20px] font-thin text-[#00BCD4] font-petrona">
            {isLoading ? '' : formatCurrency(record.price, 'USD', currency)}
          </span>
        </div>
      </div>

    </div>
  )
}

export default CardType1
