"use client"

import { useEffect, useRef, useState } from "react"
import { IoIosArrowRoundUp } from "react-icons/io"

export default function ScrollArrow() {
  const [visible, setVisible] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const footer = document.querySelector(".site-footer")
    const checkScroll = () => {
      setVisible(window.scrollY >= 300)
      const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight
      const inset = Math.max(0, window.innerHeight - footerTop + 16)
      buttonRef.current?.style.setProperty("--footer-clearance", `${inset}px`)
    }
    checkScroll()
    window.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    const observer = new ResizeObserver(checkScroll)
    if (footer) observer.observe(footer)
    observer.observe(document.body)
    return () => {
      window.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      hidden={!visible}
      type="button"
      aria-label="맨 위로 이동"
      className="scroll-top-button fixed right-6 [bottom:max(24px,_calc(env(safe-area-inset-bottom)_+_16px),_var(--footer-clearance,_0px))] z-20 grid [place-items:center] w-11 h-11 rounded-[50%] bg-[#526b80] text-[white] text-[32px] [box-shadow:0_4px_12px_rgb(0_0_0_/_12%)] [transition:transform_150ms_ease,_background-color_150ms_ease,_box-shadow_150ms_ease] [&:hover]:bg-[#354f64] [&:hover]:[transform:translateY(-4px)] [&:hover]:[box-shadow:0_6px_16px_rgb(0_0_0_/_16%)] [&:focus-visible]:bg-[#354f64] [&:focus-visible]:[transform:translateY(-4px)] [&:focus-visible]:[box-shadow:0_6px_16px_rgb(0_0_0_/_16%)] [&:active]:[transform:translateY(-2px)] [&[hidden]]:hidden [@media(prefers-reduced-motion:_reduce)]:[transition:none] [@media(prefers-reduced-motion:_reduce)]:[&:hover]:[transform:none] [@media(prefers-reduced-motion:_reduce)]:[&:focus-visible]:[transform:none] [@media(prefers-reduced-motion:_reduce)]:[&:active]:[transform:none]"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        })
      }
    >
      <IoIosArrowRoundUp aria-hidden="true" />
    </button>
  )
}
