import prisma from '@/lib/client'
import React from 'react'
import CommentList from './CommentList'

const Comment = async({ postId }: { postId: number }) => {
    const comments = await prisma.comments.findMany({
        where: {
            postId
        },
        include: {
            user: true,
            likes: true  // Ensure likes are included
        }
    });

    // Transform comments to include likes array if needed
    const transformedComments = comments.map(comment => ({
        ...comment,
        likes: comment.likes.map(like => like.userId)  // Transform likes to an array of userIds
    }));

    return (
        <div className='mb-6 mx-4'>
            <CommentList comments={transformedComments} postId={postId} />
        </div>
    )
}

export default Comment;
