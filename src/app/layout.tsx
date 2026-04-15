import { Geist, Geist_Mono } from "next/font/google"

import AppSidebar from "@/components/app-sidebar"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"
import Script from "next/script"
import {
  parseThemeCookie,
  registerTheme,
  themeScript,
} from "../components/theme/theme"
import "./globals.css"
import Providers from "./providers"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeState = parseThemeCookie((await headers()).get("cookie"))

  return (
    <html
      lang="en"
      suppressHydrationWarning
      {...registerTheme(themeState)}
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <Script id="ssr-themes" strategy="beforeInteractive">
          {themeScript()}
        </Script>
      </head>
      <body>
        <Providers>
          <AppSidebar />
          <div className="flex w-full justify-center">
            <div className="flex w-200 flex-col gap-4 p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
