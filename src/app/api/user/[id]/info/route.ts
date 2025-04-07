import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/client';

export const GET = async (req: Request,{ params }: { params: Promise<{ id: string }> }) => {
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

    const profileId =await params;

    const user = await prisma.user.findUnique({ where: { id: profileId.id } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isUserBlocked = !!(await prisma.block.findFirst({
      where: { blockerId: currentUser, blockedId: user.id },
    }));

    const isFollowingSent = !!(await prisma.followRequest.findFirst({
      where: { senderId: currentUser, receiverId: user.id },
    }));

    const isFollowing = !!(await prisma.follower.findFirst({
      where: { followerId: user.id, followingId: currentUser },
    }));
    const isFollowedByThem = !!(await prisma.follower.findFirst({
      where: { followerId: currentUser, followingId: user.id }, // them → you
    }));
    const payload = {
      user,
      isUserBlocked,
      isFollowing,
      isFollowingSent,
      isFollowedByThem
    };
console.table(payload);

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=120',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
