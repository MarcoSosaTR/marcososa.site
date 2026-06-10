import { Link, NavLink, Outlet } from 'react-router-dom'
import { scheduleScrollReset, ScrollToTop } from './ScrollToTop'

const navItems = [
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/technical-notes', label: 'Technical notes' },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'inline-flex min-h-10 shrink-0 items-center rounded-md px-3 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-white text-zinc-950'
      : 'text-zinc-300 hover:bg-white/10 hover:text-white',
  ].join(' ')
}

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <ScrollToTop />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-zinc-950/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
          <Link
            className="shrink-0 text-lg font-bold text-white transition hover:text-teal-200"
            onClick={() => {
              scheduleScrollReset()
            }}
            to="/"
          >
            Marco Sosa
          </Link>

          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                className={navLinkClass}
                key={item.to}
                onClick={() => {
                  scheduleScrollReset()
                }}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="min-h-screen pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-zinc-950 text-zinc-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-bold text-white">Marco Sosa</p>
            <p className="mt-2 max-w-xl text-sm leading-6">
              React and TypeScript portfolio focused on architecture,
              refactoring, server state, and maintainable frontend systems.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2 text-sm font-semibold">
            {navItems.map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                key={item.to}
                onClick={() => {
                  scheduleScrollReset()
                }}
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
