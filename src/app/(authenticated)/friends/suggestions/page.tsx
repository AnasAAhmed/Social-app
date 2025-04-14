import Ad from '@/components/Ad'
import MenuBar from '@/components/MenuBar'
import React from 'react'

import { Metadata } from "next";
import { auth } from '@/auth';
import NotLoggedIn from '@/components/NotLoggedIn';
import prisma from '@/lib/client';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Anas Social | (Suggestions)",
  description: "Suggestions Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string, filter?: string }> }) => {
  const session = (await auth()) as Session;

  if (!session) {
    return <NotLoggedIn />;
  }
  const { page } = await searchParams
  const perPage = 12;
  const offset = (Number(page) || 1 - 1) * perPage;

  const [totalUsers, users] = await Promise.all([
    await prisma.user.count({}),
    await prisma.user.findMany({
      select: {
        username: true,
        avatar: true,
        userInfo: {
          select: {
            name: true,
            surname: true
          }
        }
      },
      skip: offset,
      take: perPage
    })
  ])
  const totalPages = Math.ceil(totalUsers / perPage);

  return (
    <div className='flex gap-6 max-md:justify-center'>
      <div className="hidden flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="sm" /></div>
      <div className="flex flex-col gap-6 max-md:w-[90%] w-[80%]">
        <div className="p-4 bg-white dark:bg-slate-900  shadow-md rounded-lg flex flex-col gap-8">
          <h3 className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">
            Suggestions
          </h3>
          {users.length > 0 && users.map((user) => (
            <div key={user.username} className="bg-white dark:bg-slate-900  shadow-md ring-[0.5px] rounded-lg p-4 w-full flex flex-col sm:flex-row items-center gap-4">
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-grow text-center dark:text-white sm:text-left">
                <h3 className="font-semibold">
                  {user?.userInfo?.name && user.userInfo.surname
                    ? `${user.userInfo.name} ${user.userInfo.surname}`
                    : user.username}
                </h3>
                <span className='text-sm dark:text-white  text-gray-400'> @{user.username}</span>
                <p className="text-gray-600 dark:text-gray-300">mutual friends 12</p>
              </div>
              {session ? <div className="flex gap-3">
                <Link title={session.user.name === user.username ? 'Your Profile' : user.username + "'s Profile"} href={`/profile/${user.username}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {session.user.name === user.username ? 'Your Profile' : 'See Profile'}
                </Link>
              </div> :
                <Link title={user.username + ' profile page'} href={`/profile/${user.username}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                 See Profile
                </Link>}
            </div>
          ))}
          <Pagination urlParamName='page' totalPages={totalPages} page={Number(page) || 1} />
        </div>

      </div>
    </div>
  )
}

export default page
