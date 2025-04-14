'use client'

import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { z } from 'zod'
import { getSession, useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function SignupForm() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") || "/";
  const router = useRouter();
  const [result, setResult] = useState<Result | null>({ type: '', resultCode: "" });

  async function signUp(
    formData: FormData) {
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password');
    const parsedCredentials = z
      .object({
        email: z.string().email(),
        username: z
          .string()
          .min(3)
          .regex(/^[a-z0-9]+$/, {
            message: "Username must be lowercase, no spaces, and no symbols.",
          }),
        password: z.string().min(6)
      })
      .safeParse({
        username,
        email,
        password
      })

    if (parsedCredentials.error) {
      toast.error(parsedCredentials.error.message);
    } else {
      try {
        const response = await fetch('/api/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: parsedCredentials.data.username, email: parsedCredentials.data.email, password: parsedCredentials.data.password }),
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
    const redirectTo = decodedRedirectUrl === '/' ? '/feed' : decodedRedirectUrl;

    router.push(redirectTo);

  }
  return (
    <form
      action={(formData) => signUp(formData)}
    >
      <label
        className="mb-3 block text-xs font-medium text-zinc-400"
        htmlFor="username"
      >
        Username
      </label>

      <input
        className="peer block w-full valid:border-green-500 rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
        id="username"
        type="text"
        name="username"
        placeholder="Enter your username"
        required
      />
      <label
        className="mb-3 mt-5  block text-xs font-medium text-zinc-400"
        htmlFor="email"
      >
        Email
      </label>

      <input
        className="peer block w-full valid:border-green-500 rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
      />
      <label
        className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
        htmlFor="password"
      >
        Password
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
      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      title='Click here to Sign-up'
      className="w-full flex justify-center py-2 bg-black text-white rounded-md hover:opacity-65 mt-4 text-center"
      aria-disabled={pending}
    >
      {pending ? <Loader className='animate-spin' /> : 'Sign up'}
    </button>
  )
}
