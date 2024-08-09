// import prisma from '@/lib/client'
// import React from 'react'
// import CommentList from './CommentList'

// const Comment = async({ postId ,author }: { postId: number ,author:string}) => {
//     const comments = await prisma.comments.findMany({
//         where: {
//             postId
//         },
//         include: {
//             user: true,
//             likes: true 
//         },
//         orderBy: {
//             createdAt: "desc"
//           }
//     });

//     const transformedComments = comments.map(comment => ({
//         ...comment,
//         likes: comment.likes.map(like => like.userId) 
//     }));

//     return (
//         <div className='mx-4'>
//             <CommentList author={author} comments={transformedComments} postId={postId} />
//         </div>
//     )
// }

// export default Comment;
'use client';

import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import { CommentLoader, Spinner } from '../Loader';
import { Comments, User } from '@prisma/client';

type CommentWithUser = Comments & { user: User, likes?: string[] };

const Comment = ({ postId, open, author, commentNumber }: { postId: number; open: boolean; author: string; commentNumber: number }) => {
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('new');
    const limit = 5;

    const fetchComments = async (newPage: number, sortOption: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/comments?postId=${postId}&page=${newPage}&limit=${limit}&sortBy=${sortOption}`);
            const data = await response.json();
            setComments((prevComments) => newPage === 1 ? data : [...prevComments, ...data]);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (commentNumber > 0) {
            fetchComments(1, 'new');
        }
    }, [postId]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchComments(nextPage, sortBy);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
        setPage(1); // Reset page to 1 when changing sort option
        fetchComments(1, event.target.value);
    };



    return open && (
        <div className='mx-4'>
            {commentNumber > 5 && <div className="mb-4 text-xs">
                <label htmlFor="sort" className="mr-2 dark:text-gray-200">Sort by:</label>
                <select id="sort" value={sortBy} onChange={handleSortChange} className="border outline-none rounded">
                    <option value="new">Newest</option>
                    <option value="likes">Most Liked</option>
                </select>
            </div>}
            {loading && page === 1 ? (
                <CommentLoader commentNumber={commentNumber} />
            ) : (
                <>
                    <CommentList sort={sortBy} author={author} comments={comments} postId={postId} />
                    {!loading && comments.length < commentNumber && (
                        <button onClick={handleLoadMore} className="mt-4 mr-3 hover:underline text-xs lg:text-sm text-blue-500">
                            Load More
                        </button>
                    )}
                    {loading && (
                        <div className="mt-4">
                            <Spinner />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Comment;
