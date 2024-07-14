'use client';
import { Story, User } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import ActionButton from '../feed/ActionButton';

type StoryWithUser = Story & {
    user: User;
};

const StoryCard = ({ story, onDelete }: { story: StoryWithUser, onDelete: (storyId: number) => void }) => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [videoDuration, setVideoDuration] = useState(6);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isVideo = /\.(mp4|webm|mkv|avi|mov)$/i.test(story.img);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) return null;

    const openModal = () => {
        if (isVideo) {
            const video = document.createElement('video');
            video.src = story.img;
            video.onloadedmetadata = () => {
                setVideoDuration(video.duration);
            };
        } else {
            setVideoDuration(6); // default duration for images
        }
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const handleDelete = () => {
        onDelete(story.id);
    };

    const LoadingBar = ({ duration }: { duration: number }) => {
        useEffect(() => {
            const timer = setTimeout(() => {
                closeModal();
            }, duration * 1000);

            return () => clearTimeout(timer);
        }, [duration]);

        return (
            <div className="w-full h-1 bg-gray-200 rounded">
                <div className="h-1 bg-blue-500 rounded animate-loading-bar" style={{ animationDuration: `${duration}s` }}></div>
            </div>
        );
    };
    return (
        <>
            <div onClick={openModal} className="flex flex-col items-center justify-start w-28 h-40 rounded-md cursor-pointer">
                <div className="relative w-full h-full">
                    {isVideo ? (
                        <video src={story.img} muted className="w-full h-full rounded-md object-cover" />
                    ) : (
                        <Image src={story.img} alt="story" fill className="object-cover rounded-md" />
                    )}
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-between z-20 rounded-b-md items-between">
                        <div className="p-2 flex justify-between">
                            <Image
                                src={story.user.avatar || '/noImage.jpg'}
                                alt=""
                                width={40}
                                height={40}
                                className="w-8 h-8 rounded-full ring-4"
                            />
                            {user.id === story.userId && (
                                <div onClick={(e) => e.stopPropagation()} className="relative" ref={dropdownRef}>
                                    <Image
                                        src="/more.png"
                                        width={16}
                                        height={16}
                                        alt=""
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="cursor-pointer"
                                    />
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-4 w-32 p-2 bg-gray-50 rounded-lg shadow-lg animate-modal ring-[0.5px] text-sm flex flex-col z-10">
                                            <form className="p-2 hover:bg-gray-100" action={handleDelete}>
                                                <ActionButton text={'Delete'} />
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <span className="font-medium text-white px-2 rounded-b-md blackOverlay">
                            {story.user.name || story.user.username}
                        </span>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Modal closeModal={closeModal} story={story} isVideo={isVideo} videoDuration={videoDuration}>
                    <LoadingBar duration={videoDuration} />
                </Modal>
            )}
        </>
    );
};

const Modal = ({
    closeModal,
    story,
    isVideo,
    children,
}: {
    closeModal: () => void;
    story: StoryWithUser;
    isVideo: boolean;
    videoDuration: number;
    children: React.ReactNode;
}) => (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-85 z-50">
        <div className="relative flex flex-col gap-2 p-6 bg-transparent rounded-lg shadow-md animate-modal">
            <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 left-0 p-2 bg-black bg-opacity-40 flex justify-between items-center z-10 sm:rounded-t-md w-full">
                    <div className="flex items-center gap-2">
                        <Image
                            src={story.user.avatar || '/noAvatar.png'}
                            alt=""
                            width={80}
                            height={80}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium text-white">{story.user.name || story.user.username}</span>
                    </div>
                    <button onClick={closeModal} className="text-white text-3xl px-2">
                        &times;
                    </button>
                </div>
                {isVideo ? (
                    <video autoPlay src={story.img} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <Image src={story.img || '/noImage.jpg'} alt="story" width={600} height={600} className="object-cover rounded-md" />
                )}
            </div>
            {children}
        </div>
    </div>
);



export default StoryCard;
