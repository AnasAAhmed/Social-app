'use client'

import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { z } from 'zod'
import { getSession, useSession } from 'next-auth/react'
import { toast } from 'sonner'


export default function LoginForm() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") || "/";
  const router = useRouter();
  const [result, setResult] = useState<Result | null>({ type: '', resultCode: "" });

  async function authenticate(
    formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password');
    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6)
      })
      .safeParse({
        email,
        password
      })

    if (parsedCredentials.error) {
      toast.error(parsedCredentials.error.message);
    } else {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: parsedCredentials.data.email, password: parsedCredentials.data.password }),
        });

        const result = await response.json();

        setResult(result)
      } catch (error) {
        console.error('Error in authentication:', error);
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
    const decodedRedirectUrl = decodeURIComponent(redirectUrl);
    const redirectTo = decodedRedirectUrl;

    router.push(redirectTo);

  }
  return (
    <form action={(formData) => authenticate(formData)} className="space-y-4">
      <label
        className="block font-medium text-zinc-700 dark:text-zinc-300"
        htmlFor="email"
      >
        Email
      </label>
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className='flex justify-between items-center'>
        <label
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          htmlFor="password"
        >
          Password
        </label>
      </div>
      <input
        className="peer block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      />

      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      title='Click here to Login'
      className="w-full flex justify-center py-2 rounded-md text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
      aria-disabled={pending}
    >
      {pending ? <Loader className='animate-spin' /> : 'Log in'}
    </button>
  )
}