'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    return (
            <button
                onClick={toggleDarkMode}
                className="text-black text-[22px] dark:text-white"
            >
              {darkMode?<Image height={18} width={18} src="/sun.svg" alt="moon" />:<Image height={18} width={18} src="/Moon.svg" alt="moon" />} 
            </button>
    );
};

export default DarkModeToggle;
