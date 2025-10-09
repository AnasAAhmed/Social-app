import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
import RightMenu from "@/components/rightMenu/RightMenu"
import Stories from "@/components/stories/Stories"
import NotLoggedIn from "@/components/NotLoggedIn"
import { Suspense } from "react"
import { LoaderStories } from "@/components/Loader"
import { auth } from "@/auth"
export const dynamic = 'force-dynamic';

const FeedPage = async ({ searchParams }: { searchParams: Promise<{ page?: string, filter?: string }> }) => {
  const session = (await auth()) as Session;
  if (!session) return <NotLoggedIn />;
  const { filter } = await searchParams

  return (
    <div className='flex justify-end'>
      <div className="hidden md:block overflow-scroll scrollbar-hide fixed left-0 h-full w-[30%] xl:w-1/4 pl-14">
        <LeftMenu type='home' />
      </div>
      <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div className="p-4 bg-white dark:bg-[#111] shadow-md flex gap-2 w-max"><LoaderStories /></div>}>
            <Stories />
          </Suspense>
          {/* <AddPost /> */}
          {/* <Suspense fallback={<LoaderGif />}> */}
          <Feed filter={filter || 'friends'} />
          {/* </Suspense> */}
        </div>
      </div>
      <div className="hidden xl:block overflow-scroll scrollbar-hide fixed right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
        <RightMenu currentUser={session.user.id} />
      </div>
    </div>
  )
}

export default FeedPage
