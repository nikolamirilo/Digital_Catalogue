import AdminDashboard from '@/components/dashboard/AdminDashboard'
import PageWrapper from '@/components/wrappers/PageWrapper'
import React from 'react'

type tParams = Promise<{ name: string }>;

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  const navbarProps ={
    type: "dashboard",
    restaurant: name
  }
  return (
    <PageWrapper navbarProps={navbarProps}>
      <div className='flex w-full gap-10 justify-center items-center flex-col'>
      <h1 className='text-3xl text-secondary'>Restaurant Dashboard {name}</h1>
      <AdminDashboard />
      </div>
    </PageWrapper>
  )
}
