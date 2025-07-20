"use client"

import { useState } from "react"

import Navbar from "@/components/nav/Navbar"
import NavToggleButton from "@/components/nav/NavToggleButton"

export default function MobileNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <>
      <NavToggleButton isOpen={isNavOpen} toggle={() => setIsNavOpen(!isNavOpen)} />
      <Navbar isNavOpen={isNavOpen} close={() => setIsNavOpen(false)} />
    </>
  )
}
