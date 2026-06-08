import {
  SectionHeader,
  TechnicalNoteCard,
} from '../components/PortfolioSections'
import { technicalNotes } from '../data/portfolio'

export function TechnicalNotesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <SectionHeader
        eyebrow="Technical Notes / Code Snippets"
        title="Focused before/after examples for practical React decisions."
        description="Technical notes are ready for smaller refactors, code snippets, and implementation patterns. The Todo refactor placeholder is scaffolded without adding the Todo app yet."
      />
      <div className="grid gap-5">
        {technicalNotes.map((note) => (
          <TechnicalNoteCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  )
}
