import Ad from "@/components/Ad";
import { LoaderGif } from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import NotLoggedIn from "@/components/NotLoggedIn";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

const SettingsPage = async () => {
  const { userId } = auth()
  if (!userId) return <NotLoggedIn />;

  return (
    <div className='flex gap-6 pt-6'>
      <Suspense fallback={<LoaderGif />}>

        <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="md" /></div>
        <div className="flex flex-col gap-6">
          <UserProfile routing="hash" />

        </div>
      </Suspense>
    </div>

  );
};

export default SettingsPage;