import { ArrowDown, FileDown, Mail } from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons'
import { useTypewriter } from '../lib/typewriter'
import { identity, t, type Lang } from './data'

/* ============================================================================
 * The hero — you are entering a terminal.
 *
 * A prompt types one short command, the answer arrives whole beneath it, and
 * the caret keeps blinking after everything has settled. The headline itself
 * is never typed: watching a page spell out its own title is the thing that
 * makes terminal portfolios insufferable.
 * ========================================================================== */

export function Hero({ lang }: { lang: Lang }) {
  const cmd = useTypewriter('whoami')
  const [top, bottom] = identity.display[lang]

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-16 pt-32 sm:px-7">
      <div className="mx-auto w-full max-w-[88rem]">
        {/* prompt */}
        <p className="text-[0.82rem] sm:text-[0.9rem]">
          <span className="text-[var(--acc)]">ramiro@tigre</span>
          <span className="text-[var(--faint)]">:~$ </span>
          <span className="text-[var(--fg)]">{cmd.out}</span>
          {!cmd.done ? <span className="caret text-[var(--acc)]">▊</span> : null}
        </p>

        {/* the answer */}
        <div className="mt-7 sm:mt-10">
          <h1 className="font-extrabold leading-[0.92] tracking-[-0.055em]">
            <span
              style={{ ['--i' as string]: 0 }}
              className="boot-in block text-[clamp(2.9rem,11.5vw,9.5rem)]"
            >
              {top}
            </span>
            <span
              style={{ ['--i' as string]: 1 }}
              className="boot-in block pl-[6%] text-[clamp(2.9rem,11.5vw,9.5rem)] md:pl-[18%]"
            >
              {bottom}
              {cmd.done ? (
                <span className="caret ml-3 inline-block align-baseline text-[var(--acc)]">▊</span>
              ) : null}
            </span>
          </h1>
        </div>

        {/* meta + statement, the way the reference hangs small labels off a
            huge headline */}
        <div style={{ ['--i' as string]: 2 }} className="boot-in mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="max-w-[54ch] text-[0.94rem] leading-[1.8] text-[var(--dim)] sm:text-[1rem]">
              {t(identity.tagline, lang)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href={identity.cv}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--acc)] px-5 py-3 text-[0.8rem] font-bold text-[var(--acc-ink)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <FileDown size={15} aria-hidden="true" />
                {lang === 'es' ? 'Ver CV' : 'View CV'}
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

      <a
        href="#expertise"
        className="group/s absolute inset-x-0 bottom-7 mx-auto flex w-fit items-center gap-2 text-[0.7rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
      >
        <ArrowDown size={13} aria-hidden="true" className="transition-transform duration-300 group-hover/s:translate-y-1" />
        {lang === 'es' ? 'seguí bajando' : 'scroll'}
      </a>
    </section>
  )
}
