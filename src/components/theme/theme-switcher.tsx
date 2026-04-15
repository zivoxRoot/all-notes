"use client"

import { Check } from "lucide-react"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { useTheme } from "./theme-react"

type ThemeName = "system" | "dark" | "light"

export function ThemeSwitcher() {
  const { selected, setSelected } = useTheme()

  return (
    <>
      <DropdownMenuItem onClick={() => setSelected("light")}>
        <div className="flex w-full items-center justify-between">
          <span>Light</span>
          {selected == "light" && <Check />}
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelected("dark")}>
        <div className="flex w-full items-center justify-between">
          Dark
          {selected == "dark" && <Check />}
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelected("system")}>
        <div className="flex w-full items-center justify-between">
          System
          {selected == "system" && <Check />}
        </div>
      </DropdownMenuItem>
    </>
  )
}
