"use client";

import { deletePost} from '@/lib/delete.actions';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";

const PostInfo = ({ postId, userId, posterId }: { postId: number, userId: string | null, posterId: string }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleClose = () => setOpen(false);
    const toggleOpen = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                toggleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="relative mr-4"ref={dropdownRef}>
            <Image
                src="/more.png"
                width={16}
                height={16}
                alt=""
                onClick={toggleOpen}
                className="cursor-pointer"
                
            />
            {open && (
                <div  className="absolute animate-modal bg-gray-50 top-4 ring-[0.5px] right-0 w-32 rounded-lg flex flex-col text-sm shadow-lg z-10">
                    {userId === posterId ?
                        <>
                            <form className="p-2 rounded-lg w-full hover:bg-gray-100" action={deletePostWithId}>
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