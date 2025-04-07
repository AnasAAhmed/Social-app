import { LoaderGif } from '@/components/Loader';
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import LeftMenu from '@/components/leftMenu/LeftMenu';
import RightMenu from '@/components/rightMenu/RightMenu';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'

const page = async ({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ page: string }> }) => {
    const { userId } = await auth.protect();
    if (!userId) return <NotLoggedIn />;
    const { page } = await searchParams
    const { username } = await params
    const perPage = 4;
    const offset = (Number(page) || 1 - 1) * perPage;
    const decodedQuery = decodeURIComponent(username);

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
    // const pop = users.filter(u => u.id !== userId);
    return (
        <div className='flex justify-end'>
                <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="p-4 bg-white dark:bg-slate-900  shadow-md rounded-lg flex flex-col gap-8">
                            <p className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">
                                {users.length > 0 ? "User results for" : "No User Found For"} ({decodedQuery}).
                            </p>
                            {users.length > 0 && users.map((user) => (
                                <div key={user.id} className="bg-white dark:bg-slate-900  shadow-md ring-[0.5px] rounded-lg p-4 w-full flex flex-col sm:flex-row items-center gap-4">
                                    <Image
                                        src={user.avatar || "/noAvatar.png"}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-grow text-center dark:text-white sm:text-left">
                                        <h3 className="font-semibold">
                                            {user.name && user.surname
                                                ? `${user.name} ${user.surname}`
                                                : user.username}
                                        </h3>
                                        <span className='text-sm dark:text-white  text-gray-400'> @{user.username}</span>
                                        <p className="text-gray-600 dark:text-gray-300">mutual friends 12</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link href={`/profile/${user.username}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            {userId === user.id ? 'Your Profile' : 'Profile'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            <Pagination urlParamName='page' totalPages={totalPages} page={Number(page)||1} />
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
                    <RightMenu />
                </div>
        </div>
    )
}

export default page
