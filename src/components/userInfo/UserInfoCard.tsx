'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader from '../Loader'
import UserInfoCardIntraction from './UserInfoCardIntraction';
import UpdateUser from '../forms/UpdateUser';
import Truncate, { useMediaQuery } from '@/lib/truncate';
import { useAuth } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { toast } from 'sonner';

const UserInfoCard = ({ userId }: { userId: string }) => {
  const { userId: currentUser } = useAuth();
  const [data, setData] = useState<{
      user: User;
      isUserBlocked: boolean;
      isFollowing: boolean;
      isFollowingSent: boolean;
      isFollowedByThem:boolean
    } | null>(null);
  const [loading, setLoading] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    if (!isDesktop) return;

    const fetchInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${userId}/info?currentUser=${currentUser}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        toast.error((err as Error).message)

      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [userId, currentUser, isDesktop]);

  if (!isDesktop) return <Loader />;
  if (loading) return <Loader />;
  if (!data) return <div>Failed to load user info.</div>;

  const { user, isUserBlocked, isFollowing, isFollowingSent,isFollowedByThem } = data;

  const createdAt = new Date(user.createdAt).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const stripURL = (url: string) => {
    if (!url) return "";
    let strippedUrl = url.startsWith("https") ? url.slice(8) : url;
    if (strippedUrl.startsWith("www.")) strippedUrl = strippedUrl.slice(4);
    return strippedUrl.length > 13 ? strippedUrl.slice(0, 13) + "..." : strippedUrl;
  };
  return (
    <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
      {/* top */}
      <div className=" flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-300">User Information</span>
        {currentUser === user.id ? <UpdateUser user={user} /> : <div className='text-blue-500 cursor-pointer text-xs'>See all</div>}
      </div>
      <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-xl dark:text-white text-black">{(user.name && user.surname) ? user.name + ' ' + user.surname : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <Truncate desc={user.description!} numOfChar={80} />
        {user.city && <div className="flex items-center gap-2">
          <Image src={"/map.png"} alt='' width={16} height={16} />
          <span className="">Living in <b>{user.city}</b></span>
        </div>}
        {user.school && <div className="flex items-center gap-2">
          <Image src={"/school.png"} alt='' width={16} height={16} />
          <span className="">went to <b>{user.school}</b></span>
        </div>}
        {user.dob && <div className="flex items-center gap-2">
          <Image src={"/school.png"} alt='' width={16} height={16} />
          <span className="">D.O.B <b>{new Date(user.dob).toISOString().split('T')[0]}</b></span>
        </div>}
        {user.work && <div className="flex items-center gap-2">
          <Image src={"/work.png"} alt='' width={16} height={16} />
          <span className="">Works at <b>{user.work}</b></span>
        </div>}
        <div className="flex items-center justify-between">
          {user.website && <div className="flex gap-1 items-center">
            <Image src={"/link.png"} alt='' width={16} height={16} />
            <a target='blank' href={user.website.startsWith("http") ? user.website : `https://${user.website.slice(4)}`} className='text-blue-500 font-medium'> {stripURL(user.website)}</a>
          </div>}
          <div className="flex gap-1 items-center">
            <Image src={"/date.png"} alt='' width={16} height={16} />
            {createdAt}
          </div>
        </div>
        {currentUser && currentUser !== user.id && < UserInfoCardIntraction
          userId={user.id}
          isFollowing={isFollowing}
          isUserBlocked={isUserBlocked}
          isFollowingSent={isFollowingSent}
          isFollowedByThem={isFollowedByThem}
        />}
      </div>
    </div>
  )
}

export default UserInfoCard
