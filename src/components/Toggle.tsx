'use client'
import { Moon, Sun } from 'lucide-react';
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
                title={darkMode?'toggle light theme':'toggle dark theme'}
                className="text-black text-[22px] dark:text-white"
            >
              {!darkMode?<Sun size={18}/>:<Moon size={18}/>} 
            </button>
    );
};

export default DarkModeToggle;
