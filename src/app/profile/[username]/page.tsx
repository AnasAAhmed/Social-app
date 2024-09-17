import { SearchParamProps } from '@/app/friends/page';
import AddPost from '@/components/forms/AddPost';
import { Blocked, NotFound } from '@/components/NotLoggedIn';
import { LoaderGif } from '@/components/Loader';
import NotLoggedIn from '@/components/NotLoggedIn';
import Feed from '@/components/feed/Feed';
import LeftMenu from '@/components/leftMenu/LeftMenu';
import RightMenu from '@/components/rightMenu/RightMenu';
import UserInfoCard from '@/components/rightMenu/UserInfoCard';
import UserMediaCard from '@/components/rightMenu/UserMediaCard';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

const ProfilePage = async ({ searchParams, params }: { searchParams: SearchParamProps, params: { username: string } }) => {
  const { userId: currentUser } = auth();
  if (!currentUser) return <NotLoggedIn />;
  const username = params.username;
  if (!username) return;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          follower: true,
          following: true,
          posts: true
        }
      }
    }
  })

  if (!user) return <NotFound text="If this is your profile, it seems there was an issue with the Clerk webhook, causing your profile not to be created in our database. Please contact support for assistance." />;


  let isBlocked: boolean = false;
  if (currentUser) {
    const res = await prisma.block.findFirst({
      where: {
        blockedId: currentUser,
        blockerId: user.id
      }
    })
    if (res) isBlocked = true
  }
  if (isBlocked) return <Blocked />;

  return (
    <div className='flex justify-end'>
      <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
        <LeftMenu type='profile' />
      </div>
      <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                // src={"/banner.jpg"}
                src={user.cover || "/noCover.jpeg"}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white dark:ring-slate-600 object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl dark:text-gray-200 font-medium">
              {(user.name && user.surname) ? user.name + ' ' + user.surname : user.username}
            </h1>
            <div className="flex items-center dark:text-gray-200 justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.follower}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.following}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>

          {user.id === currentUser && <AddPost />}
          <div className='xl:hidden'> <UserMediaCard user={user} /></div>
          <div className='xl:hidden'> <UserInfoCard user={user} /></div>
          <Feed searchParams={searchParams} username={user.username} />
        </div>
      </div>
      <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
        <RightMenu user={user} />
      </div>
    </div>
  )
}

export default ProfilePage;
