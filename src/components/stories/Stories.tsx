import prisma from '@/lib/client';
import React, { Suspense } from 'react';
import { LoaderStories } from '../Loader';
import StoryList from './StoryList';
import NotLoggedIn from '../NotLoggedIn';
import { auth } from '@/auth';

const Stories = async () => {
    const { user: currentUser } = (await auth()) as Session;
    if (!currentUser) return <NotLoggedIn />;
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
                                followingId: currentUser.id,
                            },
                        },
                    },
                },
                {
                    user: {
                        following: {
                            some: {
                                followerId: currentUser.id,
                            },
                        },
                    },
                },
                {
                    userId: currentUser.id,
                },
            ],
        },
        take: 8,
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (
        <div className='p-4 bg-white dark:bg-[#111] shadow-md rounded-lg overflow-scroll text-sm scrollbar-hide'>
            <div className="flex gap-2 w-max">
                <Suspense fallback={<LoaderStories />}>
                    <StoryList stories={stories} userId={currentUser.id} />
                </Suspense>
                {/* {load? <LoaderStories />:<StoryList stories={stories} userId={currentUser} />} */}
            </div>
            {stories.length > 4 && (
                <div className="text-xs flex justify-end cursor-pointer text-blue-500 w-full">
                    <span>See all</span>
                </div>
            )}
        </div>
    );
};

export default Stories;
