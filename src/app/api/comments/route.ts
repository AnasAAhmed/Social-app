import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const sortBy = searchParams.get('sortBy') || 'new'; // 'new' or 'likes'

    if (!postId) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    try {
        let comments;
        if (sortBy === 'likes') {
            // Fetch comments and sort by the number of likes
            comments = await prisma.comments.findMany({
                where: {
                    postId: parseInt(postId),
                },
                include: {
                    user: true,
                    likes: true,
                },
                orderBy: {
                    likes: {
                        _count: 'desc',
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
            });
        } else {
            // Fetch comments and sort by creation date (newest first)
            comments = await prisma.comments.findMany({
                where: {
                    postId: parseInt(postId),
                },
                include: {
                    user: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit,
            });
        }

        const transformedComments = comments.map(comment => ({
            ...comment,
            likes: comment.likes.map(like => like.userId),
        }));

        return NextResponse.json(transformedComments, {
            status: 200, headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}
