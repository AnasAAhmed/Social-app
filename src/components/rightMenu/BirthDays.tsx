// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const BirthDays = async () => {

//     return (
//         <div className='p-4 bg-white rounded-lg text-sm shadow-md flex flex-col gap-4'>
//             <div className=" flex justify-between items-center font-medium">
//                 <span className="text-gray-500">Birthdays</span>
//                 <Link href={'/'} className='text-blue-500 text-xs'>See all</Link>
//             </div>
//             {/* bottom */}
//             <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-4">
//                     <Image src={'/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
//                      <span className="">john doe</span>

//                 </div>
//                 <div className="flex justify-end gap-3">
//                     <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
//                 </div>
//             </div>
//             {/* upcoming */}
//             <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
//                 <Image src={'/gift.png'} alt='' width={24} height={24} />
//                 <Link href={'/'} className='flex flex-col gap-1 text-xs'>
//                     <span className="text-gray-700 font-semibold"> Upcoming Birthdays</span>
//                     <span className="text-gray-500"> See other 16 have upcoming birthdays</span>
//                 </Link>
//             </div>
//         </div>

//     )
// }

// export default BirthDays

import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Helper function to format dates
const formatDate = (date: Date) => date.toISOString().split('T')[0];

// Helper function to check if a date is today
const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
};

const BirthDays = async () => {
    const { userId } = auth();
    if (!userId) return;

    // Fetch followers with their birthdates
    const followers = await prisma.follower.findMany({
        where: {
            followingId: userId,
        },
        include: {
            follower: true, // To include the follower user details
        },
    });

    // Filter followers whose birthday is today
    const todayBirthdays = followers.filter(follower => follower.follower.dob && isToday(new Date(follower.follower.dob)));

    // Filter upcoming birthdays (in the next 30 days)
    const today = new Date();
    const upcomingBirthdays = followers.filter(follower => {
        if (!follower.follower.dob) return false;
        const dob = new Date(follower.follower.dob);
        dob.setFullYear(today.getFullYear());
        return dob > today && dob <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    });

    return (
        <div className='p-4 bg-white rounded-lg text-sm shadow-md flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Birthdays</span>
                <Link href={'/'} className='text-blue-500 text-xs'>See all</Link>
            </div>

            {/* Today's Birthdays */}
            <div className="flex flex-col gap-4">
                {todayBirthdays.length > 0 ? (
                    todayBirthdays.map(follower => (
                        <div key={follower.id} className="flex justify-between items-center">
                            <Link  href={`/profile/${follower.follower.username}`} className="flex items-center gap-4">
                                <Image src={follower.follower.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                                <span className="font-medium">{follower.follower.name}</span>
                            </Link>
                            <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-500">No birthdays today</span>
                )}

            </div>

            {/* Upcoming Birthdays */}
            {upcomingBirthdays.length > 0 && (
                <div className="p-4 bg-slate-100 rounded-lg flex flex-col gap-4">
                    <div className="font-medium">Upcoming Birthdays</div>
                    {upcomingBirthdays.slice(0, 5).map(follower => (
                        <div key={follower.id} className="flex items-center gap-4">
                            <Image src={follower.follower.avatar || '/noAvatar.png'} alt='' width={24} height={24} className='w-6 h-6 rounded-full object-cover' />
                            <Link href={`/profile/${follower.follower.username}`} className='text-xs text-gray-700'>{follower.follower.name}</Link>
                            <span className="text-xs text-gray-500">{formatDate(new Date(follower.follower.dob!))}</span>
                        </div>
                    ))}
                    <Link href={'/'} className='text-blue-500 text-xs'>See all upcoming birthdays</Link>
                </div>
            )}
        </div>
    );
};

export default BirthDays;
