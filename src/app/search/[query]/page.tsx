import { SearchParamProps } from '@/app/friends/page';
import { LoaderGif } from '@/components/Loader';
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import Feed from '@/components/feed/Feed';
import Post from '@/components/feed/Post';
import LeftMenu from '@/components/leftMenu/LeftMenu';
import RightMenu from '@/components/rightMenu/RightMenu';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'

const page = async ({ params, searchParams }: { params: { query: string }, searchParams: { page: string } }) => {
    const { userId } = auth();
    if (!userId) return <NotLoggedIn />;
    const page = Number(searchParams?.page) || 1;
    const perPage = 4;
    const offset = (page - 1) * perPage;
    const query = params.query || '';
    const decodedQuery = decodeURIComponent(query);

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    desc: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
        take: perPage,
        skip: offset,
        include: {
            user: true,
            likes: {
                select: {
                    userId: true
                },
            },
            _count: {
                select: {
                    comments: true
                },
            },
        },
    });
    const totalPosts = await prisma.post.count({
        where: {
            OR: [
                {
                    desc: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
    });
    const totalPages = Math.ceil(totalPosts / perPage);

    return (
        <div className='flex justify-end'>
            <Suspense fallback={<LoaderGif />}>
                <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="mb-4 rounded-lg flex flex-col gap-4">
                            <p className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">
                                {posts.length > 0 ? "Posts results for" : "No Post Found For"} ({decodedQuery}).
                            </p>
                            {posts && posts.map(post => (
                                <Post userId={userId} key={post.id} post={post} />
                            ))}
                            <Pagination urlParamName='page' totalPages={totalPages} page={page} />
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
                    <RightMenu />
                </div>
            </Suspense>
        </div>
    )
}

export default page
