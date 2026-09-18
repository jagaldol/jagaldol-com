"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FiArrowUpRight } from "react-icons/fi"

import useBodyScrollLock from "@/hooks/useBodyScrollLock"

import styles from "./Header.module.css"

export default function Header() {
  const pathname = usePathname()
  const inProjects = pathname === "/projects" || pathname.startsWith("/projects/")
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { lockScroll, openScroll } = useBodyScrollLock()
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const toggle = toggleRef.current
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab") return
      const items = [toggle, ...Array.from(panel?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])].filter(
        Boolean,
      ) as HTMLElement[]
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    lockScroll()
    const desktop = window.matchMedia("(min-width: 701px)")
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", onResize)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      openScroll()
      desktop.removeEventListener("change", onResize)
      toggle?.focus()
    }
  }, [open, lockScroll, openScroll])
  const links = (
    <>
      <Link href="/#about" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>
        소개
      </Link>
      <Link
        href="/projects"
        aria-current={inProjects ? (pathname === "/projects" ? "page" : "location") : undefined}
        onClick={() => setOpen(false)}
      >
        프로젝트
      </Link>
      <a href="/resume" onClick={() => setOpen(false)}>
        이력서 <FiArrowUpRight aria-hidden="true" />
      </a>
      <a href="https://github.com/jagaldol" onClick={() => setOpen(false)}>
        GitHub <FiArrowUpRight aria-hidden="true" />
      </a>
      <a href="https://blog.jagaldol.com/" onClick={() => setOpen(false)}>
        블로그 <FiArrowUpRight aria-hidden="true" />
      </a>
    </>
  )
  return (
    <header className="site-header sticky top-0 z-30 bg-[#ffffff] [border-bottom:1px_solid_#e7ecef]">
      <div className="site-header-inner max-w-354 min-h-21 py-0 px-10 my-auto mx-auto flex items-center justify-between max-[701px]:min-h-17 max-[701px]:py-0 max-[701px]:px-[22px] max-[701px]:[&_>_.site-navigation]:hidden min-[1200px]:pl-12 min-[1200px]:pr-12">
        <Link
          href="/"
          className="site-brand text-[26px] tracking-[-0.03em] [&_span]:text-[#718c9e] max-[701px]:text-[23px]"
          onClick={() => setOpen(false)}
        >
          Jagaldol<span>.</span>
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle ${styles.toggle} ${open ? styles.open : ""}`}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.lines} aria-hidden="true" />
        </button>
        <nav
          className="site-navigation flex items-center gap-8 font-SUITRegular text-[15px] [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:min-h-11 [&_a:hover]:text-[#526b80] [&_a:hover]:underline [&_a[aria-current]]:text-[#273b4b] [&_a[aria-current]]:underline [&_a[aria-current]]:[text-decoration-thickness:2px] [&_a[aria-current]]:[text-underline-offset:7px]"
          aria-label="주 메뉴"
        >
          {links}
        </nav>
        <div
          className={`${styles.backdrop} ${open ? styles.open : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          id="mobile-navigation"
          className={`${styles.panel} ${open ? styles.open : ""}`}
          inert={!open}
          aria-hidden={!open}
        >
          <div className={styles.content}>
            <nav
              className="site-navigation flex items-center gap-8 font-SUITRegular text-[15px] [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:min-h-11 [&_a:hover]:text-[#526b80] [&_a:hover]:underline [&_a[aria-current]]:text-[#273b4b] [&_a[aria-current]]:underline [&_a[aria-current]]:[text-decoration-thickness:2px] [&_a[aria-current]]:[text-underline-offset:7px]"
              aria-label="모바일 주 메뉴"
            >
              {links}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
