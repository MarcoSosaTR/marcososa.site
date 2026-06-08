import profilePhotoUrl from '../assets/marcososa-image.png'

const todoUseEffectBeforeCode = `import { useEffect, useState } from 'react'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type CompletedState = Record<number, boolean>

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

export function TodoList() {
  const [completed, setCompleted] = useState<CompletedState>({})
  const [data, setData] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchTodos = async () => {
      try {
        setError(null)
        setIsLoading(true)

        const response = await fetch(TODOS_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch todos')
        }

        const todos = (await response.json()) as Todo[]

        setData(todos)
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setError('Failed to load todos.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchTodos()

    return () => controller.abort()
  }, [])

  const toggleTodo = (id: number) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <ul>
      {data.map((todo) => {
        const todoId = 'todo-' + todo.id

        return (
          <li key={todo.id}>
            <input
              checked={completed[todo.id] || false}
              id={todoId}
              onChange={() => toggleTodo(todo.id)}
              type="checkbox"
            />
            <label htmlFor={todoId}>{todo.title}</label>
          </li>
        )
      })}
    </ul>
  )
}`

const todoTanStackQueryAfterCode = `import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type CompletedState = Record<number, boolean>

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

async function fetchTodos({ signal }: { signal?: AbortSignal }): Promise<Todo[]> {
  const response = await fetch(TODOS_URL, { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

export function TodoList() {
  const [completed, setCompleted] = useState<CompletedState>({})

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const toggleTodo = (id: number) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoading) {
    return <p>Loading todos...</p>
  }

  if (error) {
    return <p>Failed to load todos.</p>
  }

  return (
    <ul>
      {data.map((todo) => {
        const todoId = 'todo-' + todo.id

        return (
          <li key={todo.id}>
            <input
              checked={completed[todo.id] ?? todo.completed}
              id={todoId}
              onChange={() => toggleTodo(todo.id)}
              type="checkbox"
            />
            <label htmlFor={todoId}>{todo.title}</label>
          </li>
        )
      })}
    </ul>
  )
}`

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
  status?: PortfolioStatus
  concepts: string[]
  problem: string
  improvement: string
  queryAdvantages?: string[]
  cancellationNote?: string
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
      'A before/after refactor note showing a previous manual useEffect fetching implementation and how it can be moved to TanStack Query.',
    concepts: [
      'useEffect',
      'TanStack Query',
      'server state',
      'loading states',
      'error handling',
    ],
    problem:
      'The previous Todo list kept request state, fetched data, loading flags, and error handling inside one component.',
    improvement:
      'The refactored version moves server-state concerns into TanStack Query so the component can focus on rendering and interaction decisions.',
    queryAdvantages: [
      'Moves server-state lifecycle concerns out of the component and into a dedicated data-fetching layer.',
      'Provides built-in loading, error, refetching, caching, stale data, and request deduplication behavior.',
      'Makes the component easier to review because rendering logic is separated from request orchestration.',
    ],
    cancellationNote:
      'Manual AbortController setup is usually not needed, but cancellation can still be supported by using the signal provided by TanStack Query.',
    beforeCode: todoUseEffectBeforeCode,
    afterCode: todoTanStackQueryAfterCode,
    explanation:
      'The working example demonstrates the previous useEffect approach, followed by a TanStack Query version that separates server state from local UI state.',
    tradeoffs:
      'TanStack Query adds a dependency and requires clear query keys, but it can reduce custom request state and make async behavior easier to review.',
  },
]
