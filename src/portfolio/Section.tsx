import type { ReactNode } from 'react'

/* Shared section frame: the number, the heading, and a rule that draws itself
   in as the heading arrives. */
export function Section({
  id,
  n,
  title,
  lede,
  children,
  alt = false,
}: {
  id: string
  n: string
  title: string
  lede?: string
  children: ReactNode
  alt?: boolean
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[var(--rule)] py-20 sm:py-28 ${alt ? 'bg-[var(--bg2)]' : ''}`}
    >
      <div className="mx-auto max-w-[88rem] px-4 sm:px-7">
        <div data-fade className="mb-12">
          <p className="text-[0.72rem] text-[var(--faint)]">
            <span className="text-[var(--rule2)]">// </span>
            <span className="text-[var(--acc)]">{n}</span>
          </p>
          <h2 className="mt-2 text-[clamp(2rem,5.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.045em]">
            {title}
          </h2>
          <div className="rule-draw mt-6 h-px w-full bg-[var(--rule2)]" />
          {lede ? (
            <p className="mt-6 max-w-[62ch] text-[0.92rem] leading-[1.75] text-[var(--dim)]">{lede}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}

/* The `<h3> … </h3>` framing from the Tamal Sen reference. It costs two dim
   lines and instantly reads as code rather than as marketing copy. */
export function CodeFramed({ tag = 'p', children }: { tag?: string; children: ReactNode }) {
  return (
    <div className="text-[0.78rem] leading-[1.75]">
      <span className="text-[var(--rule2)]">&lt;{tag}&gt;</span>
      <div className="my-1 border-l border-[var(--rule2)] pl-4 text-[var(--dim)]">{children}</div>
      <span className="text-[var(--rule2)]">&lt;/{tag}&gt;</span>
    </div>
  )
}

export function Dot({ on = true }: { on?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${on ? 'bg-[var(--acc)]' : 'bg-[var(--rule2)]'}`}
    />
  )
}
