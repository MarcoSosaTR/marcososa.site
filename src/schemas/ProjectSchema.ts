import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const projectTypes = [
  'frontend-refactor',
  'react-architecture',
  'typescript-review',
  'ui-implementation',
] as const

export const projectTypeOptions: {
  label: string
  value: (typeof projectTypes)[number]
}[] = [
  { label: 'Frontend refactor', value: 'frontend-refactor' },
  { label: 'React Architecture', value: 'react-architecture' },
  { label: 'TypeScript Review', value: 'typescript-review' },
  { label: 'UI Implementation', value: 'ui-implementation' },
]

export const FormProjectSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
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

export const formProjectResolver = zodResolver(FormProjectSchema)

export type FormValues = z.infer<typeof FormProjectSchema>

export const defaultValues: FormValues = {
  fullName: 'Marco Sosa',
  email: 'marco.sosa@example.com',
  role: '',
  projectType: 'frontend-refactor',
  message: '',
  wantsFollowUp: true,
}
