import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  caseStudies,
  fullProjects,
  profile,
  technicalNotes,
} from '../data/portfolio'

const sectionLinks = [
  {
    to: '/projects',
    title: 'Full Projects',
    description:
      'Complete applications with demo, repository, details, stack, and status support.',
    count: fullProjects.length,
  },
  {
    to: '/case-studies',
    title: 'Case Studies',
    description:
      'Longer engineering explanations for architecture, refactoring, and trade-offs.',
    count: caseStudies.length,
  },
  {
    to: '/technical-notes',
    title: 'Technical Notes',
    description:
      'Focused before/after examples, snippets, and small practical React decisions.',
    count: technicalNotes.length,
  },
]

const technicalNoteTechnologies = new Set([
  'React Hook Form',
  'TanStack Form',
  'TanStack Query',
  'TypeScript',
  'Zod',
])

const preferredTechnologyOrder = [
  'React',
  'TypeScript',
  'TanStack Query',
  'TanStack Form',
  'React Hook Form',
  'Zod',
  'Vite',
  'Jest',
  'Testing Library',
  'Webpack Module Federation',
  'Cloudflare',
]

const discoveredPortfolioTechnologies = new Set([
  ...fullProjects.flatMap((project) => project.techStack),
  ...caseStudies.flatMap((caseStudy) => caseStudy.technologies),
  ...technicalNotes.flatMap((note) =>
    note.concepts.filter((concept) => technicalNoteTechnologies.has(concept)),
  ),
])

const portfolioTechnologies = [
  ...preferredTechnologyOrder.filter((technology) =>
    discoveredPortfolioTechnologies.has(technology),
  ),
  ...Array.from(discoveredPortfolioTechnologies)
    .filter((technology) => !preferredTechnologyOrder.includes(technology))
    .sort((firstTechnology, secondTechnology) =>
      firstTechnology.localeCompare(secondTechnology),
    ),
]

export function HomePage() {
  useEffect(() => {
    if (!profile.hoverPhotoUrl) {
      return
    }

    const hoverImage = new Image()
    hoverImage.src = profile.hoverPhotoUrl
  }, [])

  return (
    <>
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-300">
              React + TypeScript portfolio
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-semibold text-zinc-100">
              {profile.role}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              {profile.focus}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
                to="/projects"
              >
                View projects
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                to="/technical-notes"
              >
                Review technical notes
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                to="/resume"
              >
                Resume storyline
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-sm">
            <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
              {profile.photoUrl ? (
                <>
                  <img
                    alt={`${profile.name} profile`}
                    className="max-h-[560px] w-full object-contain transition duration-300 group-hover:opacity-0"
                    decoding="async"
                    loading="eager"
                    src={profile.photoUrl}
                  />
                  {profile.hoverPhotoUrl ? (
                    <img
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0 transition duration-300 group-hover:opacity-100"
                      decoding="async"
                      loading="eager"
                      src={profile.hoverPhotoUrl}
                    />
                  ) : null}
                </>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-zinc-900 text-6xl font-bold text-teal-200">
                  {profile.initials}
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border border-white/10 bg-zinc-900 p-4">
                <p className="text-zinc-400">Server state</p>
                <p className="mt-2 font-semibold text-teal-300">
                  TanStack Query
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-zinc-900 p-4">
                <p className="text-zinc-400">UI state</p>
                <p className="mt-2 font-semibold text-amber-300">
                  explicit flows
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Portfolio routes
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950 md:text-4xl">
            Choose the area you want to review.
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Explore the portfolio by section. Each area focuses on a different part of my React work, from complete applications to architecture case studies and focused technical notes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {sectionLinks.map((section) => (
            <Link
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              key={section.to}
              to={section.to}
            >
              <p className="text-sm font-semibold text-teal-700">
                {section.count} prepared
              </p>
              <h3 className="mt-3 text-xl font-bold text-zinc-950">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {section.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-8">
          <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">
                Portfolio stack
              </p>
              <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                Technologies represented across the work.
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {portfolioTechnologies.map((technology) => (
                <span
                  className="inline-flex min-h-9 items-center rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-teal-300 hover:text-zinc-950"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
