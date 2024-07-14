'use client'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Search from './Search';

const MobMenu = () => {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleClose = () => setOpen(false);
    const toggleOpen = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                toggleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className='md:hidden' ref={dropdownRef}>
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={toggleOpen}>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open && "rotate-45"} origin-left ease-in-out duration-300`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open && "opacity-0"}  ease-in-out duration-300`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open && "-rotate-45"} origin-left ease-in-out duration-300`} />
            </div>
            {/* {isOpen && ( */}
            <div className={`fixed duration-500 left-0 ${open ? 'translate-x-[0%]' : '-translate-x-[150%]'} top-0 w-[87%] px-1 h-screen overflow-scroll bg-white flex flex-col items-center justsify-center gap-7 font-medium text-xl z-30`}>
                <Link href={"/"} className='font-bold text-xl mt-4 pt-8 text-blue-600'>ANAS_SOCIAL</Link>
                <div className='px-4' onClick={(e) => e.stopPropagation()}>
                    <Search />
                </div>
                <Link href={'/'}>Home</Link>
                <Link href={'/friends'}>Friends</Link>
                <Link href={'/friends/friend-requests'}>Friend Requests</Link>
                <Link href={'/friends/suggestions'}>Suggestions</Link>
                <Link href={'/stories'}>Stories</Link>
                <Link href={'/settings#'}>Settings</Link>
                <Link href={'/settings#/security'}>Security</Link>
                <Link href={`/profile/${user?.username}`}>My Profile</Link>
            </div>
            {/* )}  */}
        </div>
    )
}

export default MobMenu;
