'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ProfileCardError, ProfileCardLoad } from '../Loader'
import { useMediaQuery } from '@/lib/truncate'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner';

const ProfileCard = () => {

  const { userId } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    if (!isDesktop) return;

    const fetchInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${userId}/profile-card`);
        const json = await res.json();
        setUser(json);
        console.log(json);
        
      } catch (err) {
        console.error(err);
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [userId, isDesktop]);

  if (!isDesktop) return <ProfileCardLoad />;
  if (loading) return <ProfileCardLoad />;
  if (!user) return <ProfileCardError />;

  return (
    <div className='max-xl:hidden p-4 bg-white dark:bg-slate-900 rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={user.cover || '/noCover.jpeg'} alt='' fill className='rounded-md' />
        <Image src={user.avatar || '/noAvatar.png'} alt='' width={48} height={48} className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
      </div>
      <div className="h-36d flex flex-col items-center">
        <span className="font-semibold dark:text-white">{(user.name && user.surname) && user.name + ' ' + user.surname}</span>
        <span className="font-semibold text-sm text-gray-400">@{user.username}</span>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex">
            <Image src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src={'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src={'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
          </div>
          <span className="text-xs dark:text-white text-gray-500">{user._count.follower} Followers</span>
          <span className="text-xs dark:text-white text-gray-500">{user._count.following} Following</span>
        </div>
        <Link href={`/profile/${user.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</Link>
      </div>
    </div>
  )
}

export default ProfileCard
