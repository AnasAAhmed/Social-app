import prisma from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Metadata } from "next";
import { auth } from '@/auth';
import NotLoggedIn from '@/components/NotLoggedIn';
import { Session } from 'next-auth'; // add this if you're using next-auth

export const metadata: Metadata = {
    title: "Anas Social | (reminders)",
    description: "reminders Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth()
    );
};

const isInNext30Days = (dob: Date) => {
    const today = new Date();
    const thisYearDob = new Date(dob);
    thisYearDob.setFullYear(today.getFullYear());
    const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return thisYearDob > today && thisYearDob <= in30Days;
};

const BirthDays = async () => {
    const session = (await auth()) as Session;

    if (!session) {
        return <NotLoggedIn />;
    }

    const [followers, followings] = await Promise.all([
        prisma.follower.findMany({
            where: { followingId: session.user?.id },
            include: {
                follower: {
                    select: {
                        username: true,
                        avatar: true,
                        userInfo: { select: { dob: true } },
                    },
                },
            },
            take: 6,
        }),
        prisma.follower.findMany({
            where: { followerId: session.user?.id },
            include: {
                following: {
                    select: {
                        username: true,
                        avatar: true,
                        userInfo: { select: { dob: true } },
                    },
                },
            },
            take: 6,
        }),
    ]);

    const todayBirthdays = followers.filter(
        (f) => f.follower.userInfo?.dob && isToday(new Date(f.follower.userInfo.dob))
    );

    const todayBirthdays2 = followings.filter(
        (f) => f.following.userInfo?.dob && isToday(new Date(f.following.userInfo.dob))
    );

    const upcomingBirthdays = followers.filter(
        (f) => f.follower.userInfo?.dob && isInNext30Days(new Date(f.follower.userInfo.dob))
    );

    const upcomingBirthdays2 = followings.filter(
        (f) => f.following.userInfo?.dob && isInNext30Days(new Date(f.following.userInfo.dob))
    );

    return (
        <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white max-sm:ml-4 ">Birthdays</span>
            </div>

            {/* Today's Birthdays */}
            <div className="flex flex-col gap-4">
                {todayBirthdays.length > 0 ? (
                    todayBirthdays.map(f => (
                        <div key={f.id} className="flex justify-between items-center">
                            <Link href={`/profile/${f.follower.username}`} className="flex items-center gap-4">
                                <Image src={f.follower.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                                <span className="font-medium">@{f.follower.username}</span>
                            </Link>
                            <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                        </div>
                    ))
                ) : todayBirthdays2.length > 0 ? (
                    todayBirthdays2.map(f => (
                        <div key={f.id} className="flex justify-between items-center">
                            <Link href={`/profile/${f.following.username}`} className="flex items-center gap-4">
                                <Image src={f.following.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                                <span className="font-medium">@{f.following.username}</span>
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
                    {upcomingBirthdays.slice(0, 5).map(f => (
                        <div key={f.id} className="flex items-center gap-4">
                            <Image src={f.follower.avatar || '/noAvatar.png'} alt='' width={24} height={24} className='w-6 h-6 rounded-full object-cover' />
                            <Link href={`/profile/${f.follower.username}`} className='text-xs text-gray-700'>@{f.follower.username}</Link>
                            <span className="text-xs dark:text-white text-gray-500">{formatDate(new Date(f.follower.userInfo!.dob!))}</span>
                        </div>
                    ))}
                </div>
            )}
            {upcomingBirthdays2.length > 0 && (
                <div className="p-4 dark:bg-slate-800 bg-slate-100 rounded-lg flex flex-col gap-4">
                    <div className="font-medium">Upcoming Birthdays</div>
                    {upcomingBirthdays2.slice(0, 5).map(f => (
                        <div key={f.id} className="flex items-center gap-4">
                            <Image src={f.following.avatar || '/noAvatar.png'} alt='' width={24} height={24} className='w-6 h-6 rounded-full object-cover' />
                            <Link href={`/profile/${f.following.username}`} className='text-xs text-gray-700'>@{f.following.username}</Link>
                            <span className="text-xs dark:text-white text-gray-500">{formatDate(new Date(f.following.userInfo!.dob!))}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BirthDays;
