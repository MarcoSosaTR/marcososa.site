import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import {
  type FormValues,
  defaultValues,
  formProjectResolver,
  projectTypeOptions,
} from '../../schemas/ProjectSchema'

const inputClassName =
  'min-h-11 rounded-md border border-zinc-300 px-3 py-2 text-sm font-normal text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:border-muted/30 dark:bg-background dark:text-foreground dark:placeholder:text-muted/70 dark:focus:border-primary dark:focus:ring-primary/30'
const inputErrorClassName =
  'border-red-500 focus:border-red-500 focus:ring-red-100 dark:border-red-500/60 dark:focus:border-red-500 dark:focus:ring-red-500/20'
const labelClassName =
  'grid gap-2 text-sm font-semibold text-zinc-800 dark:text-foreground'

export function ReactHookFormDemo() {
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: formProjectResolver,
  })

  const getInputClassName = (fieldName: keyof FormValues) => {
    const hasError = Boolean(errors[fieldName])

    return `${inputClassName} ${hasError ? inputErrorClassName : ''}`.trim()
  }

  const renderError = (fieldName: keyof FormValues) => {
    const fieldError = errors[fieldName]

    if (!fieldError?.message) {
      return null
    }

    return (
      <p className="text-sm font-medium text-red-600 dark:text-red-400">
        {fieldError.message}
      </p>
    )
  }

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmittedValues(values)
    } catch (error) {
      setError('root', { message: 'Unable to submit the inquiry right now.' })
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-muted/20 dark:bg-surface dark:text-foreground dark:shadow-none">
      <div className="border-b border-zinc-200 pb-4 dark:border-muted/20">
        <p className="text-sm font-semibold uppercase text-teal-700 dark:text-accent">
          React Hook Form example
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-950 dark:text-foreground">
          Project Inquiry Form
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-muted">
          A compact form that keeps validation rules close to each input and
          avoids manual state handlers for every field.
        </p>
      </div>

      <form className="mt-5 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClassName}>
            Full name
            <input
              aria-invalid={Boolean(errors.fullName)}
              className={getInputClassName('fullName')}
              {...register('fullName')}
            />
            {renderError('fullName')}
          </label>

          <label className={labelClassName}>
            Email
            <input
              aria-invalid={Boolean(errors.email)}
              className={getInputClassName('email')}
              placeholder="marco@example.com"
              type="email"
              {...register('email')}
            />
            {renderError('email')}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClassName}>
            Role
            <input
              aria-invalid={Boolean(errors.role)}
              className={getInputClassName('role')}
              placeholder="Recruiter, engineering lead, founder..."
              {...register('role')}
            />
            {renderError('role')}
          </label>

          <label className={labelClassName}>
            Project type
            <select
              aria-invalid={Boolean(errors.projectType)}
              className={getInputClassName('projectType')}
              {...register('projectType')}
            >
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {renderError('projectType')}
          </label>
        </div>

        <label className={labelClassName}>
          Message
          <textarea
            aria-invalid={Boolean(errors.message)}
            className={`min-h-32 ${getInputClassName('message')}`}
            placeholder="Describe the project or review context."
            {...register('message')}
          />
          {renderError('message')}
        </label>

        <label className="flex items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-muted/20 dark:bg-background/70 dark:text-muted">
          <input
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-teal-700 focus:ring-teal-600 dark:border-muted/50 dark:bg-background dark:text-accent dark:focus:ring-accent/40"
            type="checkbox"
            {...register('wantsFollowUp')}
          />
          <span>Send a follow-up with availability and next steps.</span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-accent dark:text-background dark:hover:bg-accent/90 dark:disabled:bg-muted dark:disabled:text-background"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-muted/30 dark:bg-surface dark:text-foreground dark:hover:bg-background"
            onClick={() => {
              reset(defaultValues)
              setSubmittedValues(null)
            }}
            type="button"
          >
            Reset
          </button>
          {errors.root?.message ? (
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              {errors.root.message}
            </p>
          ) : null}
        </div>
      </form>

      {submittedValues ? (
        <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50 p-4 dark:border-primary/30 dark:bg-primary/15">
          <p className="text-sm font-semibold text-teal-800 dark:text-accent">
            Submitted values
          </p>
          <dl className="mt-3 grid gap-3 text-sm leading-6 text-teal-950 dark:text-foreground md:grid-cols-2">
            <div>
              <dt className="font-semibold">Name</dt>
              <dd>{submittedValues.fullName}</dd>
            </div>
            <div>
              <dt className="font-semibold">Email</dt>
              <dd>{submittedValues.email}</dd>
            </div>
            <div>
              <dt className="font-semibold">Project type</dt>
              <dd>{submittedValues.projectType}</dd>
            </div>
            <div>
              <dt className="font-semibold">Follow-up</dt>
              <dd>{submittedValues.wantsFollowUp ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  )
}
