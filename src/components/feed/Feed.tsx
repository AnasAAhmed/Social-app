'use client';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader1, LoaderAddPost, PostSkeletonList, Spinner } from '../Loader';
import dynamic from 'next/dynamic';
import { Post as PostType, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { extractUrl } from '@/lib/utils';
import { addPost } from '@/lib/form.actions';
import { EmojiClickData } from 'emoji-picker-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import AddPostButton from '../AddPostButton';
import Post from './Post';
import { fetchPosts } from '@/lib/hooks/useFeed';
import { useRouter, useSearchParams } from 'next/navigation';
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <div className="bg-white p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});

const Feed = ({
  filter,
  username,
  blockedPostId,
}: {
  username?: string;
  blockedPostId?: number[];
  filter?: string;
}) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [linkPreviewLoader, setLinkPreviewLoader] = useState(false);
  const [linkPreview, setLinkPreview] = useState<null | {
    title: string;
    description: string;
    image: string;
    url: string;
  }>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = extractUrl(desc);
  const [posts, setPosts] = useState<feedPostsType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const queryKey = ['feed', { filter, username }];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchPosts({ page: 1, filter, username }),
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
      setTotalPosts(data.totalPosts);
      setPage(2);
    }
  }, [data]);

  const fetchNextPage = async () => {
    const next = await fetchPosts({ page, filter, username });
    setPosts((prev) => [...prev, ...next.posts]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (url && !img) {
        try {
          setLinkPreviewLoader(true);
          const res = await fetch(`/api/link-preview?url=${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();
          if (!data.error) {
            setLinkPreview(data);
          } else {
            toast.warning("Link preview unavailable.");
            setLinkPreview(null);
          }
        } catch (err) {
          toast.error("Failed to fetch link preview.");
          console.error("Preview error", err);
          setLinkPreview(null);
        } finally {

          setLinkPreviewLoader(false);
        }
      } else {
        setLinkPreview(null);
      }
    }, 800); // debounce

    return () => clearTimeout(timeout);
  }, [desc, img]);

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const postId = searchParams.get('postId')
    const params = new URLSearchParams(searchParams.toString());

    if (postId) {
      setPosts(prev => prev.filter(post => post.id !== Number(postId)))
      params.delete('postId');
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams])

  const handleEmojiClick = (event: EmojiClickData) => {
    setDesc((prev) => prev + event.emoji);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!session) return toast.error("Current User is not authenticated if you're logged in please login again");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setShowEmojiPicker(false);
    const optimisticDesc = desc;
    const optimisticImg = img;
    setDesc("");
    setImg(null);
    setIsSubmitting(true);

    try {
      const post = await addPost(formData, optimisticImg?.secure_url || "");
      toast.success("Posted successfully");
      const optimisticPost = {
        id: post.id,
        desc: post.desc || optimisticDesc,
        img: post.img || optimisticImg?.secure_url || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session.user?.id || crypto.randomUUID(),
        user: {
          username: session.user?.name,
          avatar: session.user?.image,
          userInfo: { name: null, surname: null },
        },
        likes: [],
        _count: { comments: 0 },
      };
      setPosts([optimisticPost, ...posts]);
    } catch (error) {
      console.error("Failed to add post:", error);
      toast.error(`Failed to add post: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isYourProfile = username ? session?.user?.name === username ? true : false : false;
  return (
    <>
      {loading ? <LoaderAddPost /> :
        session && <div className="p-4 bg-white dark:bg-slate-900 shadow-md rounded-lg flex gap-4 justify-between text-sm">
          <img
            src={session.user!.image || "/noAvatar.png"}
            alt="User avatar"
            className="w-12 h-12 object-cover rounded-full"
          />
          {/* POST CONTENT */}
          <div className="flex-1">
            {/* Preview Media */}
            <div className="mb-3 gap-2">
              {img?.secure_url ? (
                img?.secure_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video autoPlay controls src={img?.secure_url} className="rounded-md w-[300px] h-[300px]" />
                ) : (
                  <Image src={img?.secure_url} className="rounded-md" alt="Uploaded Image" width={300} height={300} />
                )
              ) : url && linkPreviewLoader ? <Spinner /> : linkPreview && (
                <a href={linkPreview.url} target="_blank" rel="noopener noreferrer" className="block border rounded-lg overflow-hidden w-[300px]">
                  {linkPreview.image && (
                    <img
                      src={linkPreview.image}
                      alt={linkPreview.title}
                      width={300}
                      height={160}
                      title={linkPreview.url}
                      className="object-cover"
                    />
                  )}
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 text-sm">
                    <h4 title={linkPreview.title} className="font-semibold line-clamp-1">{linkPreview.title}</h4>
                    <p title={linkPreview.description} className="text-gray-500 line-clamp-2">{linkPreview.description}</p>
                  </div>
                </a>
              )}
            </div>

            {/* TEXT INPUT */}
            <form onSubmit={handleSubmit} className="flex gap-4">
              <textarea
                placeholder={`What's on your mind, ${session.user!.name}?`}
                className="flex-1 bg-slate-100 dark:text-gray-200 dark:bg-slate-800 rounded-lg p-2 disabled:opacity-35 disabled:cursor-not-allowed"
                name="desc"
                value={desc}
                maxLength={230}
                minLength={3}
                onChange={(e) => setDesc(e.target.value)}
                disabled={isSubmitting}
              />
              {/* Emoji Picker + Submit */}
              <div className="relative hidden lg:block">
                <Image
                  src="/emoji.png"
                  alt="Emoji"
                  width={20}
                  height={20}
                  className="w-5 h-5 cursor-pointer self-end"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute top-6 right-0 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <AddPostButton desc={desc} />
              </div>
              <div className="lg:hidden">
                <AddPostButton desc={desc} />
              </div>
            </form>

            {/* POST OPTIONS */}
            <div className="flex items-center gap-4 mt-4 dark:text-white text-gray-400 flex-wrap">
              <CldUploadWidget
                uploadPreset="anas_social"
                options={{
                  clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "mp4", "avi", "mov", "mkv", "webm"],
                  maxFileSize: 5 * 1024 * 1024,
                }}
                onSuccess={(result, { widget }) => {
                  setImg(result.info);
                  widget.close();
                }}
              >
                {({ open }) => (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => open()}
                  >
                    <Image src="/addimage.png" alt="Add Image" width={20} height={20} />
                    <button title="Add Media" type="button">media</button>
                  </div>
                )}
              </CldUploadWidget>

              {img && (
                <button
                  title="Remove Image"
                  type="button"
                  className="bg-red-500 px-1 rounded-full text-white cursor-pointer"
                  onClick={() => setImg(null)}
                >
                  &times;
                </button>
              )}

              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/poll.png" alt="Poll" width={20} height={20} />
                Poll
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/addevent.png" alt="Event" width={20} height={20} />
                Event
              </div>
              {desc.length}/230
            </div>
          </div>
        </div>}
      {data && data?.totalPosts < 1 && !username &&
        <div>
          <p className="text-gray-600 text-center font-medium text-xl">No Posts yet. make friends to see thier posts or switch to public.</p>
          <div className="flex justify-center gap-2">

            <Link href="/feed" className={`mr-2 ${filter === 'friends' ? 'text-blue-500' : 'text-gray-500'}`}>
              Friends
            </Link>
            <Link href="?filter=all" className={`${filter === 'all' ? 'text-blue-500' : 'text-gray-500'}`}>
              Public
            </Link>
          </div>
        </div>
      }
      {data && data?.totalPosts < 1 && username && <div>
        <p className="text-gray-600 text-center font-medium text-xl">No Posts.This user is yet to Post.</p>

      </div>}
      {isLoading ? <PostSkeletonList /> : <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={posts.length < totalPosts}
        loader={<div className='flex justify-center my-6'><Spinner h={40} w={40} /></div>}
      >

        {posts.map((post) => (
          <Post key={post.id} post={post} userId={session?.user?.id || ''} />
        ))}
      </InfiniteScroll>}
      <ShowCacheKeys />
    </>
  );
};

export default Feed;
const ShowCacheKeys = () => {
  const queryClient = useQueryClient();

  const getAllCacheKeys = () => {
    // Get all queries from the cache
    const queries = queryClient.getQueryCache().getAll();

    // Map through them to extract keys
    const queryKeys = queries.map(query => query.queryKey);
    toast.warning(JSON.stringify(queryKeys));
  };

  return (
    <div>
      <button onClick={getAllCacheKeys}>Show Cache Keys</button>
    </div>
  );
};

