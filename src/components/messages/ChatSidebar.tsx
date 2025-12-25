
import { useQueryClient } from "@tanstack/react-query";
import { MailPlus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
    ChannelList,
    ChannelPreviewMessenger,
    ChannelPreviewUIComponentProps,
    useChatContext,
} from "stream-chat-react";
import NewChatDialog from "./NewChatDialog";
import { useSession } from "next-auth/react";

interface ChatSidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function ChatSidebar({ open, onClose }: ChatSidebarProps) {
    const { data: session } = useSession();

    const queryClient = useQueryClient();

    const { channel } = useChatContext();

    useEffect(() => {
        if (channel?.id) {
            queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
        }
    }, [channel?.id, queryClient]);

    const ChannelPreviewCustom = useCallback(
        (props: ChannelPreviewUIComponentProps) => (
            <ChannelPreviewMessenger
                {...props}
                onSelect={() => {
                    props.setActiveChannel?.(props.channel, props.watchers);
                    onClose();
                }}
            />
        ),
        [onClose],
    );

    return (
        <div
            className="size-full flex-col border-e md:flex md:w-72"
            style={{ display: open ? "flex" : "hidden" }}
        >
            <MenuHeader onClose={onClose} />
            <ChannelList
                filters={{
                    type: "messaging",
                    members: { $in: [session!.user!.id!] },
                }}
                showChannelSearch
                options={{ state: true, presence: true, limit: 8 }}
                sort={{ last_message_at: -1 }}
                additionalChannelSearchProps={{
                    searchForChannels: true,
                    searchQueryParams: {
                        channelFilters: {
                            filters: { members: { $in: [session!.user!.id!] } },
                        },
                    },
                }}
                Preview={ChannelPreviewCustom}
            />
        </div>
    );
}

interface MenuHeaderProps {
    onClose: () => void;
}

function MenuHeader({ onClose }: MenuHeaderProps) {
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);

    return (
        <>
            <div className="flex items-center gap-3 p-2">
                <div className="h-full md:hidden">
                    <button
                        className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg disabled:opacity-50"
                        onClick={onClose}>
                        <X className="size-5" />
                    </button>
                </div>
                <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
                <button
                    className="mt-4 bg-blue-600 text-white w-fusll p-2 rounded-lg disabled:opacity-50"

                    onClick={() => setShowNewChatDialog(true)}
                >
                    <MailPlus className="size-5" />
                </button>
            </div>
            {showNewChatDialog && (
                <NewChatDialog
                    onOpenChange={setShowNewChatDialog}
                    onChatCreated={() => {
                        setShowNewChatDialog(false);
                        onClose();
                    }}
                />
            )}
        </>
    );
}