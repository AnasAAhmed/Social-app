import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileCard = async () => {

  const { userId } = auth();
  if (!userId) return;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          follower: true,
          following: true
        }
      }
    }
  })

  if (!user) return null;
  return (
    <div className='max-xl:hidden p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={user.cover || '/noCover.jpeg'} alt='' fill className='rounded-md' />
        <Image src={user.avatar || '/noAvatar.png'} alt='' width={48} height={48} className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
      </div>
      <div className="h-36d flex flex-col items-center">
        <span className="font-semibold">{(user.name && user.surname) && user.name + ' ' + user.surname}</span>
        <span className="font-semibold text-sm text-gray-400">@{user.username}</span>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex">
            <Image src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src={'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
            <Image src={'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='' width={12} height={12} className='object-cover w-5 h-5 rounded-full' />
          </div>
          <span className="text-xs text-gray-500">{user._count.follower} Followers</span>
          <span className="text-xs text-gray-500">{user._count.following} Followers</span>
        </div>
        <Link href={`/profile/${user.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</Link>
      </div>
    </div>
  )
}

export default ProfileCard
