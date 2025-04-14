'use server'

import { auth } from "@/auth";
import prisma from "./client";
import { revalidatePath } from "next/cache";


export const switchFollow = async (userId: string) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: user.id,
        followingId: userId
      }
    })
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id
        }
      })
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: user.id,
          receiverId: userId
        }
      })
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id
          }
        })
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: user.id,
            receiverId: userId
          }
        })
      }
    }

  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};

export const switchBlock = async (userId: string) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: user.id,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");
  try {

    const existingFollowRequests = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: user.id,
      },
    })
    if (existingFollowRequests) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequests.id,
        },
      });
      await prisma.follower.create({
        data: {
          followerId: user.id,
          followingId: userId,
        },
      });
    }
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)

  }
};
export const declineFollowRequest = async (userId: string) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: user.id,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};
export const switchLike = async (postId: number) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");
  try {
    const existingLke = await prisma.like.findFirst({
      where: {
        postId,
        userId:user.id
      }
    })
    if (existingLke) {
      await prisma.like.delete({
        where: {
          id: existingLke.id
        }
      })
    } else {
      await prisma.like.create({
        data: {
          postId, userId:user.id
        }
      })
    }
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};
export const switchCommentLike = async (commentId: number) => {
  const { user } =  (await auth()) as Session;


  if (!user.id) throw new Error("User is not authenticated!");
  try {
    const existingLke = await prisma.like.findFirst({
      where: {
        commentId,
        userId:user.id
      }
    })
    if (existingLke) {
      await prisma.like.delete({
        where: {
          id: existingLke.id
        }
      })
    } else {
      await prisma.like.create({
        data: {
          commentId,
          userId:user.id
        }
      })
    }
    revalidatePath('/')
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};
