'use client'
import { Post as PostsType, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import Pagination from '../Pagination'
import Link from 'next/link'
type feedPostsType = PostsType & { user: User } & { likes: { userId: string }[] } & {
    _count: { comments: number }
}
const Feep = ({ posts, totalPages, page, username, filter, userId }: { posts: feedPostsType[], totalPages: number, page: number, username?: string, filter: string, userId: string }) => {
    const [allPosts, setAllPosts] = useState<feedPostsType[]>([])
    useEffect(() => {
        setAllPosts([])
    }, [posts.length])
    useEffect(() => {
        setAllPosts(prev => [...prev, ...posts])
    }, [posts])

    return (
        <div className="mb-4 dark:bg-slate-800 bg-slate-100 rounded-lg flex flex-col gap-4">
            {allPosts?.length ? (
                <>
                    {allPosts.map(post => (
                        <Post userId={userId} key={post.id} post={post} />
                    ))}
                    <Pagination isFeed={true} urlParamName="page" totalPages={totalPages} page={page} />
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

export default Feep
