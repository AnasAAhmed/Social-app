import { auth } from "@/auth";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import NotLoggedIn from "@/components/NotLoggedIn";
import Pagination from "@/components/Pagination";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import Image from "next/image";
import SmartLink from '@/components/SmartLink';

export const dynamic = 'force-dynamic';

const page = async ({ params, searchParams }: { params: Promise<{ username: string }>, searchParams: Promise<{ page: string }> }) => {
    const session = (await auth()) as Session;
    
      if (!session) {
        return <NotLoggedIn />;
      }
    const { page } = await searchParams;
    const { username } = await params;

    const perPage = 4;
    const currentPage = Number(page) || 1;
    const offset = (currentPage - 1) * perPage;
    const decodedQuery = decodeURIComponent(username);

    const totalUsers = await prisma.user.count({
        where: {
            username: {
                contains: decodedQuery,
                // mode: 'insensitive',
            },
        },
    });

    if (totalUsers === 0) {
        return (
            <div className='flex justify-end'>
                <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
                    <div className="p-4 bg-white dark:bg-[#111] shadow-md rounded-lg text-center text-gray-600 dark:text-gray-300">
                        No User Fonud For ({decodedQuery}).
                    </div>
                </div>
                <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
                    <RightMenu />
                </div>
            </div>
        );
    }

    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: decodedQuery,
                // mode: 'insensitive',
            },
        },
        select: {
            username: true,
            id: true,
            avatar: true,
            userInfo: {
                select: {
                    surname: true,
                    name: true,
                },
            },
        },
        take: perPage,
        skip: offset,
    });

    const totalPages = Math.ceil(totalUsers / perPage);

    return (
        <div className='flex justify-end'>
            <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
                <LeftMenu type='profile' />
            </div>
            <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="p-4 bg-white dark:bg-[#111] shadow-md rounded-lg flex flex-col gap-8">
                        <h3 className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">
                            User results for ({decodedQuery}).
                        </h3>

                        {users.map((user) => (
                            <div key={user.id} className="bg-white dark:bg-[#111] shadow-md ring-[0.5px] rounded-lg p-4 w-full flex flex-col sm:flex-row items-center gap-4">
                                <Image
                                    src={user.avatar || "/noAvatar.png"}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-grow text-center dark:text-white sm:text-left">
                                    <h3 className="font-semibold">
                                        {user?.userInfo?.name && user.userInfo.surname
                                            ? `${user.userInfo.name} ${user.userInfo.surname}`
                                            : user.username}
                                    </h3>
                                    <span className='text-sm dark:text-white text-gray-400'>@{user.username}</span>
                                    <p className="text-gray-600 dark:text-gray-300">mutual friends 12</p>
                                </div>
                                <SmartLink
                                    href={`/profile/${user.username}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {session?.user?.id === user.id ? 'Your Profile' : 'Profile'}
                                </SmartLink>
                            </div>
                        ))}
                        <Pagination urlParamName='page' totalPages={totalPages} page={currentPage} />
                    </div>
                </div>
            </div>
            <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
                <RightMenu />
            </div>
        </div>
    );
};
export default page;