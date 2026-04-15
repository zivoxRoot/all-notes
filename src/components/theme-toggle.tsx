"use client"

import { Check } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenuItem } from "./ui/dropdown-menu"

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <div className="flex items-center justify-between">
          <span>Light</span>
          <Check />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        System
      </DropdownMenuItem>
    </>
  )
}

export default ThemeToggle
