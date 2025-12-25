
import Image from 'next/image';
import React from 'react'

const Lodaer = () => {
  return (

    <div className='p-4 dark:bg-slate-800 bg-white rounded-lg text-sm shadow-md flex flex-col gap-4 animate-pulse'>
      {/* Top Section */}
      <div className="flex justify-between items-center font-medium">
        <span className="bg-gray-300 dark:bg-gray-700 rounded w-24 h-4"></span>
        <span className="bg-gray-300 dark:bg-gray-700 rounded w-12 h-4"></span>
      </div>

      {/* User Details Section */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-32 h-6"></span>
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-16 h-4"></span>
        </div>
        <p className="bg-gray-300 dark:bg-gray-700 rounded w-full h-12"></p>

        {/* User City */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-4 h-4"></div>
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-40 h-4"></span>
        </div>

        {/* User School */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-4 h-4"></div>
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-40 h-4"></span>
        </div>

        {/* User Work */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-4 h-4"></div>
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-40 h-4"></span>
        </div>

        {/* User Website and Date */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <div className="bg-gray-300 dark:bg-gray-700 rounded w-4 h-4"></div>
            <span className="bg-gray-300 dark:bg-gray-700 rounded w-24 h-4"></span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="bg-gray-300 dark:bg-gray-700 rounded w-4 h-4"></div>
            <span className="bg-gray-300 dark:bg-gray-700 rounded w-20 h-4"></span>
          </div>
        </div>

        {/* Interaction Section */}
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-full h-8"></div>
          <div className="bg-gray-300 dark:bg-gray-700 self-end rounded w-16 h-3"></div>
        </div>
      </div>
    </div>

  )
};


const SkeletonPost = () => (
  <div className="flex flex-col animate-pulse dark:bg-[#111] bg-white sm:rounded-md py-6 gap-4 border-b dark:border-slate-700">
    {/* Header */}
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-slate-700" />
        <div className="flex flex-col gap-1">
          <div className="w-32 h-3 rounded bg-gray-300 dark:bg-slate-700" />
          <div className="w-20 h-2 rounded bg-gray-200 dark:bg-slate-600" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-slate-700" />
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-slate-700" />
      </div>
    </div>

    {/* Description */}
    <div className="px-4">
      <div className="h-3 w-3/4 bg-gray-300 rounded dark:bg-slate-700 mb-2" />
      <div className="h-3 w-1/2 bg-gray-300 rounded dark:bg-slate-700" />
    </div>

    {/* Image or Video */}
    <div className="sm:mx-4 h-72 bg-gray-300 rounded-md dark:bg-slate-700" />

    {/* Interaction */}
    <div className="px-4 flex justify-between">
      <div className="w-20 h-4 bg-gray-300 rounded dark:bg-slate-700" />
      <div className='flex gap-3 items-center'>
      <div className="w-20 h-4 bg-gray-300 rounded dark:bg-slate-700" />
      <div className="w-20 h-4 bg-gray-300 rounded dark:bg-slate-700" />
      </div>
    </div>
  </div>
)

export const PostSkeletonList = () => {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(4)].map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </div>
  )
}


export const BlurredProfilePlaceholder = () => {
  return (
    <div className='p-4 bg-white dark:bg-slate-800 backdrop-blur-md rounded-lg text-sm shadow-md flex flex-col gap-4 bordesr border-gray-200 dark:border-gray-700'>
      {/* Top Section */}
      <div className="flex justify-between items-center font-medium text-gray-700 dark:text-gray-300 blur-sm">
        <span>John Doe</span>
        <span>@johnd</span>
      </div>
      <div className="absolute inset-0 bg-black/5 rounded-lg flex items-center justify-center dark:text-white/80 text-black/80 text-xs sm:text-sm font-medium">
      Login to view media details
      </div>
      {/* User Details Section */}
      <div className="flex flex-col gap-4 text-gray-500 blur-sm">
        <div className="flex items-center gap-2">
          <span>Username:</span>
          <span>johndoe123</span>
        </div>
        <p className="text-sm">
          Just a developer who loves code and coffee ☕
        </p>

        {/* User City */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          <span>New York, USA</span>
        </div>

        {/* User School */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          <span>NYU</span>
        </div>

        {/* User Work */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          <span>Google Inc.</span>
        </div>

        {/* User Website and Date */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            <span>johndoe.dev</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            <span>Joined Jan 2023</span>
          </div>
        </div>

        {/* Interaction Section */}
        <div className="flex flex-col gap-2">
          <div className="bg-gray-500/50 rounded w-full h-8 blur-sm"></div>
          <div className="self-end text-gray-400 text-xs blur-sm">Login to interact</div>
        </div>
      </div>
    </div>
  );
};


export const Loader1 = () => {
  return (
    <div className='p-4 bg-white dark:bg-slate-800 rounded-lg text-sm shadow-md flex flex-col gap-4 animate-pulse'>
      {/* Top Section */}
      <div className="flex justify-between items-center font-medium">
        <span className="bg-gray-300 dark:bg-gray-700 rounded w-24 h-4"></span>
        <span className="bg-gray-300 dark:bg-gray-700 rounded w-12 h-4"></span>
      </div>

      {/* Media Section */}
      <div className="flex gap-4 justify-between flex-wrap">
        {/* Placeholder for Media Items */}
        <div className="relative w-[27%] h-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="relative w-[27%] h-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="relative w-[27%] h-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>

  )
}
export const LoaderGif = ({ w, h }: { w?: number, h?: number }) => {
  return (
    <div className="flex items-center justify-center w-full h-[80vh]">

      <Image unoptimized src={'/Bars.gif'} alt='Loader' width={w || 200} height={w || 200} />
    </div>
  )
}

export const PostIntractionLoader = () => {
  return (
    <>
      <div className="flex items-center dark:bg-slate-800 justify-between text-sm m-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-100 rounded-lg p-2 animate-pulse">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <span className="text-gray-300">|</span>
            <span className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></span>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-2 animate-pulse">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <span className="text-gray-300">|</span>
            <span className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6 mx-4">
        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="flex-1 px-6 py-2 justify-between bg-slate-200 rounded-xl animate-pulse">
          <div className="bg-transparent outline-none flex-1 w-full h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>

    </>
  );
};
export const CommentLoader = ({commentNumber}:{commentNumber: number}) => {
  const length = commentNumber > 5 ? 5 : commentNumber;
  return (
    <>
      <div className="flex items-center dark:bg-[#111] gap-4 mb-6">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="flex-1 px-6 py-2 justify-between bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse">
          <div className="bg-transparent outline-none flex-1 w-full h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>
      {[...Array(length)].map((_, index) => (

        <div key={index} className="flex gap-4 dark:bg-[#111] justify-between my-6 mx-4">
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                |
                <div className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="w-8 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-6 h-2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </>
  )
}
export const Spinner = ({ w, h }: { w?: number, h?: number }) => {
  return (
    <svg aria-hidden="true" style={{ width: `${w || 12}px`, height: `${h || 12}px` }} className="inline mr-2 text-gray-200 animate-spin fill-[#727283]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
  )
};

export const LoaderStories = () => {
  return (
    <>
      <div className="h-40 w-28 animate-pulse dark:bg-slate-700 bg-slate-200  flex flex-col items-center justify-end rounded-md gap-1" />
      <div className="h-40 w-28 animate-pulse dark:bg-slate-700 bg-slate-200 flex flex-col items-center justify-end rounded-md gap-1" />
      <div className="h-40 w-28 animate-pulse dark:bg-slate-700 bg-slate-200 flex flex-col items-center justify-end rounded-md gap-1" />
      <div className="h-40 w-28 animate-pulse dark:bg-slate-700 bg-slate-200 flex flex-col items-center justify-end rounded-md gap-1" />
     </>
  )
}

export const ProfileCardError = () => {
 
  return (
    <div className='max-xl:hidden p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={'/noCover.jpeg'} alt='' fill className='rounded-md' />
        <Image src={'/noAvatar.png'} alt='' width={48} height={48} className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
      </div>
      <div className="h-36d flex flex-col items-center">
        <span className="font-semibold">Current User Not Found or ther is Something wrong</span>
        <div className='bg-blue-500 text-white text-xs p-2 cursor-pointer rounded-md'>Error</div>
      </div>
    </div>
  )
}

export const ProfileCardLoad= () => {
 
  return (
    <div className='max-xl:hidden p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={'/noCover.jpeg'} alt='' fill className='rounded-md' />
        <Image src={'/noAvatar.png'} alt='' width={48} height={48} className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
      </div>
      <div className="h-36d flex flex-col items-center">
        <p className="font-semibold bg-gray-300 animate-pulse w-full my-2 rounded-full py-2"/>
        <div className='bg-gray-300 text-white text-xs py-4 px-8 animate-pulse cursor-pointer rounded-md'/>
      </div>
    </div>
  )
}


export const LoaderAddPost = () => {
  return (
    <div className="p-4 h-[8.5rem] animate-pulse bg-white dark:bg-slate-800 shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <div className="skeleton-avatar w-12 h-12 rounded-full bg-gray-200"></div>
      <div className="flex-1">
        <form className="flex  gap-4">
          <div className="skeleton-textarea flex-1 bg-gray-200 mt-3 rounded-lg p-2"></div>
          <div className="relative hidden lg:block">
            <div className="skeleton-emoji-picker w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="skeleton-button bg-gray-200 rounded-md w-16 h-8 mt-4"></div>
          </div>
          <div className="lg:hidden">
            <div className="skeleton-button bg-gray-200 rounded-md w-16 h-8 mt-4"></div>
          </div>
        </form>
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="skeleton-option flex items-center gap-2 bg-gray-200 rounded-md w-16 h-6"></div>
          <div className="skeleton-option flex items-center gap-2 bg-gray-200 rounded-md w-16 h-6"></div>
          <div className="skeleton-option flex items-center gap-2 bg-gray-200 rounded-md w-16 h-6"></div>
        </div>
      </div>
    </div>
  )
}


export default Lodaer
