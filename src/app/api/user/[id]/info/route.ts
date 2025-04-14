
import prisma from '@/lib/client';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { searchParams } = new URL(req.url)
    const currentUser = searchParams.get('currentUser');

    if (!currentUser) {
      return new Response(JSON.stringify({ error: 'Unauthenticated' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { id } = await params;


    const isUserBlocked = !!(await prisma.block.findFirst({
      where: { blockerId: currentUser, blockedId: id },
    }));

    const isFollowingSent = !!(await prisma.followRequest.findFirst({
      where: { senderId: currentUser, receiverId: id },
    }));

    const isFollowing = !!(await prisma.follower.findFirst({
      where: { followerId: id, followingId: currentUser },
    }));
    const isFollowedByThem = !!(await prisma.follower.findFirst({
      where: { followerId: currentUser, followingId: id }, // them → you
    }));
    const payload = {
      isUserBlocked,
      isFollowing,
      isFollowingSent,
      isFollowedByThem
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error :' + (err as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
