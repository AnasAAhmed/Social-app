"use client";

import { Story, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import StoryCard from "./StoryCard";
import StoryForm from "../forms/StoryForm";
import { deleteStory } from "@/lib/delete.actions";
import { toast } from "sonner";
import Link from "next/link";

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

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    );
    const handleDeleteStory = async (storyId: number) => {
        try {
            await deleteStory(storyId);
            setStoryList((prevState) => prevState.filter(story => story.id !== storyId));
            toast.success('Deleted Successfully');
        } catch (error) {
            const typerror = error as Error;
            console.error("Failed to delete Story:", typerror.message);
            toast.error(`Failed to delete Story: ${typerror.message}`)
        }
    };

    return (
        <>
            <StoryForm addOptimisticStory={addOptimisticStory} setStoryList={setStoryList} userId={userId} />
            {/* STORY */}
            {optimisticStories.length > 0 ? optimisticStories.map((story) => (
                <StoryCard story={story} key={story.id} onDelete={handleDeleteStory} />
            )) :
                <div className="h-40 w-28 bg-transparent flex flex-col items-center justify-center rounded-md gasp-1" >
                    {/* <h1 className='font-medium text-gray-600 text-center'>
                       
                    </h1> */}
                    <div className="relative w-full h-full">

                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKH3bEvIRpMu65iNDTirFTfi4HK9IZ2-hvTzvbo0A7M4KVTQO3CNprfK5CQqBmE81_f8&usqp=CAU"} alt='s'
                             className='object-cover h-[80%] rounded-md'
                        />
                        <div className="absolute flex flex-col rounded-b-md z-20 items-center bottom-0 right-0 left-0 gap-a">
                            {/* make friend to see their stories */}
                            <Link href={'/friends/suggestions'} className="text-xs bg-blue-500 p-1 rounded-md text-white">
                                Add friends
                            </Link>
                            <span className="font-medium dark:text-white shadow-md text-center h-10 text-xm lg:text-sm dark:bg-slate-700 bg-white rounded-b-md w-full">
                                No Stories
                                </span>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default StoryList;
