import { auth } from '@/auth'
import { ForgetPassForm } from '@/components/auth/Forget-passwordForm'
import ResetForm from '@/components/auth/reset-pass-form'
import { Metadata } from 'next'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'
import * as React from "react"


export const metadata: Metadata = {
    title: "Anas Social | Reset Password",
    description: "A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
    applicationName: "Anas' social Platform",
    authors: {
        url: 'https://anas3d.netlify.app/',
        name: "Anas Ahmed"
    },
    publisher: 'Anas Ahmed',
    creator: 'Anas ahmed',
    robots: { index: true, follow: true },
    openGraph: {
        type: "website",
        url: "https://anas-social.vercel.app",
        title: "Social Media App | Anas Ahmed",
        description: "A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
        siteName: "Anas Social",
        images: [{
            url: "/logo.png",
        }],
    }
};

export default async function ResetPassPage({ searchParams }: { searchParams: Promise<{ token: string, id: string }> }) {
    const session = (await auth()) as Session
    const { token, id } = await searchParams
    if (session || !searchParams && token &&id) {
        redirect('/')
    }

    return (
        <div className="flex flex-col mt-28 sm:mt-12 h-screen items-center">
            <div className="sm:w-[400px]">
                <div className='pb-0'>
                    <h1 className='text-heading3-bold mb-2'>Reset Password</h1>
                </div>
                <div>
                    <ResetForm token={token} userId={id} />
                </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm text-zinc-400">
                Expired Token? <div className="font-semibold underline"><ForgetPassForm btnText='Resend' /></div>
            </div>
        </div>
    )
}