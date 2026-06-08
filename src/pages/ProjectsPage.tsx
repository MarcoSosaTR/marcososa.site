import { ProjectCard, SectionHeader } from '../components/PortfolioSections'
import { fullProjects } from '../data/portfolio'

export function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <SectionHeader
        eyebrow="Full Projects"
        title="Complete applications with clear scope and technical decisions."
        description="Project entries support demo links, repository links, detail routes, technology tags, and status labels. Items marked Coming Soon are intentional placeholders for work that is being prepared."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {fullProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
