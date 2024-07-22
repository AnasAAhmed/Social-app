'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropDown from './DropDown'
import { useUser } from '@clerk/nextjs'

const MenuBar = () => {
  const { user } = useUser();
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md text-sm dark:text-white text-gray-500 flex flex-col gap-2">
      <Link
        href={`/profile/${user?.username}`}
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/posts.png" alt="" width={20} height={20} />
        <span>My Posts</span>
      </Link>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <Link
        href="/settings#/security"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/activity.png" alt="" width={20} height={20} />
        <span>Security</span>
      </Link>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <Link
        href="/"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/events.png" alt="" width={20} height={20} />
        <span>Events</span>
      </Link>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <Link
        href="/"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/albums.png" alt="" width={20} height={20} />
        <span>Albums</span>
      </Link>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <DropDown options={[
        { key: 'Friends', value: '/friends' },
        { key: 'Friends Requests', value: '/friends/friend-requests' },
        { key: 'Suggestions', value: '/friends/suggestions' }
      ]} />
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <Link
        href="/stories"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/lists.png" alt="" width={20} height={20} />
        <span>Stories</span>
      </Link>
      <Link
        href={`/profile/${user?.username}`}
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/courses.png" alt="" width={20} height={20} />
        <span>My Profile</span>
      </Link>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <Link
        href="/settings#"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/settings.png" alt="" width={20} height={20} />
        <span>Settings</span>
      </Link>
    </div>
  )
}

export default MenuBar
