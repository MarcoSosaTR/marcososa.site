import { z } from 'zod'

const ProjectBriefProjectSchema = z.object({
  projectName: z.string().trim().min(1, 'Project name is required'),
  projectStage: z.string(),
  budgetRange: z.string(),
  targetLaunch: z.string(),
})

export const FormEnterpriseProjectSchema = z
  .object({
    companyName: z.string().trim().min(1, 'Company name is required'),
    contactName: z.string().trim().min(1, 'Contact name is required'),
    contactEmail: z.string().trim().email('Use a valid email address'),
    teamSize: z.string(),
    projects: z
      .array(ProjectBriefProjectSchema)
      .min(1, 'At least one project is required'),
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
        message:
          'Accessibility target is required when accessibility review is required',
        path: ['accessibilityTarget'],
      })
    }
  })

export const createDefaultProject = () => ({
  projectName: '',
  projectStage: 'discovery',
  budgetRange: 'not-specified',
  targetLaunch: '',
})

export const defaultValues: EnterpriseProjectFormValues = {
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

export type EnterpriseProjectFormValues = z.infer<typeof FormEnterpriseProjectSchema>
