import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="dark:bg-gray-800 bg-slate-100 md:px-8 xl:px-20 pt-20 min-h-[100vh]">
            {children}
          <Analytics />
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}