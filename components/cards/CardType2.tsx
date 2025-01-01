import { Record } from '@/types'
import React from 'react'

const CardType2 = ({record}: {record: Record}) => {
  return (
    <div className={`bg-secondary rounded-lg p-4 shadow-2xl text-primary flex flex-col gap-2 variant-ghost-secondary ${record.image == "" && "hidden"}`}>
	<h3 className="text-xl font-bold">{record.name}</h3>
	<div className="flex flex-row gap-2 w-full">
		<div
			id="image"
			style={{backgroundImage: `url(${record.image})`}}
			className="relative w-[125px] min-w-[125px] h-[125px] rounded-lg bg-center bg-cover"
		></div>
		<div className="flex flex-col gap-2">
			<p className="text-txtSecondary">{record.description}</p>
			<span className="text-lg font-semibold text-right">${record.price}</span>
		</div>
	</div>
</div>
  )
}

export default CardType2