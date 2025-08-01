"use client"

import { useEffect, useRef } from "react"

import MobileNavLink from "@/components/nav/MobileNavLink"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"

function BackgroundNavbar({ navOutsideRef }: { navOutsideRef: React.Ref<HTMLDivElement> }) {
  const { lockScroll, openScroll } = useBodyScrollLock()

  useEffect(() => {
    lockScroll()
    return () => {
      openScroll()
    }
  }, [lockScroll, openScroll])

  return <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen z-40 bg-black/10" ref={navOutsideRef} />
}

export default function Navbar({ isNavOpen, close }: { isNavOpen: boolean; close: () => void }) {
  const navOutsideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 외부 클릭을 처리하는 함수
    function handleClickOutside(event: MouseEvent) {
      if (navOutsideRef.current && navOutsideRef.current.contains(event.target as Node)) {
        close()
      }
    }

    if (isNavOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [navOutsideRef, isNavOpen, close])

  useEffect(() => {
    const handleResize = () => {
      close()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [close])

  return (
    <div className="overflow-x-hidden">
      {isNavOpen ? <BackgroundNavbar navOutsideRef={navOutsideRef} /> : null}
      <nav
        className={`fixed right-0 top-0 bottom-0 z-50
        bg-bg w-72 h-screen px-5 py-32 flex flex-col items-center
        transition-all ${isNavOpen ? "translate-x-0" : "translate-x-[100%]"}`}
      >
        <div className="flex flex-col items-center gap-10">
          <MobileNavLink link="/" name="HOME" />
          <MobileNavLink link="/projects" name="PROJECT" />
          <a href="/files/resume.pdf" className="text-lg transition-all hover:text-main-theme duration-1000">
            RESUME
          </a>
          <a href="https://github.com/jagaldol" className="text-lg transition-all hover:text-main-theme duration-1000">
            GITHUB
          </a>
          <a href="https://blog.jagaldol.com/" className="text-lg transition-all hover:text-main-theme duration-1000">
            BLOG
          </a>
        </div>
      </nav>
    </div>
  )
}
