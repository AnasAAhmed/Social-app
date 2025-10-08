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

    const redirectUrl = searchParams.get("redirect_url") || "/login";
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
            className="space-y-4"
        >
            {/* hidden inputs */}
            <input
                className="hidden"
                id="token"
                type="text"
                name="token"
                defaultValue={token}
                required
            />
            <input
                className="hidden"
                id="userId"
                type="text"
                name="userId"
                defaultValue={userId}
                required
            />

            {/* password input */}
            <label
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                htmlFor="password"
            >
                New Password
            </label>
            <input
                className="peer block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
            />

            {/* confirm password input */}
            <label
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                htmlFor="cpassword"
            >
                Confirm Password
            </label>
            <input
                className="peer block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                id="cpassword"
                type="password"
                name="cpassword"
                placeholder="Enter confirm password"
                required
                minLength={6}
            />

            <ResetBtn />

            {result && result.type === 'success' && (
                <div className="bg-green-100 dark:bg-green-800/40 flex px-3 gap-3 items-center mt-4 py-3 w-full rounded-md">
                    <CheckCircleIcon className="text-green-600 dark:text-green-400" />
                    <p className="text-green-800 dark:text-green-300">
                        Password reset successful. You can close this tab.
                    </p>
                </div>
            )}
        </form>
    )
}
function ResetBtn() {
    const { pending } = useFormStatus()

    return (
        <button
            title="Click here to reset password"
            className="w-full flex justify-center py-2 rounded-md text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50 mt-4"
            aria-disabled={pending}
        >
            {pending ? <Loader className="animate-spin" /> : "Confirm"}
        </button>
    )
}
