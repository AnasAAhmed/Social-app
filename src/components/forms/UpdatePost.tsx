'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "../AddPostButton";
import { updatePost } from "@/lib/form.actions";
import { Post } from "@prisma/client";
import React from "react";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import FocusLock from "react-focus-lock";
import { Spinner } from "../Loader";
import { useRouter } from "next/navigation";
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
    ssr: false,
    loading: () => <div className="bg-white dark:bg-gray-900 p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});


const UpdatePost = ({ post }: { post: Post }) => {

    const router = useRouter();

    const [desc, setDesc] = useState(post.desc || '');
    const [img, setImg] = useState<any>({ secure_url: '' });
    const [open, setOpen] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleImageRemove = () => setImg('');
    const handleEmojiClick = (event: EmojiClickData) => {
        setDesc(prevDesc => prevDesc + event.emoji);
    };

    return (
        <div className="">
            <span
                className="dark:text-white text-sm cursor-pointer"
                onClick={() => setOpen(true)}
            >
                &#9998;
            </span>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 z-50">
                    <FocusLock className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-lg shadow-md max-w-2xl w-full relative overflow-y-auto max-h-screen">
                        <button
                            className="absolute dark:text-white top-0 right-2 text-2xl"
                            onClick={() => setOpen(false)}
                        >
                            &times;
                        </button>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 mt-4">
                                {img?.secure_url && (
                                    img.secure_url.endsWith('.mp4') || img.secure_url.endsWith('.webm') || img.secure_url.endsWith('.ogg') ? (
                                        <>
                                            <video autoPlay controls src={img.secure_url} className="rounded-md w-full max-h-64"></video>
                                            <span className="text-gray-900 text-center rounded-full cursor-pointer block mt-2" onClick={handleImageRemove}>Remove</span>
                                        </>
                                    ) : (
                                        <>
                                            <Image src={img.secure_url} className="rounded-md w-full max-h-64" alt="Uploaded Image" width={300} height={300} />
                                            <span className="text-gray-900 text-center rounded-full cursor-pointer block mt-2" onClick={handleImageRemove}>Remove</span>
                                        </>
                                    )
                                )}
                                {!img.secure_url && post.img && ((post.img.endsWith('.mp4') || post.img.endsWith('.webm') || post.img.endsWith('.ogg')) ? (
                                    <>
                                        <video autoPlay controls src={post.img} className="rounded-md w-full max-h-64"></video>
                                        <span className="text-gray-900 text-center rounded-full file block mt-2" >Current Media</span>
                                    </>
                                ) : (
                                    <>
                                        <Image src={post.img!} className="rounded-md w-full max-h-64" alt="Uploaded Image" width={300} height={300} />
                                        <span className="text-gray-900 text-center rounded-full block mt-2" >Current Media</span>
                                    </>
                                )
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <form action={(formData) => {updatePost(formData, img?.secure_url || "", post.id);router.refresh();}} className="flex flex-col gap-4">
                                    <textarea
                                        placeholder="What's on your mind?"
                                        className="flex-1 w-full dark:bg-slate-800 dark:text-gray-200 bg-slate-100 rounded-lg p-2"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    ></textarea>
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
                                            <div className="absolute top-6 left-0 z-10"> <EmojiPicker onEmojiClick={handleEmojiClick} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justisfy-center gap-3">
                                        <AddPostButton desc={desc} text="Update" />
                                        <button
                                            className="bg-blue-500 w-full text-white text-center p-1 mt-2 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => setOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                                <div className="flex items-center gap-2">
                                    <CldUploadWidget
                                        uploadPreset="anas_social"
                                        options={{
                                            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "mp4", "avi", "mov", "mkv"],
                                            maxFileSize: 5 * 1024 * 1024,
                                        }}
                                        onSuccess={(result, { widget }) => {
                                            setImg(result.info);
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => (
                                            <button className="flex dark:text-gray-200 items-center gap-2 cursor-pointer" onClick={() => open()}>
                                                <Image src="/addimage.png" alt="Add Image" width={20} height={20} />
                                                <span>media</span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                    <div className="flex dark:text-gray-200 items-center gap-2 cursor-pointer">
                                        <Image src="/poll.png" alt="Poll" width={20} height={20} />
                                        <span>Poll</span>
                                    </div>
                                    <div className="flex dark:text-gray-200 items-center gap-2 cursor-pointer">
                                        <Image src="/addevent.png" alt="Event" width={20} height={20} />
                                        <span>Event</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FocusLock>
                </div>
            )}
        </div>
    );
}

export default UpdatePost;
