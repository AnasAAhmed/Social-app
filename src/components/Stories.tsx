import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react';
import { LoaderStories } from './Loader';
import StoryList from './StoryList';
import NotLoggedIn from './NotLoggedIn';

const Stories = async () => {
    const { userId: currentUser } = auth();
    if (!currentUser) return <NotLoggedIn/>;

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
        take: 6,
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-hide'>
            <div className="flex gap-2 w-max">
                <Suspense fallback={<LoaderStories />}>
                    <StoryList stories={stories} userId={currentUser} />
                </Suspense>
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
