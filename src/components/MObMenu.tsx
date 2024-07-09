'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react'

const MobMenu = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='md:hidden'>
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen && "rotate-45"} origin-left ease-in-out duration-300`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen && "opacity-0"}  ease-in-out duration-300`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen && "-rotate-45"} origin-left ease-in-out duration-300`} />
            </div>
            {/* {isOpen && ( */}
                <div onClick={() => setIsOpen(!isOpen)} className={`fixed duration-500 left-0 ${isOpen?'translate-x-[0%]':'-translate-x-[150%]'} top-0 w-[87%] px-1 h-full bg-white flex flex-col items-center justsify-center gap-7 font-medium text-xl z-30`}>
                    <Link href={"/"} className='font-bold text-xl my-9 text-blue-600'>ANAS_SOCIAL</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/friends'}>Friends</Link>
                    <Link href={'/friends/friend-requests'}>Friend Requests</Link>
                    <Link href={'/friends/suggestions'}>Suggestions</Link>
                    <Link href={'/stories'}>Stories</Link>
                    <Link href={'/settings#'}>Settings</Link>
                    <Link href={'/settings#/security'}>Security</Link>
                    <Link href={'/settings/update-profile'}>My Info</Link>
                    <Link href={`/profile/${user?.username}`}>My Profile</Link>
                </div>
             {/* )}  */}
        </div>
    )
}

export default MobMenu;
