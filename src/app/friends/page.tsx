import Ad from '@/components/Ad';
import { LoaderGif } from '@/components/Loader';
import MenuBar from '@/components/MenuBar';
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type UserData = {
  follower?: User;
  following?: User;
};

const FriendsPage = async ({ searchParams }: { searchParams: { page?: string, filter?: string } }) => {
  const { userId } = await auth.protect();

  if (!userId) {
    return <NotLoggedIn />;
  }
  const { page, filter } = await searchParams
  const isFilter = filter === 'followings' ? 'followings' : 'followers';
  const perPage = 8;
  const offset = (Number(page) || 1 - 1) * perPage;

  const [totalCount, userData]: [number, UserData[]] = filter === 'followers'
    ? await Promise.all([
      prisma.follower.count({
        where: { followerId: userId },
      }),
      prisma.follower.findMany({
        where: { followerId: userId },
        skip: offset,
        take: perPage,
        include: { following: true },
      }),
    ])
    : await Promise.all([
      prisma.follower.count({
        where: { followingId: userId },
      }),
      prisma.follower.findMany({
        where: { followingId: userId },
        skip: offset,
        take: perPage,
        include: { follower: true },
      }),
    ]);

  const totalPages = Math.ceil(totalCount / perPage);

  const renderUser = (user: User) => (
    <div key={user.id} className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 w-full flex flex-col sm:flex-row items-center gap-4">
      <Image
        src={user.avatar || "/noAvatar.png"}
        alt="avatar"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-semibold dark:text-white">
          {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">mutual friends 12</p>
      </div>
      <div className="flex gap-3">
        <Link href={`/profile/${user.username}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Profile
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row gap-6 max-md:px-5">
      <Suspense fallback={<LoaderGif />}>
        <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="sm" /></div>
        <div className="flex flex-col gap-6 w-full lg:w-4/5">
          <h1 className="text-3xl font-bold mb-4 dark:text-gray-300 text-slate-600">Friends </h1>
          <div className="flex justify-center mb-4">
            <Link href="?filter=followers" className={`mr-4 ${isFilter === 'followers' ? 'text-blue-500' : 'text-gray-500'}`}>
              Followers {isFilter === 'followers' && `(${totalCount})`}
            </Link>
            <Link href="?filter=followings" className={`${isFilter === 'followings' ? 'text-blue-500' : 'text-gray-500'}`}>
              Followings {isFilter === 'followings' && `(${totalCount})`}
            </Link>
          </div>
          {totalCount > 0 ? (
            userData.map((data) => renderUser(data.follower || data.following!))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">You don&apos;t have {filter || 'Followers'} yet.</p>
          )}
          <Pagination urlParamName="page" totalPages={totalPages} page={String(page)} />
        </div>
      </Suspense>
    </div>
  );
};

export default FriendsPage;
