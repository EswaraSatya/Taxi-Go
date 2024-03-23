import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const NavBar = () => {
    return (
        <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-lg'>
            <div className='flex gap-10 items-center'>
                <Image src="/download.png" alt="logo" width={120} height={100} />
                <div className='hidden md:flex gap-6'>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Home</h2>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>History</h2>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Help</h2>
                </div>
            </div>
            <UserButton afterSignOutUrl="/"></UserButton>
        </div>
    )
}

export default NavBar