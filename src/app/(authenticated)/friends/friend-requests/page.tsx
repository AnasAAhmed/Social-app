
import prisma from "@/lib/client";
import FriendRequestList from "@/components/rightMenu/FriendRequestList";
import Pagination from "@/components/Pagination";
import MenuBar from "@/components/MenuBar";
import Ad from "@/components/Ad";
import { Suspense } from "react";
import { LoaderGif } from "@/components/Loader";
import NotLoggedIn from "@/components/NotLoggedIn";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Anas Social | (Friend Requests)",
  description: "Friend Requests Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};
export const dynamic = "force-dynamic";

const FriendRequests = async ({ searchParams }: { searchParams: Promise<{ page?: string, filter?: string }> }) => {

  const session = (await auth()) as Session;
 
   if (!session) {
     return <NotLoggedIn />;
   }
  const { page } = await searchParams
  const perPage = 8;
  const offset = (Number(page) || 1 - 1) * perPage;
  const requestsCount = await prisma.followRequest.count({
    where: {
      receiverId: session.user.id
    }
  });

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: session.user.id
    },
    include: {
      sender: true
    },
    skip: offset,
    take: perPage,
  });
  const totalPages = Math.ceil(requestsCount / perPage);
  return (
    <div className='flex gap-6'>
      <Suspense fallback={<LoaderGif />}>

        <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="sm" /></div>
        <div className="flex flex-col gap-6 w-full lg:w-4/5">
          <h1 className="text-3xl max-sm:ml-4 font-bold mb-4 dark:text-gray-300 text-slate-600">Friend Requests</h1>
          <FriendRequestList requests={requests} isPage={true} />
          <Pagination urlParamName="page" totalPages={totalPages} page={Number(page)|| 1} />
        </div>
      </Suspense>
    </div>
  );
}

export default FriendRequests;