
import * as React from "react"
import LoginForm from '@/components/auth/login-form'
import AuthLink from '@/components/AuthLink'
import { signIn } from "@/auth"
import { Metadata } from "next";
import { ForgetPassForm } from "@/components/auth/Forget-passwordForm";

export const metadata: Metadata = {
  title: "Anas Social | Login",
  description: "A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
  applicationName: "Anas' social Platform",
  authors: {
    url: 'https://anas3d.netlify.app/',
    name: "Anas Ahmed"
  },
  publisher: 'Anas Ahmed',
  creator: 'Anas ahmed',
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://anas-social.vercel.app",
    title: "Social Media App | Anas Ahmed",
    description: "A full-stack social media made with Nextjs, Neon PostgreSQl, Typescript, Cloudinary, clerk, Prisma and SSR streaming logic",
    siteName: "Anas Social",
    images: [{
      url: "/logo.png",
    }],
  }
};

export default async function LoginPage() {

  return (
    <div className="flex flex-col mt-14 sm:mt-8 h-screen items-center">
      <div className="sm:w-[400px]">
        <div className='pb-0'>
          <h1 className='text-2xl sm:text-3xl font-semibold dark:text-white'>Login</h1>
          <p className='text-[14px] sm:text-lg font-medium mt-2 dark:text-gray-300 text-gray-700'>Login with your account to continue.</p>
        </div>
        <div>
          <form
            action={async () => {
              "use server"
              await signIn('google')
            }}
          >
            <button title='Login with Google' className='w-full dark:text-white bg-white dark:bg-[#1b1b1b] justify-center border dark:border-gray-600 p-2 rounded-md flex items-center gap-4 mt-4 mb-2' >
              <img alt='google logo' height="24" width="24" id="google-logo" src="https://authjs.dev/img/providers/google.svg" />
              Log in with Google
            </button>
          </form>
          <div className="text-md text-zinc-400 flex justify-center">or</div>
          <LoginForm />
          <ForgetPassForm btnText='Forget Password?' />

        </div>
      </div>
      <AuthLink url='sign-up' title='No account yet? Go to sign-up page'>
        No account yet? <span className="font-semibold underline">Sign up</span>
      </AuthLink>
    </div>
  )
}