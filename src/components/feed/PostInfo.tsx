"use client";

import { deletePost } from '@/lib/delete.actions';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '../Loader';

const PostInfo = ({ postId, userId, posterId }: { postId: number, userId: string | null, posterId: string }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();

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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('tyjthdjhdgj'+postId);
        try {
            
            await deletePost(postId);
            toast.success("Posted Deleted successfully");
            const params = new URLSearchParams(searchParams.toString());
            params.set('postId', postId.toString());
            router.push(`?${params.toString()}`, { scroll: false });
        } catch (error) {
            console.error("Failed to Delete post:", error);
            toast.error(`Failed to Delete post: ${(error as Error).message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="relative mr-4" ref={dropdownRef}>
            <Image
                src="/more.png"
                width={16}
                height={16}
                alt=""
                onClick={toggleOpen}
                className="cursor-pointer"

            />
            {open && (
                <div className="absolute animate-modal dark:bg-slate-900 bg-gray-50 top-4 ring-[0.5px] right-0 w-32 rounded-lg flex flex-col text-sm shadow-lg z-10">
                    {userId === posterId ?
                        <>
                            <form onSubmit={handleSubmit} className="p-2 rounded-lg w-full dark:hover:bg-gray-700 hover:bg-gray-100" action={deletePostWithId}>
                                <button
                                    className="text-red-500 dark:text-white w-full rounded-lg text-left disabled:cursor-not-allowed "
                                    disabled={isSubmitting}
                                    type='submit'
                                >
                                    {isSubmitting ? <Spinner /> : 'Delete'}
                                </button>
                            </form>
                        </> :
                        <>
                            <span className="cursor-pointer p-2 dark:text-gray-200 rounded-t-md dark:hover:bg-gray-700 hover:bg-gray-100">Share</span>
                            <span className="cursor-pointer p-2 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-100">Hide Post</span>
                            <span className="text-red-500 cursor-pointer dark:text-gray-200 rounded-b-md p-2 dark:hover:bg-gray-700 hover:bg-gray-100">Report</span>
                        </>

                    }
                </div>
            )}
        </div>
    );
};

export default PostInfo;