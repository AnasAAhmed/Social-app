"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "../Loader";

const ActionButton = ({text}:{text:string}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="text-red-500 dark:text-white w-full rounded-lg text-left disabled:cursor-not-allowed "
      disabled={pending}
    >
      {pending ? <Spinner/> : text}
    </button>
  );
};
export default ActionButton
