
import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id: userId } = await params;
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                userInfo:{
                    select:{
                        name:true,
                        surname:true
                    }
                },
                username:true,
                avatar: true,
                cover:true,
                _count: {
                  select: {
                    follower: true,
                    following: true,
                  },
                },
              },
        })

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=120',
            },
        });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
