"use client"

import { useEffect, useState } from "react"
import { IoIosArrowRoundDown } from "react-icons/io"

export default function ScrollArrow() {
  const [atBottom, setAtBottom] = useState(false)

  const toggleScroll = () => {
    if (atBottom) {
      // 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // 최하단으로 스크롤
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
    }
  }

  const checkScroll = () => {
    if (
      document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - document.documentElement.scrollTop - 10
    ) {
      setAtBottom(true)
    } else {
      setAtBottom(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScroll)
    return () => window.removeEventListener("scroll", checkScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label={atBottom ? "맨 위로" : "맨 밑으로"}
      className={`fixed right-10 bottom-28 z-30 w-12 h-12 rounded-full drop-shadow bg-main-theme
          flex justify-center items-center  
          hover:bg-main-theme/70 ${atBottom ? "hover:-translate-y-1" : "hover:translate-y-1"} transition-all
          max-xl:right-7 max-xl:w-10 max-xl:h-10 max-lg:bottom-20 max-md:bottom-12`}
      onClick={toggleScroll}
    >
      <IoIosArrowRoundDown color="white" className={`text-4xl transition-all ${atBottom ? "rotate-180" : ""}`} />
    </button>
  )
}
