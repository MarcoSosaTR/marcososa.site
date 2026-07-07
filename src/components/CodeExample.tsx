import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)

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
    <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 text-zinc-100 dark:border-muted/20 dark:bg-background">
      <figcaption className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 text-sm dark:border-muted/20">
        <span className="font-semibold">{label}</span>
        <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300 dark:bg-surface dark:text-muted">
          {language}
        </span>
      </figcaption>

      {hasCode ? (
        <SyntaxHighlighter
          customStyle={{
            background: '#09090b',
            margin: 0,
            minHeight: '12rem',
            padding: '1rem',
            fontSize: '0.675rem',
          }}
          language={language}
          showLineNumbers
          style={oneDark}
          wrapLongLines
        >
          {code ?? ''}
        </SyntaxHighlighter>
      ) : (
        <div className="m-4 flex min-h-48 items-center justify-center rounded-md border border-dashed border-zinc-700 px-5 py-8 text-center text-sm leading-6 text-zinc-400 dark:border-muted/30 dark:text-muted">
          {emptyMessage}
        </div>
      )}
    </figure>
  )
}
