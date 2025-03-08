import AddPost from "@/components/forms/AddPost"
import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
// import { LoaderGif } from "@/components/Loader"
import RightMenu from "@/components/rightMenu/RightMenu"
import Stories from "@/components/stories/Stories"
import { auth } from "@clerk/nextjs/server"
import NotLoggedIn from "@/components/NotLoggedIn"
import { Suspense } from "react"
import { LoaderGif, LoaderStories } from "@/components/Loader"

const Homepage = async ({ searchParams }: { searchParams: Promise<{ page?: string, filter?: string }> }) => {
  const { userId } = await auth.protect()
  const { page, filter } = await searchParams

  if (!userId) return <NotLoggedIn />;
  return (
    <Suspense fallback={<LoaderGif />}>

      <div className='flex justify-end'>
        <div className="hidden md:block overflow-scroll scrollbar-hide fixed left-0 h-full w-[30%] xl:w-1/4 pl-14">
          <LeftMenu type='home' />
        </div>
        <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
          <div className="flex flex-col gap-6">
            <Suspense fallback={<LoaderStories />}>
              <Stories />
            </Suspense>
            <AddPost />
            <Suspense fallback={<LoaderGif />}>
              <Feed page={Number(page) || 1} filter={filter}/>
            </Suspense>
          </div>
        </div>
        <div className="hidden xl:block overflow-scroll scrollbar-hide fixed right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
          <RightMenu />
        </div>
      </div>
    </Suspense>
  )
}

export default Homepage
