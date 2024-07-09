"use client";

import { updateProfile } from "@/lib/action";
import { User } from "@prisma/client";
import Image from "next/image";
import { useActionState, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./rightMenu/UpdateButton";
import Link from "next/link";

const UpdateUser = ({ user, isSetting }: { user: User|any, isSetting?: boolean }) => {
  const [open, setOpen] = useState(isSetting || false);
  const [cover, setCover] = useState<any>(false);

  const [state, formAction] = useActionState(updateProfile, { success: false, error: false });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      {!isSetting &&
        <span
          className="text-blue-500 text-xs cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Update
        </span>}
      {open && (
        <div className={`${isSetting ? "" : "fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 "} flex items-center justify-center z-50 `}>
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-6 animate-modal bg-white rounded-lg shadow-md flex flex-col gap-2 w-full xl:w-1/2 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <Link href={"/settings/#profile"} className="mt-4 text-xs text-blue-500 underline">
              Go to &gt;settings&gt;#profile to change username or avatar.
            </Link>
            OR
            <div className="text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>
            {/* COVER PIC UPLOAD */}
            <CldUploadWidget
              uploadPreset="anas_social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <label htmlFor="">Cover Picture</label>
                      <Image
                        src={user.cover || "/noCover.jpeg"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                    {cover === '' && <div className="flex items-center gap-2 cursor-pointer">
                      <label htmlFor="">Preview</label>
                      <Image
                        src={cover}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                    </div>}
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* WRAPPER */}
            <div className="flex flex-wrap justify-center gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="surname"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>
              {/* INPUT */}

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "https://your-domian.com"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Date-of-birth: {user.dob ? new Date(user.dob).toISOString().split('T')[0] : "null"}
                </label>
                <input
                  type="date"
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="dob"
                />
              </div>
            </div>
            <UpdateButton />
            {state.success && (
              <span className="text-green-500">Profile has been updated!</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong!</span>
            )}
            {!isSetting && <div
              className="absolute text-xl right-3 top-4 cursor-pointer"
              onClick={handleClose}
            >
              <Image
                src={"/cross.png"}
                alt=""
                width={5}
                height={5}
                className="w-5 h-5 rounded-md objecst-cover"
              />
            </div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;