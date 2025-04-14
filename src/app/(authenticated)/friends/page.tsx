import Ad from '@/components/Ad';
import { LoaderGif } from '@/components/Loader';
import MenuBar from '@/components/MenuBar';
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import prisma from '@/lib/client';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from "next";
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: "Anas Social | (Friends)",
  description: "Friends Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};

export type SearchParamProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string, filter?: string, query?: string }>;
};

type UserData = {
  follower?: User;
  following?: User;
};

const FriendsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string, filter?: string }> }) => {
  const session = (await auth()) as Session;

  if (!session) {
    return <NotLoggedIn />;
  }
  const { page, filter } = await searchParams
  const isFollowers = filter === 'followers';
  const perPage = 8;
  const offset = (Number(page) || 1 - 1) * perPage;
  const whereCondition = isFollowers ? { followerId: session.user.id } : { followingId: session.user.id }

  const totalCount = await prisma.follower.count({
    where: whereCondition,
  });
  const includeCondition = isFollowers ? { following: true } : { follower: true };
  const users = totalCount > 0 ? await prisma.follower.findMany({
    where: { followerId: session.user.id },
    skip: offset,
    take: perPage,
    include: includeCondition,
  }) : [];

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
          {/* {user.name && user.surname ? `${user.name} ${user.surname}` : user.username} */}
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
          <Link href="?filter=followers" className={`mr-4 ${isFollowers ? 'text-blue-500' : 'text-gray-500'}`}>
            Followers {isFollowers && `(${totalCount})`}
          </Link>
          <Link href="?filter=followings" className={`${!isFollowers ? 'text-blue-500' : 'text-gray-500'}`}>
            Followings {!isFollowers && `(${totalCount})`}
          </Link>
          </div>
          {totalCount > 0 && users ? (
            users.map((data) => renderUser(data.follower || data.following!))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">You don&apos;t have {filter || 'Followers'} yet.</p>
          )}
          <Pagination urlParamName="page" totalPages={totalPages} page={Number(page) || 1} />
        </div>
      </Suspense>
    </div>
  );
};

export default FriendsPage;
