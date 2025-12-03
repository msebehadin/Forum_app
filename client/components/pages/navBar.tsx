
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

const NavBar = () => {
  return (
    <nav className='w-full border-b bg-background/70 backdrop-blur-md'>
        <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
            {/* logo */}
            <Link href='/' className='text-xl font-bold'>
            <Image
                      src='/evangadi-logo-header.png' alt='evangadi logo'            />
            </Link>
            <div>
            <link href='#'>
            How it works
            </link>
            </div>
{
    user?(
        <div>
            <Avatar>
                <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <Button>
                Logout
            </Button>

        </div>
    ):(
        <Link href='/'>
            <Button>Login</Button>
        </Link>
    )
}
        </div>
    </nav>
  )
}

export default NavBar