import { Link, useParams } from 'react-router-dom'
import { CodeExample } from '../components/CodeExample'
import {
  LinkButton,
  StatusBadge,
  TagList,
} from '../components/PortfolioSections'
import { caseStudies } from '../data/portfolio'
import { NotFoundPage } from './NotFoundPage'

export function CaseStudyDetailPage() {
  const { caseStudyId } = useParams()
  const caseStudy = caseStudies.find((item) => item.id === caseStudyId)

  if (!caseStudy?.details) {
    return <NotFoundPage />
  }

  const { details } = caseStudy

  return (
    <article className="mx-auto max-w-6xl px-5 py-14">
      <Link
        className="inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-900"
        to="/case-studies"
      >
        Back to case studies
      </Link>

      <header className="mt-6 max-w-4xl">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Case Study
        </p>
        <h1 className="mt-2 text-4xl font-bold leading-tight text-zinc-950 md:text-5xl">
          {caseStudy.title}
        </h1>

        {caseStudy.summary ? (
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            {caseStudy.summary}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={caseStudy.status} />
          <TagList tags={caseStudy.technologies} />
        </div>

        {caseStudy.liveDemoUrl ? (
          <div className="mt-8">
            <LinkButton href={caseStudy.liveDemoUrl} variant="primary">
              Open live demo
            </LinkButton>
          </div>
        ) : null}
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
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
      </section>

      <section className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-bold text-zinc-950">Overview</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-zinc-600">
          {details.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {details.architecture ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-zinc-950">
            Application Boundary
          </h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
              <thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3">App</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Port</th>
                  <th className="px-4 py-3">Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                {details.architecture.map((item) => (
                  <tr key={item.app}>
                    <td className="px-4 py-3 font-semibold text-zinc-950">
                      {item.app}
                    </td>
                    <td className="px-4 py-3">{item.role}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {item.port}
                    </td>
                    <td className="px-4 py-3">{item.responsibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {details.sections.map((section) => (
        <section className="mt-10" key={section.title}>
          <h2 className="text-2xl font-bold text-zinc-950">
            {section.title}
          </h2>
          <div className="mt-4 grid max-w-4xl gap-3 text-sm leading-6 text-zinc-600">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {section.bullets?.length ? (
            <ul className="mt-5 grid max-w-4xl gap-2 text-sm leading-6 text-zinc-700">
              {section.bullets.map((bullet) => (
                <li className="flex gap-3" key={bullet}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.codeExamples?.length ? (
            <div
              className={`mt-5 grid gap-4 ${
                section.codeExamples.length > 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              {section.codeExamples.map((example) => (
                <CodeExample
                  code={example.code}
                  key={example.label}
                  label={example.label}
                  language={example.language}
                />
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-950">
          Why this is a microfrontend
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {details.takeaways.map((takeaway) => (
            <li
              className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 shadow-sm"
              key={takeaway}
            >
              {takeaway}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
