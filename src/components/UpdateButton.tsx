"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "./Loader";

const UpdateButton = ({ state }: { state: { success: boolean; error: boolean; message: string; } }) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      {pending ? <Spinner /> : <>
        {state.success && <span className="text-green-500">{state.message}</span>}
        {state.error && <span className="text-red-500">{state.message}</span>}
      </>}
      <button
        className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending ? <Spinner /> : "Save"}
      </button>
    </div>

  );
};

export default UpdateButton;