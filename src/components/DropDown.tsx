'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleClose = () => setOpen(false);
    const toggleOpen = () => setOpen(!open);
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="relative"  ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex gap-4 items-center p-2 font-semibold rounded-md"
            >
                <Image src="/friends.png" alt="" width={20} height={20} />
                <span>Friends</span>

            </button>
            {open && (
                <div 
                    className="absolute z-30 animate-modal p-2 w-44 left-20 top-6 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    {options.map((option, index) => (
                        <Link onClick={toggleClose} key={index} href={option.value} className="block w-full rounded-md p-2 text-left text-md font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            {option.key}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;