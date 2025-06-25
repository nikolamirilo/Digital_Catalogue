'use client'
import { Record } from '@/types'
import React from 'react'

const CardType1 = ({
  record,
  currency,
  theme = 'theme-luxury', // default theme
}: {
  record: Record
  currency: string
  theme?: 'theme-luxury' | 'theme-creative'
}) => {
  return (
    <div className={theme}>
      <div className="flex flex-row bg-card rounded-[12px] border border-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden max-w-full">
        <div
          style={{ backgroundImage: `url(${record.image})` }}
          className="w-[40%] min-w-[120px] aspect-[4/3] bg-center bg-cover flex-shrink-0"
        ></div>

        <div className="flex flex-col p-3 flex-1 gap-2 min-w-0  min-h-[150px]">
          <h3 className="text-[16px] sm:text-[22px] font-normal text-primary font-lora leading-tight truncate">
            {record.name}
          </h3>
          <p className="text-[13px] sm:text-[16px] text-secondary font-normal font-lora leading-snug overflow-hidden">
            {record.description}
          </p>
          <div className="pt-1 mt-auto">
            <span className="text-[16px] sm:text-[20px] font-thin text-accent font-lora-semibold">
              {record.price} {currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardType1
