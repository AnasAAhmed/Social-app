import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Loader1, Spinner } from "@/components/Loader";

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-2 md:px-8 xl:px-32">
            <Navbar />
          </div>
          <div className=" bg-slate-100 md:px-8 xl:px-20">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}