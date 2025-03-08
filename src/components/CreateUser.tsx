'use client'

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const CreateUser = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    const newUser = async () => {

        if (user?.id && user.emailAddresses.length > 0) {
            try {
                const res = await fetch('/api/user', {
                    method: 'POST',
                    body: JSON.stringify({ userId: user.id, username: user.username, avatar: user.imageUrl })
                })

                if (res) {
                    const data = await res.json(); // Wait for the JSON response
                    console.log(data);
                    
                    if (data.message) {
                        toast.success(data.message); // Display the message in the toast
                    }
                    
                    router.refresh();
                }
            } catch (error) {
                toast.success((error as Error).message);
                console.error('Failed to create user: ' + (error as Error).message);
            }
        }
    };

    useEffect(() => {
        newUser();
    }, [user, isSignedIn, isLoaded]);

    return (
        <div>
        </div>
    );
}

export default CreateUser;
