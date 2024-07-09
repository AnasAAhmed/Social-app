import Ad from '@/components/Ad'
import { LoaderGif, LoaderStories } from '@/components/Loader';
import MenuBar from '@/components/MenuBar'
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import StoryList from '@/components/StoryList';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'

const page = async ({ searchParams }: { searchParams: { page: string } }) => {

  const { userId: currentUser } = auth();
  if (!currentUser) return <NotLoggedIn />;
  const page = Number(searchParams?.page) || 1;
  const perPage = 4;
  const offset = (page - 1) * perPage;
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
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold mb-4 text-slate-600">Stories</h1>
          <Suspense fallback={<LoaderStories />}>
            <StoryList stories={stories} userId={currentUser} />
          </Suspense>
          <Pagination totalPages={totalPages} page={page} />
        </div>
      </Suspense >

    </div>
  )
}

export default page
