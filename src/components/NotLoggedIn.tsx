import React from 'react';
import Link from 'next/link';

const NotLoggedIn = () => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl dark:text-gray-200 font-bold mb-4">You are not logged in</h1>
            <p className="text-lg mb-4 dark:text-gray-200">Please sign in to view this page.</p>
            <div className='flex items-center gap-3'>
                <Link href={'/sign-in'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>SignIn</Link>
                <Link href={'/sign-up'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>SignUp</Link>
            </div>
        </div>
    );
}
export const Blocked = () => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">Access Denied</h1>
            <p className="text-lg dark:text-gray-200">You have been blocked by this user.</p>
            <div className='flex items-center mt-3 gap-3'>
                <Link href={'/'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Go back to the homepage</Link>
            </div>
        </div>
    );
}

export const NotFound = ({text='Page Not Found'}:{text?:string}) => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">404 - User Not Found.</h1>
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200 text-center">{text}</h1>
            <p className="text-lg mb-4  dark:text-gray-200">Sorry, we couldn&lsquo;t find the page you&lsquo;re looking for.</p>
            <div className='flex items-center gap-3'>
                <Link href={'/'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Go back to the homepage</Link>
            </div>
        </div>
    );
}
export default NotLoggedIn;
