import { auth } from "@/auth";
import Ad from "@/components/Ad";
import UpdateUser from "@/components/forms/UpdateUser";
import MenuBar from "@/components/MenuBar";
import NotLoggedIn from "@/components/NotLoggedIn";
import prisma from "@/lib/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anas Social | (Settings)",
  description: "Settings Page of (Anas Social) A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
};
export const dynamic = 'force-dynamic';

const SettingsPage = async () => {

  const session = (await auth()) as Session;
  if (!session) return <NotLoggedIn />;

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      username: true,
      avatar: true,
      cover: true,
      userInfo: true
    }
  })

  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="md" /></div>
      <div className="flex flex-col gap-6">
        <UpdateUser isSetting={true} user={user} />

      </div>
    </div>

  );
};

export default SettingsPage;