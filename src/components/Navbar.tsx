'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import MobMenu from './MObMenu'
import Image from 'next/image'
import Search from './Search'
import DropDown from './DropDown'
import DarkModeToggle from './Toggle'
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'

const Navbar = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className='h-14 fixed bg-white dark:bg-gray-900 w-full z-30 left-0 px-4 sm:px-8 flex items-center justify-between'>
      <div id='LEFT' className="md:hidden lg:block w-[20%]">
        <Link title='home' href={session?.user ? '/feed' : '/'} className='font-bold text-xl text-blue-600'>ANAS_SOCIAL</Link>
      </div>

      <div id='CENTER' className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className='flex gap-6 dark:text-white text-gray-600'>
          <Link title='home' href={session?.user ? '/feed' : '/'} className='flex items-center  gap-2'>
            <Image src={'/home.png'} alt='Home' width={18} height={16} className='w-4 h-4' />
            <span>Home</span>
          </Link>

          <DropDown options={[
            { key: 'Friends', value: '/friends' },
            { key: 'Friends Requests', value: '/friends/friend-requests' },
            { key: 'Suggestions', value: '/friends/suggestions' },
            { key: 'Reminders', value: '/friends/reminders' }
          ]} />
          <Link title='Stories' href={'/stories'} className='flex items-center gap-2'>
            <Image src={'/stories.png'} alt='Home' width={18} height={16} className='w-4 h-4' />
            <span>Stories</span>
          </Link>
          <Search />
        </div>
      </div>
      <div id='RIGHT' className="w-[33%] flex items-center gap-2 sm:gap-4 xl:gap-8 justify-end">
        {loading ? (
          <div role="status" className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-20 h-2.5 bg-gray-200 max-sm:hidden rounded-full dark:bg-gray-500 "></div>
              <div className="w-24 h-2 bg-gray-200 dark:text-gray-500 max-sm:hidden rounded-full dark:bg-gray-500"></div>
              <svg className="w-8 h-8 text-gray-200 dark:text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) :
          <User session={session} />}
      </div>

    </div>
  )
}
const User = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 170)}>
        {session?.user ? (
          <>
            <button title="Avatar dropdown btn" onClick={() => setOpen(!open)}>
              <img
                src={session.user.image ?? ""}
                alt="avatar"
                className="w-8 h-8 mt-2 rounded-full cursor-pointer"

              />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 dark:bg-slate-800 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                <div className='flex flex-col justify-start'>

                  <p className="text-sm rounded-md cursor-pointer hover:bg-gray-100 p-2 py-2 dark:text-gray-300 text-gray-700">{session.user.email}</p>
                  <Link className="text-sm dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-100 p-2 py-2 text-gray-700" href={'/profile/' + session.user.name}>My Profile</Link>
                  <Link className="text-sm dark:text-gray-300 rounded-md cursor-pointer hover:bg-gray-100 p-2 py-2 text-gray-700" href={'/settings'}>settings</Link>
                  <button
                    className="w-full text-left p-2 py-2 text-sm dark:text-gray-300 font-bold text-red-600 hover:bg-gray-100 rounded-md"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Image className='hidden sm:block' src={"/noAvatar.png"} alt='people' width={20} height={20} />
            <Link title="go to Login" prefetch={false} href={`/login?redirect_url=${decodeURIComponent(pathname)}`}>Login</Link>/
            <Link title="go to sign-up" prefetch={false} href={`/sign-up?redirect_url=${decodeURIComponent(pathname)}`}>Register</Link>
          </div>
        )}
      </div>
      <Link title='friends' className='max-sm:hidden' href={'/friends'}>
        <Image src={"/friends.png"} alt='people' width={20} height={20} />
      </Link>
      <Link title='chat' className='max-sm:hidden text-blue-500' href={'/chat'}>
        &#128172;
      </Link>
      <DarkModeToggle />
      <MobMenu />
    </>
  )
}
export default Navbar
