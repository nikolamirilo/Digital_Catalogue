import { Record } from '@/types'
import React from 'react'

const CardType3 = ({ record }: { record: Record }) => {
  return (
    <div className="bg-secondary rounded-lg p-4 text-primary shadow-2xl flex flex-row justify-center items-center gap-2 variant-ghost-secondary">
      <div className="flex flex-col w-3/4">
        <h3 className="text-xl font-bold">{record.name}</h3>
        <p className="text-txtSecondary">{record.description}</p>
      </div>
      <span className="text-2xl font-semibold w-1/4 text-center">${record.price}</span>
    </div>
  )
}

export default CardType3




