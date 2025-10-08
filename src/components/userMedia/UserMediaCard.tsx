'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Loader1 } from '../Loader'
import { useMediaQuery } from '@/lib/truncate'
import { toast } from 'sonner'

const UserMediaCard =  ({ userId, size }: { userId: string, size?: string }) => {
    const [data, setData] = useState<{ img: string; id: string }[] | null>(null);
    const [loading, setLoading] = useState(false);

    const isDesktop = useMediaQuery('(min-width: 1280px)');

    useEffect(() => {
        if (!isDesktop) return;

        const fetchInfo = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/user/${userId}/media`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
                toast.error((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [userId, isDesktop]);

    if (!isDesktop) return <Loader1 />;
    if (loading) return <Loader1 />;
    if (!data) return <div>Failed to load user info.</div>;
   
    return (
        <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md flex flex-col gap-4'>
            {/* top */}
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Recent Media</span>
                <div className='text-blue-500 cursor-pointer text-xs'>See all</div>
            </div>
            <div className="flex gap-4 justify-s flex-wrap">
                {data.length ? data.map((post) => (
                    <div key={post.id} className="relative w-[27%] h-24">
                        {post.img ? (
                            post.img.endsWith('.mp4') || post.img.endsWith('.webm') || post.img.endsWith('.ogg') ? (
                                <video src={post.img} className="object-cover h-full rounded-md"></video>
                            ) : (
                                <>
                                    <Image src={post.img!} alt='post' fill className='object-cover rounded-md' />
                                </>
                            )
                        ) : (""
                        )}
                    </div>
                ))
                    : <p className='dark:text-gray-300'>No recent media found</p>}
            </div>
        </div>
    )
}

export default UserMediaCard
