import { useState } from 'react'
import { ArrowUpRight, Check, Copy, GraduationCap, Plus } from 'lucide-react'
import { CodeFramed, Dot, Section } from './Section'
import { Terminal } from './Terminal'
import {
  certifications,
  education,
  expertise,
  identity,
  languages,
  links,
  ls,
  projectSlots,
  projectsIntro,
  roles,
  stack,
  story,
  t,
  type Lang,
  type Role,
} from './data'

/* ============================================================================
 * 02 — Expertise
 * Four areas in one bordered block with hairline dividers, each body wrapped
 * in its own code tag.
 * ========================================================================== */
export function Expertise({ lang }: { lang: Lang }) {
  return (
    <Section
      id="expertise"
      n="02"
      title={lang === 'es' ? 'Skills' : 'Expertise'}
      lede={t(story.lede, lang)}
    >
      {/* gap-px over a ruled background draws the dividers, so the hairlines
          stay correct at every breakpoint without nth-child gymnastics. */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--rule2)] bg-[var(--rule)] md:grid-cols-2 xl:grid-cols-4">
        {expertise.map((a, i) => (
          <div
            key={a.id}
            data-fade
            style={{ ['--i' as string]: i }}
            className="group/e bg-[var(--bg)] p-6 transition-colors duration-300 hover:bg-[var(--card)]"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--rule2)]">{a.sub}</p>
            <h3 className="mt-3 inline-block text-[1.05rem] font-bold leading-snug">
              <span className="bg-[var(--acc)] bg-[length:100%_0.28em] bg-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/e:bg-[length:100%_0.5em]">
                {t(a.title, lang)}
              </span>
            </h3>
            <div className="mt-5">
              <CodeFramed tag="h3">{t(a.body, lang)}</CodeFramed>
            </div>
          </div>
        ))}
      </div>

      {/* full stack, grouped */}
      <div data-fade style={{ ['--i' as string]: 4 }} className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((g) => (
          <div key={g.key}>
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--faint)]">{t(g.label, lang)}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-md border border-[var(--rule2)] px-2.5 py-1 text-[0.7rem] text-[var(--dim)] transition-colors duration-200 hover:border-[var(--acc)] hover:text-[var(--acc)]"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================
 * 03 — Experience
 * ========================================================================== */
function RoleCard({ r, lang, i }: { r: Role; lang: Lang; i: number }) {
  const [open, setOpen] = useState(r.track === 'technical')
  return (
    <article
      data-fade
      style={{ ['--i' as string]: i }}
      className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--card)] p-6 transition-colors duration-300 hover:border-[var(--rule2)]"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="tnum text-[0.7rem] text-[var(--faint)]">{r.period}</span>
        {r.current ? (
          <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-[var(--acc)]">
            <Dot /> {lang === 'es' ? 'actual' : 'current'}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-[1.12rem] font-bold leading-snug tracking-[-0.015em]">{t(r.title, lang)}</h3>
      <p className="mt-0.5 text-[0.8rem] text-[var(--acc)]">{r.org}</p>

      <div className="mt-5">
        <CodeFramed tag="p">{t(r.summary, lang)}</CodeFramed>
      </div>

      {r.stack.length ? (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {r.stack.map((s) => (
            <li key={s} className="rounded-md border border-[var(--rule2)] px-2 py-0.5 text-[0.68rem] text-[var(--dim)]">
              {s}
            </li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`role-${r.id}`}
        className="mt-5 w-fit text-[0.72rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
      >
        {open ? (lang === 'es' ? '− menos' : '− less') : lang === 'es' ? '+ qué hice' : '+ what I did'}
      </button>

      <div className="fold-grid" data-open={open}>
        <div className="overflow-hidden">
          <ul id={`role-${r.id}`} className="mt-4 space-y-2">
            {r.bullets.map((b, j) => (
              <li key={j} className="flex gap-2.5 text-[0.76rem] leading-[1.7]">
                <span aria-hidden="true" className="shrink-0 text-[var(--acc)]">
                  ›
                </span>
                <span className="text-[var(--dim)]">{t(b, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function Experience({ lang }: { lang: Lang }) {
  const technical = roles.filter((r) => r.track === 'technical')
  const other = roles.filter((r) => r.track === 'other')

  return (
    <Section id="experience" n="03" title={lang === 'es' ? 'Experiencia' : 'Experience'} alt>
      <div className="grid gap-4 lg:grid-cols-2">
        {technical.map((r, i) => (
          <RoleCard key={r.id} r={r} lang={lang} i={i} />
        ))}
      </div>

      <div data-fade className="mb-6 mt-14 flex flex-wrap items-baseline gap-x-4">
        <h3 className="text-[1.15rem] font-bold tracking-[-0.02em]">{lang === 'es' ? 'Otros roles' : 'Other roles'}</h3>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {other.map((r, i) => (
          <RoleCard key={r.id} r={r} lang={lang} i={i} />
        ))}
      </div>

      {/* education + certifications + languages */}
      <div data-fade className="mb-6 mt-14">
        <h3 className="text-[1.15rem] font-bold tracking-[-0.02em]">{lang === 'es' ? 'Formación' : 'Education'}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {education.map((e, i) => (
          <div
            key={e.id}
            data-fade
            style={{ ['--i' as string]: i }}
            className="rounded-xl border border-[var(--rule)] bg-[var(--card)] p-5"
          >
            <GraduationCap size={17} aria-hidden="true" className="text-[var(--acc)]" />
            <h4 className="mt-3 text-[0.95rem] font-bold leading-snug">{t(e.title, lang)}</h4>
            <p className="mt-1 text-[0.74rem] leading-snug text-[var(--dim)]">{e.org}</p>
            <p className="tnum mt-3 text-[0.72rem] text-[var(--faint)]">{e.period}</p>
            <p
              className={`mt-1 inline-flex items-center gap-1.5 text-[0.7rem] ${e.current ? 'text-[var(--acc)]' : 'text-[var(--faint)]'}`}
            >
              {e.current ? <Dot /> : null}
              {t(e.state, lang)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {certifications.map((c, i) => (
          <div
            key={c.org + ls(c.name, 'en')}
            data-fade
            style={{ ['--i' as string]: i }}
            className="rounded-xl border border-[var(--rule)] bg-[var(--card)] p-5"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--faint)]">
              {lang === 'es' ? 'certificación' : 'certification'}
            </p>
            <h4 className="mt-2 text-[0.95rem] font-bold">{ls(c.name, lang)}</h4>
            <p className="text-[0.74rem] text-[var(--acc)]">{c.org}</p>
            <p className="mt-2 text-[0.76rem] leading-[1.6] text-[var(--dim)]">{t(c.detail, lang)}</p>
          </div>
        ))}
      </div>

      <div data-fade className="mt-4 flex flex-wrap gap-4 rounded-xl border border-[var(--rule)] bg-[var(--card)] p-5">
        {languages.map((l) => (
          <div key={ls(l.name, 'en')} className="flex items-baseline gap-2.5">
            <span className="text-[0.88rem] font-bold">{ls(l.name, lang)}</span>
            <span className="rounded-md bg-[var(--card2)] px-2 py-0.5 text-[0.68rem] text-[var(--acc)]">
              {ls(l.level, lang)}
            </span>
            <span className="text-[0.68rem] text-[var(--faint)]">{ls(l.note, lang)}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================
 * 04 — Projects
 * Four empty slots, on Ramiro's instruction. Each states what belongs in it,
 * and the bento is sized so the real cards drop straight in.
 * ========================================================================== */
export function Projects({ lang }: { lang: Lang }) {
  return (
    <Section
      id="projects"
      n="04"
      title={t(projectsIntro.title, lang)}
      lede={t(projectsIntro.lede, lang)}
    >
      <div className="grid gap-4 md:auto-rows-[15rem] md:grid-cols-4">
        {projectSlots.map((s, i) => (
          <article
            key={s.n}
            data-fade
            style={{ ['--i' as string]: i }}
            className={`group/p flex flex-col justify-between rounded-xl border border-dashed border-[var(--rule2)] bg-[var(--card)]/40 p-6 transition-colors duration-300 hover:border-[var(--acc)] ${s.span}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="tnum text-[0.72rem] text-[var(--acc)]">{s.n}</span>
              <Plus
                size={16}
                aria-hidden="true"
                className="text-[var(--rule2)] transition-colors duration-300 group-hover/p:text-[var(--acc)]"
              />
            </div>

            <div>
              <p className="text-[clamp(1rem,2vw,1.5rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--rule2)]">
                [ {lang === 'es' ? 'PROYECTO' : 'PROJECT'} {s.n} ]
              </p>
              <p className="mt-3 max-w-[42ch] text-[0.8rem] leading-[1.65] text-[var(--dim)]">{t(s.hint, lang)}</p>
              <p className="mt-3 text-[0.68rem] leading-[1.7] text-[var(--faint)]">
                <span className="text-[var(--rule2)]">// </span>
                {t(s.fields, lang)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================
 * 05 — Shell
 * ========================================================================== */
export function ShellSection({
  lang,
  setLang,
  setAccent,
  goto,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  setAccent: (a: string) => void
  goto: (id: string) => void
}) {
  return (
    <Section
      id="shell"
      n="05"
      title={lang === 'es' ? 'Consola' : 'Shell'}
      lede={
        lang === 'es'
          ? 'Una consola de verdad. Todo lo que hace también se puede clickear en otro lado. ¡Aprendé más sobre mí!'
          : 'A real shell. Everything it does is also a click somewhere else. Learn more about me!'
      }
      alt
    >
      <div data-fade className="flex h-[26rem] flex-col overflow-hidden rounded-xl border border-[var(--rule2)] bg-[var(--card)]">
        <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-2.5">
          <span className="text-[0.66rem] text-[var(--faint)]">
            system@{identity.host}
          </span>
          <span className="ml-auto text-[0.62rem] text-[var(--rule2)]">
            {lang === 'es' ? "escribí 'help'" : "type 'help'"}
          </span>
        </div>
        <Terminal lang={lang} setLang={setLang} setAccent={setAccent} goto={goto} />
      </div>
    </Section>
  )
}

/* ============================================================================
 * 06 — Contact
 * The form composes a mailto: — no backend, no third party, works on deploy.
 * ========================================================================== */
type Errors = { name?: string; email?: string; message?: string }

export function Contact({ lang }: { lang: Lang }) {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (!values.name.trim()) e.name = lang === 'es' ? 'Decime tu nombre.' : 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = lang === 'es' ? 'Eso no parece un mail.' : 'That does not look like an email address.'
    if (!values.message.trim())
      e.message = lang === 'es' ? 'Escribí un mensaje.' : 'Add a message so I know what this is about.'
    return e
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = document.getElementById(`f-${Object.keys(e)[0]}`)
      first?.focus()
      return
    }
    const subject = values.subject.trim() || `${lang === 'es' ? 'Contacto desde el portfolio' : 'Portfolio enquiry'} — ${values.name}`
    const body = `${values.message}\n\n—\n${values.name}\n${values.email}`
    window.location.href = `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — the address is visible on screen anyway */
    }
  }

  const field =
    'w-full rounded-lg border bg-[var(--bg)] px-3.5 py-3 text-[0.82rem] text-[var(--fg)] outline-none transition-colors duration-200 placeholder:text-[var(--rule2)]'

  return (
    <Section
      id="contact"
      n="06"
      title={lang === 'es' ? 'Contacto' : 'Contact'}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <form
          data-fade
          onSubmit={submit}
          noValidate
          className="rounded-xl border border-[var(--rule)] bg-[var(--card)] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                ['name', lang === 'es' ? 'Tu nombre' : 'Your name', 'text', 'Ada Lovelace'],
                ['email', lang === 'es' ? 'Tu email' : 'Your email', 'email', 'ada@example.com'],
              ] as const
            ).map(([k, label, type, ph]) => (
              <div key={k}>
                <label htmlFor={`f-${k}`} className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--faint)]">
                  {label}
                </label>
                <input
                  id={`f-${k}`}
                  name={k}
                  type={type}
                  value={values[k]}
                  onChange={set(k)}
                  placeholder={ph}
                  aria-invalid={errors[k] ? true : undefined}
                  aria-describedby={errors[k] ? `e-${k}` : undefined}
                  className={`${field} mt-2 ${errors[k] ? 'border-[var(--bad)]' : 'border-[var(--rule2)] focus:border-[var(--acc)]'}`}
                />
                {errors[k] ? (
                  <p id={`e-${k}`} className="mt-1.5 text-[0.7rem] text-[var(--bad)]">
                    {errors[k]}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5">
            <label htmlFor="f-subject" className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--faint)]">
              {lang === 'es' ? 'Asunto' : 'Subject'}
              <span className="ml-2 normal-case tracking-normal text-[var(--rule2)]">
                {lang === 'es' ? '(opcional)' : '(optional)'}
              </span>
            </label>
            <input
              id="f-subject"
              name="subject"
              value={values.subject}
              onChange={set('subject')}
              placeholder={lang === 'es' ? 'Vacante backend junior' : 'Junior backend role'}
              className={`${field} mt-2 border-[var(--rule2)] focus:border-[var(--acc)]`}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="f-message" className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--faint)]">
              {lang === 'es' ? 'Mensaje' : 'Message'}
            </label>
            <textarea
              id="f-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={set('message')}
              placeholder={lang === 'es' ? 'Contame en qué estás pensando…' : 'Tell me what you have in mind…'}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'e-message' : undefined}
              className={`${field} mt-2 resize-y ${errors.message ? 'border-[var(--bad)]' : 'border-[var(--rule2)] focus:border-[var(--acc)]'}`}
            />
            {errors.message ? (
              <p id="e-message" className="mt-1.5 text-[0.7rem] text-[var(--bad)]">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--acc)] px-5 py-3 text-[0.8rem] font-bold text-[var(--acc-ink)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {lang === 'es' ? 'Redactar mail' : 'Compose email'}
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--rule2)] px-4 py-3 text-[0.78rem] text-[var(--dim)] transition-colors duration-200 hover:border-[var(--acc)] hover:text-[var(--acc)]"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? (lang === 'es' ? 'copiado' : 'copied') : identity.email}
            </button>
          </div>

          <p aria-live="polite" className="mt-4 min-h-[1.2rem] text-[0.72rem] text-[var(--faint)]">
            {sent
              ? lang === 'es'
                ? '¿No se abrió tu aplicación de mail? Copiá la dirección de arriba.'
                : 'Mail app did not open? Copy the address above instead.'
              : ''}
          </p>
        </form>

        <div data-fade style={{ ['--i' as string]: 1 }} className="flex flex-col gap-4">
          <ul className="grid gap-3">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group/l flex items-center justify-between gap-3 rounded-xl border border-[var(--rule)] bg-[var(--card)] px-5 py-4 transition-colors duration-200 hover:border-[var(--acc)]"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.8rem] font-bold">{ls(l.label, lang)}</span>
                    <span className="block truncate text-[0.7rem] text-[var(--faint)]">{l.value}</span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--faint)] transition-transform duration-200 group-hover/l:-translate-y-0.5 group-hover/l:text-[var(--acc)]"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-[var(--rule)] bg-[var(--card)] px-5 py-4">
            <p className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] text-[var(--acc)]">
              <Dot /> {lang === 'es' ? 'disponible' : 'available'}
            </p>
            <p className="mt-2 text-[0.8rem] leading-[1.65] text-[var(--dim)]">{t(identity.availability, lang)}</p>
            <p className="mt-1 text-[0.72rem] text-[var(--faint)]">
              {t(identity.location, lang)}, {identity.country} · UTC−3
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
