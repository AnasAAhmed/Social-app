
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
        <div className={"w-full md:block"}
            style={{
                display: !open ? "hidden" : undefined
            }}
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
        <div className="flex items-center gap-3">
            <div className="h-full p-2 md:hidden">
                <button
                    className="mt-4 bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                    onClick={openSidebar}>
                    <Menu className="size-5" />
                </button>
            </div>
            <ChannelHeader {...props} />
        </div>
    );
}