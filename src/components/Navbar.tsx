
import Link from 'next/link'
import React from 'react'
import MobMenu from './MObMenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Search from './Search'
import DropDown from './DropDown'

const Navbar = () => {
  return (
    <div className='h-24 flex items-center justify-between'>
      <div id='LEFT' className="md:hidden lg:block w-[20%]">
        <Link href={"/"} className='font-bold text-xl text-blue-600'>ANAS_SOCIAL</Link>
      </div>

      <div id='CENTER' className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className='flex gap-6 text-gray-600'>
          <Link href={'/'} className='flex items-center  gap-2'>
            <Image src={'/home.png'} alt='Home' width={18} height={16} className='w-4 h-4' />
            <span>Home</span>
          </Link>
          <DropDown options={[
            { key: 'Friends', value: '/friends' },
            { key: 'Friends Requests', value: '/friends/friend-requests' },
            { key: 'Suggestions', value: '/friends/suggestions' }
          ]} />
          <Link href={'/stories'} className='flex items-center gap-2'>
            <Image src={'/stories.png'} alt='Home' width={18} height={16} className='w-4 h-4' />
            <span>Stories</span>
          </Link>
          <Search />
        </div>
      </div>
      <div id='RIGHT' className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div role="status" className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-20 h-2.5 bg-gray-200 max-sm:hidden rounded-full dark:bg-gray-700 "></div>
              <div className="w-24 h-2 bg-gray-200 max-sm:hidden rounded-full dark:bg-gray-700"></div>
              <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Link className='max-sm:hidden' href={'/friends'}>
              <Image src={"/people.png"} alt='people' width={20} height={20} />
            </Link>
            <Link className='max-sm:hidden' href={'/chat'}>
              <Image src={"/messages.png"} alt='people' width={20} height={20} />
            </Link>
            <div className="cursor-pointer max-sm:hidden">
              <Image src={"/notifications.png"} alt='people' width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-1">
              <Image src={"/noAvatar.png"} alt='people' width={20} height={20} />
              <Link href={'/sign-in'} >Login</Link>/
              <Link href={'/sign-up'} >Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobMenu />

      </div>
    </div>
  )
}

export default Navbar
