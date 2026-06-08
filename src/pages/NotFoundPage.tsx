import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-sm font-semibold uppercase text-teal-700">404</p>
      <h1 className="mt-3 text-4xl font-bold text-zinc-950">Page not found</h1>
      <p className="mt-4 text-base leading-7 text-zinc-600">
        The portfolio route you requested does not exist yet.
      </p>
      <Link
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        to="/"
      >
        Back to home
      </Link>
    </section>
  )
}
