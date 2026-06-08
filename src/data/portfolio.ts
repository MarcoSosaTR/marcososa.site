import profilePhotoUrl from '../assets/marcososa-image.png'

export type PortfolioStatus =
  | 'Coming Soon'
  | 'Planned'
  | 'In Progress'
  | 'Completed'

export const profile = {
  name: 'Marco Sosa',
  initials: 'MS',
  role: 'Mid / Mid-Senior React Developer',
  focus:
    'Frontend architecture, refactoring, practical TypeScript, and user interfaces that are easy to reason about.',
  photoUrl: profilePhotoUrl,
}

export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  liveDemoUrl?: string
  githubUrl?: string
  detailsUrl?: string
  status: PortfolioStatus
}

export type CaseStudy = {
  id: string
  title: string
  problem: string
  improvement: string
  technologies: string[]
  readMoreUrl?: string
  status: PortfolioStatus
}

export type TechnicalNote = {
  id: string
  title: string
  summary: string
  status: PortfolioStatus
  concepts: string[]
  problem: string
  improvement: string
  beforeCode: string
  afterCode: string
  explanation: string
  tradeoffs: string
}

export const fullProjects: Project[] = [
  {
    id: 'pokemon-react-architecture-lab',
    title: 'Pokemon React Architecture Lab',
    description:
      'A feature-focused React application for exploring API boundaries, server state, and reusable UI patterns around Pokemon data.',
    techStack: ['React', 'TypeScript', 'TanStack Query', 'Feature folders'],
    status: 'In Progress',
  },
  {
    id: 'mini-admin-dashboard',
    title: 'Mini Admin Dashboard',
    description:
      'A compact dashboard concept with filters, detail panels, loading states, and data-driven layout decisions.',
    techStack: ['React', 'TypeScript', 'Charts', 'REST APIs'],
    status: 'Coming Soon',
  },
  {
    id: 'migration-progress-tracker',
    title: 'Migration Progress Tracker',
    description:
      'A workflow interface for tracking staged migrations, surfacing blockers, and keeping technical decisions visible.',
    techStack: ['React', 'TypeScript', 'State modeling', 'UI architecture'],
    status: 'Coming Soon',
  },
  {
    id: 'legacy-php-to-react-refactor-demo',
    title: 'Legacy PHP-to-React Refactor Demo',
    description:
      'A planned refactor walkthrough showing how a server-rendered legacy flow can be moved into a typed React interface.',
    techStack: ['React', 'TypeScript', 'Refactoring', 'Legacy systems'],
    status: 'Coming Soon',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'separating-server-state-from-ui-state',
    title: 'Separating Server State from UI State',
    problem:
      'Components become harder to reason about when remote data, request lifecycle flags, and local interaction state are mixed together.',
    improvement:
      'Document a cleaner boundary between cached server data and local UI decisions such as selected tabs, filters, and dialogs.',
    technologies: ['React', 'TanStack Query', 'TypeScript'],
    status: 'Coming Soon',
  },
  {
    id: 'structuring-react-applications-by-feature',
    title: 'Structuring React Applications by Feature',
    problem:
      'Flat folders and shared dumping grounds make it difficult to find ownership, evolve screens, and remove dead code.',
    improvement:
      'Show how feature modules, colocated components, and typed boundaries make a React codebase easier to scale.',
    technologies: ['React', 'TypeScript', 'Frontend architecture'],
    status: 'Coming Soon',
  },
  {
    id: 'handling-api-loading-error-and-empty-states',
    title: 'Handling API Loading, Error, and Empty States',
    problem:
      'Interfaces often handle async states inconsistently, which creates fragile UI and unclear user feedback.',
    improvement:
      'Compare explicit loading, error, empty, and success paths with reusable status components and predictable branching.',
    technologies: ['React', 'API design', 'UX states'],
    status: 'Coming Soon',
  },
  {
    id: 'improving-render-performance-in-react-lists',
    title: 'Improving Render Performance in React Lists',
    problem:
      'Large lists can re-render too often when derived values, callbacks, and item boundaries are not modeled carefully.',
    improvement:
      'Explain practical improvements with memoization, component boundaries, pagination, and measurement before optimization.',
    technologies: ['React', 'Performance', 'Profiling'],
    status: 'Coming Soon',
  },
]

export const technicalNotes: TechnicalNote[] = [
  {
    id: 'todo-useeffect-to-tanstack-query',
    title: 'Todo Refactor: useEffect to TanStack Query',
    summary:
      'A planned before/after example showing how manual data fetching with useEffect can be refactored into TanStack Query.',
    status: 'Coming Soon',
    concepts: [
      'useEffect',
      'TanStack Query',
      'server state',
      'loading states',
      'error handling',
    ],
    problem:
      'The future example will start with a simple Todo list that keeps request state, fetched data, loading flags, and error handling inside one component.',
    improvement:
      'The refactor will move server-state concerns into TanStack Query so the component can focus on rendering and interaction decisions.',
    beforeCode: '',
    afterCode: '',
    explanation:
      'The note is intentionally scaffolded now. The before and after snippets can be added later without changing the page structure.',
    tradeoffs:
      'TanStack Query adds a dependency and requires clear query keys, but it can reduce custom request state and make async behavior easier to review.',
  },
]
