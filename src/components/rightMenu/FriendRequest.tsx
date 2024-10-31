import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import FriendRequestList from './FriendRequestList'

const FriendRequest = async () => {

    const { userId } = await auth.protect();
    if (!userId) return null;

    const requestsCount = await prisma.followRequest.count({
        where: {
            receiverId: userId
        }
    });

    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include: {
            sender: true
        },
        take:4,
    });
    // if (requests.length === 0) return null;
    return (
        <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
            {/* top */}
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Friend Request</span>
                <Link href={'/friends/friend-requests'} className='text-blue-500 text-xs'>See all {requestsCount>4&&requestsCount}</Link>
            </div>
            {/* bottom */}
            <FriendRequestList requests={requests}/>
        </div>
    )
}

export default FriendRequest
