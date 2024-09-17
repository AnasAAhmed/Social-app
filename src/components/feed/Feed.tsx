import React from 'react'
import Post from './Post'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client';
import Pagination from '../Pagination';
import Link from 'next/link';
import Feep from './Feep';
// import Feep from './Feep';
const Feed = async ({ searchParams, username, blockedPostId }: { username?: string, blockedPostId?: number[], searchParams: any }) => {
  const { userId } = auth();
  if (!userId) return null;
  const page = Number(searchParams?.page) || 1;
  const filter = searchParams?.filter || 'friends';
  const perPage = 8;
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
        user: {
          select: {
            username: true,
            surname: true,
            name: true,
            avatar: true,
          }
        },
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
    let ids: string[] = [];
    if (filter === 'friends') {

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

      console.log('ffff');

      // Combine userId, followerIds, and followingIds into a single array of unique IDs
      ids = Array.from(
        new Set([userId, ...followerIds, ...followingIds])
      );
    } else {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true
        },
      });

      const allUsersIds = new Set(
        allUsers.map(f => f.id)
      );
      ids = Array.from(
        new Set([userId, ...allUsersIds])
      );
      console.log('ssss');
      
    }
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
        user: {
          select: {
            username: true,
            surname: true,
            name: true,
            avatar: true,
          }
        },
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
    <div className="mb-4 dark:bg-slate-800 bg-slate-100 rounded-lg flex flex-col gap-4">
      {/* <Feep
        totalPages={totalPages}
        page={page}
        posts={posts}
        filter={filter}
        username={username}
        userId={userId}
        /> */}
      {posts?.length ? (
        <>
          {posts.map(post => (
            <Post userId={userId} key={post.id} post={post} />
          ))}
          <Pagination urlParamName="page" totalPages={totalPages} page={page} />
        </>
      ) : (
        !username &&
        <div>
          <p className="text-gray-600 text-center font-medium text-xl">No Posts yet. make friends to see thier posts or switch to public.</p>
          <div className="flex justify-center gap-2">

            <Link href="/" className={`mr-2 ${filter === 'friends' ? 'text-blue-500' : 'text-gray-500'}`}>
              Friends
            </Link>
            <Link href="?filter=all" className={`${filter === 'all' ? 'text-blue-500' : 'text-gray-500'}`}>
              Public
            </Link>
          </div>
        </div>
      )}
    </div>

  )
}

export default Feed
