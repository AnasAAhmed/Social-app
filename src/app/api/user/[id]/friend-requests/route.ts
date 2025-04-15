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

    const requestsCount = await prisma.followRequest.count({
      where: {
        receiverId: userId
      }
    });
    if (requestsCount <= 0) {
      return new Response(JSON.stringify({ requests: [], requestsCount: 0 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const requests = await prisma.followRequest.findMany({
      where: {
        receiverId: userId
      },
      include: {
        sender: {
          select:{
            username:true,
            avatar:true,
          }
        }
      },
      take: 6,
    });

    return new Response(JSON.stringify({ requests, requestsCount }), {
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
