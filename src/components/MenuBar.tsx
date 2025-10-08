'use client'
import Image from 'next/image'
import React from 'react'
import DropDown from './DropDown'
import { useSession } from 'next-auth/react'
import ProgressBar from './ProgressBar'

const MenuBar = () => {
  const { data: session } = useSession();
  return (
    <div className="p-4 bg-white dark:bg-[#111] rounded-lg shadow-md text-sm dark:text-white text-gray-500 flex flex-col gap-2">
      <ProgressBar
        href={`/profile/${session?.user?.name}`}
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/courses.png" alt="" width={20} height={20} />
        <span>My Profile</span>
      </ProgressBar>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href="/settings"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/activity.png" alt="" width={20} height={20} />
        <span>Settings</span>
      </ProgressBar>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href={`/profile/${session?.user?.name}`}
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/posts.png" alt="" width={20} height={20} />
        <span>My Posts</span>
      </ProgressBar>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href="/"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/events.png" alt="" width={20} height={20} />
        <span>Events</span>
      </ProgressBar>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href="/"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/albums.png" alt="" width={20} height={20} />
        <span>Albums</span>
      </ProgressBar>
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <DropDown options={[
        { key: 'Friends', value: '/friends' },
        { key: 'Friends Requests', value: '/friends/friend-requests' },
        { key: 'Suggestions', value: '/friends/suggestions' },
        { key: 'Reminders', value: '/friends/reminders' }
      ]} />
      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href="/stories"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/lists.png" alt="" width={20} height={20} />
        <span>Stories</span>
      </ProgressBar>

      <hr className="border-t-1 border-gray-50 dark:border-gray-800 w-36 self-center" />
      <ProgressBar
        href="/settings"
        className="flex items-center gap-4 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100"
      >
        <Image src="/settings.png" alt="" width={20} height={20} />
        <span>Security</span>
      </ProgressBar>
    </div>
  )
}

export default MenuBar
