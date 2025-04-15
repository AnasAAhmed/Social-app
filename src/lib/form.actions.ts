'use server'

import { auth } from "@/auth";
import { z } from "zod";
import prisma from "./client";
import { Post } from "@prisma/client";


export const updateProfile = async (
    prevState: { success: boolean; error: boolean; message: string },
    payload: { formData: FormData; cover: string, avatar: string }
): Promise<{ success: boolean; error: boolean; message: string }> => {
    const { formData, cover, avatar } = payload;
    const fields = Object.fromEntries(formData);

    // Convert and validate DOB
    if (fields.dob) {
        const dobDate = new Date(fields.dob as string);
        if (!isNaN(dobDate.getTime())) {
            fields.dob = dobDate as any;
        } else {
            delete fields.dob;
        }
    }

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        username: z
            .string()
            .regex(/^[a-z0-9]+$/, {
                message: "Username must be lowercase, no spaces, and no symbols.",
            }),
        avatar: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
        dob: z.date().optional(),
    });

    const validatedFields = Profile.safeParse({ cover, avatar, ...filteredFields });

    if (!validatedFields.success) {
        return {
            success: false,
            error: true,
            message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
        };
    }

    const { user } = (await auth()) as Session;

    if (!user?.id) {
        return {
            success: false,
            error: true,
            message:
                "User not authenticated. Please log in. If already logged in, try again.",
        };
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                username: validatedFields.data.username,
                cover: validatedFields.data.cover,
                avatar: validatedFields.data.avatar,
                userInfo: {
                    update: {
                        name: validatedFields.data.name ?? null,
                        surname: validatedFields.data.surname ?? null,
                        description: validatedFields.data.description ?? null,
                        city: validatedFields.data.city ?? null,
                        school: validatedFields.data.school ?? null,
                        work: validatedFields.data.work ?? null,
                        website: validatedFields.data.website ?? null,
                        dob: validatedFields.data.dob ?? null,
                    },
                },
            },
        });

        return {
            success: true,
            error: false,
            message: "Profile has been updated!",
        };
    } catch (err) {
        const typeError = err as Error;
        console.error(typeError);
        return {
            success: false,
            error: true,
            message: typeError.message || "Something went wrong.",
        };
    }
};
export const deleteProfile = async (
    prevState: { success: boolean; error: boolean; message: string },
): Promise<{ success: boolean; error: boolean; message: string }> => {
   
    const { user } = (await auth()) as Session;

    if (!user?.id) {
        return {
            success: false,
            error: true,
            message:
                "User not authenticated. Please log in. If already logged in, try login again.",
        };
    }

    try {
        await prisma.userInfo.delete({
            where: { id: user.id },
          });
          
          await prisma.user.delete({
            where: { id: user.id },
          });
        return {
            success: true,
            error: false,
            message: "Account has been Deleted!",
        };
    } catch (err) {
        const typeError = err as Error;
        console.error(typeError);
        return {
            success: false,
            error: true,
            message: typeError.message || "Something went wrong.",
        };
    }
};
export const addPost = async (formData: FormData, img: string) => {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);
    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        console.log("Description is not valid");
        throw new Error(`Description is not valid. It must be less than 255 characters.`);
    }

    const { user } = (await auth()) as Session;

    if (!user.id) throw new Error("User is not authenticated!");

    try {
        const post = await prisma.post.create({
            data: {
                desc: validatedDesc.data,
                userId: user.id,
                img,
            },
            select: {
                id: true,
                desc: true,
                img: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            }
        });

        return post;
    } catch (err) {
        const typeError = err as Error;
        console.log(typeError);
        throw new Error(`Something went wrong: ${typeError.message}`);
    }
};

export const updatePost = async (
    prevState: { success: boolean; error: boolean; message: string },
    formData: FormData
  ): Promise<{ success: boolean; error: boolean; message: string }> => {
    const desc = formData.get('desc')?.toString() || '';
    const img = formData.get('img')?.toString() || '';
    const postId = formData.get('postId')?.toString() || '';
    const Desc = z.string().min(1).max(255);
    console.log("🚀 Server action ran!");
    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        return {
            success: false,
            error: true,
            message: 'description is not valid it must be less than 255',
        };
    }
    const { user } = (await auth()) as Session;


    if (!user.id) throw new Error("User is not authenticated!");
    let post: Post | null = null;
    try {
        if (img === '') {
            post = await prisma.post.update({
                where: {
                    id: Number(postId),
                    userId: user.id,
                },
                data: {
                    desc: validatedDesc.data,

                },
            });
        } else {
            post = await prisma.post.update({
                where: {
                    id: Number(postId),
                    userId: user.id,
                },
                data: {
                    desc: validatedDesc.data,
                    img: img,
                },
            });
        }
        return {
            success: true,
            error: false,
            message: postId,
        };
    } catch (err) {
        const typeError = err as Error
        console.log(typeError);
        return {
            success: false,
            error: true,
            message: 'Post update fialed ' + typeError.message,
        };
    }
};

export const addStory = async (img: string) => {
    const { user } = (await auth()) as Session;


    if (!user.id) throw new Error("User is not authenticated!");
    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId: user.id
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
                userId: user.id,
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
    const { user } = (await auth()) as Session;


    if (!user.id) throw new Error("User is not authenticated!");
    try {
        const createComment = await prisma.comments.create({
            data: {
                desc,
                userId: user.id,
                postId
            },
            include: {
                user: true
            }
        });

        // revalidatePath('/')

        return createComment;
    } catch (error) {
        const typeError = error as Error
        console.log(typeError);
        throw new Error(`Something went wrong ${typeError.message}`)
    }
};