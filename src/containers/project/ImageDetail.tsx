"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
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

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    if (event.clientX - left < width / 2) toLeft()
    else toRight()
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement as HTMLElement | null
    dialog?.showModal()
    lockScroll()
    return () => {
      dialog?.close()
      openScroll()
      trigger?.focus()
    }
  }, [lockScroll, openScroll])

  return (
    <dialog
      ref={dialogRef}
      aria-label="프로젝트 이미지 확대"
      className="project-image-dialog fixed [inset:0] w-full h-dvh max-w-[none] max-h-[none] my-0 mx-0 py-0 px-0 [border:0] bg-transparent [&[open]]:flex [&[open]]:justify-center [&::backdrop]:[background:rgb(0_0_0_/_80%)]"
      onCancel={close}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          toLeft()
        }
        if (event.key === "ArrowRight") {
          event.preventDefault()
          toRight()
        }
      }}
    >
      <div className="w-full max-w-[1400px] flex flex-col items-center justify-between py-4">
        <div className="flex w-full justify-end pr-10 max-md:pr-5">
          <button
            type="button"
            aria-label="닫기"
            className="w-11 h-11 flex items-center justify-center"
            onClick={close}
          >
            <FaXmark className="text-white text-3xl" />
          </button>
        </div>

        <div className="px-5 h-[85%] flex items-center" role="presentation" onClick={handleClick}>
          <Image
            src={srcList[number]}
            alt={`프로젝트 화면 ${number + 1}`}
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
    </dialog>
  )
}
