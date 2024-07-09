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
        <div className='flex gap-6 pt-6'>
            <Suspense fallback={<LoaderGif />}>

                <div className="hidden xl:block"><LeftMenu type='home' /></div>
                <div className="w-full lg:w-[70%] xl:w-[50%] ">
                    <div className="flex flex-col gap-6">
                        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
                            {posts?.length ? (
                                posts.map(post => (
                                    <Post key={post.id} post={post} />
                                ))) : ""}
                            <Pagination urlParamName='page' totalPages={totalPages} page={page} />
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-[40%]"><RightMenu /></div>
            </Suspense>
        </div>
    )
}

export default page
