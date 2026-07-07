import {
  SectionHeader,
  TechnicalNoteCard,
} from '../components/PortfolioSections'
import { ReactHookFormDemo } from '../components/ReactHookFormDemo'
import { TanStackFormDemo } from '../components/TanStackFormDemo'
import { portfolioPageTheme, ThemedPage } from '../components/ThemedPage'
import { TodoList } from '../components/TodoList'
import { technicalNotes } from '../data/portfolio'

function getTechnicalNoteDemo(noteId: string) {
  if (noteId === 'todo-useeffect-to-tanstack-query') {
    return <TodoList />
  }

  if (noteId === 'react-hook-form-project-inquiry') {
    return <ReactHookFormDemo />
  }

  if (noteId === 'tanstack-form-enterprise-project-brief') {
    return <TanStackFormDemo />
  }

  return undefined
}

export function TechnicalNotesPage() {
  return (
    <ThemedPage theme={portfolioPageTheme}>
      <SectionHeader
        eyebrow="Technical Notes / Code Snippets"
        title="Focused before/after examples for practical React decisions."
        description="Technical notes collect focused refactors, code snippets, and implementation patterns in a format that is easy to scan and expand."
      />

      <nav
        aria-label="Technical notes index"
        className="mb-6 rounded-lg border border-zinc-200 bg-stone-100 p-5 shadow-sm dark:border-muted/20 dark:bg-surface dark:shadow-none"
      >
        <p className="text-sm font-semibold uppercase text-teal-700 dark:text-accent">
          On this page
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {technicalNotes.map((note) => (
            <a
              className="rounded-md border border-zinc-200 bg-stone-200 p-4 transition hover:border-zinc-300 hover:bg-stone-100 dark:border-muted/20 dark:bg-background/70 dark:hover:border-primary/50 dark:hover:bg-primary/10"
              href={`#${note.id}`}
              key={note.id}
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-foreground">
                {note.title}
              </span>
              <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-muted">
                {note.summary}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="grid gap-5">
        {technicalNotes.map((note) => {
          const demo = getTechnicalNoteDemo(note.id)

          return <TechnicalNoteCard demo={demo} key={note.id} note={note} />
        })}
      </div>
    </ThemedPage>
  )
}
