"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileNavLink({ link, name }: { link: string; name: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`text-lg transition-all hover:text-main-theme duration-1000 ${pathname === link ? "text-main-theme" : ""}`}
      scroll={false}
    >
      {name}
    </Link>
  )
}
