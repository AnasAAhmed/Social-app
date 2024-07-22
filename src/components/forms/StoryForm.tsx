'use client'
import { addStory } from '@/lib/form.actions';
import { useUser } from '@clerk/nextjs';
import { Story } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'
import { toast } from 'sonner';

const StoryForm = ({ userId, addOptimisticStory, setStoryList }: { userId: string, addOptimisticStory: any, setStoryList: any }) => {
    const [img, setImg] = useState<any>();
    const isVideo = /\.(mp4|webm|mkv|avi|mov)$/i.test(img);

    const { user } = useUser();

    const add = async () => {
        if (!img?.secure_url) return;

        addOptimisticStory({
            id: Math.random(),
            img: img.secure_url,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: userId,
            user: {
                id: userId,
                username: "Sending...",
                avatar: user?.imageUrl || "/noAvatar.png",
                cover: "",
                description: "",
                name: "",
                dob: null,
                surname: "",
                city: "",
                work: "",
                school: "",
                website: "",
                createdAt: new Date(Date.now()),
            },
        });

        try {
            const createdStory = await addStory(img.secure_url);
            setStoryList((prev: Story[]) => {
                const filteredStories = prev.filter(story => story.userId !== createdStory.userId);
                return [createdStory, ...filteredStories];
            });
            setImg(null);
            toast('Story Posted Successfully', {
                className: 'bg-green-100 h-16 text-[15px]',
                duration: 4000,
                icon: '✔',
            })
        } catch (error) {
            const typerror = error as Error;
            console.error("Failed to add story:", typerror.message);
            toast(`Failed to add story: ${typerror.message}`, {
                className: 'bg-red-100 h-16 text-[15px]',
                duration: 4000,
                icon: '❌',
            })
        }
    };
    return (
        <div className="h-40 w-28 flex flex-col items-center justify-end rounded-md gap-1">
            <div className="relative w-full h-full">
                {isVideo ?
                    <video src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                        muted
                        className='w-full h-full rounded-md object-cover'
                    />
                    :
                    <Image src={img?.secure_url || user?.imageUrl || "/noAvatar.png"} alt='s'
                        fill className='object-cover rounded-md'
                    />}
                <div className="absolute flex flex-col rounded-b-md z-20 items-center bottom-0 right-0 left-0 ">
                    <CldUploadWidget
                        uploadPreset="anas_social"
                        options={{
                            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "mp4", "avi", "mov", "mkv", "webm"],
                            maxFileSize: 3 * 1024 * 1024,
                        }}
                        onSuccess={(result, { widget }) => {
                            setImg(result.info);
                            widget.close();
                        }}
                    >
                        {({ open }) => {
                            return (
                                <div onClick={() => open()} className="bg-blue-500 text-2xl text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                                    +
                                </div>
                            );
                        }}
                    </CldUploadWidget>

                    {
                        img ? (
                            <>
                                <form action={add}>
                                    <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                                        Post
                                    </button>
                                </form>
                                <button onClick={() => setImg(null)} className="text-xs bg-red-500 p-1 rounded-md text-white">
                                    Remove
                                </button>
                            </>
                        ) : (
                            <span className="font-medium dark:text-white shadow-md text-center h-10 text-xm lg:text-sm dark:bg-slate-700 bg-white rounded-b-md w-full">Add a Story</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StoryForm
