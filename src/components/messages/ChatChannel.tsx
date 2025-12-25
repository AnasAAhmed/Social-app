
import { Menu } from "lucide-react";
import {
    Channel,
    ChannelHeader,
    ChannelHeaderProps,
    MessageInput,
    MessageList,
    Window,
} from "stream-chat-react";

interface ChatChannelProps {
    open: boolean;
    openSidebar: () => void;
}

export default function ChatChannel({ open, openSidebar }: ChatChannelProps) {
    return (
        <div className={`w-full duration-300 ease-out transition-transform md:block ${!open ? "max-sm:translate-x-[200%]" : "translate-x-0"}`}
        >
            <Channel>
                <Window>
                    <CustomChannelHeader openSidebar={openSidebar} />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </div >
    );
}

interface CustomChannelHeaderProps extends ChannelHeaderProps {
    openSidebar: () => void;
}

function CustomChannelHeader({
    openSidebar,
    ...props
}: CustomChannelHeaderProps) {
    return (
        <div className="flex dark:bg-[#17191c] w-full items-center gap-3">
            <div className="h-full p-2 md:hidden">
                <button
                    className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                    onClick={openSidebar}>
                    <Menu className="size-5" />
                </button>
            </div>
            <ChannelHeader {...props} />
        </div>
    );
}