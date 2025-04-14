"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useActionState, useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/form.actions";
import FocusLock from "react-focus-lock";
import UpdateButton from "../UpdateButton";

type UpdateProfileState = {
  success: boolean;
  error: boolean;
  message: string;
};

const UpdateUser = (
  { user, isSetting }:
    { user: User | any, isSetting?: boolean }
) => {
  const router = useRouter();
  const [open, setOpen] = useState(isSetting || false);
  const [cover, setCover] = useState<any>('');
  const [avatar, setAvatar] = useState<any>('');
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

  const [state, formAction] = useActionState(updateProfile, { success: false, error: false, message: 'ss' } satisfies UpdateProfileState);


  const handleClose = () => {
    setOpen(false);
    if (state.success) {
      router.refresh();
    }
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
        <div className={isSetting ? "" : "fixed inset-0 w-screen px-6 bg-black bg-opacity-65 flex justify-center z-30 overflow-y-auto"}>
          <FocusLock disabled={isSetting} className={isSetting ? 'p-4 sm:p-6 dark:bg-slate-900 animate-modal rounded-lg flex flex-col gap-2 max-md:w-[100vw] w-[70vw] relative max-h-[90vh] oversflow-y-auto' : 'p-4 sm:p-6 bg-white top-6 dark:bg-slate-900 animate-modal rounded-lg shadow-md flex flex-col gap-2 w-full sm:w-3/4 lg:w-1/2 relative max-h-[90vh] overflow-y-auto'}>
            <form
              action={(formData) =>
                formAction({
                  formData,
                  cover: cover?.secure_url || user.cover || "/noCover.jpeg",
                  avatar: avatar?.secure_url || user.avatar || `https://ui-avatars.com/api/?name=${user.username}`,
                })
              }
            >
              <h1 className="text-lg dark:text-gray-200 sm:text-xl font-semibold">Update Profile</h1>
              <CldUploadWidget
                uploadPreset="anas_social"
                options={{
                  clientAllowedFormats: ["jpg", "jpeg", "png",'webp','avif'],
                  maxFileSize: 5 * 1024 * 1024,
                }}
                onSuccess={(result) => setAvatar(result.info)}
              >
                {({ open }) => (
                  <div
                    className="flex flex-col gap-2 sm:gap-4 my-2 sm:my-4 cursor-pointer"
                    onClick={() => open()}
                  >
                      <span className="text-sm text-gray-400">Note:you have relogin in order to update avatar in session/frontend if changed</span>
                    <div className="flex items-center gap-2">
                      <label className="dark:text-gray-200">Avatar Picture</label>
                      <img
                        src={user.avatar || "/noAvatar.png"}
                        alt="Avatar Picture"
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <button type="button" title="Change Avatar" className="text-xs underline dark:text-gray-200 text-gray-600">Change</button>
                    </div>
                  </div>
                )}
              </CldUploadWidget>
              {/* COVER PIC UPLOAD */}
              <CldUploadWidget
                uploadPreset="anas_social"
                options={{
                  clientAllowedFormats: ["jpg", "jpeg", "png",'webp','avif'],
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
                      <label className="dark:text-gray-200">Cover Picture</label>
                      <Image
                        src={user.cover || "/noCover.jpeg"}
                        alt="Cover Picture"
                        width={90}
                        height={32}
                        className="w-s12 h-s8 rounded-md object-cover"
                      />
                      <button  type="button" title="Change Cover" className="text-xs underline dark:text-gray-200 text-gray-600">Change</button>
                    </div>
                  </div>
                )}
              </CldUploadWidget>
              {avatar && (
                <div className="flex items-center gap-2">
                  <label className="dark:text-gray-200">Preview Avatar</label>
                  <img
                    src={avatar.secure_url}
                    alt="Avatar Preview"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span onClick={() => setAvatar('')} className="text-xs underline cursor-pointer dark:text-gray-200 text-gray-600">
                    Remove
                  </span>
                </div>
              )}
              {cover && (
                <div className="flex items-center gap-2">
                  <label className="dark:text-gray-200">Preview Cover</label>
                  <Image
                    src={cover.secure_url}
                    alt="Cover Preview"
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                  <span onClick={() => setCover('')} className="text-xs underline cursor-pointer dark:text-gray-200 text-gray-600">
                    Remove
                  </span>
                </div>
              )}
              {/* INPUT FIELDS */}
              <div className="grid dark:text-gray-200 grid-cols-2 justify-center gap-2 sm:gap-4">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="username" className="text-xs dark:text-gray-200 text-gray-500">Username*</label>
                  <input
                    type="text"
                    id="username"
                    placeholder={"Johndoe"}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="username"
                    required
                    defaultValue={user.username}
                    max={8}
                    minLength={3}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="name" className="text-xs dark:text-gray-200 text-gray-500">First Name</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={user.userInfo.name || ''}
                    placeholder={"John"}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="name"
                    max={8}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="surname" className="text-xs dark:text-gray-200 text-gray-500">Surname</label>
                  <input
                    type="text"
                    placeholder={"Doe"}
                    defaultValue={user.userInfo.surname || ""}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="surname"
                    id="surname"
                    max={8}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="city" className="text-xs dark:text-gray-200 text-gray-500">Country, City</label>
                  <input
                    type="text"
                    list="cities"
                    placeholder={"America, Chicago"}
                    defaultValue={user.userInfo.city || ""}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="city"
                    id="city"
                  />
                  <datalist id="cities">
                    <option value="Pakistan, Karachi">Pakistan, Karachi</option>
                    <option value="Pakistan, Islamabad">Pakistan, Islamabad</option>
                    <option value="Pakistan, Quetta">Pakistan, Quetta</option>
                    <option value="Pakistan, Peshawar">Pakistan, Peshawar</option>
                    <option value="Pakistan, Faislabad">Pakistan, Faislabad</option>
                    <option value="Pakistan, Lahore">Pakistan, Lahore</option>
                    <option value="Pakistan, Hunza">Pakistan, Hunza</option>
                    <option value="Pakistan, Jammu Kashmir">Pakistan, Jammu Kashmir</option>
                    <option value="USA, New York">USA, New York</option>
                    <option value="USA, Huston">USA, Huston</option>
                    <option value="USA, Dallas">USA, Dallas</option>
                    <option value="USA, Los Angeles">USA, Los Angeles</option>
                    <option value="UK, London">UK, London</option>
                    <option value="UK, Birmingham">UK, Birmingham</option>
                    <option value="UK, Manchester">UK, Manchester</option>
                    <option value="Canada, Toronto">Canada, Toronto</option>
                    <option value="Australia, Sydney">Australia, Sydney</option>
                    <option value="Germany, Berlin">Germany, Berlin</option>
                    <option value="France, Paris">France, Paris</option>
                    <option value="UAE, Dubai">UAE, Dubai</option>
                    <option value="UAE, Abu Dhabi">UAE, Abu Dhabi</option>
                    <option value="China, Beijing">China, Beijing</option>
                    <option value="Japan, Tokyo">Japan, Tokyo</option>
                    <option value="Brazil, São Paulo">Brazil, São Paulo</option>
                    <option value="South Africa, Johannesburg">South Africa, Johannesburg</option>
                    <option value="Russia, Moscow">Russia, Moscow</option>
                    <option value="Turkey, Istanbul">Turkey, Istanbul</option>
                  </datalist>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="school" className="text-xs dark:text-gray-200 text-gray-500">School</label>
                  <input
                    type="text"
                    placeholder={"MIT"}
                    defaultValue={user.userInfo.school || ""}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="school"
                    id="school"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="work" className="text-xs dark:text-gray-200 text-gray-500">Work</label>
                  <input
                    type="text"
                    placeholder={"Apple Inc."}
                    defaultValue={user.userInfo.work || ""}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    id="work"
                    name="work"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="website" className="text-xs dark:text-gray-200 text-gray-500">Social Link or Website</label>
                  <input
                    type="text"
                    placeholder={"https://your-domain.com"}
                    defaultValue={user.userInfo.website || ""}
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="website"
                    id="website"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <label htmlFor="dob" className="text-xs dark:text-gray-200 text-gray-500">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                    name="dob"
                    id="dob"
                    defaultValue={user.userInfo.dob ? new Date(user.userInfo.dob).toISOString().split('T')[0] : ""}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 my-4 sm:gap-4">
                <label htmlFor="description" className="text-xs dark:text-gray-200 text-gray-500">Description/Bio</label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  placeholder={"Life is beautiful..."}
                  defaultValue={user.userInfo.description || ""}
                  className="ring-1 dark:text-gray-200 dark:bg-slate-800 p-2 sm:p-[13px] rounded-md text-sm"
                  maxLength={255}
                >

                </textarea>
              </div>
              <UpdateButton state={state} />

              {!isSetting && <div
                className="absolute text-2xl dark:text-gray-200 right-3 top-4 cursor-pointer"
                onClick={handleClose}
              >
                &times;
              </div>}
            </form>
          </FocusLock >
        </div >
      )}
    </div >
  );
};


export default UpdateUser;