'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type DropSearchProps = {
    isLink?: boolean
    options:
    {
        key: string;
        value: any;
    }[]

}

const DropDown = ({ options }: DropSearchProps) => {
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);
    const toggleOpen = () => setOpen(!open);

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <button
                onMouseEnter={handleMouseEnter}
                onClick={toggleOpen}
                className="flex gap-4 items-center p-2 font-semibold rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
                <Image src="/friends.png" alt="" width={20} height={20} />
                <span>Friends</span>
                {/* <span className={`transition-all text-xs -rotate-90 duration-300 ${open && 'rotate-180'}`}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="arrow"><path d="M16.682 19.674c.01-.012.014-.028.024-.04l6.982-7.714c.39-.434.39-1.138 0-1.572-.004-.004-.008-.006-.012-.008a.936.936 0 0 0-.712-.34H8.998a.948.948 0 0 0-.722.352l-.004-.004a1.202 1.202 0 0 0 0 1.572l6.998 7.754a.928.928 0 0 0 1.412 0z"></path></svg></span> */}

            </button>
            {open && (
                <div
                    className="absolute z-30 animate-modal p-2 w-44 left-20 top-6 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    {options.map((option, index) => (
                        <Link onClick={handleMouseLeave} key={index} href={option.value} className="block w-full rounded-md p-2 text-left text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            {option.key}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;