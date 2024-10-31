import Ad from '@/components/Ad'
import { LoaderGif, LoaderStories } from '@/components/Loader';
import MenuBar from '@/components/MenuBar'
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import StoryList from '@/components/stories/StoryList';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string}> }) => {

  const { userId: currentUser } = await auth.protect();
  if (!currentUser) return <NotLoggedIn />;
  const { page } = await searchParams
  const perPage = 4;
  const offset = (Number(page)||1 - 1) * perPage;
  // Fetch the stories
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            follower: {
              some: {
                followingId: currentUser,
              },
            },
          },
        },
        {
          user: {
            following: {
              some: {
                followerId: currentUser,
              },
            },
          },
        },
        {
          userId: currentUser,
        },
      ],
    },
    take: perPage,
    skip: offset,
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const totalStories = await prisma.story.count({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            follower: {
              some: {
                followingId: currentUser,
              },
            },
          },
        },
        {
          userId: currentUser,
        },
      ],
    },
  });
  const totalPages = Math.ceil(totalStories / perPage);
  return (
    <div className='flex gap-6 pt-6'>
      <Suspense fallback={<LoaderGif />}>

        <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="md" /></div>
        <div className="flex flex-col gap-6 max-md:mx-4">
          <h1 className="text-3xl  font-bold mb-4 text-slate-600">Stories</h1>
          <Suspense fallback={<LoaderStories />}>
            <StoryList stories={stories} userId={currentUser} />
          </Suspense>
          <Pagination totalPages={totalPages} page={Number(page)|| 1} />
        </div>
      </Suspense >

    </div>
  )
}

export default page
