import {
  SectionHeader,
  TechnicalNoteCard,
} from '../components/PortfolioSections'
import { TodoList } from '../components/TodoList'
import { technicalNotes } from '../data/portfolio'

export function TechnicalNotesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <SectionHeader
        eyebrow="Technical Notes / Code Snippets"
        title="Focused before/after examples for practical React decisions."
        description="Technical notes collect focused refactors, code snippets, and implementation patterns in a format that is easy to scan and expand."
      />

      <nav
        aria-label="Technical notes index"
        className="mb-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase text-teal-700">
          On this page
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {technicalNotes.map((note) => (
            <a
              className="rounded-md border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300 hover:bg-white"
              href={`#${note.id}`}
              key={note.id}
            >
              <span className="text-sm font-semibold text-zinc-950">
                {note.title}
              </span>
              <span className="mt-2 block text-sm leading-6 text-zinc-600">
                {note.summary}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="grid gap-5">
        {technicalNotes.map((note) => {
          const demo =
            note.id === 'todo-useeffect-to-tanstack-query' ? (
              <TodoList />
            ) : undefined

          return <TechnicalNoteCard demo={demo} key={note.id} note={note} />
        })}
      </div>
    </section>
  )
}
