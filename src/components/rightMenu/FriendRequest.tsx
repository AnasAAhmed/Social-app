'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FriendRequestList from './FriendRequestList'
import { useAuth } from '@clerk/nextjs'
import { useMediaQuery } from '@/lib/truncate'
import { FollowRequest, User } from '@prisma/client'
import { Loader1 } from '../Loader'
import { toast } from 'sonner'

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequest =  () => {
    const { userId } = useAuth();
    const [data, setData] = useState<{
        requests: RequestWithUser[];
        requestsCount: number;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const isDesktop = useMediaQuery('(min-width: 1280px)');

    useEffect(() => {
        if (!isDesktop) return;

        const fetchInfo = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/user/${userId}/friend-requests`);
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
    }, [userId, isDesktop]);

    if (!isDesktop) return <Loader1 />;
    if (loading) return <Loader1 />;
    if (!data) return <div>Failed to load friend requests.</div>;

    return (
        <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
            {/* top */}
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Friend Request</span>
                <Link href={'/friends/friend-requests'} className='text-blue-500 text-xs'>See all {data.requestsCount > 4 && data.requestsCount}</Link>
            </div>
            {/* bottom */}
            <FriendRequestList requests={data.requests} />
        </div>
    )
}

export default FriendRequest
