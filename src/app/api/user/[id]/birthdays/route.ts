import prisma from '@/lib/client';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const followers = await prisma.follower.findMany({
        where: {
            followingId: userId,
        },
        include: {
            follower: {
                select: {
                    username: true,
                    avatar: true,
                    dob: true
                }
            }, // To include the follower user details
        },
        take: 12
    });
    const followings = await prisma.follower.findMany({
        where: {
            followerId: userId,
        },
        include: {
            following: {
                select: {
                    username: true,
                    avatar: true,
                    dob: true
                }
            }, // To include the follower user details
        },
        take: 12
    });
    return new Response(JSON.stringify({ followers, followings }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
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
