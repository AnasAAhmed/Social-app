
import { auth } from '@/auth';
import NotLoggedIn from '@/components/NotLoggedIn';
import Pagination from '@/components/Pagination';
import Post from '@/components/feed/Post';
import LeftMenu from '@/components/leftMenu/LeftMenu';
import RightMenu from '@/components/rightMenu/RightMenu';
import prisma from '@/lib/client';
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ query: string }> }) {
    const { query } = await params;

    return (
        {
            title: query + 'Post search | Anas Social',
            description: `A Post search results for ${query} in a full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic | Anas Ahmed`,
            applicationName: "Anas' social Platform",
            authors: {
                url: 'https://anas3d.netlify.app/',
                name: "Anas Ahmed"
            },
            publisher: 'Anas Social',
            creator: 'Anas ahmed',
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true
                }
            },
            openGraph: {
                type: "website",
                url: "https://anas-social.vercel.app",
                title: query + 'Post search | Anas Social',
                description: `A Post search results for ${query} in a full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic | Anas Ahmed`,
                siteName: "Anas Social",
                images: [{
                    url: '/logo.png',
                    alt: 'logo',
                    with: 200,
                    height: 200
                }],
            }
        }
    )
}

const page = async ({ params, searchParams }: { params: Promise<{ query: string }>, searchParams: Promise<{ page: string }> }) => {
    const session = (await auth()) as Session;

    if (!session) {
        return <NotLoggedIn />;
    }
    const { page } = await searchParams
    const { query } = await params
    const perPage = 12;
    const offset = (Number(page) || 1 - 1) * perPage;
    const decodedQuery = decodeURIComponent(query);

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    desc: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
        take: perPage,
        skip: offset,
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                    userInfo: { select: { name: true, surname: true } }
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
    });
    const totalPosts = await prisma.post.count({
        where: {
            OR: [
                {
                    desc: {
                        contains: decodedQuery,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
    });
    const totalPages = Math.ceil(totalPosts / perPage);

    return (
        <div className='flex justify-end'>
            <div className="hidden md:block overflow-scroll scrollbar-hide fixed top-30 left-0 h-full w-[30%] xl:w-1/4 pl-14">
                <LeftMenu type='profile' />
            </div>
            <div className="w-full md:w-[70%] xl:w-1/2 xl:mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="mb-4 rounded-lg flex flex-col gap-4">
                        <p className="text-gray-600 dark:text-gray-300 text-center font-medium text-2xl">
                            {posts.length > 0 ? "Posts results for" : "No Post Found For"} ({decodedQuery}).
                        </p>
                        {posts && posts.map(post => (
                            <Post userId={session && session.user.id || ''} key={post.id} post={post} />
                        ))}
                        <Pagination urlParamName='page' totalPages={totalPages} page={Number(page) || 1} />
                    </div>
                </div>
            </div>
            <div className="hidden xl:block overflow-scroll scrollbar-hide fixed top-30 right-0 h-full w-1/4 max-xl:w-1/3 pr-14">
                <RightMenu />
            </div>
            {/* </Suspense> */}
        </div>
    )
}

export default page
