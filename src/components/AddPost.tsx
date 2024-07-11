'use client'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/action";
import { LoaderGif, Spinner } from "./Loader";
import dynamic from "next/dynamic";
import { EmojiClickData } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <div className="bg-white p-8 rounded-md shadow-md"><Spinner w={20} h={20} /></div>
});

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setImg('')
  }, [])

  const handleEmojiClick = (event: EmojiClickData) => {
    setDesc(prevDesc => prevDesc + event.emoji);
  };

  if (!isLoaded) {
    return <LoaderGif />;
  }
  if (!user?.id) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        <div className="mb-3 gap-2">
          {img?.secure_url ? (
            img?.secure_url.endsWith('.mp4') || img?.secure_url.endsWith('.webm') || img?.secure_url.endsWith('.ogg') ? (
              <video autoPlay controls src={img?.secure_url} className="rounded-md w-[300px] h-[300px]"></video>
            ) : (
              <>
                <Image src={img?.secure_url} className="rounded-md " alt="Uploaded Image" width={300} height={300} />
                {img && <span className="text-gray-900 text-center rounded-full cursor-pointer " onClick={() => setImg('')}>Remove</span>}
              </>
            )
          ) : (""
          )}
          {img && <span className="text-gray-900 text-center rounded-full cursor-pointer " onClick={() => setImg('')}>Remove</span>}
        </div>
        {/* TEXT INPUT */}
        <form action={(formData) => addPost(formData, img?.secure_url || "")} className="flex gap-4">
          <textarea
            placeholder={`What's on your mind, ${user?.username}?`}
            className="flex-1 w-5 bg-slate-100 rounded-lg p-2"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
                  open={showEmojiPicker}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <AddPostButton desc={desc} />
          </div>
          <div className="lg:hidden"><AddPostButton desc={desc} /></div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="anas_social"
            onSuccess={(result, { widget }) => {
              console.log(result);
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
          {img && <span className="bg-red-500 px-1 rounded-full text-white" onClick={() => setImg('')}>X</span>}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
