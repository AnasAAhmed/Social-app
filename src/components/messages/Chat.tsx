"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import useInitializeChatClient from "./useInitializeChatClient";
import ChatSidebar from "./ChatSidebar";

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
        return <Loader2 className="mx-auto my-3 animate-spin" />;
    }

    return (
        <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">

            <div className="abssolute bottom-0 top-0 flex w-full">
                <StreamChat
                    client={chatClient}
                    theme={
                        currentTheme === "dark"
                            ? "str-chat__theme-dark"
                            : "str-chat__theme-light"
                    }
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