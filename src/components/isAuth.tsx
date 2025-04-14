'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const IsAuth = () => {
    const { data } = useSession()
    if (data) {
        location.href = '/feed'
    }
    return (
        <div>
        </div>
    )
}

export default IsAuth;

