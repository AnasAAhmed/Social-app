'use server'
import { z } from "zod";
import prisma from "./client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; cover: string }
) => {
    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData);
    if (fields.dob) {
        const dobDate = new Date(fields.dob as string);
        if (!isNaN(dobDate.getTime())) {
            (fields.dob = dobDate as any);
        } else {
            delete fields.dob; // Remove invalid date
        }
    }
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
        dob: z.date().optional(),
    });

    const validatedFields = Profile.safeParse({ cover, ...filteredFields });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { success: false, error: true };
    }

    const { userId } = auth();

    if (!userId) {
        return { success: false, error: true };
    }

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: validatedFields.data,
        });
        return { success: true, error: false };
    } catch (err) {
        const typeError = err as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};

export const addPost = async (formData: FormData, img: string) => {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        //TODO
        console.log("description is not valid");
        throw new Error(`description is not valid it must be less than 255`);
    }
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {
        await prisma.post.create({
            data: {
                desc: validatedDesc.data,
                userId,
                img,
            },
        });

        revalidatePath("/");
    } catch (err) {
        const typeError = err as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};

export const updatePost = async (formData: FormData, img: string, postId: number) => {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        //TODO
        console.log("description is not valid");
        throw new Error(`description is not valid it must be less than 255`);
    }
    const { userId } = auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {
        if (img === '') {
            await prisma.post.update({
                where: {
                    id: postId,
                    userId: userId,
                },
                data: {
                    desc: validatedDesc.data,

                },
            });
        } else {
            await prisma.post.update({
                where: {
                    id: postId,
                    userId: userId,
                },
                data: {
                    desc: validatedDesc.data,
                    img: img,
                },
            });
        }
        revalidatePath("/");
    } catch (err) {
        const typeError = err as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};

export const addStory = async (img: string) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("User is not Authenticated!!");
    };
    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId
            }
        })
        if (existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id
                }
            })
        }
        const createdStory = await prisma.story.create({
            data: {
                userId,
                img,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include: {
                user: true
            }
        })
        return createdStory;
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};

export const addComments = async (postId: number, desc: string) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("User is not Authenticated!!");
    };
    try {
        const createComment = await prisma.comments.create({
            data: {
                desc,
                userId,
                postId
            },
            include: {
                user: true
            }
        });

        revalidatePath('/')

        return createComment;
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};