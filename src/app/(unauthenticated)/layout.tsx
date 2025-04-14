import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner';
import { SessionProvider } from "next-auth/react";
import IsAuth from "@/components/isAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anas Social | (Home)",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider >
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <IsAuth />
          <div className="dark:bg-gray-800 bg-slate-100 pt-14 min-h-[100vh]">
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}