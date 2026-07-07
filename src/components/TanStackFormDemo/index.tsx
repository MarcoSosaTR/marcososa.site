import { useState } from 'react'
import { useForm } from '@tanstack/react-form'

import {
  type EnterpriseProjectFormValues,
  createDefaultProject,
  defaultValues,
  FormEnterpriseProjectSchema,
} from '../../schemas/ProjectBriefSchema'

const inputClassName =
  'min-h-11 rounded-md border border-zinc-300 px-3 py-2 text-sm font-normal text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:border-muted/30 dark:bg-background dark:text-foreground dark:placeholder:text-muted/70 dark:focus:border-primary dark:focus:ring-primary/30'
const labelClassName =
  'grid gap-2 text-sm font-semibold text-zinc-800 dark:text-foreground'
const fieldsetClassName =
  'rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-muted/20 dark:bg-background/70'
const legendClassName =
  'px-1 text-sm font-semibold uppercase text-teal-700 dark:text-accent'
const errorTextClassName =
  'text-sm font-medium text-red-600 dark:text-red-400'

type SubmittedValueFieldName = keyof Omit<
  EnterpriseProjectFormValues,
  'projects'
>

const submittedValueFields: {
  label: string
  name: SubmittedValueFieldName
}[] = [
  { label: 'Company name', name: 'companyName' },
  { label: 'Contact name', name: 'contactName' },
  { label: 'Contact email', name: 'contactEmail' },
  { label: 'Team size', name: 'teamSize' },
  { label: 'Current stack', name: 'currentStack' },
  { label: 'Required integrations', name: 'requiredIntegrations' },
  { label: 'Accessibility required', name: 'accessibilityRequired' },
  { label: 'Accessibility target', name: 'accessibilityTarget' },
  { label: 'Performance review', name: 'performanceReview' },
  { label: 'Notes', name: 'notes' },
]

const projectStageOptions = [
  { label: 'Discovery', value: 'discovery' },
  { label: 'Prototype', value: 'prototype' },
  { label: 'Active build', value: 'active-build' },
  { label: 'Refactor', value: 'refactor' },
]

const budgetRangeOptions = [
  { label: 'Not specified', value: 'not-specified' },
  { label: '$10k-$25k', value: '10k-25k' },
  { label: '$25k-$50k', value: '25k-50k' },
  { label: '$50k+', value: '50k-plus' },
]

const accessibilityTargetOptions = [
  { label: 'WCAG 2.2 AA', value: 'wcag-2.2-aa' },
  { label: 'WCAG 2.2 AAA', value: 'wcag-2.2-aaa' },
  { label: 'Internal accessibility review', value: 'internal-review' },
]

function formatSubmittedValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  return value.trim() || 'Not provided'
}

function formatOptionValue(
  value: string,
  options: { label: string; value: string }[],
) {
  return (
    options.find((option) => option.value === value)?.label ??
    formatSubmittedValue(value)
  )
}

function formatSubmittedFieldValue(
  name: SubmittedValueFieldName,
  value: string | boolean,
) {
  if (name === 'accessibilityTarget' && typeof value === 'string') {
    return formatOptionValue(value, accessibilityTargetOptions)
  }

  return formatSubmittedValue(value)
}

function getErrorMessage(errors: ReadonlyArray<unknown>) {
  const error = errors[0]

  if (!error) {
    return null
  }

  if (typeof error === 'string') {
    return error
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }

  return 'This field is invalid'
}

function FieldError({ errors }: { errors: ReadonlyArray<unknown> }) {
  const message = getErrorMessage(errors)

  return message ? <p className={errorTextClassName}>{message}</p> : null
}

export function TanStackFormDemo() {
  const [submittedValues, setSubmittedValues] =
    useState<EnterpriseProjectFormValues | null>(null)
  const form = useForm({
    defaultValues,
    validators: {
      onChange: FormEnterpriseProjectSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setSubmittedValues(value)
    },
  })

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-muted/20 dark:bg-surface dark:text-foreground dark:shadow-none">
      <div className="border-b border-zinc-200 pb-4 dark:border-muted/20">
        <p className="text-sm font-semibold uppercase text-teal-700 dark:text-accent">
          TanStack Form example
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-950 dark:text-foreground">
          Enterprise Project Brief
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-muted">
          A larger form scaffold with typed defaults and headless field
          bindings.
        </p>
      </div>

      <form
        className="mt-5 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
      >
        <fieldset className={fieldsetClassName}>
          <legend className={legendClassName}>Contact</legend>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <form.Field
              name="companyName"
              children={(field) => (
                <label className={labelClassName}>
                  Company name
                  <input
                    className={inputClassName}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </label>
              )}
            />

            <form.Field
              name="teamSize"
              children={(field) => (
                <label className={labelClassName}>
                  Team size
                  <select
                    className={inputClassName}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  >
                    <option value="">Select a range</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51+">51+</option>
                  </select>
                </label>
              )}
            />

            <form.Field
              name="contactName"
              children={(field) => (
                <label className={labelClassName}>
                  Contact name
                  <input
                    className={inputClassName}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </label>
              )}
            />

            <form.Field
              name="contactEmail"
              children={(field) => (
                <label className={labelClassName}>
                  Contact email
                  <input
                    className={inputClassName}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    type="email"
                    value={field.state.value}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </label>
              )}
            />
          </div>
        </fieldset>

        <fieldset className={fieldsetClassName}>
          <legend className={legendClassName}>Project</legend>
          <form.Field
            name="projects"
            mode="array"
            children={(field) => (
              <div className="mt-4 grid gap-4">
                {field.state.value.map((_, index) => (
                  <div
                    className="rounded-md border border-zinc-200 bg-white p-4 dark:border-muted/20 dark:bg-surface"
                    key={index}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-foreground">
                        Project {index + 1}
                      </h3>
                      {field.state.value.length > 1 ? (
                        <button
                          className="inline-flex min-h-9 items-center justify-center rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-muted/30 dark:text-muted dark:hover:bg-background"
                          onClick={() => field.removeValue(index)}
                          type="button"
                        >
                          Remove project
                        </button>
                      ) : null}
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <form.Field
                        name={`projects[${index}].projectName` as const}
                        children={(projectField) => (
                          <label className={labelClassName}>
                            Project name
                            <input
                              className={inputClassName}
                              name={projectField.name}
                              onBlur={projectField.handleBlur}
                              onChange={(event) =>
                                projectField.handleChange(event.target.value)
                              }
                              value={projectField.state.value}
                            />
                            <FieldError errors={projectField.state.meta.errors} />
                          </label>
                        )}
                      />

                      <form.Field
                        name={`projects[${index}].projectStage` as const}
                        children={(projectField) => (
                          <label className={labelClassName}>
                            Project stage
                            <select
                              className={inputClassName}
                              name={projectField.name}
                              onBlur={projectField.handleBlur}
                              onChange={(event) =>
                                projectField.handleChange(event.target.value)
                              }
                              value={projectField.state.value}
                            >
                              {projectStageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      />

                      <form.Field
                        name={`projects[${index}].budgetRange` as const}
                        children={(projectField) => (
                          <label className={labelClassName}>
                            Budget range
                            <select
                              className={inputClassName}
                              name={projectField.name}
                              onBlur={projectField.handleBlur}
                              onChange={(event) =>
                                projectField.handleChange(event.target.value)
                              }
                              value={projectField.state.value}
                            >
                              {budgetRangeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      />

                      <form.Field
                        name={`projects[${index}].targetLaunch` as const}
                        children={(projectField) => (
                          <label className={labelClassName}>
                            Target launch
                            <input
                              className={inputClassName}
                              name={projectField.name}
                              onBlur={projectField.handleBlur}
                              onChange={(event) =>
                                projectField.handleChange(event.target.value)
                              }
                              type="date"
                              value={projectField.state.value}
                            />
                          </label>
                        )}
                      />
                    </div>
                  </div>
                ))}

                <button
                  className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-muted/30 dark:bg-surface dark:text-foreground dark:hover:bg-background"
                  onClick={() => field.pushValue(createDefaultProject())}
                  type="button"
                >
                  Add project
                </button>
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />
        </fieldset>

        <fieldset className={fieldsetClassName}>
          <legend className={legendClassName}>Technical scope</legend>
          <div className="mt-4 grid gap-4">
            <form.Field
              name="currentStack"
              children={(field) => (
                <label className={labelClassName}>
                  Current stack
                  <textarea
                    className={`min-h-24 ${inputClassName}`}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                </label>
              )}
            />

            <form.Field
              name="requiredIntegrations"
              children={(field) => (
                <label className={labelClassName}>
                  Required integrations
                  <textarea
                    className={`min-h-24 ${inputClassName}`}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                </label>
              )}
            />

            <div className="grid gap-3 md:grid-cols-2">
              <form.Field
                name="accessibilityRequired"
                children={(field) => (
                  <label className="flex items-start gap-3 rounded-md border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 dark:border-muted/20 dark:bg-surface dark:text-muted">
                    <input
                      checked={field.state.value}
                      className="mt-1 h-4 w-4 rounded border-zinc-300 text-teal-700 focus:ring-teal-600 dark:border-muted/50 dark:bg-background dark:text-accent dark:focus:ring-accent/40"
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
                    <span>Accessibility review required</span>
                  </label>
                )}
              />

              <form.Field
                name="performanceReview"
                children={(field) => (
                  <label className="flex items-start gap-3 rounded-md border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 dark:border-muted/20 dark:bg-surface dark:text-muted">
                    <input
                      checked={field.state.value}
                      className="mt-1 h-4 w-4 rounded border-zinc-300 text-teal-700 focus:ring-teal-600 dark:border-muted/50 dark:bg-background dark:text-accent dark:focus:ring-accent/40"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.checked)
                      }
                      type="checkbox"
                    />
                    <span>Performance review included</span>
                  </label>
                )}
              />
            </div>

            <form.Subscribe
              selector={(state) => state.values.accessibilityRequired}
              children={(isAccessibilityRequired) =>
                isAccessibilityRequired ? (
                  <form.Field
                    name="accessibilityTarget"
                    children={(field) => (
                      <label className={labelClassName}>
                        Accessibility target
                        <select
                          className={inputClassName}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          value={field.state.value}
                        >
                          <option value="">Select a target</option>
                          {accessibilityTargetOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <FieldError errors={field.state.meta.errors} />
                      </label>
                    )}
                  />
                ) : null
              }
            />
          </div>
        </fieldset>

        <form.Field
          name="notes"
          children={(field) => (
            <label className={labelClassName}>
              Notes
              <textarea
                className={`min-h-28 ${inputClassName}`}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
              />
            </label>
          )}
        />

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isPristine: state.isPristine,
            isSubmitting: state.isSubmitting,
          })}
          children={({ canSubmit, isPristine, isSubmitting }) => (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-accent dark:text-background dark:hover:bg-accent/90"
                disabled={!canSubmit || isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Saving...' : 'Save brief'}
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-muted/30 dark:bg-surface dark:text-foreground dark:hover:bg-background"
                disabled={isPristine || isSubmitting}
                onClick={() => {
                  form.reset()
                  setSubmittedValues(null)
                }}
                type="button"
              >
                Reset
              </button>
            </div>
          )}
        />
      </form>
      {submittedValues ? (
        <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50 p-4 dark:border-primary/30 dark:bg-primary/15">
          <p className="text-sm font-semibold text-teal-800 dark:text-accent">
            Submitted values
          </p>
          <dl className="mt-3 grid gap-3 text-sm leading-6 text-teal-950 dark:text-foreground md:grid-cols-2">
            {submittedValueFields.map((field) => (
              <div key={field.name}>
                <dt className="font-semibold">{field.label}</dt>
                <dd>
                  {formatSubmittedFieldValue(
                    field.name,
                    submittedValues[field.name],
                  )}
                </dd>
              </div>
            ))}
            {submittedValues.projects && submittedValues.projects.length > 0 && (
              <div className="md:col-span-2">
                <dt className="font-semibold">Projects</dt>
                <dd>
                  <ul className="mt-2 grid gap-3">
                    {submittedValues.projects.map((project, index) => (
                      <li
                        className="rounded-md bg-teal-100 p-3 dark:bg-primary/25"
                        key={index}
                      >
                        <p className="font-semibold">
                          Project {index + 1}:{' '}
                          {formatSubmittedValue(project.projectName)}
                        </p>
                        <dl className="mt-2 grid gap-2 sm:grid-cols-3">
                          <div>
                            <dt className="font-semibold">Stage</dt>
                            <dd>
                              {formatOptionValue(
                                project.projectStage,
                                projectStageOptions,
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Budget</dt>
                            <dd>
                              {formatOptionValue(
                                project.budgetRange,
                                budgetRangeOptions,
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold">Target launch</dt>
                            <dd>
                              {formatSubmittedValue(project.targetLaunch)}
                            </dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      ) : null}
    </div>
  )
}
