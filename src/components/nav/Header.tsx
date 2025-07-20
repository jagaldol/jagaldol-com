import Link from "next/link"

import MobileNavbar from "@/components/nav/MobileNavbar"
import Navigator from "@/components/nav/Navigator"

export default function Header() {
  return (
    <>
      <header className="w-full h-14 py-3 flex 2xl:justify-center max-md:px-0 bg-neutral-100/90 backdrop-blur sticky top-0 left-0 z-30">
        <div className="flex items-center w-[1600px] px-10 max-md:px-0">
          <div className="mx-10 flex-1 max-md:mx-5">
            <Link href="/" className="text-2xl max-md:text-xl">
              Jagaldol
            </Link>
          </div>
          <div className="hidden md:flex">
            <Navigator />
          </div>
        </div>
      </header>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </>
  )
}
