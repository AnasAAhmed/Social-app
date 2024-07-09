'use server'

import { auth } from "@clerk/nextjs/server"
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUser } = auth();
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
  const { userId: currentUserId } = auth();

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
  const { userId: currentUserId } = auth();

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
          followingId: currentUserId,
          followerId: userId,
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
  const { userId: currentUserId } = auth();

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

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);
  if (fields.dob) {
    const dobDate = new Date(fields.dob as string);
    if (!isNaN(dobDate.getTime())) {
      (fields.dob = dobDate as any);
    } else {
      delete fields.dob; // Remove invalid date
    }
  }
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
    dob: z.date().optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};
export const switchLike = async (postId: number) => {
  const { userId } = auth();
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
  const { userId } = auth();
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

export const addComments = async (postId: number, desc: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not Authenticated!!");
  };
  try {
    const createComment = await prisma.comments.create({
      data: {
        desc,
        userId,
        postId
      },
      include: {
        user: true
      }
    });
    revalidatePath('/')

    return createComment;
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};

export const updatePost = async (formData: FormData, img: string, postId: number) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    if (img === '') {
      await prisma.post.update({
        where: {
          id: postId,
          userId: userId,
        },
        data: {
          desc: validatedDesc.data,

        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: postId,
          userId: userId,
        },
        data: {
          desc: validatedDesc.data,
          img:img,
        },
      });
    }

    revalidatePath("/");
  } catch (err) {
    const typeError = err as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};


export const addStory = async (img: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not Authenticated!!");
  };
  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId
      }
    })
    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id
        }
      })
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      include: {
        user: true
      }
    })
    return createdStory;
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not Authenticated!!");
  };

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId
      }
    });
    await prisma.comments.deleteMany({
      where: {
        postId: postId,
      }
    })
    await prisma.like.deleteMany({
      where: {
        postId: postId,
      }
    })
    revalidatePath('/');
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
}
export const deleteComment = async (commentId: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not Authenticated!");
  };

  try {
    await prisma.comments.delete({
      where: {
        id: commentId,
        userId
      }
    })
    revalidatePath('/');
  } catch (error) {
    const typeError = error as Error
    console.log(typeError);
    throw new Error(`Something went wrong ${typeError.message}`)
  }
}