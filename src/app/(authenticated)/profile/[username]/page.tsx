import { Blocked, NotFound } from '@/components/NotLoggedIn';
import NotLoggedIn from '@/components/NotLoggedIn';
import Feed from '@/components/feed/Feed';
import LeftMenu from '@/components/leftMenu/LeftMenu';
import RightMenu from '@/components/rightMenu/RightMenu';
import prisma from '@/lib/client';
import Image from 'next/image';
import React from 'react'
import { auth } from '@/auth';
import { Metadata } from "next";
import UserInfoCard from '@/components/userInfo/UserInfoCard';
import UserMediaCardForMob from '@/components/userMedia/UserMediaCardForMob';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata | JSX.Element | undefined> {
  const { username } = await params;
  if (!username) return;

  const user = await prisma.user.findFirst({
    where: { username },
    select: {
      avatar: true,
      userInfo: {
        select: {
          description: true,
          name: true,
          surname: true,
          work: true
        }
      }
    }
  });

  if (!user) {
    return {
      title: "User Not Found",
      description: "This profile may not exist or the username has changed.",
      applicationName: "Anas' Social Platform",
      authors: {
        url: 'https://anas3d.netlify.app/',
        name: "Anas Ahmed"
      },
      publisher: 'Anas Social',
      creator: 'Anas Ahmed',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true
        }
      },
      openGraph: {
        type: "website",
        url: "https://anas-social.vercel.app",
        title: "User Not Found",
        description: "This profile may not exist or the username has changed.",
        siteName: "Anas Social",
        images: [
          {
            url: "/logo.png",
            alt: 'logo',
            width: 200,
            height: 200
          }
        ]
      }
    };
  }

  const { avatar, userInfo } = user;
  const work = userInfo?.work ? ' - ' + userInfo.work : ''
  const fullName = userInfo?.name && userInfo?.surname ? `${userInfo.name} ${userInfo.surname}` : username;
  const description = userInfo?.description
    ? userInfo.description
    : `A Profile Page of ${username} full-stack social media made with Nextjs, Neon PostgreSQL, TypeScript, Cloudinary, Clerk, Prisma and SSR streaming logic | Anas Ahmed`;

  return {
    title: `${fullName}${work} | Anas Social`,
    description,
    applicationName: "Anas' Social Platform",
    authors: {
      url: 'https://anas3d.netlify.app/',
      name: "Anas Ahmed"
    },
    publisher: 'Anas Social',
    creator: 'Anas Ahmed',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: {
      type: "website",
      url: "https://anas-social.vercel.app",
      title: `${fullName}${work} | Anas Social`,
      description,
      siteName: "Anas Social",
      images: [
        {
          url: avatar || "/defaultAvatar.png",
          alt: fullName,
          width: 200,
          height: 200
        }
      ]
    }
  };
}


export const dynamic = 'force-dynamic';

const ProfilePage = async ({ params }: {params: Promise<{ username: string }> }) => {
  const session = (await auth()) as Session;

  const { username } = await params;
  if (!username) return;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      username: true,
      email:true,
      avatar: true,
      cover: true,
      id: true,
      createdAt: true,
      userInfo: true,
      _count: {
        select: {
          follower: true,
          following: true,
          posts: true
        }
      },
    },
  })

  if (!user) return <NotFound currentUser={session ? true : false} text="If this is your profile, try using the 'View Profile' button if you recently changed your username. Otherwise, please contact support for help." />;



  let isBlocked: boolean = false;
  if (session && session.user) {
    const res = await prisma.block.findFirst({
      where: {
        blockedId: session.user.id,
        blockerId: user.id
      }
    })
    if (res) isBlocked = true
  }

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
                src={!isBlocked ? user.cover || "/noCover.jpeg" : '/noCover.jpeg'}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <img
                src={user.avatar || "/noAvatar.png"}
                alt={user.username + " avatar"}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white dark:ring-slate-600 object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl dark:text-gray-200 font-medium">
              {(user.userInfo?.name && user.userInfo?.surname) ? user.userInfo?.name + ' ' + user.userInfo?.surname : user.username}
            </h1>
            {!isBlocked && <div className="flex w-full rounded-lg p-3 items-center bg-white dark:bg-[#111] dark:text-gray-200 justify-center gap-12">
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
            </div>}
          </div>
          {session ? (
            isBlocked ? (
              <Blocked />
            ) : (
              <>
                <div className='xl:hiddsen'>
                  <UserInfoCard user={user} />
                </div>
                <div className='xl:hidden'>
                  <UserMediaCardForMob userId={user.id} />
                </div>
                <Feed username={user.username} />
              </>
            )
          ) : (
            <NotLoggedIn />
          )}

        </div>
      </div>
      <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
        <RightMenu user={user} isBlocked={isBlocked} currentUser={session && session.user.id!} />
      </div>
    </div>
  )
}

export default ProfilePage;
