"use client";

import { deleteComment } from "@/lib/action";
import Image from "next/image";
import { useState } from "react";
import ActionButton from "./ActionButton";

const CommentInfo = ({ commentId, userId, commenterId, onDelete }: { commentId: number, userId: string | null, commenterId: string, onDelete: (commentId: number) => void }) => {
    const [open, setOpen] = useState(false);

    // const deleteCommentWithId = deleteComment.bind(null, commentId);
    const handleDelete = async () => {
        await onDelete(commentId);
    };
    return (
        <div className="relative">
            <Image
                src="/more.png"
                width={14}
                height={14}
                alt=""
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            />
            {open && (
                <div className="absolute animate-modal bg-white top-4 ring-[0.5px] right-0 py4 w-32 rounded-lg flex flex-col text-sm shadow-lg z-30">
                    {userId === commenterId ?
                        <>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">View</span>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Edit</span>
                            <form className="p-2 hover:bg-gray-100" action={handleDelete}>
                                <ActionButton text={'Delete'} />
                            </form>
                        </> :
                        <>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Share</span>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Hide Post</span>
                            <span className="text-red-500 cursor-pointer p-2 hover:bg-gray-100">Report</span>
                        </>

                    }
                </div>
            )}
        </div>
    );
};

export default CommentInfo;