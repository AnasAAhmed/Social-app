'use client';

import { switchLike } from '@/lib/action';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { PostIntractionLoader } from '../Loader';
import Comment from './Comment';

const PostIntraction = ({ postId, likes, commentNumber, author }: { postId: number; likes: string[]; commentNumber: number; author: string }) => {
    const { userId, isLoaded } = useAuth();
    const [likeState, setLikeState] = useState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false
    });
    const [open, setOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [optimisticLike, switchOptimisticLike] = useState(likeState);

    const likeAction = async () => {
        if (!postId || buttonDisabled) return;
        setButtonDisabled(true);
        switchOptimisticLike((state) => ({
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked: !state.isLiked
        }));
        try {
            await switchLike(postId);
            setLikeState((state) => ({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked
            }));
            toast.success(likeState.isLiked ? 'Unliked' : 'Liked');
        } catch (error) {
            const typeError = error as Error;
            toast.error(`Something went wrong ${typeError.message}`);
        } finally {
            setButtonDisabled(false);
        }
    };

    if (!isLoaded) return <PostIntractionLoader />;

    return (
        <>
            <div className="flex items-center justify-between text-sm mx-4 mt-4">
                <div className="flex">
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                        <form action={likeAction}>
                            <button disabled={buttonDisabled} className='disabled:cursor-not-allowed'>
                                <Image src={optimisticLike.isLiked ? '/liked.png' : '/like.png'} alt='' width={16} height={16} />
                            </button>
                        </form>
                        <span className="text-gray-300 dark:text-gray-300">|</span>
                        <span className="text-gray-500 dark:text-gray-200 lg:text-xs">{optimisticLike.likeCount}<span className="hidden md:inline ml-1">Likes</span> </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                        <Image src={'/comment.png'} alt='' width={16} height={16} className='cursor-pointer' />
                        <span className="text-gray-300 dark:text-gray-300">|</span>
                        <span onClick={() => setOpen(!open)} className="text-gray-500 dark:text-gray-200 lg:text-xs">{commentNumber} <span className="hidden md:inline cursor-pointer hover:underline">Comments</span> </span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                        <Image src="/share.png" width={16} height={16} alt="" className="cursor-pointer" />
                        <span className="text-gray-300 dark:text-gray-300">|</span>
                        <span className="text-gray-500 dark:text-gray-200 lg:text-xs">23 <span className="hidden md:inline">Shares</span> </span>
                    </div>
                </div>
            </div>
            {open && <Comment postId={postId} commentNumber={commentNumber} author={author} />}
        </>
    );
};

export default PostIntraction;
