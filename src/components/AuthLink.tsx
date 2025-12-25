'use client'
import SmartLink from '@/components/SmartLink';
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ReactNode } from 'react'

const AuthSmartLink = ({ children, url, title }: { children: ReactNode; url: 'login' | 'sign-up'; title: string }) => {
    // const pathname = usePathname();
      const searchParams = useSearchParams();
    
      const redirectUrl = searchParams.get("redirect_url") || "/";
    return (
        <SmartLink className='mt-4 dark:text-white' title={title} prefetch={false} href={`/${url}?redirect_url=${decodeURIComponent(redirectUrl)}`}>
            {children}
        </SmartLink>
    )
}

export default AuthSmartLink
