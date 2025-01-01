import React from 'react'
import Footer from '../navigation/Footer'
import Navbar from '../navigation/Navbar'
import { NavbarProps } from '@/types'



const PageWrapper = ({children, navbarProps}:{children:React.ReactNode, navbarProps?: NavbarProps }) => {
  return (
    <>
    <Navbar type={navbarProps?.type} restaurant={navbarProps?.restaurant}/>
    <main className='min-h-screen py-24 w-full'>
    {children}
    </main>
    <Footer/>
    </>
  )
}

export default PageWrapper