type CodeExampleProps = {
  label: string
  code?: string
  language?: string
  emptyMessage?: string
}

export function CodeExample({
  label,
  code,
  language = 'tsx',
  emptyMessage = 'Code snippet placeholder',
}: CodeExampleProps) {
  const hasCode = Boolean(code?.trim())

  return (
    <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 text-zinc-100">
      <figcaption className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 text-sm">
        <span className="font-semibold">{label}</span>
        <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
          {language}
        </span>
      </figcaption>

      {hasCode ? (
        <pre className="min-h-48 overflow-x-auto p-4 text-sm leading-6">
          <code>{code}</code>
        </pre>
      ) : (
        <div className="flex min-h-48 items-center justify-center border border-dashed border-zinc-700 m-4 rounded-md px-5 py-8 text-center text-sm leading-6 text-zinc-400">
          {emptyMessage}
        </div>
      )}
    </figure>
  )
}
