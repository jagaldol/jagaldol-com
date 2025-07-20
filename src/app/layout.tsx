import type { Metadata } from "next"
import "@/styles/globals.css"
import Link from "next/link"
import { ReactNode } from "react"
import { FaBlog, FaGithub, FaRegEnvelope } from "react-icons/fa"

import Header from "@/components/nav/Header"
import ScrollArrow from "@/components/ScrollArrow"

export const metadata: Metadata = {
  title: "AI Engineer | Hyejun An",
  description: "AI 엔지니어 안혜준의 포트폴리오 사이트입니다.",
  openGraph: {
    title: "AI Engineer | Hyejun An",
    description: "AI 엔지니어 안혜준의 포트폴리오 사이트입니다.",
    url: "https://jagaldol.com",
    siteName: "jagaldol.com",
    images: [
      {
        url: "https://jagaldol.com/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Hyejun An Profile Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer | Hyejun An",
    description: "AI 엔지니어 안혜준의 포트폴리오 사이트입니다.",
    images: ["https://jagaldol.com/images/profile.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="absolute top-0 left-0 w-full h-auto min-h-screen">
          <Header />
          <ScrollArrow />

          <main className="px-5 pb-40">{children}</main>

          <footer className="absolute bottom-0 left-0 flex items-center w-full h-16 px-20 bg-white max-md:h-10 max-sm:px-10">
            <div className="flex-1 ">
              <Link href="/" className="flex-1 underline">
                &copy;Hyejun An.
              </Link>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-xs">Contact.</p>
              <a href="mailto:jagaldol.dev@gmail.com" aria-label="이메일">
                <FaRegEnvelope />
              </a>
              <a href="https://github.com/jagaldol" aria-label="깃허브">
                <FaGithub />
              </a>
              <a href="https://blog.jagaldol.com/" aria-label="블로그">
                <FaBlog />
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
