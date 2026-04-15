import { parseThemeCookie } from "@/components/theme/theme"
import { ThemeProvider } from "@/components/theme/theme-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { headers } from "next/headers"
import QueryProvider from "./query-provider"

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const themeState = parseThemeCookie((await headers()).get("cookie"))

  return (
    <ThemeProvider {...themeState}>
      <SidebarProvider>
        <TooltipProvider>
          <QueryProvider>{children}</QueryProvider>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Providers
