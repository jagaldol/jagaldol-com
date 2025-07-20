"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({ link, name }: { link: string; name: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`mx-3 text-lg transition-all hover:text-main-theme hover:-translate-y-[2px] duration-1000 ${pathname === link ? "text-main-theme -translate-y-[2px]" : ""}`}
      scroll={false}
    >
      {name}
    </Link>
  )
}
