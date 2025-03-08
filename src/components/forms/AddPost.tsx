'use client'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "../AddPostButton";
import { addPost } from "@/lib/form.actions";
import { LoaderAddPost, Spinner } from "../Loader";
import dynamic from "next/dynamic";
import { EmojiClickData } from "emoji-picker-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <div className="bg-white p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmojiClick = (event: EmojiClickData) => {
    setDesc(prevDesc => prevDesc + event.emoji);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);
    try {
      await addPost(formData, img?.secure_url || "");
      setDesc("");
      setImg(null);
      setShowEmojiPicker(false);
      toast.success('Posted Successfully');
      router.refresh();
    } catch (error) {
      const typerror=error as Error;
      console.error("Failed to add post:", typerror.message);
      toast.error(`Failed to add post: ${typerror.message}`) 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <LoaderAddPost/>;
  }
  if (!user?.id) return "Current User Not Found /Clerk Webhook Failure";

  return (
    <div className="p-4 bg-white dark:bg-slate-900 shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        <div className="mb-3 gap-2 ">
          {img?.secure_url ? (
            img?.secure_url.endsWith('.mp4') || img?.secure_url.endsWith('.webm') || img?.secure_url.endsWith('.ogg') ? (
              <video autoPlay controls src={img?.secure_url} className="rounded-md w-[300px] h-[300px]"></video>
            ) : (
              <Image src={img?.secure_url} className="rounded-md" alt="Uploaded Image" width={300} height={300} />
            )
          ) : null}
        </div>
        {/* TEXT INPUT */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <textarea
            placeholder={`What's on your mind, ${user?.username}?`}
            className="flex-1 w-5 bg-slate-100 dark:text-gray-200 dark:bg-slate-800 rounded-lg p-2 disabled:opacity-35 disabled:cursor-not-allowed"
            name="desc"
            value={desc} maxLength={230} minLength={3}
            onChange={(e) => setDesc(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
          <div className="relative hidden lg:block">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
            {showEmojiPicker && (
              <div className="absolute top-6 right-0 z-10">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <AddPostButton desc={desc} />
          </div>
          <div className="lg:hidden"><AddPostButton desc={desc} /></div>
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
                <span>media</span>
              </div>
            )}
          </CldUploadWidget>
          {img && <span className="bg-red-500 px-1 rounded-full text-white cursor-pointer" onClick={() => setImg(null)}>&times;</span>}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>{desc.length}/230
        </div>
      </div>
    </div>
  );
};

export default AddPost;
