import React from 'react'

import { Metadata } from "next";
import Chat from '@/components/messages/Chat';
import NotLoggedIn from '@/components/NotLoggedIn';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: "Anas Social | (Chats)",
  description: "Chats Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};
// export const dynamic = 'force-static'
export default async function Page() {
   const session = (await auth()) as Session;
  
    if (!session) {
      return <NotLoggedIn />;
    }
  return <Chat />;
}
