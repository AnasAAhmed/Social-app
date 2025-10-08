'use client'
import Image from "next/image"
import { useEffect, useRef, useState } from "react";

const Ad = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleClose = () => setOpen(false);
    const toggleOpen = () => setOpen(!open);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                toggleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className='p-4 bg-white dark:bg-[#111] rounded-lg text-sm shadow-md'>
        <div ref={dropdownRef} className="flex items-center justify-between text-gray-500 dark:text-gray-200 font-medium">
            <span>Sponsor Ads</span>
            <div className="relative">
                <Image
                    src="/more.png"
                    width={16}
                    height={16}
                    alt=""
                    onClick={toggleOpen}
                    className="cursor-pointer"
                />
                {open && (
                    <div className="absolute animate-modal bg-gray-50 dark:bg-[#111] top-4 ring-[0.5px] dark:ring-slate-700 right-0 p-4 w-32 rounded-lg flex flex-col gap-2 text-sm shadow-lg z-30">
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
                <span className="text-blue-500 dark:text-blue-400 font-medium">Lorem ipsum</span>
            </div>
            <p className={`text-gray-500 dark:text-gray-200 ${size === 'sm' || size === 'md' ? "text-xs" : "text-sm"}`} >
                {size === 'sm' ? " Lorem ipsum dolor sit amet consectetur adipisicing elit Dolor expedita aliquid." : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor expedita aliquid tenetur, doloremque, neque sed quisquam rerum alias, earum dignissimos rem libero illo?"}
            </p>
            <button className="bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-200 text-xs p-2 rounded-md">Learn More</button>
        </div>
    </div>

    )
}

export default Ad
