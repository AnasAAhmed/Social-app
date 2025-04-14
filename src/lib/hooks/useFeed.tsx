import { Post } from "@prisma/client";

export const fetchPosts = async ({
  page,
  filter,
  username,
}: {
  page: number;
  filter?: string;
  username?: string;
}): Promise<{ posts: Post[]; totalPosts: number }> => {

  const res = await fetch(`/api/post${username ? `/${username}?page=${page}` : `?filter=${filter}&page=${page}`}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};
