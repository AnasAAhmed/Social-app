'use client';

import { addComments } from "@/lib/form.actions";
import { useUser } from "@clerk/nextjs";
import { Comments, User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentInfo from "./CommentInfo";
import { toast } from "sonner";
import { switchCommentLike } from "@/lib/action";
import Truncate from "@/lib/truncate";
import Link from "next/link";
import { calculateTimeDifference } from "@/lib/utils";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { Spinner } from "../Loader";
import { deleteComment } from "@/lib/delete.actions";

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
    ssr: false,
    loading: () => <div className="bg-white p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});

type CommentWithUser = Comments & { user: User, likes?: string[] };

const CommentList = ({
    comments,
    postId,
    author,
    sort
}: {
    comments: CommentWithUser[];
    postId: number;
    author: string;
    sort?:string;
}) => {
    const { user } = useUser();
    const [commentState, setCommentState] = useState<CommentWithUser[]>(comments);
    const [desc, setDesc] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (event: EmojiClickData) => {
        setDesc(prevDesc => prevDesc + event.emoji);
    };
    useEffect(() => {
        setCommentState(comments)
    }, [comments])
    const add = async () => {
        if (!user || !desc) return;

        const newComment: CommentWithUser = {
            id: Math.random(),
            desc,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            userId: user.id,
            postId,
            user: {
                id: user.id,
                username: "Sending Please Wait...",
                avatar: "/noAvatar.png",
                cover: "",
                description: "",
                dob: null,
                name: "",
                surname: "",
                city: "",
                work: "",
                school: "",
                website: "",
                createdAt: new Date(Date.now()),
            },
            likes: []
        };

        setCommentState(prev => [newComment, ...prev]);

        try {
            const createdComment = await addComments(postId, desc);
            setCommentState(prev => [createdComment, ...prev.filter(comment => comment.id !== newComment.id)]);
            setDesc('');
            toast.success('Comment added successfully');
        } catch (error) {
            setCommentState(prev => prev.filter(comment => comment.id !== newComment.id));
            const typeError = error as Error;
            toast.error(`Failed to add Comment: ${typeError.message}`);
        }
    };

    const likeComment = async (commentId: number) => {
        if (!user) return;
        const commentIndex = commentState.findIndex(comment => comment.id === commentId);
        if (commentIndex === -1) return;

        const updatedComments = [...commentState];
        const updatedComment = { ...updatedComments[commentIndex] };

        if (updatedComment.likes && updatedComment.likes.includes(user.id)) {
            updatedComment.likes = updatedComment.likes.filter((id: string) => id !== user.id);
        } else {
            updatedComment.likes = [...(updatedComment.likes || []), user.id];
        }

        updatedComments[commentIndex] = updatedComment;
        setCommentState(updatedComments);

        try {
            await switchCommentLike(commentId);
        } catch (error) {
            const typeError = error as Error;
            toast.error(`Something went wrong ${typeError.message}`);
        }
    };

    const deleteCommentHandler = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setCommentState(prev => prev.filter(comment => comment.id !== commentId));
        } catch (error) {
            const typeError = error as Error;
            toast.error(`Something went wrong ${typeError.message}`);
        }
    };

    return (
        <>
            {user && (
                <div className="flex items-center gap-4">
                    <Image
                        src={user.imageUrl || "noAvatar.png"}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                    <form
                        onSubmit={e => { e.preventDefault(); add(); }}
                        className="flex-1 flex items-center justify-between dark:bg-slate-700 dark:text-gray-200 bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
                    >
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={desc}
                            className="bg-transparent outline-none flex-1"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <div className="relative hidden lg:block">
                            <Image
                                src="/emoji.png"
                                alt=""
                                width={20}
                                height={20}
                                className="w-5 h-5 cursor-pointer self-end"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            />
                            {showEmojiPicker && (
                                <div className="absolute text-black top-6 right-0 z-10">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            )}
            <div className="">
                {commentState.length > 0 && commentState.map((comment) => (
                    <div className="flex gap-4 justify-between mt-6 px-4" key={comment.id}>
                        <Link href={`/profile/${comment.user.username}`}>
                            <Image src={comment.user.avatar || "/noAvatar.png"} alt='' width={40} height={40} className='w-7 h-7 rounded-full' />
                        </Link>
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="font-medium text-sm dark:text-gray-100">
                                {comment.user.name && comment.user.surname
                                    ? comment.user.name + ' ' + comment.user.surname
                                    : comment.user.username}
                                <span className='font-medium text-xs text-gray-600 dark:text-gray-400 ml-3'>{calculateTimeDifference(comment.createdAt)}</span>
                                {author === comment.userId && <span className='font-medium text-xs text-gray-600 dark:text-gray-400 ml-2'>&#9998; author</span>}
                            </span>
                            <Truncate desc={comment.desc} numOfChar={60} />
                            <div className="flex items-center gap-8 text-xs text-gray-500 dark:text-gray-300 mt-2">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => likeComment(comment.id)}>
                                        <Image src={comment.likes && comment.likes.includes(user?.id || "") ? "/liked.png" : "/like.png"} alt='' width={16} height={16} className='cursor-pointer w-4 h-4' />
                                    </button>
                                    <span className="text-gray-300 dark:text-gray-200">|</span>
                                    <span className="text-gray-500 dark:text-gray-200">{comment.likes ? comment.likes.length : 0}</span>
                                </div>
                                <div className="dark:text-gray-200">Reply</div>
                            </div>
                        </div>
                        <CommentInfo commentId={comment.id} commenterId={comment.user.id} userId={user?.id || ""} onDelete={deleteCommentHandler} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentList;
