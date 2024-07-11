import prisma from '@/lib/client'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const UserMediaCard = async ({ user ,size}: { user: User ,size?:string}) => {
    const postSWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: {
                not: '',//means if post have empty img field dont fetch it

            },
        },
        select: {
            img: true,
            id: true,
        },
        take: 6,
        orderBy: {
            createdAt: "desc",
        }
    })
    return (
        <div className='p-4 bg-white rounded-lg text-sm shadow-md flex flex-col gap-4'>
            {/* top */}
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500">Recent Media</span>
                <div className='text-blue-500 cursor-pointer text-xs'>See all</div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
                {postSWithMedia.length ? postSWithMedia.map((post) => (
                    <div key={post.id} className="relative w-[27%] h-24">
                        {post.img ? (
                            post.img.endsWith('.mp4') || post.img.endsWith('.webm') || post.img.endsWith('.ogg') ? (
                                <video autoPlay src={post.img} className="object-cover h-full rounded-md"></video>
                            ) : (
                                <>
                                    <Image src={post.img!} alt='post' fill className='object-cover rounded-md' />
                                </>
                            )
                        ) : (""
                        )}
                    </div>
                ))
                    : "No recent media found"}
            </div>
        </div>
    )
}

export default UserMediaCard
