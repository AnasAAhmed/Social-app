'use client'
import Image from "next/image"
import { useState } from "react";

const Ad = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className='p-4 bg-white rounded-lg texxt-sm shadow-md'>

            <div className="flex items-center justify-between text-gray-500 font-medium">
                <span className="">Sponsor Ads</span>
                <div className="relative">
                    <Image
                        src="/more.png"
                        width={16}
                        height={16}
                        alt=""
                        onClick={() => setOpen((prev) => !prev)}
                        className="cursor-pointer"
                    />
                    {open && (
                        <div onMouseLeave={() => setOpen(false)} className="absolute animate-modal bg-gray-50 top-4 ring-[0.5px] right-0 p-4 w-32 rounded-lg flex flex-col gap-2 text-sm shadow-lg z-30">
                            <span className="cursor-pointer">Learn More</span>
                            <span className="cursor-pointer">Hide Ad</span>
                            <span className="text-red-500 cursor-pointer">Report</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={`flex flex-col mt-4 ${size === 'sm' ? "gap-2" : "gap-4"}`}>
                <div className={`relative w-full ${size === 'md' ? "h-36" : "h-44"}`}>
                    <Image src={'/banner.jpg'} alt='' fill className="rounded-lg object-cover" />
                </div>
                <div className="flex items-center gap-4">
                    <Image src={'/banner.jpg'} alt='' width={24} height={24} className="rounded-full w-6 h-6 object-cover" />
                    <span className="ext-blue-500 font-medium">Lorem ipsum</span>
                </div>
                <p className={size === 'sm' || 'md' ? "text-xs" : "text-sm"} >
                    {size === 'sm' ? " Lorem ipsum dolor sit amet consectetur adipisicing elit Dolor expedita aliquid." : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor expedita aliquid tenetur, doloremque, neque sed quisquam rerum alias, earum dignissimos rem libero illo?"}

                </p>
                <button className="bg-gray-200 text-gray-500 text-xs p-2 rounded-md">Learn More</button>
            </div>
        </div>
    )
}

export default Ad
