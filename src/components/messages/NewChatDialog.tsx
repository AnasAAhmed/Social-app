
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Loader2, SearchIcon, X } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useChatContext } from "stream-chat-react";
import Dialog from "../Dialog";

interface NewChatDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onChatCreated: () => void;
}

export default function NewChatDialog({
    open,
    onOpenChange,
    onChatCreated,
}: NewChatDialogProps) {
    const { client, setActiveChannel } = useChatContext();

    const { data: loggedInUser } = useSession();
    if (!loggedInUser?.user) return;

    const [searchInput, setSearchInput] = useState("");
    const debounce = (func: (value: string) => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };
    const handleSearch = useCallback(
        debounce((value: string) => {
            setSearchInput(value)
        }, 300),
        []
    );

    const [selectedUsers, setSelectedUsers] = useState<any>(null);
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ["stream-users", searchInput],
        queryFn: async () =>
            client.queryUsers(
                {
                    id: { $in: [''] },
                    role: { $in: ["user"] },
                    ...(searchInput
                        ? {
                            $or: [
                                { name: { $autocomplete: searchInput } },
                                { username: { $autocomplete: searchInput } },
                            ],
                        }
                        : {}),
                },
                { name: 1, username: 1 },
                { limit: 15 },
            ),
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const members = [
                loggedInUser!.user!.id!,
                ...selectedUsers.map((u: any) => u.id),
            ];

            const name =
                selectedUsers.length > 1
                    ? `${loggedInUser!.user!.name!}, ${selectedUsers.map((u: any) => u.name).join(", ")}`
                    : undefined;
            const channel = client.channel("messaging", undefined, {
                members,
                ...(name && { name }),
            });
            await channel.create();
            return channel;
        },
        onSuccess: (channel) => {
            setActiveChannel(channel);
            onChatCreated();
        },
        onError(error) {
            console.error("Error starting chat", error);
            toast.error("Error starting chat. Please try again.");
        },
    });

    return (
        <Dialog open={open} onClose={()=>onOpenChange(false)} title="New chat">
            <div className="group relative">
                <SearchIcon className="absolute left-5 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary" />
                <input
                    placeholder="Search users..."
                    className="h-12 w-full pe-4 ps-14 focus:outline-none"
                    defaultValue={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            {!!selectedUsers?.length && (
                <div className="mt-4 flex flex-wrap gap-2 p-2">
                    {selectedUsers?.map((user: any) => (
                        <SelectedUserTag
                            key={user.id}
                            user={user}
                            onRemove={() => {
                                setSelectedUsers((prev: any) =>
                                    prev.filter((u: any) => u.id !== user.id),
                                );
                            }}
                        />
                    ))}
                </div>
            )}
            <hr />
            <div className="min-h-56 overflow-y-auto">
                {isSuccess &&
                    data.users.map((user) => (
                        <UserResult
                            key={user.id}
                            user={user}
                            selected={selectedUsers.some((u: any) => u.id === user.id)}
                            onClick={() => {
                                setSelectedUsers((prev: any) =>
                                    prev.some((u: any) => u.id === user.id)
                                        ? prev.filter((u: any) => u.id !== user.id)
                                        : [...prev, user],
                                );
                            }}
                        />
                    ))}
                {isSuccess && !data.users.length && (
                    <p className="my-3 text-center text-muted-foreground">
                        No users found. Try a different name.
                    </p>
                )}
                {isFetching && <Loader2 className="mx-auto my-3 animate-spin" />}
                {isError && (
                    <p className="my-3 text-center text-destructive">
                        An error occurred while loading users.
                    </p>
                )}
            </div>
            <button
                className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg disabled:opacity-50"
                disabled={!selectedUsers?.length || mutation.isPending}
                onClick={() => mutation.mutate()}
            >
                {mutation.isPending ? "Creating..." : "Start Chat"}
            </button>
        </Dialog >
    );
}

interface UserResultProps {
    user: User;
    selected: boolean;
    onClick: () => void;
}

function UserResult({ user, selected, onClick }: UserResultProps) {
    return (
        <button
            className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/50"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <Image
                    src={user.image!}
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="aspect-square h-fit flex-none rounded-full bg-secondary object-cover"

                />
                <div className="flex flex-col text-start">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-muted-foreground">@{user.name}</p>
                </div>
            </div>
            {selected && <Check className="size-5 text-green-500" />}
        </button>
    );
}

interface SelectedUserTagProps {
    user: User;
    onRemove: () => void;
}

function SelectedUserTag({ user, onRemove }: SelectedUserTagProps) {
    return (
        <button
            onClick={onRemove}
            className="flex items-center gap-2 rounded-full border p-1 hover:bg-muted/50"
        >
            <Image
                src={user.image!}
                alt="User avatar"
                width={48}
                height={48}
                className="aspect-square h-fit flex-none rounded-full bg-secondary object-cover"

            />
            <p className="font-bold">{user.name}</p>
            <X className="mx-2 size-5 text-muted-foreground" />
        </button>
    );
}