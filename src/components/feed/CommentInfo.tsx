"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { toast } from "sonner";

const CommentInfo = ({ commentId, userId, commenterId, onDelete }: { commentId: number, userId: string | null, commenterId: string, onDelete: (commentId: number) => void }) => {
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
    const handleDelete = async () => {
        try {
            await onDelete(commentId);
            toast('Comment Deleted Successfully', {
                // className: 'bg-green-100 h-20 text-md',
                duration: 5000,
                icon: '✔',
            })
        } catch (error) {
            const typerror = error as Error;
            console.error("Failed to Delete Comment:", typerror.message);
            toast(`Failed to add post: ${typerror.message}`, {
                // className: 'bg-red-100 h-20 text-sm',
                duration: 5000,
                icon: '❌',
            })
        }
    };
    return (
        <div className="relative" ref={dropdownRef}>
            <Image
                src="/more.png"
                width={14}
                height={14}
                alt=""
                onClick={toggleOpen}
                className="cursor-pointer"
            />
            {open && (
                <div className="absolute animate-modal bg-white top-4 ring-[0.5px] right-0 py4 w-32 rounded-lg flex flex-col text-sm shadow-lg z-10">
                    {userId === commenterId ?
                        <>
                            {/* <span className="cursor-pointer p-2 hover:bg-gray-100">View</span>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Edit</span> */}
                            <form className="p-2 rounded-lg w-full hover:bg-gray-100" action={handleDelete}>
                                <ActionButton text={'Delete'} />
                            </form>
                        </> :
                        <>
                            <span className="cursor-pointer p-2 hover:bg-gray-100">Reply</span>
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