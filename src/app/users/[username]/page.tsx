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
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'

const page = async ({ params, searchParams }: { params: { username: string }, searchParams: { page: string } }) => {
    const { userId } = auth();
    if (!userId) return <NotLoggedIn />;
    const page = Number(searchParams?.page) || 1;
    const perPage = 4;
    const offset = (page - 1) * perPage;
    const query = params.username;
    console.log(query);

    const decodedQuery = decodeURIComponent(query);

    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
        take: perPage,
        skip: offset,

    });
    const totalUsers = await prisma.user.count({
        where: {
            OR: [
                {
                    username: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
    });
    const totalPages = Math.ceil(totalUsers / perPage);

    return (
        <div className='flex gap-6 pt-6'>
            <Suspense fallback={<LoaderGif />}>

                <div className="hidden xl:block"><LeftMenu type='home' /></div>
                <div className="w-full lg:w-[70%] xl:w-[50%] ">
                    <div className="flex flex-col gap-6">
                        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-8">

                            {users.map((user) => (
                                <div key={user.id} className="bg-white shadow-md bordefr ring-[0.5px] rounded-lg p-4 w-full flex flex-col sm:flex-row items-center gap-4">
                                    <Image
                                        src={user.avatar || "/noAvatar.png"}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-semibold">
                                            {user.name && user.surname
                                                ? `${user.name} ${user.surname}`
                                                : user.username}
                                        </h3>
                                        <p className="text-gray-600">mutual friends 12</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link href={`/profile/${user.username}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            Profile
                                        </Link>
                                    </div>
                                </div>
                            ))}
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
