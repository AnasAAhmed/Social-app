import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserInfoCardIntraction from './UserInfoCardIntraction'
import UpdateUser from '../forms/UpdateUser'
import Truncate from '@/lib/truncate'

const UserInfoCard = async ({ user }: { user: User }) => {

  const createdAt = new Date(user.createdAt);

  const formatedDate = createdAt.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;
  let isFollowingBack = false;

  const { userId: currentUser } = await auth.protect()
  if (currentUser) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUser,
        blockedId: user.id,
      }
    })
    blockRes && (isUserBlocked = true);
  } if (currentUser) {
    const FollowRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUser,
        receiverId: user.id,
      }
    })
    FollowRes && (isFollowingSent = true);
  } if (currentUser) {
    const followingRes = await prisma.follower.findFirst({
      where: {
        followerId: user.id,
        followingId: currentUser,
      }
    })
    followingRes && (isFollowing = true);
  }
  const stripURL = (url:string) => {
    if (!url) return "";
    
    let strippedUrl = url;
    
    if (url.startsWith("https")) {
      strippedUrl = url.slice(8);
    } else if (url.startsWith("www.")) {
      strippedUrl = url.slice(4);
    }
    
    // Optional: Limit the length of the displayed URL
    if (strippedUrl.length > 13) {
      strippedUrl = strippedUrl.slice(0, 13) + "...";
    }
    
    return strippedUrl;
  };

  return (
    <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
      {/* top */}
      <div className=" flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-300">User Information</span>
       {currentUser===user.id?<UpdateUser user={user}/>: <div className='text-blue-500 cursor-pointer text-xs'>See all</div>}
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
          <span className="">D.O.B <b>{new Date(user.dob).toISOString().split('T')[0] }</b></span>
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
            {formatedDate}
          </div>
        </div>
        {currentUser && currentUser !== user.id && < UserInfoCardIntraction
          userId={user.id}
          isFollowing={isFollowing}
          isUserBlocked={isUserBlocked}
          isFollowingSent={isFollowingSent}
        />}
      </div>
    </div>
  )
}

export default UserInfoCard
