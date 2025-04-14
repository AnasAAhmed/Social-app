'use client'

import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { ForgetPassForm } from './Forget-passwordForm'
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
    const redirectTo = decodedRedirectUrl === '/' ? '/feed' : decodedRedirectUrl;
    
    router.push(redirectTo);
    
  }
  return (
    <form
      action={(formData) => authenticate(formData)}
    >
      <label
        className="mb-3 block font-medium text-zinc-400"
        htmlFor="email"
      >
        Email
      </label>
      <div className="relative">
        <input
          className="peer block w-full valid:border-green-500 rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div className='mt-3 mb-1 flex justify-between items-center'>
        <label
          className="block text-xs font-medium text-zinc-400"
          htmlFor="password"
        >
          Password
        </label>
        <ForgetPassForm btnText='Forget Password?' />
      </div>
      <input
        className="peer valid:border-green-500 block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
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
      className="w-full flex justify-center py-2 bg-black text-white rounded-md hover:opacity-65 mt-4 text-center"
      aria-disabled={pending}
    >
      {pending ? <Loader className='animate-spin' /> : 'Log in'}
    </button>
  )
}
