"use client"

import { useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useMediaQuery } from "react-responsive"

import ImageDetail from "@/containers/project/ImageDetail"
import ImageList from "@/containers/project/ImageList"

export default function ImageListContainer({ imageSrcList }: { imageSrcList: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolledToLeft, setIsScrolledToLeft] = useState(true)
  const [isScrolledToRight, setIsScrolledToRight] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [number, setNumber] = useState(0)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setIsScrolledToLeft(scrollLeft <= 0)
    setIsScrolledToRight(scrollLeft + clientWidth >= scrollWidth)
  }

  const scrollToLeft = () => {
    scrollRef.current?.scrollBy({ left: isTabletOrMobile ? -350 : -800, behavior: "smooth" })
  }

  const scrollToRight = () => {
    scrollRef.current?.scrollBy({ left: isTabletOrMobile ? 350 : 800, behavior: "smooth" })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll)
    checkScroll()
    return () => el.removeEventListener("scroll", checkScroll)
  }, [])

  const onClickImage = (index: number) => {
    setNumber(index)
    setIsOpen(true)
  }

  return (
    <div className="flex justify-center my-10 bg-neutral-200 relative h-[400px] max-lg:max-h-[200px] max-lg:h-[200px]">
      {!isScrolledToLeft && (
        <div className="absolute z-10 -left-7 max-lg:-left-4 top-0 bottom-0 flex items-center">
          <button
            type="button"
            aria-label="왼쪽 더보기"
            className="flex items-center justify-center bg-white rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] h-14 w-14 max-lg:h-10 max-lg:w-10 text-2xl max-lg:text-base"
            onClick={scrollToLeft}
          >
            <FaAngleLeft />
          </button>
        </div>
      )}
      <div className="flex gap-5 overflow-x-scroll hide-scroll-bar" ref={scrollRef}>
        <ImageList imageSrcList={imageSrcList} onClickImage={onClickImage} />
      </div>
      {!isScrolledToRight && (
        <div className="absolute z-10 -right-7 max-lg:-right-4 top-0 bottom-0 flex items-center">
          <button
            type="button"
            aria-label="오른쪽 더보기"
            className="flex items-center justify-center bg-white rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] h-14 w-14 max-lg:h-10 max-lg:w-10 text-2xl max-lg:text-base"
            onClick={scrollToRight}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
      {isOpen && (
        <ImageDetail
          srcList={imageSrcList}
          number={number}
          close={() => setIsOpen(false)}
          toLeft={() => setNumber(number - 1 < 0 ? 0 : number - 1)}
          toRight={() => setNumber(number + 1 > imageSrcList.length - 1 ? imageSrcList.length - 1 : number + 1)}
        />
      )}
    </div>
  )
}
