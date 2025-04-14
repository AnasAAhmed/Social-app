'use client'

import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircleIcon, Loader } from 'lucide-react'
import { z } from 'zod'
import { getSession, useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function ResetForm({ token, userId }: { token: string, userId: string }) {
    const { data: session } = useSession();
    const searchParams = useSearchParams();

    const redirectUrl = searchParams.get("redirect_url") || "/";
    const router = useRouter();
    const [result, setResult] = useState<Result | null>({ type: '', resultCode: "" });

    async function resetPassword(
        formData: FormData) {
        const token = formData.get('token');
        const userId = formData.get('userId');
        const password = formData.get('password');
        const ConfirmPassword = formData.get('cpassword');

        const parsedCredentials = z
            .object({
                token: z.string().uuid(),
                userId: z.string().min(30, "Invalid userId"),
                password: z.string().min(6, "Password must be at least 8 characters long"),
                ConfirmPassword: z.string().min(6, "ConfirmPassword must be at least 8 characters long"),
            })
            .safeParse({
                token,
                userId,
                password,
                ConfirmPassword
            });


        if (parsedCredentials.error) {
            toast.error(parsedCredentials.error.message);
        } else {
            try {
                const response = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: parsedCredentials.data.token,
                        userId: parsedCredentials.data.userId,
                        ConfirmPassword: parsedCredentials.data.ConfirmPassword,
                        password: parsedCredentials.data.password
                    }),
                });

                const result = await response.json();

                setResult(result)
            } catch (error) {
                console.error('Error in resetPassword:', error);
                toast.error('An unexpected error occurred ' + (error as Error).message);
            }
        }
    }


    useEffect(() => {
        async function updateSession() {
        if (result && result.type) {
          if (result.type === 'error') {
            toast.error(result.resultCode)
          } else {
            toast.success(result.resultCode)
            await getSession(); 
          }
        }
      }
      updateSession();
      }, [result, router])

    if (session) {
        router.push(redirectUrl)
    }

    return (
        <form
            action={(formData: FormData) => resetPassword(formData)}
        >
            <input
                className="peer hidden w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="token"
                type="text"
                name="token"
                placeholder="Enter token from url"
                required
                defaultValue={token}
            />
            <input
                className="peer hidden w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="userId"
                type="text"
                name="userId"
                placeholder="Enter userId from url"
                required
                defaultValue={userId}
            />
            <label
                className="block text-xs font-medium my-3 text-zinc-400"
                htmlFor="password"
            >
                New Password
            </label>
            <input
                className="peer block w-full valid:border-green-500 rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
            />
            <label
                className="block text-xs font-medium my-3 text-zinc-400"
                htmlFor="cpassword"
            >
                Confirm Password
            </label>
            <input
                className="peer block w-full valid:border-green-500 rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="cpassword"
                type="password"
                name="cpassword"
                placeholder="Enter confirm password"
                required
                minLength={6}
            />
            <ResetBtn />
            {result && result.type === 'succes' && <div className="bg-green-200 flex px-3 gap-3 items-center mt-4 py-3 w-full rounded-md">
                <CheckCircleIcon />
                <p className="text-primary">
                    Password Reset successful you can close this tab.
                </p>
            </div>}
        </form>
    )
}

function ResetBtn() {
    const { pending } = useFormStatus()

    return (
        <button
            title='Click here to reset password'
            className="w-full flex justify-center py-2 bg-black text-white rounded-md hover:opacity-65 mt-4 text-center"
            aria-disabled={pending}
        >
            {pending ? <Loader className='animate-spin' /> : 'Confirm'}
        </button>
    )
}
