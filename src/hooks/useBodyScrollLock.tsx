import { useCallback, useRef } from "react"

export default function useBodyScrollLock() {
  const previous = useRef<{ overflow: string; paddingRight: string } | null>(null)
  const lockScroll = useCallback(() => {
    if (previous.current) return
    const body = document.body
    previous.current = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    const width = window.innerWidth - document.documentElement.clientWidth
    const padding = parseFloat(getComputedStyle(body).paddingRight)
    body.style.paddingRight = `${padding + width}px`
    body.style.overflow = "hidden"
  }, [])
  const openScroll = useCallback(() => {
    if (!previous.current) return
    Object.assign(document.body.style, previous.current)
    previous.current = null
  }, [])
  return { lockScroll, openScroll }
}
