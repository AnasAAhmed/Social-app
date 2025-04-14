'use server'
import { auth } from "@/auth";
import prisma from "./client";
import { redirect } from "next/navigation";


export const deleteStory = async (storyId: number) => {
   const { user } =  (await auth()) as Session;
   
   
     if (!user.id) throw new Error("User is not authenticated!");
    try {
        await prisma.story.delete({
            where: {
                id: storyId,
                userId:user.id
            }
        });
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}
export const deletePost = async (postId: number) => {
   const { user } =  (await auth()) as Session;
   
     if (!user.id) throw new Error("User is not authenticated!");

    try {
        await prisma.post.delete({
            where: {
                id: postId,
                userId:user.id
            }
        });
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}
export const deleteComment = async (commentId: number) => {
   const { user } =  (await auth()) as Session;
   
   
     if (!user.id) throw new Error("User is not authenticated!");

    try {
        await prisma.comments.delete({
            where: {
                id: commentId,
                userId:user.id
            }
        });
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
}