'use client'

import { useEffect, useState } from "react"
import { Info } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Spinner } from "../Loader";
import Modal from "../Modal";

export function ForgetPassForm({ btnText }: { btnText: string }) {
  const [result, setResult] = useState<Result | null>({ type: '', resultCode: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendResetRequest = async () => {
    const parsed = z.object({ email: z.string().email() }).safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/reset-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast.error('An unexpected error occurred: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendResetRequest();
  };

  useEffect(() => {
    if (result?.type === 'error') {
      toast.error(result.resultCode);
    } else if (result?.type === 'succes') {
      toast.success(result.resultCode);
    }
  }, [result]);

  return (
    <div>
      <div className="flex justify-center mt-2">
        <button title="Click here for forget Password" onClick={() => setModalOpen(true)} type="button" className="px-0 self-center dark:text-white text-zinc-600">
          {btnText}
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} overLay={true}>
        <div className="bg-white dark:bg-black  p-5 rounded-md">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h1 className="text-heading4-bold text-[#111] dark:text-white">Forget password?</h1>
            <div className="text-sm text-gray-500">
              We will send you the email for password reset.
              {process.env.NODE_ENV === 'production' && (
                <div className="bg-yellow-200 flex px-3 gap-3 items-center mt-4 py-1 w-full rounded-md">
                  <Info />
                  <p className="text-primary">This feature is disabled in production.</p>
                </div>
              )}
            </div>
          </div>

          <label htmlFor="email" className="mt-4 mb-1 block text-sm font-medium text-zinc-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={process.env.NODE_ENV === 'production'}
            placeholder="Enter your email address"
            className="col-span-3 border w-full dark:bg-[#111] p-2 rounded-md focus:outline-none"
          />

          <button
            type="button"
            onClick={sendResetRequest}
            disabled={loading || process.env.NODE_ENV === 'production'}
            className="w-full flex justify-center py-2 mt-4 dark:bg-white bg-black dark:text-black text-white rounded-md hover:opacity-45"
          >
            {loading ? <Spinner /> : 'Send email request'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
