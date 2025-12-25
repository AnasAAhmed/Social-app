import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import kyInstance from "@/lib/ky";
import { useSession } from "next-auth/react";

export default function useInitializeChatClient() {
  const { data:session } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    client
      .connectUser(
        {
          id: session!.user!.id!,
          username: session!.user!.name!,
          name: session!.user!.name!,
          image: session!.user!.image!,
        },
        async () =>
          kyInstance
            .get("/api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((error) => console.error("Failed to connect user", error))
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user", error))
        .then(() => console.log("Connection closed"));
    };
  }, [session?.user?.id]);

  return chatClient;
}