"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "./Loader";

const AddPostButton = ({desc,text="Post"}:{desc:string,text?:string}) => {
  const { pending } = useFormStatus();

  return (
    <button
    title="Post"
      className="bg-blue-500 w-full text-white text-center p-1 mt-2 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending||desc===''}
    >
      {pending ? <Spinner w={21} h={21}/>: text}
    </button>
  );
};

export default AddPostButton
