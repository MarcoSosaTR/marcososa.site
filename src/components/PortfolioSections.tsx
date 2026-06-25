import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type {
  CaseStudy,
  PortfolioStatus,
  Project,
  TechnicalNote,
} from '../data/portfolio'
import { CodeExample } from './CodeExample'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

const statusStyles: Record<PortfolioStatus, string> = {
  'Coming Soon': 'border-sky-200 bg-sky-50 text-sky-700',
  Completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'In Progress': 'border-amber-200 bg-amber-50 text-amber-700',
  Planned: 'border-zinc-200 bg-zinc-100 text-zinc-700',
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-sm font-semibold uppercase text-teal-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-zinc-950 md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-zinc-600">{description}</p>
    </div>
  )
}

export function StatusBadge({ status }: { status: PortfolioStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function LinkButton({
  href,
  children,
  variant = 'secondary',
}: {
  href?: string
  children: string
  variant?: 'primary' | 'secondary'
}) {
  const baseClasses =
    'inline-flex min-h-10 items-center justify-center rounded-md px-3.5 py-2 text-sm font-semibold transition'
  const variantClasses =
    variant === 'primary'
      ? 'bg-zinc-950 text-white hover:bg-zinc-800'
      : 'border border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50'
  const disabledClasses =
    'cursor-not-allowed border border-zinc-200 bg-zinc-100 text-zinc-400'

  if (!href) {
    return (
      <span className={`${baseClasses} ${disabledClasses}`} aria-disabled="true">
        {children}
      </span>
    )
  }

  const isInternalRoute = href.startsWith('/')

  if (isInternalRoute) {
    return (
      <Link className={`${baseClasses} ${variantClasses}`} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <a
      className={`${baseClasses} ${variantClasses}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-zinc-950">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-zinc-600">
        {project.description}
      </p>

      <div className="mt-5">
        <TagList tags={project.techStack} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <LinkButton href={project.liveDemoUrl}>Live demo</LinkButton>
        <LinkButton href={project.githubUrl}>GitHub</LinkButton>
        <LinkButton href={project.detailsUrl} variant="primary">
          View details
        </LinkButton>
      </div>
    </article>
  )
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-xl text-xl font-bold text-zinc-950">
          {caseStudy.title}
        </h3>
        <StatusBadge status={caseStudy.status} />
      </div>

      {caseStudy.summary ? (
        <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600">
          {caseStudy.summary}
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-rose-100 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-800">Problem</p>
          <p className="mt-2 text-sm leading-6 text-rose-950">
            {caseStudy.problem}
          </p>
        </div>
        <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-800">Improvement</p>
          <p className="mt-2 text-sm leading-6 text-teal-950">
            {caseStudy.improvement}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TagList tags={caseStudy.technologies} />
        <div className="flex flex-col gap-2 sm:flex-row">
          {caseStudy.liveDemoUrl ? (
            <LinkButton href={caseStudy.liveDemoUrl}>Live demo</LinkButton>
          ) : null}
          <LinkButton href={caseStudy.readMoreUrl} variant="primary">
            Read more
          </LinkButton>
        </div>
      </div>
    </article>
  )
}

export function TechnicalNoteCard({
  demo,
  note,
}: {
  demo?: ReactNode
  note: TechnicalNote
}) {
  return (
    <article
      className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm md:p-6"
      id={note.id}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-zinc-950">{note.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            {note.summary}
          </p>
        </div>
        {note.status ? <StatusBadge status={note.status} /> : null}
      </div>

      <div className="mt-5">
        <TagList tags={note.concepts} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-rose-100 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-800">Problem</p>
          <p className="mt-2 text-sm leading-6 text-rose-950">{note.problem}</p>
        </div>
        <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-800">Improvement</p>
          <p className="mt-2 text-sm leading-6 text-teal-950">
            {note.improvement}
          </p>
        </div>
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-800">Trade-off</p>
          <p className="mt-2 text-sm leading-6 text-indigo-950">
            {note.tradeoffs}
          </p>
        </div>
      </div>

      {note.explanation ? (
        <p className="mt-6 max-w-4xl text-sm leading-6 text-zinc-600">
          {note.explanation}
        </p>
      ) : null}

      {note.queryAdvantages?.length || note.cancellationNote ? (
        <section className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Why TanStack Query
          </p>

          {note.queryAdvantages?.length ? (
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {note.queryAdvantages.map((advantage) => (
                <li
                  className="rounded-md border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700"
                  key={advantage}
                >
                  {advantage}
                </li>
              ))}
            </ul>
          ) : null}

          {note.cancellationNote ? (
            <p className="mt-4 rounded-md border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
              {note.cancellationNote}
            </p>
          ) : null}
        </section>
      ) : null}

      {demo ? (
        <section className="mt-6">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Working example
          </p>
          <div className="mt-3">{demo}</div>
        </section>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CodeExample
          label="Before"
          code={note.beforeCode}
          emptyMessage="Before snippet placeholder: the useEffect fetching version will be added here."
        />
        <CodeExample
          label="After"
          code={note.afterCode}
          emptyMessage="After snippet placeholder: the TanStack Query version will be added here."
        />
      </div>
    </article>
  )
}
