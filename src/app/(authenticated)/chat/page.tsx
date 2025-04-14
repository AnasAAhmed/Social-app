import React from 'react'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anas Social | (Chats)",
  description: "Chats Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};
export const dynamic = 'force-static'
const page = () => {
  return (
    <div className='h-screen'>
      <h1 className='text-3xl dark:text-white font-medium'>This feature is in making </h1>
    </div>
  )
}

export default page
