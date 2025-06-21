import { Record } from '@/types'
import React from 'react'

const CardType3 = ({ record }: { record: Record }) => {
  return (
    <div className="bg-[#2E2E2E] rounded-[16px] p-3 text-white flex flex-row justify-center border-[0.1px] border-[#E9F5FE]/15 shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] items-center gap-2 variant-ghost-secondary">
      <div className="flex flex-col w-full p-3">
        <h3 className="mb-2 text-[28px] font-normal text-white font-playfair">{record.name}</h3>
        <p className="mb-2 text-[16px] text-[#CCCCCC] font-normal font-playfair">{record.description}</p>
      </div>
      <span className="text-[24px] p-3 font-thin text-[#00BCD4] font-petrona">${record.price}</span>
    </div>
  )
}

export default CardType3




