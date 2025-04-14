
import prisma from '@/lib/client';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const profileId = await params;
        const postsWithMedia = await prisma.post.findMany({
            where: {
                userId: profileId.id,
                img: {
                    not: '',//means if post have empty img field dont fetch it

                },
            },
            select: {
                img: true,
                id: true,
            },
            take: 6,
            orderBy: {
                createdAt: "desc",
            }
        })

        return new Response(JSON.stringify(postsWithMedia), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=1200',
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Internal Server Error ' + (err as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
