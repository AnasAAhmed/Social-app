"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useActionState, useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "../rightMenu/UpdateButton";
import Link from "next/link";
import { updateProfile } from "@/lib/form.actions";
import FocusLock from "react-focus-lock";

const UpdateUser = ({ user, isSetting }: { user: User | any, isSetting?: boolean }) => {
  const [open, setOpen] = useState(isSetting || false);
  const [cover, setCover] = useState<any>('');
  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const [state, formAction] = useActionState(updateProfile, { success: false, error: false });

  const router = useRouter();


  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      {!isSetting && (
        <span
          className="text-blue-500 text-xs cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Update
        </span>
      )}
      {open && (
        <div className={`${isSetting ? "" : "fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-30"}`}>
          <FocusLock className="p-4 sm:p-6 bg-white animate-modal rounded-lg shadow-md flex flex-col gap-2 max-md:h-full scrollbar-hide overflow-scroll w-full sm:w-3/4 lg:w-1/2 relative">
            <form
              action={(formData) =>
                formAction({ formData, cover: cover?.secure_url || "" })
              }
            >
              {/* TITLE */}
              <h1 className="text-lg sm:text-xl font-semibold">Update Profile</h1>
              <Link href="/settings/#profile" className="mt-2 sm:mt-4 text-xs text-blue-500 underline">
                Go to &gt;settings&gt;#profile to change username or avatar.
              </Link>
              <div className="text-xs text-gray-500">
                OR Use the navbar profile to change the avatar or username.
              </div>
              {/* COVER PIC UPLOAD */}
              <CldUploadWidget
                uploadPreset="anas_social"
                options={{
                  clientAllowedFormats: ["jpg", "jpeg", "png"],
                  maxFileSize: 5 * 1024 * 1024,
                }}
                onSuccess={(result) => setCover(result.info)}
              >
                {({ open }) => (
                  <div
                    className="flex flex-col gap-2 sm:gap-4 my-2 sm:my-4 cursor-pointer"
                    onClick={() => open()}
                  >
                    <div className="flex items-center gap-2">
                      <label>Cover Picture</label>
                      <Image
                        src={user.cover || "/noCover.jpeg"}
                        alt="Cover Picture"
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">Change</span>
                    </div>
                  </div>
                )}
              </CldUploadWidget>
              {cover && (
                <div className="flex items-center gap-2">
                  <label>Preview</label>
                  <Image
                    src={cover.secure_url}
                    alt="Cover Preview"
                    width={48}
                    height={32}
                    className="w-12 h-8 rounded-md object-cover"
                  />
                  <span onClick={() => setCover('')} className="text-xs underline cursor-pointer text-gray-600">
                    Remove
                  </span>
                </div>
              )}
              {/* INPUT FIELDS */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="name" className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    placeholder={user.name || "John"}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="name"
                    max={8}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="surname" className="text-xs text-gray-500">Surname</label>
                  <input
                    type="text"
                    placeholder={user.surname || "Doe"}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="surname"
                    max={8}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="description" className="text-xs text-gray-500">Description</label>
                  <input
                    type="text"
                    placeholder={user.description || "Life is beautiful..."}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="description"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="city" className="text-xs text-gray-500">City</label>
                  <input
                    type="text"
                    placeholder={user.city || "New York"}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="city"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="school" className="text-xs text-gray-500">School</label>
                  <input
                    type="text"
                    placeholder={user.school || "MIT"}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="school"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="work" className="text-xs text-gray-500">Work</label>
                  <input
                    type="text"
                    placeholder={user.work || "Apple Inc."}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="work"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="website" className="text-xs text-gray-500">Website</label>
                  <input
                    type="text"
                    placeholder={user.website || "https://your-domain.com"}
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
                    name="website"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="dob" className="text-xs text-gray-500">
                    Date of Birth: {user.dob ? new Date(user.dob).toISOString().split('T')[0] : "null"}
                  </label>
                  <input
                    type="date"
                    className="ring-1 ring-gray-300 p-2 sm:p-[13px] rounded-md text-sm"
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
              {!isSetting && (
                <div
                  className="absolute text-xl right-3 top-4 cursor-pointer"
                  onClick={handleClose}
                >
                  <Image
                    src="/cross.png"
                    alt="Close"
                    width={5}
                    height={5}
                    className="w-5 h-5 rounded-md object-cover"
                  />
                </div>
              )}
            </form>
          </FocusLock>
        </div>
      )}
    </div>
  );
};


export default UpdateUser;