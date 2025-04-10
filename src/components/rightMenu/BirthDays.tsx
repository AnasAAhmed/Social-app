'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Loader1 } from '../Loader';
import { useMediaQuery } from '@/lib/truncate';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';

// Helper function to format dates
const formatDate = (date: Date) => date.toISOString().split('T')[0];

// Helper function to check if a date is today
const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
};

const BirthDays =  () => {
    const { userId } = useAuth();
       const [data, setData] = useState<{
        followers: ({
            follower: {
                dob: Date | null;
                username: string;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            followerId: string;
            followingId: string;
        })[], followings:({
            following: {
                username: string;
                avatar: string | null;
                dob: Date | null;
            };
        } & {
            id: number;
            createdAt: Date;
            followerId: string;
            followingId: string;
        })[]
       } | null>(null);
       const [loading, setLoading] = useState(false);
   
       const isDesktop = useMediaQuery('(min-width: 1280px)');
   
       useEffect(() => {
           if (!isDesktop) return;
   
           const fetchInfo = async () => {
               try {
                   setLoading(true);
                   const res = await fetch(`/api/user/${userId}/birthdays`);
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
       if (!data) return <div>Failed to load reminders.</div>;

    // Filter followers whose birthday is today
    const todayBirthdays = data.followers.filter(follower => follower.follower.dob && isToday(new Date(follower.follower.dob)));
    const todayBirthdays2 = data.followings.filter(following => following.following.dob && isToday(new Date(following.following.dob)));

    // Filter upcoming birthdays (in the next 30 days)
    const today = new Date();
    const upcomingBirthdays = data.followers.filter(follower => {
        if (!follower.follower.dob) return false;
        const dob = new Date(follower.follower.dob);
        dob.setFullYear(today.getFullYear());
        return dob > today && dob <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    });
    const upcomingBirthdays2 = data.followings.filter(following => {
        if (!following.following.dob) return false;
        const dob = new Date(following.following.dob);
        dob.setFullYear(today.getFullYear());
        return dob > today && dob <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    });

    return (
        <div className='p-4 bg-white dark:bg-slate-900 rounded-lg text-sm shadow-md flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Birthdays</span>
                <Link href={'/http://localhost:3000/friends/reminders'} className='text-blue-500 text-xs'>See all</Link>
            </div>

            {/* Today's Birthdays */}
            <div className="flex flex-col gap-4">
                {todayBirthdays.length > 0 ? (
                    todayBirthdays.map(follower => (
                        <div key={follower.id} className="flex justify-between items-center">
                            <Link href={`/profile/${follower.follower.username}`} className="flex items-center gap-4">
                                <Image src={follower.follower.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                                <span className="font-medium">@{follower.follower.username}</span>
                            </Link>
                            <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                        </div>
                    ))
                ) : todayBirthdays2.length > 0 ? (
                    todayBirthdays2.map(following => (
                        <div key={following.id} className="flex justify-between items-center">
                            <Link href={`/profile/${following.following.username}`} className="flex items-center gap-4">
                                <Image src={following.following.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                                <span className="font-medium">@{following.following.username}</span>
                            </Link>
                            <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-500 dark:text-white">No birthdays today</span>
                )}

            </div>

            {/* Upcoming Birthdays */}
            {upcomingBirthdays.length > 0 && (
                <div className="p-4 dark:bg-slate-800 bg-slate-100 rounded-lg flex flex-col gap-4">
                    <div className="font-medium">Upcoming Birthdays</div>
                    {upcomingBirthdays.slice(0, 5).map(follower => (
                        <div key={follower.id} className="flex items-center gap-4">
                            <Image src={follower.follower.avatar || '/noAvatar.png'} alt='' width={24} height={24} className='w-6 h-6 rounded-full object-cover' />
                            <Link href={`/profile/${follower.follower.username}`} className='text-xs text-gray-700'>@{follower.follower.username}</Link>
                            <span className="text-xs dark:text-white text-gray-500">{formatDate(new Date(follower.follower.dob!))}</span>
                        </div>
                    ))}
                    <Link href={'/'} className='text-blue-500 text-xs'>See all upcoming birthdays</Link>
                </div>
            )}
            {upcomingBirthdays2.length > 0 && (
                <div className="p-4 dark:bg-slate-800 bg-slate-100 rounded-lg flex flex-col gap-4">
                    <div className="font-medium">Upcoming Birthdays</div>
                    {upcomingBirthdays2.slice(0, 5).map(following => (
                        <div key={following.id} className="flex items-center gap-4">
                            <Image src={following.following.avatar || '/noAvatar.png'} alt='' width={24} height={24} className='w-6 h-6 rounded-full object-cover' />
                            <Link href={`/profile/${following.following.username}`} className='text-xs text-gray-700'>@{following.following.username}</Link>
                            <span className="text-xs dark:text-white text-gray-500">{formatDate(new Date(following.following.dob!))}</span>
                        </div>
                    ))}
                    <Link href={'/'} className='text-blue-500 text-xs'>See all upcoming birthdays</Link>
                </div>
            )}
        </div>
    );
};

export default BirthDays;
