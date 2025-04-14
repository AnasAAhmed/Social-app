'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Search from './Search';
import { useSession } from 'next-auth/react';

const MobMenu = () => {
    const { data: session } = useSession();
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
            <div onClick={() => setTimeout(() => toggleClose(), 140)} className={`fixed duration-500 left-0 ${open ? 'translate-x-[0%]' : '-translate-x-[150%]'} dark:text-gray-300 top-0 w-[87%] px-1 h-[110vh] pb-20 overflow-y-auto dark:bg-slate-800 bg-white flex flex-col items-center justsify-center font-medium text-xl z-30`}>
                <button onClick={() => toggleClose()} className='text-end text-2xl w-full px-4 pt-4 text-blue-600'>&times;</button>
                <Link href={"/"} className='font-bold text-xl text-blue-600 my-4'>ANAS_SOCIAL</Link>
                <div className='px-4 my-4' onClick={(e) => e.stopPropagation()}>
                    <Search />
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                    <Link className='dark:s' href={'/'}>Home</Link>
                    <Link href={'/friends'}>Friends</Link>
                    <Link href={'/friends/friend-requests'}>Friend Requests</Link>
                    <Link href={'/friends/suggestions'}>Suggestions</Link>
                    <Link href={'/stories'}>Stories</Link>
                    <Link href={'/settings#'}>Settings</Link>
                    <Link href={'/settings#/security'}>Security</Link>
                    <Link href={`/profile/${session?.user?.name}`}>My Profile</Link>
                </div>
            </div>
            {/* )}  */}
        </div>
    )
}

export default MobMenu;
