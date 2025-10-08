'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import ProgressBar from './ProgressBar';

const NotLoggedIn = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl dark:text-gray-200 font-bold mb-4">You are not logged in</h1>
            <p className="text-lg mb-4 dark:text-gray-200">Please sign in to view this page.</p>
            <div className='flex items-center gap-3'>

                <ProgressBar title="go to Login" className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md' prefetch={false} href={`/login?redirect_url=${decodeURIComponent(pathname)}`}>
                    Login
                </ProgressBar>
                <ProgressBar title="go to signup" className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md' prefetch={false} href={`/sign-up?redirect_url=${decodeURIComponent(pathname)}`}>
                    Signup
                </ProgressBar>

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
                <ProgressBar href={'/'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Go back to the homepage</ProgressBar>
            </div>
        </div>
    );
}

export const NotFound = ({ currentUser=false,text = 'Page Not Found' }: {currentUser?:boolean; text?: string }) => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">404 - User Not Found.</h1>
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200 text-center">{text}</h1>
            <p className="text-lg mb-4  dark:text-gray-200">Sorry, we couldn&lsquo;t find the page you&lsquo;re looking for.</p>
            <div className='flex items-center gap-3'>
                <ProgressBar href={currentUser?'/':'/login'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Go back to the homepage</ProgressBar>
            </div>
        </div>
    );
}

export const PageNotFound = ({ currentUser=false,text = 'Page Not Found' }: {currentUser?:boolean; text?: string }) => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">404 - Page Not Found.</h1>
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200 text-center">{text}</h1>
            <p className="text-lg mb-4  dark:text-gray-200">Sorry, we couldn&lsquo;t find the page you&lsquo;re looking for.</p>
            <div className='flex items-center gap-3'>
                <ProgressBar href={currentUser?'/':'/login'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Go back to the homepage</ProgressBar>
            </div>
        </div>
    );
}
export default NotLoggedIn;
