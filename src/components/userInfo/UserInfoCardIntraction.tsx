"use client";

import { switchBlock, switchFollow, switchUnFollow } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  isFriendsPage = false,
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
  isFollowedByThem
}: {
  isFriendsPage?: boolean;
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
  isFollowedByThem: boolean
}) => {
  const router = useRouter();
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
      if (isFriendsPage) {
        router.refresh();
      }
    } catch (err) { }
  };

  const unfollow = async () => {
    switchOptimisticState("follow");
    try {
      await switchUnFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
      if (isFriendsPage) {
        router.refresh();
      }
    } catch (err) { }
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) { }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
          ...state,
          following: state.following && false,
          followingRequestSent:
            !state.following && !state.followingRequestSent ? true : false,
        }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      {optimisticState.following ? <form action={unfollow}>
        <button title={
          "Unfollow this user"

        }
          className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          Unfollow

        </button>
      </form> : <form action={follow}>
        <button title={
          // optimisticState.following
          //   ? "Unfollow this user"
          isFollowedByThem
            ? "Remove this user from your followers (if you want this user not to follow you)"
            : optimisticState.followingRequestSent
              ? "Friend request already sent"
              : "Send a follow request"
        }
          className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {isFollowedByThem
            ? "Remove Follower"
            : optimisticState.followingRequestSent
              ? "Request Sent"
              : "Follow"}

        </button>
      </form>}
      {!isFriendsPage && <form action={block} className="self-end ">
        <button title="Block this user so this user cant see your profile ">
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>}
    </>
  );
};

export default UserInfoCardInteraction;