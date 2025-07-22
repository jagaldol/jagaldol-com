"use client"

import Image from "next/image"
import { useEffect } from "react"
import { FaAngleLeft, FaAngleRight, FaXmark } from "react-icons/fa6"

import useBodyScrollLock from "@/hooks/useBodyScrollLock"

export default function ImageDetail({
  srcList,
  number,
  close,
  toLeft,
  toRight,
}: {
  srcList: string[]
  number: number
  close: () => void
  toLeft: () => void
  toRight: () => void
}) {
  const { lockScroll, openScroll } = useBodyScrollLock()

  const handleLeftClick = () => {
    toLeft()
  }

  // 오른쪽 클릭 처리 함수
  const handleRightClick = () => {
    toRight()
  }

  // Div 클릭 이벤트 핸들러
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Div의 전체 너비와 클릭 위치를 가져옵니다.
    const target = event.target as HTMLDivElement
    const { width } = target.getBoundingClientRect()
    const { clientX } = event
    const clickX = clientX - target.offsetLeft // Div 내에서의 클릭 위치

    // 클릭 위치가 Div의 중간보다 왼쪽이면 왼쪽 클릭, 오른쪽이면 오른쪽 클릭으로 처리합니다.
    if (clickX < width / 2) {
      handleLeftClick()
    } else {
      handleRightClick()
    }
  }

  useEffect(() => {
    lockScroll()
    return () => {
      openScroll()
    }
  }, [lockScroll, openScroll])

  return (
    <div className="fixed z-[500] top-0 bottom-0 left-0 right-0 bg-black/80 flex justify-center">
      <div className="w-[1400px] flex flex-col items-center justify-between py-4">
        <div className="flex w-full justify-end pr-10 max-md:pr-5">
          <button type="button" aria-label="닫기" onClick={close}>
            <FaXmark className="text-white text-3xl" />
          </button>
        </div>

        <div className="px-5 h-[85%] flex items-center" role="presentation" onClick={handleClick}>
          <Image
            src={srcList[number]}
            alt={srcList[number]}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full flex-1 object-contain"
          />
        </div>

        <div className="flex items-center">
          <div className="mx-7 max-lg:mx-4">
            <button
              type="button"
              aria-label="왼쪽 더보기"
              className={`flex justify-center items-center bg-white rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] h-14 w-14 max-lg:h-10 max-lg:w-10 ${number > 0 ? "" : "invisible"}`}
              onClick={toLeft}
            >
              <FaAngleLeft className="text-3xl" />
            </button>
          </div>
          <p className="text-white text-xl w-32 text-center">
            {number + 1} / {srcList.length}
          </p>
          <div className="mx-7 max-lg:mx-4">
            <button
              type="button"
              aria-label="오른쪽 더보기"
              className={`flex justify-center items-center bg-white rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] h-14 w-14 max-lg:h-10 max-lg:w-10 ${number < srcList.length - 1 ? "" : "invisible"}`}
              onClick={toRight}
            >
              <FaAngleRight className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
