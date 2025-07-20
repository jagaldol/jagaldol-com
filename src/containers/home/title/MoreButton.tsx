"use client"

import { IoIosArrowRoundDown } from "react-icons/io"

export default function MoreButton() {
  const scrollDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement

    window.scrollBy({
      top: button.getBoundingClientRect().bottom + 40,
      behavior: "smooth",
    })
  }
  return (
    <button
      type="button"
      className="flex flex-col justify-center items-center animate-moveUpDown hover:cursor-pointer"
      onClick={scrollDown}
    >
      <p className="pb-1">더보기</p>
      <IoIosArrowRoundDown className="text-4xl" />
    </button>
  )
}
