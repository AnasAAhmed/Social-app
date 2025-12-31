'use client'
import Image from 'next/image'
import { Loader1 } from '../Loader'
import { useMediaQuery } from '@/lib/truncate'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

const useUserMedia = (userId: string, enabled: boolean) => {
    return useQuery<{ img: string; id: string }[]>({
        queryKey: ["userMedia" + userId],
        queryFn: async () => {
            const res = await fetch(`/api/user/${userId}/media`);
            if (!res.ok) throw new Error("Failed to fetch user media");
            return res.json();
        },
        staleTime: 60_000,
        enabled,
    });
};

const UserMediaCard = ({ userId, size }: { userId: string, size?: string }) => {
    const isDesktop = useMediaQuery('(min-width: 1280px)');

    const { data, isLoading, error, isError } = useUserMedia(userId, isDesktop)

    if (!isDesktop) return <Loader1 />;
    if (isLoading) return <Loader1 />;
    if (isError) {
        toast.error((error as Error).message)
        return <div>Failed to load user media.</div>
    }
    return (
        <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md flex flex-col gap-4'>
            <div className=" flex justify-between items-center font-medium">
                <span className="text-gray-500 dark:text-white">Recent Media</span>
                <div className='text-blue-500 cursor-pointer text-xs'>See all</div>
            </div>
            <div className="flex gap-4 justify-s flex-wrap">
                {data && data.length > 0 ? data.map((post) => (
                    <div key={post.id} className="relative w-[27%] h-24">
                        {post.img ? (
                            post.img.endsWith('.mp4') || post.img.endsWith('.webm') || post.img.endsWith('.ogg') ? (
                                <video src={post.img} className="object-cover h-full rounded-md"></video>
                            ) : (
                                <>
                                    <Image src={post.img!} alt='post' fill className='object-cover rounded-md' />
                                </>
                            )
                        ) : (""
                        )}
                    </div>
                ))
                    : <p className='dark:text-gray-300'>No recent media found</p>}
            </div>
        </div>
    )
}

export default UserMediaCard
