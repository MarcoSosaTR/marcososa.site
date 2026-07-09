export type ResumeStackId =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'html-css'
  | 'rest-apis'
  | 'git'
  | 'testing'
  | 'context-api'
  | 'redux'
  | 'tanstack-query'
  | 'tanstack-router'
  | 'tailwind'
  | 'nodejs'
  | 'php'
  | 'bootstrap-jquery'
  | 'dotnet-csharp'
  | 'angular'

export type ResumeTone = 'teal' | 'amber' | 'sky' | 'rose' | 'emerald'

export type ResumeContactLink = {
  label: string
  value: string
  href: string
}

export type ResumeProfile = {
  name: string
  headline: string
  location: string
  language: string
  availability: string
  contactNote: string
  summary: string
  contactLinks: ResumeContactLink[]
  primaryTechnologies: string[]
  appliedKnowledge: string[]
}

export type ResumeStackSignal = {
  id: ResumeStackId
  label: string
  category: string
  strength: number
  summary: string
}

export type ResumeMetric = {
  label: string
  value: number
}

export type ResumeMilestone = {
  id: string
  marker: string
  period: string
  title: string
  role: string
  organization: string
  summary: string
  tone: ResumeTone
  stack: ResumeStackId[]
  metrics: ResumeMetric[]
  outcomes: string[]
}

export type ResumeEducation = {
  institution: string
  program: string
  period: string
  summary: string
}

export const resumeProfile: ResumeProfile = {
  name: 'Marco A. Sosa',
  headline: 'Frontend Developer | React | TypeScript | REST APIs',
  location: 'Mexico City',
  language: 'Professional English',
  availability: 'Available for on-site, hybrid, remote, or relocation',
  contactNote: 'Phone available on request',
  summary:
    'Frontend Developer specialized in React and TypeScript, with experience building enterprise web applications, integrating REST APIs, creating reusable components, and delivering responsive interfaces. I have collaborated with international Agile teams using Git, React Testing Library, and Jest, with practical experience in state management patterns, asynchronous operations, component lifecycle, and frontend performance practices that keep applications clear, scalable, and maintainable.',
  contactLinks: [
    {
      label: 'Email',
      value: 'marcososarosales@gmail.com',
      href: 'mailto:marcososarosales@gmail.com',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/marco-a-sosa',
      href: 'https://www.linkedin.com/in/marco-a-sosa/',
    },
    {
      label: 'Portfolio',
      value: 'www.marcososa.site',
      href: 'https://www.marcososa.site',
    },
  ],
  primaryTechnologies: [
    'React',
    'TypeScript',
    'JavaScript ES6+',
    'HTML5',
    'CSS3',
    'REST APIs',
    'Git',
    'Jest',
    'React Testing Library',
    'Context API',
    'Redux',
  ],
  appliedKnowledge: [
    'TanStack Query',
    'TanStack Router',
    'Tailwind CSS',
    'Node.js',
    'PHP',
  ],
}

export const resumeStackSignals: ResumeStackSignal[] = [
  {
    id: 'react',
    label: 'React',
    category: 'Core UI',
    strength: 94,
    summary:
      'Enterprise UI development, hooks, component lifecycle, reusable components, and routed application flows.',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'Contracts',
    strength: 90,
    summary:
      'Typed frontend models, safer component APIs, clear refactors, and maintainable application boundaries.',
  },
  {
    id: 'javascript',
    label: 'JavaScript ES6+',
    category: 'Language',
    strength: 90,
    summary:
      'Modern JavaScript for frontend behavior, async flows, UI logic, and legacy-to-modern transitions.',
  },
  {
    id: 'html-css',
    label: 'HTML5 + CSS3',
    category: 'Interface',
    strength: 90,
    summary:
      'Responsive layout, semantic structure, UI polish, CSS maintenance, and production web interfaces.',
  },
  {
    id: 'rest-apis',
    label: 'REST APIs',
    category: 'Integration',
    strength: 86,
    summary:
      'Frontend-backend integration, asynchronous request handling, API-driven screens, and data flow clarity.',
  },
  {
    id: 'git',
    label: 'Git',
    category: 'Collaboration',
    strength: 84,
    summary:
      'Team collaboration, code review participation, incremental delivery, and source-control discipline.',
  },
  {
    id: 'testing',
    label: 'Jest + RTL',
    category: 'Quality',
    strength: 80,
    summary:
      'Unit tests and behavior-focused React Testing Library coverage for frontend components and flows.',
  },
  {
    id: 'context-api',
    label: 'Context API',
    category: 'State',
    strength: 78,
    summary:
      'Local and shared UI-state patterns for React applications that need explicit state boundaries.',
  },
  {
    id: 'redux',
    label: 'Redux',
    category: 'State',
    strength: 76,
    summary:
      'State management experience in React applications with predictable data updates and shared state.',
  },
  {
    id: 'tanstack-query',
    label: 'TanStack Query',
    category: 'Server state',
    strength: 72,
    summary:
      'Applied server-state knowledge for cached REST data, loading states, and request lifecycle clarity.',
  },
  {
    id: 'tanstack-router',
    label: 'TanStack Router',
    category: 'Routing',
    strength: 64,
    summary:
      'Applied routing knowledge through learning projects and typed route-oriented frontend architecture.',
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'Styling',
    strength: 74,
    summary:
      'Utility-first styling for responsive layouts, visual systems, and fast interface iteration.',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'Backend adjacency',
    strength: 64,
    summary:
      'Applied backend and service knowledge supporting APIs, tooling, and full-stack communication.',
  },
  {
    id: 'php',
    label: 'PHP',
    category: 'Backend adjacency',
    strength: 72,
    summary:
      'Legacy and institutional web development experience across PHP applications and services.',
  },
  {
    id: 'bootstrap-jquery',
    label: 'Bootstrap + jQuery',
    category: 'Legacy UI',
    strength: 76,
    summary:
      'Practical maintenance and feature work in older web stacks before modern React adoption.',
  },
  {
    id: 'dotnet-csharp',
    label: '.NET + C#',
    category: 'Backend adjacency',
    strength: 58,
    summary:
      'Maintenance experience in mixed web environments with .NET, C#, services, and frontend work.',
  },
  {
    id: 'angular',
    label: 'Angular',
    category: 'Frontend adjacency',
    strength: 48,
    summary:
      'Occasional project exposure while maintaining broader web applications in mixed frontend stacks.',
  },
]

export const resumeMilestones: ResumeMilestone[] = [
  {
    id: 'freelance-current',
    marker: 'Now',
    period: 'Nov 2025 - Present',
    title: 'Freelance frontend practice',
    role: 'Freelance Frontend Developer',
    organization: 'Independent work',
    summary:
      'Development of personal and freelance applications using React, TypeScript, and modern frontend tooling, with a focus on reusable components, API consumption, responsive design, and learning-oriented application architecture.',
    tone: 'teal',
    stack: [
      'react',
      'typescript',
      'javascript',
      'html-css',
      'rest-apis',
      'git',
      'tanstack-query',
      'tanstack-router',
      'tailwind',
    ],
    metrics: [
      { label: 'React + TypeScript focus', value: 92 },
      { label: 'API-driven UI', value: 84 },
      { label: 'Responsive delivery', value: 88 },
    ],
    outcomes: [
      'Built a mobile car wash appointment scheduling application.',
      'Created didactic applications for React, TypeScript, React Router, and TanStack Query practice.',
      'Implemented reusable components, API consumption flows, and responsive interface patterns.',
    ],
  },
  {
    id: 'thomson-reuters',
    marker: 'TR',
    period: 'Aug 2024 - Nov 2025',
    title: 'Enterprise self-service React application',
    role: 'Sr Software Development Engineer',
    organization: 'Thomson Reuters',
    summary:
      'Collaborated with teams in Mexico and India on an enterprise self-service application based on React and TypeScript, delivering frontend components, unit tests, code reviews, and incremental UI improvements within two-week Agile sprints.',
    tone: 'sky',
    stack: [
      'react',
      'typescript',
      'javascript',
      'html-css',
      'rest-apis',
      'git',
      'testing',
      'context-api',
      'redux',
    ],
    metrics: [
      { label: 'Enterprise React delivery', value: 90 },
      { label: 'Testing discipline', value: 82 },
      { label: 'International collaboration', value: 88 },
    ],
    outcomes: [
      'Developed and maintained frontend components under two-week Agile sprint cycles.',
      'Implemented unit tests with React Testing Library and Jest.',
      'Participated in code reviews, frontend-backend integration, and incremental UI improvements.',
    ],
  },
  {
    id: 'psl-group',
    marker: 'PSL',
    period: 'May 2022 - May 2024',
    title: 'React feature maintenance and API flows',
    role: 'Sr Application Developer',
    organization: 'P/S/L Group',
    summary:
      'Developed and maintained frontend features using React, hooks, and modern JavaScript while consuming REST APIs, handling asynchronous data flows, and collaborating with multidisciplinary teams through Git and Jira.',
    tone: 'amber',
    stack: [
      'react',
      'javascript',
      'html-css',
      'rest-apis',
      'git',
      'context-api',
      'redux',
    ],
    metrics: [
      { label: 'Feature maintenance', value: 88 },
      { label: 'Async data handling', value: 84 },
      { label: 'Responsive UI upkeep', value: 86 },
    ],
    outcomes: [
      'Built and maintained frontend functionality with React hooks and modern JavaScript.',
      'Consumed REST APIs and handled asynchronous data workflows.',
      'Improved responsive web interfaces in collaboration with multidisciplinary teams.',
    ],
  },
  {
    id: 'freelance-early',
    marker: 'FL',
    period: 'Aug 2020 - Apr 2022',
    title: 'Independent React frontend work',
    role: 'Freelance Frontend Developer',
    organization: 'Independent work',
    summary:
      'Delivered frontend web solutions using React and JavaScript, strengthening the transition from earlier web stacks into modern component-driven interface development.',
    tone: 'rose',
    stack: ['react', 'javascript', 'html-css', 'rest-apis', 'git'],
    metrics: [
      { label: 'React transition', value: 78 },
      { label: 'Frontend implementation', value: 82 },
      { label: 'Independent delivery', value: 80 },
    ],
    outcomes: [
      'Developed frontend web solutions with React and JavaScript.',
      'Applied reusable UI patterns and component-oriented implementation.',
      'Expanded practical experience with modern frontend workflows.',
    ],
  },
  {
    id: 'mediaccess',
    marker: 'MED',
    period: 'Jun 2017 - Jun 2020',
    title: 'Mixed web application maintenance',
    role: 'Web Programmer',
    organization: 'MediAccess S.A.P.I. de C.V.',
    summary:
      'Developed and maintained web interfaces using HTML, CSS, Bootstrap, and jQuery while supporting PHP, C#, React, Angular, .NET services, PHP services, and Node.js APIs in a mixed application environment.',
    tone: 'emerald',
    stack: [
      'javascript',
      'html-css',
      'rest-apis',
      'git',
      'nodejs',
      'php',
      'bootstrap-jquery',
      'dotnet-csharp',
      'react',
      'angular',
    ],
    metrics: [
      { label: 'Legacy UI maintenance', value: 86 },
      { label: 'Service integration', value: 78 },
      { label: 'Stack adaptability', value: 88 },
    ],
    outcomes: [
      'Maintained web applications across PHP, C#, React, and occasional Angular projects.',
      'Developed APIs and web services using .NET, PHP, and Node.js.',
      'Built and improved interfaces with HTML, CSS, Bootstrap, and jQuery.',
    ],
  },
  {
    id: 'qatar-university',
    marker: 'QU',
    period: 'Jan 2009 - Aug 2016',
    title: 'Institutional web development',
    role: 'Web Developer',
    organization: 'Qatar University',
    summary:
      'Developed and maintained the institutional website and departmental pages using PHP, JavaScript, HTML, and CSS, including an events system that increased institutional traffic by more than 20%.',
    tone: 'teal',
    stack: ['php', 'javascript', 'html-css', 'rest-apis', 'bootstrap-jquery'],
    metrics: [
      { label: 'Institutional web delivery', value: 88 },
      { label: 'PHP application work', value: 82 },
      { label: 'Traffic impact', value: 80 },
    ],
    outcomes: [
      'Maintained the institutional website and departmental pages.',
      'Developed PHP applications and frontend functionality with JavaScript, HTML, and CSS.',
      'Implemented an events system that increased institutional traffic by more than 20%.',
    ],
  },
]

export const resumeEducation: ResumeEducation[] = [
  {
    institution: 'Universidad Tecnologica de Mexico (UNITEC)',
    program: 'Informatica Administrativa',
    period: '2001 - 2005',
    summary:
      'Administrative informatics studies with a foundation in systems, business-oriented software, and applied technology.',
  },
]
