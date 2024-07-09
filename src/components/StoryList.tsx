"use client";

import { addStory } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useOptimistic, useState } from "react";

type StoryWithUser = Story & {
    user: User;
};

const StoryList = ({
    stories,
    userId
}: {
    stories: StoryWithUser[];
    userId: string;
}) => {
    const [storyList, setStoryList] = useState(stories);
    const [img, setImg] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedStory, setSelectedStory] = useState<StoryWithUser | null>(null);
    const [videoDuration, setVideoDuration] = useState<number>(6);

    const openModal = (story: StoryWithUser) => {
        setSelectedStory(story);
        setOpen(true);

        if (story.img.endsWith('.mp4') || story.img.endsWith('.webm') || story.img.endsWith('.ogg')) {
            const video = document.createElement('video');
            video.src = story.img;
            video.onloadedmetadata = () => {
                setVideoDuration(video.duration);
            };
        } else {
            setVideoDuration(6); // default duration for images
        }
    };

    const closeModal = () => setOpen(false);

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
            setStoryList((prev) => [createdStory!, ...prev]);
            setImg(null);
        } catch (err) { }
    };

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    );

    const LoadingBar = ({ duration }: { duration: number }) => {
        useEffect(() => {
            const timer = setTimeout(() => {
                closeModal();
            }, duration * 1000);

            return () => clearTimeout(timer);
        }, [duration]);

        return (
            <div className="w-full bg-gray-200 h-1 rounded">
                <div className="bg-blue-500 h-1 rounded animate-loading-bar" style={{ animationDuration: `${duration}s` }}></div>
            </div>
        );
    };

    return (
        <>
            <div className="h-40 w-28 flex flex-col items-center justify-end bg-contain rounded-md gap-1" style={{ backgroundImage: `url(${img?.secure_url || user?.imageUrl || "/noAvatar.png"})` }}>
                <CldUploadWidget
                    uploadPreset="anas_social"
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
                        <form action={add}>
                            <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                                Post
                            </button>
                        </form>
                    ) : (
                        <span className="font-medium text-white text-center h-6 text-xm lg:text-sm bg-gray-500 rounded-b-md w-full">Add a Story</span>
                    )
                }
            </div>
            {/* STORY */}
            {optimisticStories.map((story) => (
                <div key={story.id} onClick={() => openModal(story)} className="h-40 w-28 flex flex-col items-start justify-between p-2 bg-cover rounded-md gap-2 cursor-pointer" style={{ backgroundImage: `url(${story.img})` }}>
                    <Image
                        src={story.user.avatar || "/noAvatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full ring-4"
                    />
                    <span className="font-medium text-white">
                        {story.user.name || story.user.username}
                    </span>
                </div>
            ))}

            {open && selectedStory && (
                <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
                    <div className="relative animate-modal bg-transparent rounded-lg shadow-md flex flex-col gap-2 w-full h-full sm:w-2/4 lg:w-1/4 md:h-3/4 md:p-6">
                        <div className="relative w-full h-full">
                            <div className="absolute top-0 p-2 right-0 text-white bg-black bg-opacity-40 sm:rounded-t-md z-10 w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={selectedStory.user.avatar || "/noAvatar.png"}
                                            alt=""
                                            width={80}
                                            height={80}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="font-medium text-white">
                                            {selectedStory.user.name || selectedStory.user.username}
                                        </span>
                                    </div>
                                    <button onClick={closeModal} className=" text-white text-3xl px-2">
                                        &times;
                                    </button>
                                </div>
                            </div>
                            {selectedStory.img.endsWith('.mp4') || selectedStory.img.endsWith('.webm') || selectedStory.img.endsWith('.ogg') ? (
                                selectedStory.img ? <video autoPlay src={selectedStory.img} className="object-cover rounded-lg h-full w-full" />
                                    : <Image src={'/noImage.jpg'} alt="story" layout="fill" className="object-cover rounded-lg" />
                            ) : (
                                <Image src={selectedStory.img || '/noImage.jpg'} alt="story" layout="fill" className="object-cover rounded-lg" />
                            )}
                            <span className="font-medium">
                                {selectedStory.user.name || selectedStory.user.username}
                            </span>
                        </div>
                        {selectedStory.img.endsWith('.mp4') || selectedStory.img.endsWith('.webm') || selectedStory.img.endsWith('.ogg') ? (
                            <LoadingBar duration={videoDuration} />
                        ) : (
                            <LoadingBar duration={6} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default StoryList;
