"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

import Badge from "@/components/Badge"

export default function ProjectLink({ title, stacks }: { title: string; stacks: string[] }) {
  const [applyClass, setApplyClass] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const elementRef = useRef<HTMLDivElement | null>(null) // 요소의 참조를 저장합니다.
  const timeoutRef = useRef<NodeJS.Timeout | null>(null) // 요소의 참조를 저장합니다.

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" })

  const checkVisibility = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

      setIsVisible(fullyVisible)
    }
  }

  useEffect(() => {
    if (isVisible && isTabletOrMobile) {
      if (!applyClass) {
        setApplyClass(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setApplyClass(false) // 1초 후 클래스 제거
        }, 1000)
      }
    }
  }, [applyClass, isTabletOrMobile, isVisible])

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility)
    window.addEventListener("resize", checkVisibility)
    checkVisibility() // 초기 로드 시에도 확인

    return () => {
      window.removeEventListener("scroll", checkVisibility)
      window.removeEventListener("resize", checkVisibility)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={elementRef}
      className={`absolute left-0 top-0 w-full h-full opacity-0 ${applyClass ? "opacity-100" : ""} group-hover:opacity-100 bg-gradient-to-tl from-main-theme to-main-theme/40 z-10 transition-all duration-500 text-white`}
    >
      <h3 className="absolute bottom-12 right-0 w-full px-8 max-md:px-6 text-right text-3xl max-xl:text-2xl leading-tight break-words">
        {title}
      </h3>
      <div className="absolute bottom-4 right-0 w-full px-7 max-md:px-5 flex gap-1 justify-end items-center flex-wrap">
        {stacks.map((value: string) => (
          <div key={value} className="h-6">
            <Badge name={value} />
          </div>
        ))}
      </div>
    </div>
  )
}
