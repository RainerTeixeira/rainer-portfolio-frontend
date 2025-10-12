import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SITE_CONFIG } from "@/constants"

export const metadata = {
  title: `${SITE_CONFIG.name} - Portfólio Profissional`,
  description: SITE_CONFIG.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col smooth-scroll">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
          <main className="flex-1 relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}