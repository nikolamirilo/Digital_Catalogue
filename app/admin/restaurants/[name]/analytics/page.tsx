import Analytics from '@/components/dashboard/Analytics';
import React from 'react'
import Navbar from "@/components/navigation/Navbar"

type tParams = Promise<{ name: string }>;

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  const transformedName = name
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  return (
      <>
        <Navbar/>
        <div className='py-24 flex w-full gap-10 justify-center items-center flex-col relative'>
        <h1 className='text-4xl text-white font-bold'>Analytics for restaurant {transformedName}</h1>
        <Analytics />
        </div>
      </>
  )
}
