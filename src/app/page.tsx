import AddPost from "@/components/AddPost"
import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
import { LoaderGif } from "@/components/Loader"
import RightMenu from "@/components/rightMenu/RightMenu"
import Stories from "@/components/Stories"
import { Suspense } from "react"
import { SearchParamProps } from "./friends/page"
import { auth } from "@clerk/nextjs/server"
import NotLoggedIn from "@/components/NotLoggedIn"

const Homepage = ({ searchParams }: SearchParamProps) => {
  const { userId } = auth()
  if (!userId) return <NotLoggedIn />;
  return (
    <div className='flex gap-6 pt-6'>
      <Suspense fallback={<LoaderGif />}>

        <div className="hidden xl:block"><LeftMenu type='home' /></div>
        <div className="w-full lg:w-[70%] xl:w-[50%] ">
          <div className="flex flex-col gap-6">
            <Stories />
            <AddPost />
            <Feed searchParams={searchParams} />
          </div>
        </div>
        <div className="hidden lg:block w-[40%]"><RightMenu /></div>
      </Suspense>
    </div>
  )
}

export default Homepage