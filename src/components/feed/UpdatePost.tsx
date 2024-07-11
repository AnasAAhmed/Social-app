'use client'
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "../AddPostButton";
import { updatePost } from "@/lib/action";
import { Post } from "@prisma/client";
import React from "react";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { Spinner } from "../Loader";
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
    ssr: false,
    loading: () => <div className="bg-white p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});


const UpdatePost = ({ post }: { post: Post }) => {


    const [desc, setDesc] = useState(post.desc || '');
    const [img, setImg] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleImageRemove = () => setImg('');
    const handleEmojiClick = (event: EmojiClickData) => {
        setDesc(prevDesc => prevDesc + event.emoji);
    };
    useEffect(() => {
        setImg('')
    }, [post.img])

    return (
        <div className="">
            <span
                className="text-blue-500 text-xs cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Image src={'/edit.svg'} alt="update" width={14} height={14} />
            </span>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 z-50">
                    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-2xl w-full relative overflow-y-auto max-h-screen">
                        <button
                            className="absolute top-2 right-2 text-2xl"
                            onClick={() => setOpen(false)}
                        >
                            &times;
                        </button>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
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
                                <form action={(formData) => updatePost(formData, img?.secure_url || "", post.id)} className="flex flex-col gap-4">
                                    <textarea
                                        placeholder="What's on your mind?"
                                        className="flex-1 w-full bg-slate-100 rounded-lg p-2"
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

                                    <AddPostButton desc={desc} text="Update" />
                                </form>
                                <div className="flex items-center gap-2">
                                    <CldUploadWidget
                                        uploadPreset="anas_social"
                                        onSuccess={(result, { widget }) => {
                                            setImg(result.info);
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => (
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                                                <Image src="/addimage.png" alt="Add Image" width={20} height={20} />
                                                <span>media</span>
                                            </div>
                                        )}
                                    </CldUploadWidget>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Image src="/poll.png" alt="Poll" width={20} height={20} />
                                        <span>Poll</span>
                                    </div>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Image src="/addevent.png" alt="Event" width={20} height={20} />
                                        <span>Event</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdatePost;
