import React from 'react';
import Link from 'next/link';

const NotLoggedIn = () => {
    return (
        <div className="flex flex-col items-center pt-24 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">You are not logged in</h1>
            <p className="text-lg mb-4">Please sign in to view this page.</p>
            <div className='flex items-center gap-3'>
                <Link href={'/sign-in'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>SignIn</Link>
                <Link href={'/sign-up'} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>SignUp</Link>
            </div>
        </div>
    );
}

export default NotLoggedIn;
