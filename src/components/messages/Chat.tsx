"use client";
import { useEffect, useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import useInitializeChatClient from "./useInitializeChatClient";
import ChatSidebar from "./ChatSidebar";
import { LoaderGif } from "../Loader";

export default function Chat() {

    const chatClient = useInitializeChatClient();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('');
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setCurrentTheme('dark');
        } else {
            setCurrentTheme('light');
        }
    }, []);
    if (!chatClient) {
        return <LoaderGif />;
    }

    return (
        <main className="relative w-full overflow-hidden sm:rounded-2xl bg-card shadow-sm">

            <div className="abssolsute bottom-0 top-0 sm:flex w-full">
                <StreamChat
                    client={chatClient!}
                    theme={currentTheme == "dark"
                        ? "str-chat__theme-dark"
                        : "str-chat__theme-light"}
                    customClasses={{ channelList: 'max-h-[71vh] min-h-[70vh]' }}
                >
                    <ChatSidebar
                        open={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                    <ChatChannel
                        open={!sidebarOpen}
                        openSidebar={() => setSidebarOpen(true)}
                    />
                </StreamChat>
            </div>
        </main>
    );
}