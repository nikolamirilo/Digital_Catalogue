import React from 'react'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'
import data from "../../showcase.json"

const PageWrapper = async ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar restaurantData={data}/>
    <main className='min-h-screen py-20 w-full'>
    {children}
    </main>
    <Footer/>
    </>
  )
}

export default PageWrapper