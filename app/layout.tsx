import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import Script from 'next/script'

export const metadata = {
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default async function RootLayout({ children }: any) {

  return (
    <html lang="en" className="custom">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DHP5YNYXB8"></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DHP5YNYXB8');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>

      <body className="min-h-screen flex flex-1 flex-col gradient-background">
        <section>
          <Suspense fallback={<div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />}>
            <Navbar />
          </Suspense>
        </section>
        <main className="flex flex-col flex-1 items-center">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
