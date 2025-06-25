import Analytics from '@/components/dashboard/Analytics';
import React from 'react'

type tParams = Promise<{ name: string }>;

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  return (
      <div className='flex w-full gap-10 justify-center items-center flex-col relative'>
      <h1 className='text-3xl text-secondary'>Restaurant Dashboard {name}</h1>
      <Analytics />
      </div>
  )
}
