import { User } from "@prisma/client";
import prisma from "./client";
import { ResultCode } from "./utils";
import streamServerClient from "./stream";

export async function getUser(email: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        return user as User;
    } catch (error) {
        const err = error as Error
        throw new Error('Internal Server Error' + err.message)
    }
}

export async function createUser(
    username: string,
    email: string,
    hashedPassword: string,
) {
    const existingUser = await getUser(email)

    if (existingUser) {
        return {
            type: 'error',
            resultCode: ResultCode.UserAlreadyExists
        }
    } else {
        await prisma.$transaction(async (tx) => {

            const createdUser = await tx.user.create({
                data: {
                    username: username,
                    email: email,
                    cover: '/noCover.jpeg',
                    password: hashedPassword,
                    avatar: `https://ui-avatars.com/api/?name=${username}`,
                    userInfo: {
                        create: {
                            createdAt: new Date(),
                        },
                    },
                },
                select: { id: true },
            });
            await streamServerClient.upsertUser({
                id: createdUser.id,
                username,
                name: username,
                image: `https://ui-avatars.com/api/?name=${username}`
            })
        })
        return {
            type: 'success',
            resultCode: ResultCode.UserCreated
        }
    }
}