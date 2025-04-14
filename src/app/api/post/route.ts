import { auth } from '@/auth';
import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const session = await auth();
        const user = session?.user;
        if (!user?.id) return NextResponse.json({ posts: [], totalPosts: 0 });

        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter') || 'friends';
        const page = Number(searchParams.get('page') || 1);
        const perPage = 8;
        const offset = (page - 1) * perPage;

        let ids: string[] = [];

        if (filter === 'friends') {
            const connections = await prisma.follower.findMany({
                where: {
                    OR: [{ followingId: user.id }, { followerId: user.id }],
                },
                select: { followingId: true, followerId: true },
            });

            const followerIds = connections.map(c => c.followerId);
            const followingIds = connections.map(c => c.followingId);

            ids = Array.from(new Set([user.id, ...followerIds, ...followingIds]));
        } else {
            const users = await prisma.user.findMany({
                take: 4,
                orderBy: { createdAt: 'desc' },
                select: { id: true },
            });
            ids = Array.from(new Set([user.id, ...users.map(u => u.id)]));
        }

        const [posts, totalPosts] = await Promise.all([
            prisma.post.findMany({
                where: { userId: { in: ids } },
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
            prisma.post.count({ where: { userId: { in: ids } } }),
        ]);

        return new NextResponse(JSON.stringify({ posts, totalPosts }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (err) {
        console.error("api/feed [GET]: " + err);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const { user } = (await auth()) as Session;

    if (!user.id) {
        return new NextResponse(JSON.stringify({ message: 'User is not authenticated!' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    if (!postId) {
        return new NextResponse(JSON.stringify({ message: 'Invalid PostId or Null PostId' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        await prisma.post.delete({
            where: {
                id: Number(postId),
                userId: user.id
            }
        });
        return new NextResponse(JSON.stringify({ message: 'Post Deleted' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error("api/feed [DELETE]: " + err);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(req: Request) {

    const body = await req.json();
    const { desc, img } = body;

    const validatedDesc = desc.safeParse(desc);

    if (!validatedDesc.success) {
        return new NextResponse(JSON.stringify({ message: 'description is not valid it must be less than 25' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const { user } = (await auth()) as Session;

    if (!user.id) {
        return new NextResponse(JSON.stringify({ message: 'User is not authenticated!' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    try {
        await prisma.post.create({
            data: {
                desc: validatedDesc.data,
                userId: user.id,
                img,
            },
        });
    } catch (err) {
        console.error("api/feed [POST]: " + err);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const body = await req.json();
    const { desc, img } = body;

    const validatedDesc = desc.safeParse(desc);

    if (!validatedDesc.success) {
        return new NextResponse(JSON.stringify({ message: 'description is not valid it must be less than 25' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const { user } = (await auth()) as Session;

    if (!user.id) {
        return new NextResponse(JSON.stringify({ message: 'User is not authenticated!' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };
    if (!postId) {
        return new NextResponse(JSON.stringify({ message: 'Invalid PostId or Null PostId' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    try {
        if (img === '') {
            await prisma.post.update({
                where: {
                    id: Number(postId),
                    userId: user.id,
                },
                data: {
                    desc: validatedDesc.data,

                },
            });
        } else {
            await prisma.post.update({
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
    } catch (err) {
        console.error("api/feed [UPDATE]: " + err);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
