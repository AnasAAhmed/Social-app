'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import FriendRequestList from './FriendRequestList'
import { useMediaQuery } from '@/lib/truncate'
import { Loader1 } from '../Loader'
import { useQuery } from '@tanstack/react-query'



const FriendRequest = ({ userId }: { userId: string }) => {
    const isDesktop = useMediaQuery('(min-width: 1280px)');
    const shouldFetch = isDesktop && !!userId;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['friend requests'],
        queryFn: async () => {
            const res = await fetch(`/api/user/${userId}/friend-requests`);
            if (!res.ok) throw new Error('Failed to fetch posts');
            return res.json();
        },
        staleTime: 1000 * 60 * 2,
        enabled: shouldFetch,
    });
    useEffect(() => {
        if (!isDesktop || !data) return;
        const currentTitle = document.title;
        const count = data.requestsCount || 0;
        if (count > 0) {
            document.title = `(${count}) ${currentTitle}`;
        } else {
            document.title = currentTitle;
        }

        return () => {
            document.title = currentTitle;
        };
    }, [data, isDesktop]);
    if (isLoading) return <Loader1 />;
    if (isError) return <div>Failed to load friend requests.</div>;

    return (
        <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
            {/* top */}
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Friend Request</span>
                <Link href={'/friends/friend-requests'} className='text-blue-500 text-xs'>See all {data && data.requestsCount > 4 && data.requestsCount}</Link>
            </div>
            {/* bottom */}
            <FriendRequestList requests={data && data.requests} />
        </div>
    )
}

export default FriendRequest
