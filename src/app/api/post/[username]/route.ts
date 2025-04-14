import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || 1);
    const perPage = 8;
    const offset = (page - 1) * perPage;
    const { username } = await params;
    try {
        const [posts, totalPosts] = await Promise.all([
            prisma.post.findMany({
                where: {
                    user: { username: username }
                },
                skip: offset,
                take: perPage,
                include: {
                    user: {
                        select: {
                            username: true,
                            avatar: true,
                            userInfo: {
                                select: { name: true, surname: true },
                            },
                        },
                    },
                    likes: { select: { userId: true } },
                    _count: { select: { comments: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.post.count({
                where: { user: { username: username } },
            }),
        ]);

        return new Response(JSON.stringify({ posts, totalPosts }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (err) {
        console.error("Feed/[username]: " + err);
        return new Response(JSON.stringify({ error: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}