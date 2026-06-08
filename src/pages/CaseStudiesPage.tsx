import { CaseStudyCard, SectionHeader } from '../components/PortfolioSections'
import { caseStudies } from '../data/portfolio'

export function CaseStudiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <SectionHeader
        eyebrow="Case Studies"
        title="Engineering writeups for architecture, trade-offs, and refactors."
        description="This route is prepared for longer explanations that make the problem, improvement, and technology choices easy to scan before reading the full article."
      />
      <div className="grid gap-5">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  )
}
