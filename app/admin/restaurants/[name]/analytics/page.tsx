import Analytics from '@/components/dashboard/Analytics';
import React from 'react'
import Navbar from "@/components/navigation/Navbar"

type tParams = Promise<{ name: string }>;

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  return (
      <>
        <Navbar/>
        <div className='py-20 flex w-full gap-10 justify-center items-center flex-col relative'>
        <h1 className='text-3xl text-secondary'>Restaurant Dashboard {name}</h1>
        <Analytics />
        </div>
      </>
  )
}
