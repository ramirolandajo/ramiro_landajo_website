import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { ArrowUpRight, Check, Copy, MoveLeft } from 'lucide-react'
import { Dot } from './Section'
import { identity, links, ls, t, type Lang } from './data'

/* The form composes a mailto: — no backend, no third party, works on deploy.
   Moved off the home page on 2026-09-13: it is a destination now, not a
   footer. */
type Errors = { name?: string; email?: string; message?: string }

function ContactForm({ lang }: { lang: Lang }) {
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
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* Natural height. Stretching the form to fill the viewport turned the
          message box into a 450px pit; the page centres instead. */}
      <form
        data-fade
        onSubmit={submit}
        noValidate
        className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--card)] p-6 sm:p-7"
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
              rows={4}
              value={values.message}
              onChange={set('message')}
              placeholder={lang === 'es' ? 'Contame en qué estás pensando…' : 'Tell me what you have in mind…'}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'e-message' : undefined}
              className={`${field} mt-2 h-[clamp(7rem,19vh,15rem)] resize-y ${errors.message ? 'border-[var(--bad)]' : 'border-[var(--rule2)] focus:border-[var(--acc)]'}`}
            />
            {errors.message ? (
              <p id="e-message" className="mt-1.5 text-[0.7rem] text-[var(--bad)]">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
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

          <p aria-live="polite" className="mt-3 min-h-[1.1rem] text-[0.72rem] text-[var(--faint)]">
            {sent
              ? lang === 'es'
                ? '¿No se abrió tu aplicación de mail? Copiá la dirección de arriba.'
                : 'Mail app did not open? Copy the address above instead.'
              : ''}
          </p>
        </form>

        <div data-fade style={{ ['--i' as string]: 1 }} className="flex flex-col gap-3">
          <ul className="grid gap-3">
            {links.map((l) => {
              const href = ls(l.href, lang)
              return (
                <li key={l.id}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group/l flex items-center justify-between gap-3 rounded-xl border border-[var(--rule)] bg-[var(--card)] px-5 py-3.5 transition-colors duration-200 hover:border-[var(--acc)]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.8rem] font-bold">{ls(l.label, lang)}</span>
                      <span className="block truncate text-[0.7rem] text-[var(--faint)]">{ls(l.value, lang)}</span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--faint)] transition-transform duration-200 group-hover/l:-translate-y-0.5 group-hover/l:text-[var(--acc)]"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto rounded-xl border border-[var(--rule)] bg-[var(--card)] px-5 py-3.5">
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
  )
}

/* ============================================================================
 * /contact
 * A route rather than the bottom of a scroll. The page owns its own <title>:
 * React 19 hoists one rendered anywhere into <head>, so no Helmet.
 * ========================================================================== */
export default function ContactPage() {
  const lang = useOutletContext<Lang>()
  const es = lang === 'es'
  return (
    <>
      <title>{es ? 'Contacto — Ramiro Landajo' : 'Contact — Ramiro Landajo'}</title>
      <meta
        name="description"
        content={
          es
            ? 'Escribile a Ramiro Landajo — desarrollador backend en Java y Spring Boot, Buenos Aires.'
            : 'Get in touch with Ramiro Landajo — backend developer in Java and Spring Boot, Buenos Aires.'
        }
      />

      {/* One screen, not a section of a scroll. flex-1 fills the space Layout
          leaves between the header and the footer, and the content is centred
          in it — the <Section> rhythm is built for a long page and left a
          third of this one empty. */}
      <div className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-center px-4 pb-7 pt-24 sm:px-7 sm:pt-28">
        <div data-fade className="mb-6">
          <p className="text-[0.72rem] text-[var(--faint)]">
            <span className="text-[var(--rule2)]">// </span>
            <span className="text-[var(--acc)]">05</span>
          </p>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h1 className="text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1] tracking-[-0.045em]">
              {es ? 'Contacto' : 'Contact'}
            </h1>
            <Link
              to="/"
              className="group/b inline-flex items-center gap-2 text-[0.76rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
            >
              <MoveLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/b:-translate-x-1"
              />
              {es ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
          <div className="rule-draw mt-5 h-px w-full bg-[var(--rule2)]" />
        </div>

        <ContactForm lang={lang} />
      </div>
    </>
  )
}
