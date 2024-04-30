import "@/styles/globals.css"
import { Metadata } from "next"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: "testing scroll snap",
    template: `%s - testing scroll snap`,
  },
  description: "2am coding sesh hits diff",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className="bg-black">
        <head />
        <body className={cn("h-fit bg-black font-sans antialiased overflow-clip", fontSans.variable)}>
          <div className="relative flex h-fit flex-col">
            <div className="flex-1 h-fit">{children}</div>
          </div>
          <TailwindIndicator />
        </body>
      </html>
    </>
  )
}
