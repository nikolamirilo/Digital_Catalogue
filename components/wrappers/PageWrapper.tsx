import React from 'react'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'
import { redisClient } from '@/lib/redis'

const PageWrapper = async ({children}:{children:React.ReactNode}) => {
  const res = await redisClient.get("plato")
  let menuData:any = {}
  if(res){
  menuData = await JSON.parse(res) 
  }
  return (
    <>
    <Navbar restaurantData={menuData}/>
    <main className='min-h-screen py-20 w-full'>
    {children}
    </main>
    <Footer/>
    </>
  )
}

export default PageWrapper