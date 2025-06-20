import AdminDashboard from '@/components/dashboard/AdminDashboard'
import React from 'react'

type tParams = Promise<{ name: string }>;

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  return (
      <div className='flex w-full gap-10 justify-center items-center flex-col relative'>
      <h1 className='text-3xl text-secondary'>Restaurant Dashboard {name}</h1>
      <AdminDashboard />
      <iframe width="1000" height="600" src="https://lookerstudio.google.com/reporting/b79af3f4-3efd-4cc4-a4bf-fe69bc4c02b0" allowFullScreen></iframe>
      </div>
  )
}
