
import React from 'react';
import Link from 'next/link'

const BirthDays = () => {
    return (
        <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md flex flex-col gap-4'>
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Birthdays</span>
                <Link title='Click here to see real dynamic Reminder' href={'/friends/reminders'} className='text-blue-500 text-xs'>See all</Link>
            </div>

            {/* Today's Birthdays */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Link href={`/profile/anas`} className="flex items-center gap-4">
                        <img src={'https://ui-avatars.com/api/?name=anas'} alt='static avatar' className='w-10 h-10 rounded-full object-cover' />
                        <span className="font-medium text-gray-500 dark:text-white">@anas</span>
                    </Link>
                    <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                </div>
                <div className="flex justify-between items-center">
                    <Link href={`/profile/hafeez`} className="flex items-center gap-4">
                        <img src={'https://ui-avatars.com/api/?name=hafeez'} alt='static avatar' className='w-10 h-10 rounded-full object-cover' />
                        <span className="font-medium text-gray-500 dark:text-white">@hafeez</span>
                    </Link>
                    <button className='bg-blue-500 text-white text-xs rounded-md px-2 py-1'>Celebrate</button>
                </div>
            </div>

            <div className="p-4 dark:bg-[#252525] bg-slate-100 rounded-lg flex flex-col gap-4">
                <div className="font-medium text-gray-500 dark:text-white">Upcoming Birthdays</div>
                <div className="flex items-center gap-4">
                    <img src={'https://images.pexels.com/photos/7862484/pexels-photo-7862484.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='static avatar' className='w-8 h-8 rounded-full object-cover' />
                    <Link href={`/profile/john`} className='text-xs text-gray-500 dark:text-white'>@john</Link>
                    <span className="text-xs dark:text-white text-gray-500">1994-04-06</span>
                </div>
                <div className="flex items-center gap-4">
                    <img src={'https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt='static avatar' className='w-8 h-8 rounded-full object-cover' />
                    <Link href={`/profile/doe`} className='text-xs text-gray-500 dark:text-white'>@doe</Link>
                    <span className="text-xs dark:text-white text-gray-500">2006-03-09</span>
                </div>
                <div className="flex items-center gap-4">
                    <img src={'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='static avatar' className='w-8 h-8 rounded-full object-cover' />
                    <Link href={`/profile/alan`} className='text-xs text-gray-500 dark:text-white'>@alan</Link>
                    <span className="text-xs dark:text-white text-gray-500">2002-09-03</span>
                </div>
                <Link title='Click here to see real dynamic Reminder' href={'/friends/reminders'} className='text-blue-500 text-xs'>See all upcoming birthdays</Link>
            </div>

        </div>
    );
};

export default BirthDays;
