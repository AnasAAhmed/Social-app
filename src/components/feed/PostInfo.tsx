"use client";

import { deletePost } from "@/lib/action";
import Image from "next/image";
import { useState } from "react";
import ActionButton from "./ActionButton";

const PostInfo = ({ postId, userId, posterId }: { postId: number, userId: string | null, posterId: string }) => {
    const [open, setOpen] = useState(false);

    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="relative mr-4">
            <Image
                src="/more.png"
                width={16}
                height={16}
                alt=""
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            />
            {open && (
                <div onMouseLeave={() => setOpen(false)} className="absolute animate-modal bg-gray-50 top-4 ring-[0.5px] right-0 w-32 rounded-lg flex flex-col text-sm shadow-lg z-30">
                    {userId === posterId ?
                        <>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">View</span>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Re-post</span>
                            <form className="p-2 hover:bg-gray-100" action={deletePostWithId}>
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

export default PostInfo;