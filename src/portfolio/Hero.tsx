import { ArrowDown, FileDown, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubMark, LinkedinMark } from './BrandIcons'
import { useHeadlineBoot, useTypewriter } from '../lib/typewriter'
import { identity, t, type Lang } from './data'

/* ============================================================================
 * The hero — you are entering a terminal.
 *
 * The page arrives empty. A prompt types one short command; below it a block
 * cursor appears, blinks alone for a beat, and then writes the name out one
 * character at a time. Only once the name is finished does the rest of the
 * section fade in, and the cursor goes back to blinking where it started.
 *
 * The name typing itself is deliberate (see HANDOFF.md) — Ramiro asked for it
 * by name. Everything holds still under `prefers-reduced-motion`.
 * ========================================================================== */

/* One line of the headline. The untyped remainder stays in the flow, hidden,
   so the block never changes size and nothing below it moves. */
function Line({
  full,
  typed,
  caret,
  blink,
}: {
  full: string
  typed: string
  caret: boolean
  blink: boolean
}) {
  return (
    <>
      {typed}
      {caret ? (
        <span
          className={`${blink ? 'caret ' : ''}${typed ? 'ml-3 ' : ''}inline-block align-baseline text-[var(--acc)]`}
        >
          ▊
        </span>
      ) : null}
      <span className="invisible">{full.slice(typed.length)}</span>
    </>
  )
}

export function Hero({ lang }: { lang: Lang }) {
  const cmd = useTypewriter('whoami')
  const display = identity.display[lang]
  const boot = useHeadlineBoot(display, cmd.done)

  /* The supporting text waits for the name to finish writing itself. */
  const shown = (i: number) => ({
    style: { ['--i' as string]: i },
    className: boot.done ? 'reveal-in' : 'opacity-0',
  })
  const meta = shown(0)
  const scroll = shown(1)

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-16 pt-32 sm:px-7">
      <div className="mx-auto w-full max-w-[88rem]">
        {/* prompt */}
        <p className="text-[0.82rem] sm:text-[0.9rem]">
          <span className="text-[var(--acc)]">system@linux</span>
          <span className="text-[var(--faint)]">:~$ </span>
          <span className="text-[var(--fg)]">{cmd.out}</span>
          {!cmd.done ? <span className="caret text-[var(--acc)]">▊</span> : null}
        </p>

        {/* the answer, written out */}
        <div className="mt-7 sm:mt-10">
          <h1
            aria-label={display.join(' ')}
            className="font-extrabold leading-[0.92] tracking-[-0.055em]"
          >
            <span aria-hidden="true" className="block text-[clamp(2.9rem,11.5vw,9.5rem)]">
              <Line
                full={display[0]}
                typed={boot.out[0]}
                caret={boot.caret === 0}
                blink={!boot.typing}
              />
            </span>
            <span
              aria-hidden="true"
              className="block pl-[6%] text-[clamp(2.9rem,11.5vw,9.5rem)] md:pl-[18%]"
            >
              <Line
                full={display[1]}
                typed={boot.out[1]}
                caret={boot.caret === 1}
                blink={!boot.typing}
              />
            </span>
          </h1>
        </div>

        {/* meta + statement, the way the reference hangs small labels off a
            huge headline */}
        <div style={meta.style} className={`${meta.className} mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto]`}>
          <div>
            <p className="max-w-[54ch] text-[0.94rem] leading-[1.8] text-[var(--dim)] sm:text-[1.5rem]">
              {t(identity.role, lang)}
            </p>
            <p className="max-w-[54ch] text-[0.94rem] leading-[1.8] text-[var(--dim)] sm:text-[1rem]">
              {t(identity.tagline, lang)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href={t(identity.cv, lang)}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--acc)] px-5 py-3 text-[0.8rem] font-bold text-[var(--acc-ink)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <FileDown size={15} aria-hidden="true" />
                {lang === 'es' ? 'Ver CV' : 'View Résumé'}
              </a>
              {[
                { href: identity.github, Icon: GithubMark, label: 'GitHub' },
                { href: identity.linkedin, Icon: LinkedinMark, label: 'LinkedIn' },
                { href: `mailto:${identity.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--rule2)] text-[var(--dim)] transition-colors duration-200 hover:border-[var(--acc)] hover:text-[var(--acc)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Where the shell went. The nav button is the affordance that
                always works; this is the one that makes people try it. */}
            <p className="mt-6 text-[0.72rem] text-[var(--faint)]">
              <span className="text-[var(--rule2)]">// </span>
              {lang === 'es'
                ? 'apretá ~ en cualquier parte para abrir una consola'
                : 'press ~ anywhere for a shell'}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-10 gap-y-5 self-end text-[0.72rem] sm:grid-cols-3 lg:grid-cols-1">
            {[
              [lang === 'es' ? 'basado en' : 'based in', `${t(identity.location, lang)}, ${identity.country}`],
              [lang === 'es' ? 'zona horaria' : 'timezone', identity.tz.split('/').pop()!.replace('_', ' ') + ' · UTC−3'],
              [lang === 'es' ? 'estado' : 'status', t(identity.availability, lang)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[var(--rule2)]">{k}</dt>
                <dd className="mt-1 leading-snug text-[var(--dim)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Link
        to={{ pathname: '/', hash: '#expertise' }}
        style={scroll.style}
        className={`${scroll.className} group/s absolute inset-x-0 bottom-7 mx-auto flex w-fit items-center gap-2 text-[0.7rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]`}
      >
        <ArrowDown size={13} aria-hidden="true" className="transition-transform duration-300 group-hover/s:translate-y-1" />
        {lang === 'es' ? 'seguí bajando' : 'scroll'}
      </Link>
    </section>
  )
}
