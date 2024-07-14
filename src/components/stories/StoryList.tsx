"use client";

import { Story, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import StoryCard from "./StoryCard";
import StoryForm from "../forms/StoryForm";
import { deleteStory } from "@/lib/delete.actions";
import { toast } from "sonner";

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
                <div className="h-40 w-28 bg-slate-200 flex flex-col items-center justify-center rounded-md gap-1" >
                    <h1 className='font-medium text-gray-600 text-center'>
                        make friend to see their stories
                    </h1>
                </div>
            }
        </>
    );
};

export default StoryList;
