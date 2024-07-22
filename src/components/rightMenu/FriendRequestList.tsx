
"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/action";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests, isPage }: { requests: RequestWithUser[], isPage?: boolean }) => {
  const [requestState, setRequestState] = useState(requests);

  const handleAction = async (requestId: number, userId: string, action: 'accept' | 'decline') => {
    removeOptimisticRequest(requestId);
    try {
      if (action === 'accept') {
        await acceptFollowRequest(userId);
      } else {
        await declineFollowRequest(userId);
      }
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {
      console.error(err);
    }
  };

  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  if (optimisticRequests.length === 0) {
    return <p className="text-center font-medium dark:text-white text-gray-600">No friend requests</p>;
  }

  return (
    <div className={`flex flex-col  w-full gap-4`}>
      {optimisticRequests.map((request) => (
        <div key={request.id} className={`bg-white dark:bg-slate-900 ${isPage&&'shadow-md flex-col sm:flex-row'} rounded-lg p-4 w-full flex items-center gap-4`}>
          <Image
            src={request.sender.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-semibold dark:text-white">
              {request.sender.name && request.sender.surname
                ? `${request.sender.name} ${request.sender.surname}`
                : request.sender.username}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">mutual friends</p>
          </div>
          <div className="flex gap-3">
            <form action={() => handleAction(request.id, request.sender.id, 'accept')}>
              <button type="submit"className={`${isPage&&"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"}`}>
              {isPage?"Accept": <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />} 
              </button>
            </form>
            <form action={() => handleAction(request.id, request.sender.id, 'decline')}>
              <button type="submit" className={`${isPage&&"bg-gray-300 dark:bg-slate-700 dark:text-white text-gray-700 px-4 py-2 rounded hover:bg-slate-400 dark:hover:bg-slate-500"}`}>
               {isPage?"Decline": <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />} 
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
