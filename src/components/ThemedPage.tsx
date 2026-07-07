import type { ReactNode } from 'react'

export type PortfolioTheme = 'dark' | 'light'

export const portfolioPageTheme: PortfolioTheme = 'dark'

const themeClassByName: Record<PortfolioTheme, string> = {
  dark: 'dark',
  light: '',
}

export function ThemedPage({ children, theme }: {
  children: ReactNode
  theme: PortfolioTheme
}) {
  return (
    <div className={themeClassByName[theme]}>
      <section className="min-h-screen bg-[#f6f7f9] py-14 text-zinc-950 dark:bg-background dark:text-foreground">
        <div className="mx-auto max-w-6xl px-5">{children}</div>
      </section>
    </div>
  )
}
