'use client'
import { useMainContext } from '@/context/MainContext'
import { Record } from '@/types'
import React from 'react'

const CardType4 = ({ record }: { record: Record }) => {
    const context = useMainContext()

    if (!context) return null
    const { formatCurrency, currency, isLoading } = context

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md lg:max-w-xs w-full">
            <div
                style={{ backgroundImage: `url(${record.image})` }}
                className="w-full aspect-[4/3] bg-center bg-cover rounded-t-lg"
            ></div>

            <div className="flex flex-col justify-between p-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {record.name}
                </h5>
                <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">
                    {record.description}
                </p>
                <span className="text-2xl font-semibold text-right text-black">
                    {isLoading ? '' : formatCurrency(record.price, 'USD', currency)}
                </span>
            </div>
        </div>
    )
}

export default CardType4
