import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner';
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/lib/QueryProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anas Social | (Feed)",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <script dangerouslySetInnerHTML={{
              __html: `
            (function() {
              const theme = localStorage.getItem('theme')
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `
            }} />
          </head>
          <body className={inter.className}>
          <NextTopLoader/>
            <Navbar />
            {/* <CreateUser /> */}
            <div className="dark:bg-black bg-slate-100 md:px-8 xl:px-20 pt-20 min-h-[100vh]">
              {children}
              <Toaster />
            </div>
          </body>
        </html>
      </ReactQueryProvider>
    </SessionProvider>
  );
}