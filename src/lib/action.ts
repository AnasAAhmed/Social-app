'use server'

import { auth } from "@clerk/nextjs/server"
import prisma from "./client";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUser } = await auth.protect();
  if (!currentUser) throw new Error("UserId is not authneticated");
  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUser,
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
          senderId: currentUser,
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
            senderId: currentUser,
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
  const { userId: currentUserId } = await auth.protect();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
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
          blockerId: currentUserId,
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
  const { userId: currentUserId } = await auth.protect();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  };
  try {

    const existingFollowRequests = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
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
          followerId: currentUserId,
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
  const { userId: currentUserId } = await auth.protect();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
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
  const { userId } = await auth.protect();
  if (!userId) {
    throw new Error("User is not Authenticated!!");
  }
  try {
    const existingLke = await prisma.like.findFirst({
      where: {
        postId,
        userId
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
          postId, userId
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
  const { userId } = await auth.protect();
  if (!userId) {
    throw new Error("User is not Authenticated!!");
  }
  try {
    const existingLke = await prisma.like.findFirst({
      where: {
        commentId,
        userId
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
          userId
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
