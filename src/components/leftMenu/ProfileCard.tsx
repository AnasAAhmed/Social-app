// 'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { ProfileCardError, ProfileCardLoad } from '../Loader'
// import { useMediaQuery } from '@/lib/truncate'
// import { toast } from 'sonner';
// import { useSession } from 'next-auth/react'

// const ProfileCard = () => {

//   const { data: session,status } = useSession();
//   const userLoading = status === 'loading'

//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const isDesktop = useMediaQuery('(min-width: 1280px)');

//   useEffect(() => {
//     if (!isDesktop) return;

//     const fetchInfo = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/user/${session?.user?.id}/profile-card`);
//         const json = await res.json();
//         setUser(json);

//       } catch (err) {
//         console.error(err);
//         toast.error((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInfo();
//   }, [session?.user?.id, isDesktop]);

//   if (!isDesktop) return <ProfileCardLoad />;
//   if (loading) return <ProfileCardLoad />;
//   if (!user) return <ProfileCardError />;

//   return (
//     <div className='max-xl:hidden p-4 bg-white dark:bg-[#111] rounded-lg shadow-md text-sm flex flex-col gap-6'>
//       <div className="h-20 relative">
//         <Image src={data.cover || '/noCover.jpeg'} alt='cover photo' fill className='rounded-md' />
//         <img src={data.avatar || '/noAvatar.png'} alt='avatar' className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
//       </div>
//       <div className="h-36d flex flex-col items-center">
//         <span className="font-semibold dark:text-white">{data.userInfo && (data.userInfo.name && data.userInfo.surname) && data.userInfo.name + ' ' + data.userInfo.surname}</span>
//         <span className="font-semibold text-sm text-gray-400">@{data.username}</span>
//         <div className="flex flex-wrap justify-center items-center gap-4">
//           <div className="flex">
//             <Image src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
//             <Image src={'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
//             <Image src={'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
//           </div>
//           <span className="text-xs dark:text-white text-gray-500">{data._count.follower} Followers</span>
//           <span className="text-xs dark:text-white text-gray-500">{data._count.following} Following</span>
//         </div>
//         <Link href={`/profile/${data.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</Link>
//       </div>
//     </div>
//   )
// }

// export default ProfileCard
'use client'

import Image from 'next/image'
import React from 'react'
import { ProfileCardError, ProfileCardLoad } from '../Loader'
import { useMediaQuery } from '@/lib/truncate'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import ProgressBar from '../ProgressBar'

const ProfileCard = () => {
  const { data: session, status } = useSession();
  const UserLoading = status === 'loading'
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const userId = session?.user?.id

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile-card', userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}/profile-card`)
      if (!res.ok) throw new Error('Failed to fetch profile info')
      return res.json()
    },
    enabled: !!userId && isDesktop && !UserLoading,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  if (UserLoading || isLoading) return <ProfileCardLoad />
  if (isError || !data) return <ProfileCardError />

  return (
    <div className='max-xl:hidden p-4 bg-white dark:bg-[#111] rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={data.cover || '/noCover.jpeg'} alt='cover photo' fill className='rounded-md object-cover' />
        <img src={data.avatar || '/noAvatar.png'} alt='avatar' className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
      </div>
      <div className="h-36d flex flex-col items-center">
        <span className="font-semibold dark:text-white">
          {data.userInfo?.name && data.userInfo?.surname
            ? `${data.userInfo.name} ${data.userInfo.surname}`
            : data.username}
        </span>
        <span className="font-semibold text-sm text-gray-400">@{data.username}</span>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex">
            <Image src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src='https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
          </div>
          <span className="text-xs dark:text-white text-gray-500">{data._count?.follower} Followers</span>
          <span className="text-xs dark:text-white text-gray-500">{data._count?.following} Following</span>
        </div>
        <ProgressBar href={`/profile/${data.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</ProgressBar>
      </div>
    </div>
  )
}

export default ProfileCard
