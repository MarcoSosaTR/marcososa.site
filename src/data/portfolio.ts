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

const manualFormBeforeCode = `import { useState } from 'react'

type FormValues = {
  fullName: string
  email: string
  message: string
}

export function ProjectInquiryForm() {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormValues>>({})

  const updateField =
    (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Partial<FormValues> = {}

    if (!values.fullName) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!/\\S+@\\S+\\.\\S+/.test(values.email)) {
      nextErrors.email = 'Use a valid email address.'
    }

    if (values.message.length < 20) {
      nextErrors.message = 'Use at least 20 characters.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log(values)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={values.fullName} onChange={updateField('fullName')} />
      {errors.fullName ? <p>{errors.fullName}</p> : null}

      <input value={values.email} onChange={updateField('email')} />
      {errors.email ? <p>{errors.email}</p> : null}

      <textarea value={values.message} onChange={updateField('message')} />
      {errors.message ? <p>{errors.message}</p> : null}

      <button type="submit">Submit inquiry</button>
    </form>
  )
}`

const reactHookFormAfterCode = `import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const projectTypes = [
  'frontend-refactor',
  'react-architecture',
  'typescript-review',
  'ui-implementation',
] as const

const ProjectInquirySchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Use a valid email address'),
  role: z.string().trim().min(1, 'Role is required'),
  projectType: z.enum(projectTypes),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .min(20, 'Use at least 20 characters'),
  wantsFollowUp: z.boolean(),
})

type FormValues = z.infer<typeof ProjectInquirySchema>

const defaultValues: FormValues = {
  fullName: '',
  email: '',
  role: '',
  projectType: 'frontend-refactor',
  message: '',
  wantsFollowUp: true,
}

export function ProjectInquiryForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(ProjectInquirySchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} />
      {errors.fullName ? <p>{errors.fullName.message}</p> : null}

      <input type="email" {...register('email')} />
      {errors.email ? <p>{errors.email.message}</p> : null}

      <input {...register('role')} />
      {errors.role ? <p>{errors.role.message}</p> : null}

      <select {...register('projectType')}>
        <option value="frontend-refactor">Frontend refactor</option>
        <option value="react-architecture">React architecture</option>
        <option value="typescript-review">TypeScript review</option>
        <option value="ui-implementation">UI implementation</option>
      </select>

      <textarea {...register('message')} />
      {errors.message ? <p>{errors.message.message}</p> : null}

      <label>
        <input type="checkbox" {...register('wantsFollowUp')} />
        Send a follow-up with availability and next steps.
      </label>

      <button type="submit">Submit inquiry</button>
    </form>
  )
}`

const staticEnterpriseBriefBeforeCode = `import { useState, type FormEvent } from 'react'

type EnterpriseProjectFormValues = {
  companyName: string
  contactName: string
  contactEmail: string
  teamSize: string
  projectName: string
  projectStage: string
  budgetRange: string
  targetLaunch: string
  currentStack: string
  requiredIntegrations: string
  accessibilityRequired: boolean
  performanceReview: boolean
  notes: string
}

export function EnterpriseProjectBrief() {
  const [submittedValues, setSubmittedValues] =
    useState<EnterpriseProjectFormValues | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    setSubmittedValues({
      companyName: String(formData.get('companyName') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      contactEmail: String(formData.get('contactEmail') ?? ''),
      teamSize: String(formData.get('teamSize') ?? ''),
      projectName: String(formData.get('projectName') ?? ''),
      projectStage: String(formData.get('projectStage') ?? ''),
      budgetRange: String(formData.get('budgetRange') ?? ''),
      targetLaunch: String(formData.get('targetLaunch') ?? ''),
      currentStack: String(formData.get('currentStack') ?? ''),
      requiredIntegrations: String(formData.get('requiredIntegrations') ?? ''),
      accessibilityRequired: formData.get('accessibilityRequired') === 'on',
      performanceReview: formData.get('performanceReview') === 'on',
      notes: String(formData.get('notes') ?? ''),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Contact</legend>
        <input name="companyName" />
        <input name="contactName" />
        <input name="contactEmail" type="email" />
        <select name="teamSize">
          <option value="">Select a range</option>
          <option value="1-5">1-5</option>
          <option value="6-20">6-20</option>
        </select>
      </fieldset>

      <fieldset>
        <legend>Project</legend>
        <input name="projectName" />
        <select name="projectStage">
          <option value="discovery">Discovery</option>
          <option value="prototype">Prototype</option>
          <option value="active-build">Active build</option>
          <option value="refactor">Refactor</option>
        </select>
        <select name="budgetRange">
          <option value="not-specified">Not specified</option>
          <option value="10k-25k">$10k-$25k</option>
          <option value="25k-50k">$25k-$50k</option>
        </select>
        <input name="targetLaunch" type="date" />
      </fieldset>

      <fieldset>
        <legend>Technical scope</legend>
        <textarea name="currentStack" />
        <textarea name="requiredIntegrations" />
        <label>
          <input name="accessibilityRequired" type="checkbox" />
          Accessibility review required
        </label>
        <label>
          <input defaultChecked name="performanceReview" type="checkbox" />
          Performance review included
        </label>
      </fieldset>

      <textarea name="notes" />
      <button type="submit">Save brief</button>

      {submittedValues ? (
        <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
      ) : null}
    </form>
  )
}`

const tanStackFormScaffoldAfterCode = `import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const ProjectBriefProjectSchema = z.object({
  projectName: z.string().trim().min(1, 'Project name is required'),
  projectStage: z.string(),
  budgetRange: z.string(),
  targetLaunch: z.string(),
})

const EnterpriseProjectSchema = z
  .object({
    companyName: z.string().trim().min(1, 'Company name is required'),
    contactName: z.string().trim().min(1, 'Contact name is required'),
    contactEmail: z.string().trim().email('Use a valid email address'),
    teamSize: z.string(),
    projects: z.array(ProjectBriefProjectSchema).min(1, 'Add at least one project'),
    currentStack: z.string(),
    requiredIntegrations: z.string(),
    accessibilityRequired: z.boolean(),
    accessibilityTarget: z.string(),
    performanceReview: z.boolean(),
    notes: z.string(),
  })
  .superRefine((values, context) => {
    if (values.accessibilityRequired && !values.accessibilityTarget.trim()) {
      context.addIssue({
        code: 'custom',
        message: 'Accessibility target is required when accessibility review is required',
        path: ['accessibilityTarget'],
      })
    }
  })

type EnterpriseProjectFormValues = z.infer<typeof EnterpriseProjectSchema>

const createDefaultProject = () => ({
  projectName: '',
  projectStage: 'discovery',
  budgetRange: 'not-specified',
  targetLaunch: '',
})

const defaultValues: EnterpriseProjectFormValues = {
  companyName: '',
  contactName: '',
  contactEmail: '',
  teamSize: '',
  projects: [createDefaultProject()],
  currentStack: '',
  requiredIntegrations: '',
  accessibilityRequired: false,
  accessibilityTarget: '',
  performanceReview: true,
  notes: '',
}

export function EnterpriseProjectBrief() {
  const [submittedValues, setSubmittedValues] =
    useState<EnterpriseProjectFormValues | null>(null)

  const form = useForm({
    defaultValues,
    validators: {
      onChange: EnterpriseProjectSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setSubmittedValues(value)
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="companyName"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      />

      <form.Field
        name="projects"
        mode="array"
        children={(field) => (
          <>
            {field.state.value.map((_, index) => (
              <fieldset key={index}>
                <legend>Project {index + 1}</legend>

                <form.Field
                  name={\`projects[\${index}].projectName\` as const}
                  children={(projectField) => (
                    <input
                      name={projectField.name}
                      value={projectField.state.value}
                      onBlur={projectField.handleBlur}
                      onChange={(event) =>
                        projectField.handleChange(event.target.value)
                      }
                    />
                  )}
                />

                <form.Field
                  name={\`projects[\${index}].projectStage\` as const}
                  children={(projectField) => (
                    <select
                      name={projectField.name}
                      value={projectField.state.value}
                      onBlur={projectField.handleBlur}
                      onChange={(event) =>
                        projectField.handleChange(event.target.value)
                      }
                    >
                      <option value="discovery">Discovery</option>
                      <option value="prototype">Prototype</option>
                      <option value="active-build">Active build</option>
                      <option value="refactor">Refactor</option>
                    </select>
                  )}
                />

                <form.Field
                  name={\`projects[\${index}].budgetRange\` as const}
                  children={(projectField) => (
                    <select
                      name={projectField.name}
                      value={projectField.state.value}
                      onBlur={projectField.handleBlur}
                      onChange={(event) =>
                        projectField.handleChange(event.target.value)
                      }
                    >
                      <option value="not-specified">Not specified</option>
                      <option value="10k-25k">$10k-$25k</option>
                      <option value="25k-50k">$25k-$50k</option>
                      <option value="50k-plus">$50k+</option>
                    </select>
                  )}
                />

                <form.Field
                  name={\`projects[\${index}].targetLaunch\` as const}
                  children={(projectField) => (
                    <input
                      name={projectField.name}
                      value={projectField.state.value}
                      onBlur={projectField.handleBlur}
                      onChange={(event) =>
                        projectField.handleChange(event.target.value)
                      }
                      type="date"
                    />
                  )}
                />

                {field.state.value.length > 1 ? (
                  <button
                    onClick={() => field.removeValue(index)}
                    type="button"
                  >
                    Remove project
                  </button>
                ) : null}
              </fieldset>
            ))}

            <button
              onClick={() => field.pushValue(createDefaultProject())}
              type="button"
            >
              Add project
            </button>
          </>
        )}
      />

      <form.Field
        name="accessibilityRequired"
        children={(field) => (
          <label>
            <input
              checked={field.state.value}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => {
                const isChecked = event.target.checked

                field.handleChange(isChecked)

                if (!isChecked) {
                  form.setFieldValue('accessibilityTarget', '')
                }
              }}
              type="checkbox"
            />
            Accessibility review required
          </label>
        )}
      />

      <form.Subscribe
        selector={(state) => state.values.accessibilityRequired}
        children={(isAccessibilityRequired) =>
          isAccessibilityRequired ? (
            <form.Field
              name="accessibilityTarget"
              children={(field) => (
                <select
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                >
                  <option value="">Select a target</option>
                  <option value="wcag-2.2-aa">WCAG 2.2 AA</option>
                  <option value="wcag-2.2-aaa">WCAG 2.2 AAA</option>
                </select>
              )}
            />
          ) : null
        }
      />

      <form.Field
        name="performanceReview"
        children={(field) => (
          <input
            checked={field.state.value}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.checked)}
            type="checkbox"
          />
        )}
      />

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isPristine: state.isPristine,
          isSubmitting: state.isSubmitting,
        })}
        children={({ canSubmit, isPristine, isSubmitting }) => (
          <>
            <button disabled={!canSubmit || isSubmitting} type="submit">
              {isSubmitting ? 'Saving...' : 'Save brief'}
            </button>
            <button
              disabled={isPristine || isSubmitting}
              onClick={() => form.reset()}
              type="button"
            >
              Reset
            </button>
          </>
        )}
      />

      {submittedValues ? (
        <pre>{JSON.stringify(submittedValues.projects, null, 2)}</pre>
      ) : null}
    </form>
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
  summary?: string
  problem: string
  improvement: string
  technologies: string[]
  readMoreUrl?: string
  liveDemoUrl?: string
  status: PortfolioStatus
  details?: {
    introduction: string[]
    architecture?: {
      app: string
      role: string
      port: string
      responsibility: string
    }[]
    sections: {
      title: string
      body: string[]
      bullets?: string[]
      codeExamples?: {
        label: string
        language?: string
        code: string
      }[]
    }[]
    takeaways: string[]
  }
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
    id: 'flash-wash',
    title: 'Flash-Wash: Agenda un lavado de auto directo a tu domicilio',
    description: 'A bilingual React and TypeScript booking app for scheduling at-home car wash appointments, managing service packages, and controlling availability through a mocked admin interface.',
    techStack: ['React', 'TypeScript', 'Vite', 'Jest', 'Testing Library', 'Mock API'],
    status: 'Completed',
    liveDemoUrl: 'https://flashwash.marcososa.site/',
    githubUrl: 'https://github.com/MarcoSosaTR/flashwash',
  },
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
    id: 'microfrontends-module-federation',
    title: 'Microfrontend Gallery with Webpack Module Federation',
    summary:
      'A two-application React demo where a host gallery loads a remote header at runtime through Webpack Module Federation.',
    problem:
      'A shared header and gallery page need to be owned, built, and deployed as separate frontend apps without coupling the host to the remote source code.',
    improvement:
      'Split the UI into a remote header app and a host home app, using a runtime remote contract, Suspense loading, shared React singletons, and Cloudflare-ready deployment configuration.',
    technologies: [
      'React',
      'Webpack Module Federation',
      'React.lazy',
      'Suspense',
      'Cloudflare',
    ],
    status: 'Completed',
    readMoreUrl: '/case-studies/microfrontends-module-federation',
    liveDemoUrl: 'https://microfrontends.marcososa.site',
    details: {
      introduction: [
        'This case study demonstrates a small microfrontend architecture using React and Webpack Module Federation.',
        'The solution is split into two independently built applications: a remote app that owns and exposes a shared header component, and a host app that renders the gallery page while consuming that header at runtime.',
      ],
      architecture: [
        {
          app: 'header-app',
          role: 'Remote',
          port: '3000',
          responsibility: 'Exposes the Header component',
        },
        {
          app: 'home-app',
          role: 'Host',
          port: '3001',
          responsibility: 'Renders the gallery page and loads the remote header',
        },
      ],
      sections: [
        {
          title: 'Remote ownership',
          body: [
            'The remote application owns the header UI and publishes it through the ModuleFederationPlugin configuration.',
            'The host does not import the header from local source code. Instead, it consumes the generated remoteEntry.js file exposed by the remote application.',
          ],
          bullets: [
            "name: 'headerApp' defines the remote container name.",
            "filename: 'remoteEntry.js' creates the manifest file used by consumers.",
            "exposes makes Header.jsx available outside of header-app as './Header'.",
            "publicPath: 'auto' lets Webpack resolve remote chunks from the same deployed location as remoteEntry.js.",
          ],
          codeExamples: [
            {
              label: 'header-app federation config',
              language: 'javascript',
              code: `new ModuleFederationPlugin({
  name: 'headerApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/Header.jsx',
  },
})`,
            },
          ],
        },
        {
          title: 'Host integration',
          body: [
            'The host application owns the gallery page and declares where the remote header container can be loaded from.',
            'For local development, the host can load the remote from localhost. In production, the same build-time variable can point at the deployed Cloudflare location.',
          ],
          bullets: [
            'remotes tells the host where to find headerApp.',
            'The remote URL is resolved at build time from the environment.',
            'Consumers import the exposed component through the runtime contract headerApp/Header.',
          ],
          codeExamples: [
            {
              label: 'home-app federation config',
              language: 'javascript',
              code: `const headerAppRemoteUrl =
  process.env.VITE_HEADER_REMOTE_URL ||
  'http://localhost:3000/remoteEntry.js'

new ModuleFederationPlugin({
  name: 'homeApp',
  remotes: {
    headerApp: \`headerApp@\${headerAppRemoteUrl}\`,
  },
})`,
            },
          ],
        },
        {
          title: 'Runtime loading',
          body: [
            'The host loads the remote component asynchronously with React.lazy and renders it inside Suspense.',
            'That keeps the header code out of the host bundle and gives the host a clear loading state while the browser downloads and initializes the remote module.',
          ],
          codeExamples: [
            {
              label: 'Lazy remote component',
              language: 'jsx',
              code: `import { lazy, Suspense } from 'react'

const Header = lazy(() => import('headerApp/Header'))

export function HomePage() {
  return (
    <Suspense fallback={<p className="loading">Loading remote header...</p>}>
      <Header />
    </Suspense>
  )
}`,
            },
          ],
        },
        {
          title: 'Shared React dependencies',
          body: [
            'Both applications coordinate React and React DOM through Module Federation shared dependencies.',
            'Marking React as a singleton helps avoid duplicate React instances, which can cause rendering and hook-related problems when independently built applications are composed at runtime.',
          ],
          codeExamples: [
            {
              label: 'Shared dependencies',
              language: 'javascript',
              code: `shared: {
  react: {
    singleton: true,
    requiredVersion: dependencies.react,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: dependencies['react-dom'],
  },
}`,
            },
          ],
        },
        {
          title: 'Cloudflare deployment notes',
          body: [
            'For deployment, the host can receive a public remote URL through VITE_HEADER_REMOTE_URL.',
            'The remote application also includes a Cloudflare _headers file so the host can load remoteEntry.js from a different deployed location.',
          ],
          codeExamples: [
            {
              label: 'Host remote URL',
              language: 'bash',
              code: `VITE_HEADER_REMOTE_URL=https://your-domain.com/path-to-header-app/remoteEntry.js`,
            },
            {
              label: 'Remote _headers file',
              language: 'bash',
              code: `/*
  Access-Control-Allow-Origin: *`,
            },
          ],
        },
      ],
      takeaways: [
        'Each frontend has its own build and development server.',
        'The header can be developed and deployed independently from the host gallery.',
        'The host consumes the header through a runtime contract instead of direct source imports.',
        'Shared dependency configuration keeps React aligned across both applications.',
      ],
    },
  },
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
  {
    id: 'react-hook-form-project-inquiry',
    title: 'React Hook Form + Zod: Project Inquiry Form',
    summary:
      'A focused form example showing how React Hook Form and Zod can share typed form values, schema validation, and submit handling.',
    concepts: [
      'React Hook Form',
      'Zod',
      'zodResolver',
      'form validation',
      'uncontrolled inputs',
      'TypeScript',
      'formState',
    ],
    problem:
      'Manual React forms can accumulate repetitive field state, change handlers, validation checks, and error rendering logic as the number of inputs grows.',
    improvement:
      'React Hook Form owns registration and submit flow while Zod owns the validation contract through zodResolver, keeping runtime rules and TypeScript values aligned.',
    beforeCode: manualFormBeforeCode,
    afterCode: reactHookFormAfterCode,
    explanation:
      'The working example is a small project inquiry form with a Zod schema, a zodResolver-powered useForm setup, required fields, email validation, minimum message length, reset behavior, and a submitted-values preview.',
    tradeoffs:
      'React Hook Form and Zod add dependencies and resolver wiring, but they move validation out of scattered register rules and make the form contract easier to reuse.',
  },
  {
    id: 'tanstack-form-enterprise-project-brief',
    title: 'TanStack Form + Zod: Dynamic Project Brief',
    summary:
      'A larger multi-section form using TanStack Form, Zod validation, typed defaults, repeatable project fields, conditional inputs, and subscribed form state.',
    status: 'In Progress',
    concepts: [
      'TanStack Form',
      'useForm',
      'form.Field',
      'form.Subscribe',
      'array fields',
      'dynamic fields',
      'conditional fields',
      'form state subscriptions',
      'headless forms',
      'TypeScript',
      'Zod',
    ],
    problem:
      'Large forms become harder to maintain when repeated groups, conditional inputs, validation rules, submit state, and previews are all handled with ad hoc local state.',
    improvement:
      'The implementation models projects as an array of typed objects, uses TanStack Form array fields for add/remove behavior, subscribes buttons and conditional UI to form state, and keeps Zod as the shared validation contract.',
    beforeCode: staticEnterpriseBriefBeforeCode,
    afterCode: tanStackFormScaffoldAfterCode,
    explanation:
      'The working example presents a larger enterprise project brief form with contact, repeatable project, technical scope, and preference fields. It uses mode="array", bracketed nested field names, pushValue and removeValue, a conditional accessibility target, form.Subscribe-driven submit/reset state, Zod validation, reset behavior, and a submitted-values preview.',
    tradeoffs:
      'TanStack Form has more concepts than plain JSX for a static form, and array field paths require care, but the structure scales better when repeated groups, conditional fields, validation, and submit lifecycle state need to stay coordinated.',
  },
]
