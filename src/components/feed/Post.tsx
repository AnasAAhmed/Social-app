
import Image from 'next/image'
import React, { Suspense } from 'react'
import { Post as PostsType, User, UserInfo } from '@prisma/client'
import PostIntraction from './PostIntraction'
import {  PostIntractionLoader, Spinner } from '../Loader'
import PostInfo from './PostInfo'
import { calculateTimeDifference } from '@/lib/utils'
import Link from 'next/link'
import UpdatePost from '../forms/UpdatePost'
import FullImage from './FullImage'
import Truncate from '@/lib/truncate'
import LinkPReview from './LinkPReview'

const Post = ({ post, userId }: { post: feedPostsType, userId: string }) => {
    const isVideo = /\.(mp4|webm|mkv|avi|mov)$/i.test(post.img!);
    return (
        <div className="flex flex-col dark:bg-slate-900 bg-white sm:rounded-md py-6 gap-4 border-b dark:border-slate-700">
            {/* user */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mx-4">
                    <img src={post.user.avatar || '/noAvatar.png'} alt='avatar' className='h-10 w-10 rounded-full' />
                    <Link className='flex flex-col' href={`/profile/${post.user.username}`}>
                        <span className="font-medium text-xs sm:text-[1rem] dark:text-white">
                            {post.user.userInfo.name && post.user.userInfo.surname
                                ? post.user.userInfo.name + ' ' + post.user.userInfo.surname
                                : post.user.username} <span className='text-xs text-gray-400'> @{post.user.username}</span>
                        </span>
                        <span className='text-gray-500 text-xs lg:text-md dark:text-gray-400'>
                            {calculateTimeDifference(post.updatedAt)}
                            {new Date(post.createdAt).getTime() !== new Date(post.updatedAt).getTime() && ' · (edited)'}                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {userId === post.userId && <UpdatePost post={post} />}
                    <PostInfo postId={post.id} userId={userId} posterId={post.userId} />
                </div>
            </div>
            {/* desc */}
            <div className='mx-4 text-xs md:text-sm dark:text-gray-300'><Truncate postBy={post.user.username} postId={post.id} desc={post.desc} numOfChar={100} /></div>
            <div className="flex flex-col gap-4 sm:mx-4">
                {post.img ?
                    <FullImage isVideo={isVideo} src={post.img!}>
                        <div>
                            {isVideo ?
                                <div className="w-full h-full relative">
                                    <video controls src={post.img!} className='sm:rounded-md object-cover'></video>
                                </div>
                                :
                                <div className="w-full min-h-96 relative ">
                                    <Image src={post.img! || '/noImage.jpg'} alt="Uploaded Image" fill className='sm:rounded-md object-cover' />
                                </div>
                            }
                        </div>
                    </FullImage>

                    : <LinkPReview postBy={post.user.username} postId={post.id || 0} desc={post.desc} img={post.img!} />}
            </div>
            {/* interaction */}
            <Suspense fallback={<PostIntractionLoader />}>

                <PostIntraction
                    postId={post.id}
                    likes={post.likes.map((like: any) => like.userId)}
                    commentNumber={post._count.comments}
                    author={post.userId}
                />

            </Suspense>
        </div >
    )
}

export default Post
