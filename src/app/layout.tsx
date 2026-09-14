import "@/styles/globals.css"

import type { Metadata } from "next"
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
        url: "https://jagaldol.com/profile.png",
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
    images: ["https://jagaldol.com/profile.png"],
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
        <div className="site-shell min-h-screen flex flex-col">
          <a
            href="#main-content"
            className="skip-link fixed top-[-100px] left-5 z-100 [background:white] py-3 px-5 [&:focus]:top-3"
          >
            본문으로 건너뛰기
          </a>
          <Header />

          <main id="main-content" className="site-main overflow-x-clip flex-1 min-w-0">
            {children}
          </main>

          <footer className="site-footer flex items-center justify-between gap-6 [padding:24px_max(40px,_calc((100vw_-_1320px)_/_2))] [border-top:1px_solid_#e2e8ec] text-[#586c7a] text-[13px] [&_a]:inline-flex [&_a]:items-center [&_a]:min-h-8 max-[701px]:py-5 max-[701px]:px-[22px]">
            <div className="flex-1 ">
              <Link href="/" className="flex-1 underline">
                &copy;Hyejun An.
              </Link>
            </div>

            <div className="flex items-center gap-2">
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
          <ScrollArrow />
        </div>
      </body>
    </html>
  )
}
