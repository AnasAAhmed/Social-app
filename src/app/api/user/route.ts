import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const { userId, username, avatar } = await req.json()
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        
        if (userExist) return  NextResponse.json({message:"Welcome "+username}, { status: 200 })

        await prisma.user.create({
            data: {
                id: userId,
                username: username,
                avatar: avatar || '/noAvatar.png',
                cover: '/noCover.jpeg'
            }
        });
        return NextResponse.json({message:"Your account has been created"}, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Failed to created user"}, { status: 500 })
    }
}