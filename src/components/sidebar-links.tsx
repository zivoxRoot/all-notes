"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Home, Trash2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarLinks = () => {
  const path = usePathname()

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={path == "/"}>
          <Link href={"/"}>
            <Home />
            Home
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={path == "/trash"}>
          <Link href={"/trash"}>
            <Trash2 />
            Trash
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  )
}

export default SidebarLinks
