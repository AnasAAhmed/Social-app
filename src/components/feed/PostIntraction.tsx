'use client'
import { switchLike } from '@/lib/action';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'

const PostIntraction = ({
    postId,
    likes,
    commentNumber
}: {
    postId: number;
    likes: string[];
    commentNumber: number;
}) => {
    const { userId, isLoaded } = useAuth()
    const [likeState, setLikeState] = useState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false
    })

    const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state, value) => {
        return {
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked: !state.isLiked
        }
    })

    const likeAction = async () => {
        switchOptimisticLike('');
        try {
            switchLike(postId);
            setLikeState(state=>({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked
            }))
        } catch (error) {

        }
    }

    return (
        <div>
            <div className="flex items-center justify-between text-sm m-4">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-100 rounded-lg p-2">
                        <form action={likeAction}>
                            <button>
                                <Image src={optimisticLike.isLiked ? '/liked.png' : '/like.png'} alt='' width={16} height={16} className='cursor-pointer' />
                            </button>
                        </form>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 lg:text-xs">{optimisticLike.likeCount}<span className="hidden md:inline ml-1">Likes</span> </span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-2">
                        <Image src={'/comment.png'} alt='' width={16} height={16} className='cursor-pointer' />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 lg:text-xs">{commentNumber} <span className="hidden md:inline">Comments</span> </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostIntraction
