'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader, { Spinner } from '../Loader'
import UserInfoCardIntraction from './UserInfoCardIntraction';
import UpdateUser from '../forms/UpdateUser';
import Truncate, { useMediaQuery } from '@/lib/truncate';
import { User, UserInfo } from '@prisma/client';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Cake, Mail } from 'lucide-react';

type UserAndInfo = any & {
  userInfo: UserInfo

}

const UserInfoCard = ({ user }: { user: UserAndInfo }) => {
  const { data: session, status } = useSession();
  const Userloading = status === 'loading';
  const [data, setData] = useState<{
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
    isFollowedByThem: boolean
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (Userloading) return;

    const fetchInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${user.id}/info?currentUser=${session?.user?.id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError((err as Error).message)
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [user.id, session?.user?.id, Userloading]);

  const createdAt = new Date(user.createdAt).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dob = new Date(user.userInfo.dob ? user.userInfo.dob : null).toLocaleDateString("en-us", {
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
    <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md flex flex-col gap-4'>
      {/* top */}
      <div className=" flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-300">User Information</span>
        {session?.user?.id === user.id ? <UpdateUser user={user} /> : <div className='text-blue-500 cursor-pointer text-xs'>See all</div>}
      </div>
      <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-xl dark:text-white text-black">{(user.userInfo.name && user.userInfo.surname) ? user.userInfo.name + ' ' + user.userInfo.surname : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <Truncate desc={user.userInfo.description!} numOfChar={80} />
        {user.userInfo.city && <div className="flex items-center gap-2">
          <Image src={"/map.png"} alt='' width={16} height={16} />
          <span className="">Living in <b>{user.userInfo.city}</b></span>
        </div>}
        {user.email && <div className="flex items-center gap-2">
          <Mail size={'1.1rem'} />
          <span className="">Contact <a href={"mailto:" + user.email}> <b>{user.email}</b></a></span>
        </div>}
        {user.userInfo.school && <div className="flex items-center gap-2">
          <Image src={"/school.png"} alt='' width={16} height={16} />
          <span className="">went to <b>{user.userInfo.school}</b></span>
        </div>}
        {user.userInfo.dob && <div className="flex items-center gap-2">
          <Cake size={'1.1rem'} />
          <span className="">D.O.B <b>{new Date(user.userInfo.dob).toISOString().split('T')[0]}</b></span>
        </div>}
        {user.userInfo.work && <div className="flex items-center gap-2">
          <Image src={"/work.png"} alt='' width={16} height={16} />
          <span className="">Works at <b>{user.userInfo.work}</b></span>
        </div>}
        <div className="flex items-center justify-between">
          {user.userInfo.website && <div className="flex gap-1 items-center">
            <Image src={"/link.png"} alt='' width={16} height={16} />
            <a target='blank' href={user.userInfo.website.startsWith("http") ? user.userInfo.website : `https://${user.userInfo.website.slice(4)}`} className='text-blue-500 font-medium'> {stripURL(user.userInfo.website)}</a>
          </div>}
        </div>
        <div className="flex gap-1 items-center">
          <Image src={"/date.png"} alt='Calender svg' width={16} height={16} />
          <span className="">Joined at <b>{createdAt}</b></span>
        </div>
        {loading ? <Spinner /> : !data ? <div>Failed to load user info: {error}</div> : session && session.user?.id !== user.id && < UserInfoCardIntraction
          userId={user.id}
          isFollowing={data.isFollowing}
          isUserBlocked={data.isUserBlocked}
          isFollowingSent={data.isFollowingSent}
          isFollowedByThem={data.isFollowedByThem}
        />}

      </div>
    </div>
  )
}

export default UserInfoCard
