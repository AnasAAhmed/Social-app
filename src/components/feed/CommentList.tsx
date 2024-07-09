'use client';
import { addComments, deleteComment, switchCommentLike } from '@/lib/action';
import { useUser } from '@clerk/nextjs';
import { Comments, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CommentInfo from './CommentInfo';
import { calculateTimeDifference } from '@/lib/utils';

// type CommentWithUser = any;
type CommentWithUser = Comments & { user: User, likes?: string[] };

const CommentList = ({ comments, postId }: { comments: CommentWithUser[], postId: number }) => {
    const { user } = useUser();
    const [commentState, setCommentState] = useState<CommentWithUser[]>(comments.map(comment => ({
        ...comment,
        likes: comment.likes || []
    })));
    const [desc, setDesc] = useState('');
    const [page, setPage] = useState(1);
    const commentsPerPage = 3;

    const add = async () => {
        if (!user || !desc) return;
        const newComment = {
            id: Math.random(),
            desc,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            userId: user.id,
            postId,
            likes: [''],
            user: {
                id: user.id,
                avatar: user.imageUrl || 'noAvatar.png',
                username: "Sending Please Wait...",
                city: "",
                cover: "",
                dob: null,
                description: "",
                website: "",
                school: "",
                work: "",
                name: "",
                surname: "",
                createdAt: new Date(Date.now())
            }
        };
        setCommentState(prev => [newComment, ...prev]);
        try {
            const createdComment = await addComments(postId, desc);
            setCommentState(prev => [createdComment, ...prev.filter(comment => comment.id !== newComment.id)]);
        } catch (error) {
            // Handle error
        }
    };

    const likeComment = async (commentId: number) => {
        if (!user) return;
        const commentIndex = commentState.findIndex(comment => comment.id === commentId);
        if (commentIndex === -1) return;

        const updatedComments = [...commentState];
        const updatedComment = { ...updatedComments[commentIndex] };

        if (updatedComment.likes && updatedComment.likes.includes(user.id)) {
            updatedComment.likes = updatedComment.likes.filter((id:string) => id !== user.id);
        } else {
            updatedComment.likes = [...(updatedComment.likes || []), user.id];
        }

        updatedComments[commentIndex] = updatedComment;

        setCommentState(updatedComments);

        try {
            await switchCommentLike(commentId);
        } catch (error) {
            // Handle error
        }
    };

    const deleteCommentHandler = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setCommentState(prev => prev.filter(comment => comment.id !== commentId));
        } catch (error) {
            // Handle error
        }
    };

    const displayedComments = commentState.slice(0, page * commentsPerPage);

    return (
        <>
            {user &&
                <div className="flex items-center gap-4">
                    <Image src={user?.imageUrl || "/noAvatar.png"} alt='' width={32} height={32} className='w-7 h-7 rounded-full' />
                    <form action={add} className="flex-1 px-6 flex items-centre justify-between bg-slate-100 rounded-xl text-sm py-2">
                        <input type="text" placeholder='Write a comment...' className='bg-transparent outline-none flex-1 w-5'
                            onChange={e => setDesc(e.target.value)} />
                        <Image src={"/emoji.png"} alt='' width={20} height={16} className='cursor-pointer' />
                    </form>
                </div>
            }
            {displayedComments.map((comment) => (
                <div className="flex gap-4 justify-between mt-6" key={comment.id}>
                    <Link href={`/profile/${comment.user.username}`}>
                        <Image src={comment.user.avatar || "/noAvatar.png"} alt='' width={40} height={40} className='w-8 h-8 rounded-full' />
                    </Link>
                    <div className="flex flex-col gap-2 flex-1">
                        <span className="font-medium text-sm">
                            {comment.user.name && comment.user.surname
                                ? comment.user.name + ' ' + comment.user.surname
                                : comment.user.username}
                            <span className='font-medium text-xs lg:text-sm text-gray-600 ml-3'>{calculateTimeDifference(comment.createdAt)}</span>
                        </span>
                        <p className="text-sm">{comment.desc}</p>
                        <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                            <div className="flex items-center gap-4">
                                <button onClick={() => likeComment(comment.id)}>
                                    <Image src={comment.likes && comment.likes.includes(user?.id || "") ? "/liked.png" : "/like.png"} alt='' width={16} height={16} className='cursor-pointer w-4 h-4' />
                                </button>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">{comment.likes ? comment.likes.length : 0}</span>
                            </div>
                            <div className="">Reply</div>
                        </div>
                    </div>
                    <CommentInfo commentId={comment.id} commenterId={comment.user.id} userId={user?.id || ""} onDelete={deleteCommentHandler} />
                </div>
            ))}
            {commentState.length > displayedComments.length && (
                <button onClick={() => setPage(page + 1)} className="mt-4 text-sm lg:text-md text-gray-700">
                    Load More...
                </button>
            )}
        </>
    );
}

export default CommentList;
