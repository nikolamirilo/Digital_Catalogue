import { Record } from '@/types'
import React from 'react'

const CardType1 = ({record}: {record: Record}) => {
  return (
    <div className="bg-secondary rounded-lg p-4 text-primary shadow-2xl flex flex-col gap-2 variant-ghost-secondary">
	<h3 className="text-xl font-bold">{record.name}</h3>
	<p className="text-txtSecondary">{record.description}</p>
	<span className="text-lg font-semibold">${record.price}</span>
</div>

  )
}

export default CardType1