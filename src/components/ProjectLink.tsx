"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

import Badge from "@/components/Badge"

export default function ProjectLink({ title, stacks }: { title: string; stacks: string[] }) {
  const [applyClass, setApplyClass] = useState(false)

  const elementRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" })

  useEffect(() => {
    const element = elementRef.current
    if (!element || !isTabletOrMobile) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 1) {
          return
        }

        setApplyClass(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setApplyClass(false)
          timeoutRef.current = null
        }, 1000)
      },
      { threshold: 1 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isTabletOrMobile])

  return (
    <div
      ref={elementRef}
      className={`absolute left-0 top-0 w-full h-full opacity-0 ${isTabletOrMobile && applyClass ? "opacity-100" : ""} group-hover:opacity-100 bg-gradient-to-tl from-main-theme to-main-theme/40 z-10 transition-all duration-500 text-white`}
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
