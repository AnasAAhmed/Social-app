'use server'
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { revalidatePath } from "next/cache";


export const deleteStory = async (storyId: number) => {
    const { userId } = await auth.protect();
    if (!userId) {
        throw new Error("User is not Authenticated!!");
    };

    try {
        await prisma.story.delete({
            where: {
                id: storyId,
                userId
            }
        });
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}
export const deletePost = async (postId: number) => {
    const { userId } = await auth.protect();
    if (!userId) {
        throw new Error("User is not Authenticated!!");
    };

    try {
        await prisma.post.delete({
            where: {
                id: postId,
                userId
            }
        });
        revalidatePath('/');
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}
export const deleteComment = async (commentId: number) => {
    const { userId } = await auth.protect();
    if (!userId) {
        throw new Error("User is not Authenticated!");
    };

    try {
        await prisma.comments.delete({
            where: {
                id: commentId,
                userId
            }
        });
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}