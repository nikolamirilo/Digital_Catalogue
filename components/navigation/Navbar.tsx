import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow text-gray-900">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/logo.webp" alt="Logo" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
        </Link>
        <span className="font-bold text-xl text-primary">Digital Menu</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/contact">
          <Button variant="ghost">Contact Us</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="ghost">Pricing</Button>
        </Link>
        <Link href="/auth">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href="/auth?mode=signup" className='text-white'>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar