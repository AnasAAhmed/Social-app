import React from 'react'
import Post from './Post'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client';
import Pagination from '../Pagination';

const Feed = async ({ searchParams, username, blockedPostId }: { username?: string, blockedPostId?: number[], searchParams: any }) => {
  const { userId } = auth();
  if (!userId) return null;
  const page = Number(searchParams?.page) || 1;
  const perPage = 4;
  const offset = (page - 1) * perPage;
  let posts: any[] = [];
  let totalPosts: number = 0;
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username
        },
      },
      skip: offset,
      take: perPage,
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          },
        },
        _count: {
          select: {
            comments: true
          },
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    totalPosts = await prisma.post.count({
      where: {
        user: {
          username: username
        },
      },
    })
  };

  if (!username && userId) {
    // Fetch follower and following IDs in a single query
    const followersAndFollowings = await prisma.follower.findMany({
      where: {
        OR: [
          { followingId: userId },
          { followerId: userId },
        ],
      },
      select: {
        followingId: true,
        followerId: true,
      },
    });

    // Extract unique follower and following IDs
    const followerIds = new Set(
      followersAndFollowings.map(f => f.followerId)
    );
    const followingIds = new Set(
      followersAndFollowings.map(f => f.followingId)
    );

    // Combine userId, followerIds, and followingIds into a single array of unique IDs
    const ids = Array.from(
      new Set([userId, ...followerIds, ...followingIds])
    );

    // Fetch posts and total post count in parallel

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      skip: offset,
      take: perPage,
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
      totalPosts = await prisma.post.count({
        where: {
          userId: {
            in: ids,
          },
        },
      })
  }

  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <>
      {posts?.length ? (
        <div className=" py-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
          <Pagination urlParamName="page" totalPages={totalPages} page={page} />
        </div>
      ) : (
        <p className="text-gray-600 text-center font-medium text-2xl">No Posts yet.</p>
      )}
    </>

  )
}

export default Feed
