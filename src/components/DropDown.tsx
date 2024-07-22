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
        <div className="relative" ref={dropdownRef}>
        <button
            onClick={toggleOpen}
            className="flex gap-2 items-center p-2 font-semibold rounded-md "
        >
            <Image src="/friends.png" alt="" width={20} height={20} className="mr-2" />
            <span>Friends</span>
            <div className="text-xl">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={`transition-all duration-300 ${open ? "rotate-0" : "-rotate-90"}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                </svg>
            </div>
        </button>
        {open && (
            <div
                className="absolute z-30 animate-modal p-2 w-44 left-20 top-6 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                {options.map((option, index) => (
                    <Link onClick={toggleClose} key={index} href={option.value} className="block w-full rounded-md p-2 text-left text-md font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white">
                        {option.key}
                    </Link>
                ))}
            </div>
        )}
    </div>
    );
};

export default DropDown;