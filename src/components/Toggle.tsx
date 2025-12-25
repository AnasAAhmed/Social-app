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
        const newTheme = darkMode ? "light" : "dark";

        // for full website
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);

        //for stream,io elements
        const streamElements = document.querySelectorAll(".str-chat");
        streamElements.forEach((el) => {
            el.classList.remove("str-chat__theme-dark", "str-chat__theme-light");
            el.classList.add(`str-chat__theme-${newTheme}`);
        });

        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            title={darkMode ? 'toggle light theme' : 'toggle dark theme'}
            className="text-black text-[22px] dark:text-white"
        >
            {!darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default DarkModeToggle;
