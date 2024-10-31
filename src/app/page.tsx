import AddPost from "@/components/forms/AddPost"
import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
// import { LoaderGif } from "@/components/Loader"
import RightMenu from "@/components/rightMenu/RightMenu"
import Stories from "@/components/stories/Stories"
// import { Suspense } from "react"
import { SearchParamProps } from "./friends/page"
import { auth } from "@clerk/nextjs/server"
import NotLoggedIn from "@/components/NotLoggedIn"

const Homepage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = await auth.protect()
  const searchParam = await searchParams
  if (!userId) return <NotLoggedIn />;
  return (
    <div className='flex justify-end'>
      <div className="hidden md:block overflow-scroll scrollbar-hide fixed left-0 h-full w-[30%] xl:w-1/4 pl-14">
        <LeftMenu type='home' />
      </div>
      <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed searchParams={searchParam} />
        </div>
      </div>
      <div className="hidden xl:block overflow-scroll scrollbar-hide fixed right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
        <RightMenu />
      </div>
    </div>
  )
}

export default Homepage
