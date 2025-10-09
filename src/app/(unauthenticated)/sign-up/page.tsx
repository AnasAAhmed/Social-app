import SignupForm from '@/components/auth/signup-form'
import { signIn } from "@/auth"
import AuthLink from "@/components/AuthLink"
import { Metadata } from "next";
import { LoaderGif } from "@/components/Loader";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Anas Social | Sign-up",
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

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  return (
    <Suspense fallback={<LoaderGif />}>

      <div className="flex flex-col mt-14 sm:mt-12 h-screen items-center">

        <div className="sm:w-[400px]">
          <div className='pb-0'>
            <h1 className='text-2xl sm:text-3xl font-semibold dark:text-white'>Sign-up</h1>
            <p className='text-[14px] sm:text-lg font-medium mt-2 dark:text-gray-300 text-gray-700'>Sign-up to create new account.</p>
          </div>
          <div>
            <form
              action={async () => {
                "use server"
                await signIn('google')
              }}
            >
              <button title='Login with Google' className='w-full dark:text-white bg-white dark:bg-[#1b1b1b] justify-center border dark:border-gray-600 p-2 rounded-md flex items-center gap-4 mt-4 mb-2' >              <img alt='google logo' height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg" />
                Sign up with Google
              </button>
            </form>
            <div className="text-md text-zinc-400 flex justify-center">or</div>
            <SignupForm />
          </div>
        </div>
        <AuthLink url='login' title='No account yet? Go to login page'>
          Already have an account? <span className="font-semibold underline">Login</span>
        </AuthLink>
      </div>
    </Suspense>

  )
}