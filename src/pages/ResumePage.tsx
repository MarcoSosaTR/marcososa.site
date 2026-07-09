import { useMemo, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import {
  resumeEducation,
  resumeMilestones,
  resumeProfile,
  resumeStackSignals,
  type ResumeMilestone,
  type ResumeStackId,
  type ResumeStackSignal,
  type ResumeTone,
} from '../data/resume'

type ToneStyle = {
  accentText: string
  accentTextStrong: string
  border: string
  bgSoft: string
  bgStrong: string
  bar: string
  dot: string
  glow: string
  ring: string
}

type StackSignalWithUsage = ResumeStackSignal & {
  usageCount: number
}

const toneStyles: Record<ResumeTone, ToneStyle> = {
  teal: {
    accentText: 'text-teal-300',
    accentTextStrong: 'text-teal-700',
    border: 'border-teal-300/60',
    bgSoft: 'bg-teal-300/10',
    bgStrong: 'bg-teal-300',
    bar: 'bg-teal-300',
    dot: 'bg-teal-300',
    glow: 'shadow-[0_0_36px_rgba(45,212,191,0.28)]',
    ring: 'ring-teal-300/40',
  },
  amber: {
    accentText: 'text-amber-300',
    accentTextStrong: 'text-amber-700',
    border: 'border-amber-300/60',
    bgSoft: 'bg-amber-300/10',
    bgStrong: 'bg-amber-300',
    bar: 'bg-amber-300',
    dot: 'bg-amber-300',
    glow: 'shadow-[0_0_36px_rgba(252,211,77,0.26)]',
    ring: 'ring-amber-300/40',
  },
  sky: {
    accentText: 'text-sky-300',
    accentTextStrong: 'text-sky-700',
    border: 'border-sky-300/60',
    bgSoft: 'bg-sky-300/10',
    bgStrong: 'bg-sky-300',
    bar: 'bg-sky-300',
    dot: 'bg-sky-300',
    glow: 'shadow-[0_0_36px_rgba(125,211,252,0.24)]',
    ring: 'ring-sky-300/40',
  },
  rose: {
    accentText: 'text-rose-300',
    accentTextStrong: 'text-rose-700',
    border: 'border-rose-300/60',
    bgSoft: 'bg-rose-300/10',
    bgStrong: 'bg-rose-300',
    bar: 'bg-rose-300',
    dot: 'bg-rose-300',
    glow: 'shadow-[0_0_36px_rgba(253,164,175,0.24)]',
    ring: 'ring-rose-300/40',
  },
  emerald: {
    accentText: 'text-emerald-300',
    accentTextStrong: 'text-emerald-700',
    border: 'border-emerald-300/60',
    bgSoft: 'bg-emerald-300/10',
    bgStrong: 'bg-emerald-300',
    bar: 'bg-emerald-300',
    dot: 'bg-emerald-300',
    glow: 'shadow-[0_0_36px_rgba(110,231,183,0.24)]',
    ring: 'ring-emerald-300/40',
  },
}

const gridBackground =
  'bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:32px_32px]'

function getAverageMetric(milestone: ResumeMilestone) {
  return Math.round(
    milestone.metrics.reduce((total, metric) => total + metric.value, 0) /
      milestone.metrics.length,
  )
}

function ResumeScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-20 z-40 h-1 w-full origin-left bg-teal-300"
      style={{ scaleX }}
    />
  )
}

function AnimatedBar({
  className,
  value,
}: {
  className: string
  value: number
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} style={{ width: `${value}%` }} />
  }

  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.6, once: false }}
      whileInView={{ width: `${value}%` }}
    />
  )
}

function DateRail({
  activeMilestoneId,
  milestones,
  onSelect,
}: {
  activeMilestoneId: string
  milestones: ResumeMilestone[]
  onSelect: (milestoneId: string) => void
}) {
  return (
    <nav
      aria-label="Resume timeline"
      className="lg:sticky lg:top-28 lg:self-start"
    >
      <p className="text-sm font-semibold uppercase text-teal-700">
        Storyline index
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {milestones.map((milestone) => {
          const isActive = milestone.id === activeMilestoneId
          const tone = toneStyles[milestone.tone]

          return (
            <button
              aria-current={isActive ? 'step' : undefined}
              className={[
                'group flex min-h-14 min-w-44 items-center gap-3 rounded-md border px-3 py-2 text-left transition lg:min-w-0',
                isActive
                  ? `${tone.border} ${tone.bgSoft} text-zinc-950 shadow-sm`
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950',
              ].join(' ')}
              key={milestone.id}
              onClick={() => onSelect(milestone.id)}
              type="button"
            >
              <span
                className={[
                  'grid h-9 w-9 shrink-0 place-items-center rounded-md text-xs font-bold',
                  isActive
                    ? `${tone.bgStrong} text-zinc-950`
                    : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200',
                ].join(' ')}
              >
                {milestone.marker}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase">
                  {milestone.period}
                </span>
                <span className="mt-0.5 block truncate text-sm font-bold">
                  {milestone.title}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function MetricBar({
  metric,
  tone,
}: {
  metric: { label: string; value: number }
  tone: ResumeTone
}) {
  const toneStyle = toneStyles[tone]

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-zinc-700">{metric.label}</span>
        <span className={`font-bold ${toneStyle.accentTextStrong}`}>
          {metric.value}%
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-md bg-zinc-200">
        <AnimatedBar
          className={`h-full rounded-md ${toneStyle.bar}`}
          value={metric.value}
        />
      </div>
    </div>
  )
}

function MilestoneCard({
  activeStackIds,
  isActive,
  milestone,
  onActivate,
  stackLabels,
}: {
  activeStackIds: Set<ResumeStackId>
  isActive: boolean
  milestone: ResumeMilestone
  onActivate: (milestoneId: string) => void
  stackLabels: Map<ResumeStackId, string>
}) {
  const shouldReduceMotion = useReducedMotion()
  const tone = toneStyles[milestone.tone]

  return (
    <motion.article
      className={[
        'relative rounded-lg border bg-white p-5 shadow-sm outline-none transition md:p-6',
        isActive
          ? `${tone.border} ${tone.glow} ring-2 ${tone.ring}`
          : 'border-zinc-200 hover:border-zinc-300 hover:shadow-md',
      ].join(' ')}
      id={milestone.id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
      onFocus={() => onActivate(milestone.id)}
      onMouseEnter={() => onActivate(milestone.id)}
      tabIndex={0}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.35, once: true }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className={[
          'absolute -left-[41px] top-7 hidden h-5 w-5 rounded-md border-4 border-[#f6f7f9] md:block',
          tone.dot,
        ].join(' ')}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className={`text-sm font-bold uppercase ${tone.accentTextStrong}`}>
            {milestone.period}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-950">
            {milestone.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-zinc-500">
            {milestone.role} · {milestone.organization}
          </p>
        </div>

        <div
          className={[
            'inline-flex w-fit items-center rounded-md border px-3 py-2 text-sm font-bold',
            tone.border,
            tone.bgSoft,
            tone.accentTextStrong,
          ].join(' ')}
        >
          Signal {getAverageMetric(milestone)}%
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-zinc-600">
        {milestone.summary}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {milestone.metrics.map((metric) => (
          <MetricBar key={metric.label} metric={metric} tone={milestone.tone} />
        ))}
      </div>

      <ul className="mt-6 grid gap-3 text-sm leading-6 text-zinc-700 md:grid-cols-3">
        {milestone.outcomes.map((outcome) => (
          <li className="flex gap-3" key={outcome}>
            <span
              aria-hidden="true"
              className={`mt-2 h-2 w-2 shrink-0 rounded-sm ${tone.dot}`}
            />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {milestone.stack.map((stackId) => (
          <span
            className={[
              'inline-flex min-h-8 items-center rounded-md border px-3 py-1 text-xs font-bold transition',
              activeStackIds.has(stackId)
                ? `${tone.border} ${tone.bgSoft} text-zinc-950`
                : 'border-zinc-200 bg-zinc-50 text-zinc-500',
            ].join(' ')}
            key={stackId}
          >
            {stackLabels.get(stackId)}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

function StackSignalPanel({
  activeStackIds,
  activeTone,
  stackSignals,
}: {
  activeStackIds: Set<ResumeStackId>
  activeTone: ResumeTone
  stackSignals: StackSignalWithUsage[]
}) {
  const tone = toneStyles[activeTone]

  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:self-start">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-700">
            Stack signal
          </p>
          <h2 className="mt-2 text-xl font-bold text-zinc-950">
            Active technology map
          </h2>
        </div>
        <div
          className={[
            'grid h-12 w-12 place-items-center rounded-md border text-sm font-black',
            tone.border,
            tone.bgSoft,
            tone.accentTextStrong,
          ].join(' ')}
        >
          {activeStackIds.size}
        </div>
      </div>

      <div className="mt-5 max-h-[calc(100vh-13rem)] space-y-4 overflow-y-auto pr-1">
        {stackSignals.map((stackSignal) => {
          const isActive = activeStackIds.has(stackSignal.id)

          return (
            <div
              className={[
                'rounded-md border p-3 transition',
                isActive
                  ? `${tone.border} ${tone.bgSoft}`
                  : 'border-zinc-200 bg-zinc-50',
              ].join(' ')}
              key={stackSignal.id}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-950">
                    {stackSignal.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase text-zinc-500">
                    {stackSignal.category} · {stackSignal.usageCount} arcs
                  </p>
                </div>
                <span
                  className={[
                    'rounded-md px-2 py-1 text-xs font-bold',
                    isActive
                      ? `${tone.bgStrong} text-zinc-950`
                      : 'bg-zinc-200 text-zinc-600',
                  ].join(' ')}
                >
                  {stackSignal.strength}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-md bg-zinc-200">
                <AnimatedBar
                  className={[
                    'h-full rounded-md',
                    isActive ? tone.bar : 'bg-zinc-400',
                  ].join(' ')}
                  value={stackSignal.strength}
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-600">
                {stackSignal.summary}
              </p>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function ActiveSignalConsole({
  activeMilestone,
}: {
  activeMilestone: ResumeMilestone
}) {
  const shouldReduceMotion = useReducedMotion()
  const tone = toneStyles[activeMilestone.tone]
  const activeScore = getAverageMetric(activeMilestone)

  return (
    <div
      className={[
        'rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-sm',
        gridBackground,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-semibold uppercase text-zinc-400">
            Active arc
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            {activeMilestone.marker} · {activeMilestone.title}
          </h2>
        </div>
        <div
          className={[
            'rounded-md border px-3 py-2 text-sm font-black',
            tone.border,
            tone.bgSoft,
            tone.accentText,
          ].join(' ')}
        >
          {activeScore}%
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
        <motion.div
          aria-hidden="true"
          className="grid aspect-square w-40 place-items-center rounded-lg border border-white/10 bg-zinc-950/80 p-3"
          initial={shouldReduceMotion ? false : { rotate: -4, scale: 0.96 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileInView={{ rotate: 0, scale: 1 }}
        >
          <div
            className="grid h-full w-full place-items-center rounded-md"
            style={{
              background: `conic-gradient(currentColor ${activeScore}%, rgba(255,255,255,0.12) 0)`,
              color:
                activeMilestone.tone === 'amber'
                  ? '#fcd34d'
                  : activeMilestone.tone === 'rose'
                    ? '#fda4af'
                    : activeMilestone.tone === 'sky'
                      ? '#7dd3fc'
                      : activeMilestone.tone === 'emerald'
                        ? '#6ee7b7'
                        : '#5eead4',
            }}
          >
            <div className="grid h-[72%] w-[72%] place-items-center rounded-md bg-zinc-950 text-center">
              <span className="text-4xl font-black text-white">
                {activeScore}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {activeMilestone.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-zinc-300">
                  {metric.label}
                </span>
                <span className={`font-black ${tone.accentText}`}>
                  {metric.value}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-md bg-white/10">
                <AnimatedBar
                  className={`h-full rounded-md ${tone.bar}`}
                  value={metric.value}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StackMatrix({
  activeMilestoneId,
  onActivate,
}: {
  activeMilestoneId: string
  onActivate: (milestoneId: string) => void
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16">
      <div className="border-t border-zinc-200 pt-10">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Role to stack matrix
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">
            Every role leaves a technical trace.
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div
            className="grid min-w-[980px] text-sm"
            style={{
              gridTemplateColumns: `220px repeat(${resumeStackSignals.length}, minmax(58px, 1fr))`,
            }}
          >
            <div className="border-b border-r border-zinc-200 bg-zinc-50 p-3 font-bold text-zinc-500">
              Story arc
            </div>
            {resumeStackSignals.map((stackSignal) => (
              <div
                className="border-b border-r border-zinc-200 bg-zinc-50 p-3 text-center text-xs font-bold uppercase text-zinc-500"
                key={stackSignal.id}
                title={stackSignal.label}
              >
                {stackSignal.label.split(' ')[0]}
              </div>
            ))}

            {resumeMilestones.map((milestone) => {
              const isActive = milestone.id === activeMilestoneId
              const tone = toneStyles[milestone.tone]

              return (
                <div className="contents" key={milestone.id}>
                  <button
                    className={[
                      'border-r border-t border-zinc-200 p-3 text-left font-bold transition',
                      isActive
                        ? `${tone.bgSoft} text-zinc-950`
                        : 'bg-white text-zinc-700 hover:bg-zinc-50',
                    ].join(' ')}
                    onClick={() => onActivate(milestone.id)}
                    onFocus={() => onActivate(milestone.id)}
                    onMouseEnter={() => onActivate(milestone.id)}
                    type="button"
                  >
                    <span className="block text-xs uppercase text-zinc-500">
                      {milestone.period}
                    </span>
                    {milestone.title}
                  </button>

                  {resumeStackSignals.map((stackSignal) => {
                    const hasStack = milestone.stack.includes(stackSignal.id)

                    return (
                      <button
                        aria-label={`${milestone.title}: ${stackSignal.label} ${
                          hasStack ? 'included' : 'not included'
                        }`}
                        className={[
                          'grid min-h-14 place-items-center border-t border-r border-zinc-200 transition',
                          isActive ? tone.bgSoft : 'bg-white hover:bg-zinc-50',
                        ].join(' ')}
                        key={stackSignal.id}
                        onClick={() => onActivate(milestone.id)}
                        onFocus={() => onActivate(milestone.id)}
                        onMouseEnter={() => onActivate(milestone.id)}
                        type="button"
                      >
                        <span
                          className={[
                            'h-4 w-4 rounded-sm transition',
                            hasStack
                              ? `${tone.dot} shadow-sm`
                              : 'bg-zinc-200 opacity-50',
                            isActive && hasStack ? 'scale-125' : '',
                          ].join(' ')}
                        />
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Education
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">
              Academic foundation
            </h2>
          </div>

          <div className="grid gap-3 md:min-w-[420px]">
            {resumeEducation.map((education) => (
              <article
                className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
                key={`${education.institution}-${education.period}`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950">
                      {education.institution}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-zinc-600">
                      {education.program}
                    </p>
                  </div>
                  <span className="rounded-md bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700">
                    {education.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {education.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ResumePage() {
  const [activeMilestoneId, setActiveMilestoneId] = useState(
    resumeMilestones[0].id,
  )
  const shouldReduceMotion = useReducedMotion()

  const activeMilestone =
    resumeMilestones.find((milestone) => milestone.id === activeMilestoneId) ??
    resumeMilestones[0]
  const activeStackIds = new Set(activeMilestone.stack)
  const stackLabels = useMemo(
    () =>
      new Map(
        resumeStackSignals.map((stackSignal) => [
          stackSignal.id,
          stackSignal.label,
        ]),
      ),
    [],
  )
  const stackSignalsWithUsage = useMemo<StackSignalWithUsage[]>(
    () =>
      resumeStackSignals.map((stackSignal) => ({
        ...stackSignal,
        usageCount: resumeMilestones.filter((milestone) =>
          milestone.stack.includes(stackSignal.id),
        ).length,
      })),
    [],
  )

  const handleSelectMilestone = (milestoneId: string) => {
    setActiveMilestoneId(milestoneId)

    const milestoneElement = document.getElementById(milestoneId)

    if (milestoneElement) {
      milestoneElement.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <div className="bg-[#f6f7f9]">
      <ResumeScrollProgress />

      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          aria-hidden="true"
          className={`absolute inset-0 opacity-70 ${gridBackground}`}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-300">
              Interactive CV
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] md:text-6xl">
              {resumeProfile.name}
            </h1>
            <p className="mt-5 text-xl font-semibold text-zinc-100">
              {resumeProfile.headline}
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              {resumeProfile.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-zinc-200">
                {resumeProfile.location}
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-zinc-200">
                {resumeProfile.language}
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-zinc-200">
                {resumeProfile.availability}
              </span>
              <span className="rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-amber-200">
                {resumeProfile.contactNote}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {resumeProfile.contactLinks.map((link) => (
                <a
                  className="inline-flex min-h-10 items-center rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                  href={link.href}
                  key={link.label}
                  rel={
                    link.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-bold uppercase text-teal-300">
                  Main technologies
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resumeProfile.primaryTechnologies.map((technology) => (
                    <span
                      className="rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-bold text-zinc-200"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-bold uppercase text-amber-300">
                  Applied knowledge
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {resumeProfile.appliedKnowledge.map((technology) => (
                    <span
                      className="rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-bold text-zinc-200"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-white">
                  {resumeMilestones.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-400">
                  story arcs
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-amber-300">
                  {resumeStackSignals.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-400">
                  stack signals
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-black text-sky-300">
                  {resumeEducation.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-400">
                  education entry
                </p>
              </div>
            </div>
          </div>

          <ActiveSignalConsole activeMilestone={activeMilestone} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[230px_minmax(0,1fr)_340px] lg:items-start">
        <DateRail
          activeMilestoneId={activeMilestoneId}
          milestones={resumeMilestones}
          onSelect={handleSelectMilestone}
        />

        <div className="relative space-y-6 md:pl-10">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[9px] top-0 hidden w-0.5 bg-zinc-200 md:block"
          />
          {resumeMilestones.map((milestone) => (
            <MilestoneCard
              activeStackIds={activeStackIds}
              isActive={milestone.id === activeMilestoneId}
              key={milestone.id}
              milestone={milestone}
              onActivate={setActiveMilestoneId}
              stackLabels={stackLabels}
            />
          ))}
        </div>

        <StackSignalPanel
          activeStackIds={activeStackIds}
          activeTone={activeMilestone.tone}
          stackSignals={stackSignalsWithUsage}
        />
      </section>

      <StackMatrix
        activeMilestoneId={activeMilestoneId}
        onActivate={setActiveMilestoneId}
      />

      <EducationSection />
    </div>
  )
}

export default ResumePage
