import Image from 'next/image'
import React, { Suspense } from 'react'
import Comment from './Comment'
import { Post as PostsType, User } from '@prisma/client'
import PostIntraction from './PostIntraction'
import { Spinner } from '../Loader'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'
import { calculateTimeDifference } from '@/lib/utils'
import Link from 'next/link'
import UpdatePost from '../forms/UpdatePost'
import FullImage from './FullImage'
import Truncate from '@/lib/truncate'
type feedPostsType = PostsType & { user: User } & { likes: { userId: string }[] } & {
    _count: { comments: number }
}

const Post = ({ post }: { post: feedPostsType }) => {
    const { userId } = auth();
    const isVideo = /\.(mp4|webm|mkv|avi|mov)$/i.test(post.img!);
    return (
        <div className='flex flex-col gap-4 border-b '>
            {/* user */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mx-4">
                    <Image src={post.user.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='h-10 w-10 rounded-full' />
                    <Link className='flex flex-col' href={`/profile/${post.user.username}`}>
                        <span className="font-medium text-xs sm:text-[1rem]">
                            {post.user.name && post.user.surname
                                ? post.user.name + ' ' + post.user.surname
                                : post.user.username}
                        </span>
                        <span className='text-xs sm:text-sm text-gray-400'> @{post.user.username}</span>

                    </Link>
                </div>
                {/* <span className='text-gray-500 text-xs lg:text-md'>{calculateTimeDifference(post.createdAt)}</span> */}
                <div className="flex items-center gap-2">

                    {userId === post.userId && < UpdatePost post={post} />}

                    <PostInfo postId={post.id} userId={userId} posterId={post.userId} />

                </div>
            </div>
            {/* desc */}
                    <div className='mx-4'><Truncate desc={post.desc} numOfChar={100} /></div>
            <div className="flex flex-col gap-4 sm:mx-4">
                <FullImage src={post.img!}>

                    {post.img &&
                        <div>
                            {isVideo ?
                                <div className="w-full h-full relative">
                                    <video autoPlay controls src={post.img! || '/noImage.jpg'} className='sm:rounded-md object-cover'></video>
                                </div>
                                :
                                <div className="w-full min-h-96 relative ">
                                    <Image src={post.img! || '/noImage.jpg'} alt="Uploaded Image" fill className='sm:rounded-md object-cover' />
                                </div>}
                        </div>
                    }
                </FullImage>
            </div>
            {/* intraction */}
            <Suspense fallback={<Spinner w={24} h={24} />}>
                <PostIntraction
                    postId={post.id}
                    likes={post.likes.map((like: any) => like.userId)}
                    commentNumber={post._count.comments} />
                <Comment postId={post.id} />
            </Suspense>
        </div >
    )
}

export default Post
