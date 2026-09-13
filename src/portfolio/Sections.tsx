import { useState } from 'react'
import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CodeFramed, Dot, Section } from './Section'
import {
  certifications,
  education,
  expertise,
  languages,
  links,
  ls,
  projects,
  projectsIntro,
  roles,
  stack,
  story,
  t,
  type Lang,
  type Project,
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
        {expertise.map((area, i) => (
          <div
            key={area.id}
            data-fade
            style={{ ['--i' as string]: i }}
            className="group/e bg-[var(--bg)] p-7 transition-colors duration-300 hover:bg-[var(--card)] sm:p-8"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--acc)]">{area.sub}</p>
            <h3 className="mt-3 inline-block text-[1.05rem] font-bold leading-snug">
              {/* solid marker chip: --acc-ink on --acc reads ~12:1, where the
                  old white-on-green sat at 1.5:1 and was effectively unreadable. */}
              <span className="inline-block rounded-[3px] bg-[var(--acc)] px-2 py-1 text-[var(--acc-ink)]">
                {t(area.title, lang)}
              </span>
            </h3>
            <div className="mt-5">
              <CodeFramed tag="h3">{t(area.body, lang)}</CodeFramed>
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
 * A bento in Ramiro's order of weight: the platform takes 2x2 and the two
 * mobile apps stand next to it as tall 1x2 columns — their screenshots are
 * portrait, so the shape of the card is the shape of the thing. The three
 * tile one full four-column row.
 *
 * Each card's title is the link, stretched over the whole card by the ::after,
 * so the card is clickable without a single unlabelled div.
 * ========================================================================== */
function ProjectCard({ p, lang, i }: { p: Project; lang: Lang; i: number }) {
  return (
    <article
      data-fade
      style={{ ['--i' as string]: i }}
      className={`pcard group/p relative flex flex-col overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--card)] transition-colors duration-300 focus-within:border-[var(--acc)] hover:border-[var(--rule2)] ${p.span}`}
    >
      {p.shot ? (
        /* A portrait screenshot in a full-width card would zoom to nothing but
           its own header, so the phone shots are capped and centred; the wide
           one takes the whole card. Both settle at 15rem once the bento tiles. */
        <div
          className={`shot flex shrink-0 justify-center overflow-hidden border-b border-[var(--rule)] bg-[var(--bg)] xl:h-[15rem] ${
            p.shot.shape === 'phone' ? 'h-72' : 'h-52 sm:h-60'
          }`}
        >
          <img
            src={p.shot.src}
            width={p.shot.w}
            height={p.shot.h}
            alt={t(p.shot.alt, lang)}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover object-top ${p.shot.shape === 'phone' ? 'max-w-[22rem]' : ''}`}
          />
        </div>
      ) : null}

      {/* Rows rather than flex: the stack and the repo line stay pinned to the
          bottom of the tile however short the prose above them runs. */}
      <div className="grid min-w-0 flex-1 grid-rows-[1fr_auto] p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem]">
            <span className="tnum text-[var(--acc)]">{p.n}</span>
            <span className="text-[var(--faint)]">{t(p.team, lang)}</span>
          </div>

          <h3 className="mt-2.5 text-[clamp(1.1rem,1.7vw,1.5rem)] font-bold leading-tight tracking-[-0.03em]">
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${ls(p.name, lang)} — ${t(projectsIntro.repo, lang)} · GitHub`}
              className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-[var(--acc)]"
            >
              {ls(p.name, lang)}
            </a>
          </h3>
          <p className="mt-1 text-[0.76rem] text-[var(--acc)]">{t(p.kind, lang)}</p>

          <div className="mt-4 max-w-[68ch]">
            <CodeFramed tag="p">{t(p.summary, lang)}</CodeFramed>
          </div>

          {p.mine ? (
            <p className="mt-4 max-w-[68ch] text-[0.76rem] leading-[1.7] text-[var(--dim)]">
              <span className="text-[var(--rule2)]">// </span>
              <span className="text-[var(--acc)]">{t(projectsIntro.mine, lang)}: </span>
              {t(p.mine, lang)}
            </p>
          ) : null}
        </div>

        <div className="pt-7">
          <ul className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-[var(--rule2)] px-2 py-0.5 text-[0.68rem] text-[var(--dim)]"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* Decorative: the <a> on the title already carries this destination. */}
          <p
            aria-hidden="true"
            className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] text-[var(--faint)] transition-colors duration-200 group-hover/p:text-[var(--acc)]"
          >
            {t(projectsIntro.repo, lang)}
            <ArrowUpRight size={13} />
          </p>
        </div>
      </div>
    </article>
  )
}

export function Projects({ lang }: { lang: Lang }) {
  return (
    <Section id="projects" n="04" title={t(projectsIntro.title, lang)}>
      <div className="grid gap-4 md:grid-cols-2 xl:auto-rows-[minmax(15rem,auto)] xl:grid-cols-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} lang={lang} i={i} />
        ))}
      </div>
    </Section>
  )
}

/* ============================================================================
 * 05 — Contact, as a call to action
 * The form lives at /contact now. What stays here is the invitation and the
 * two links that beat any form: the address and LinkedIn. The id survives so
 * /#contact still resolves and the scroll-spy still has a target at the foot
 * of the page.
 * ========================================================================== */
export function ContactCta({ lang }: { lang: Lang }) {
  const direct = links.filter((l) => l.id === 'email' || l.id === 'linkedin')
  return (
    <Section id="contact" n="05" title={lang === 'es' ? 'Contacto' : 'Contact'} alt>
      <div
        data-fade
        className="flex flex-col gap-8 rounded-xl border border-[var(--rule)] bg-[var(--card)] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-[46ch]">
          <p className="text-[clamp(1.3rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.035em]">
            {lang === 'es'
              ? '¿Tenés algo en mente? Escribime.'
              : 'Got something in mind? Write to me.'}
          </p>
          <p className="mt-3 text-[0.86rem] leading-[1.75] text-[var(--dim)]">
            {lang === 'es'
              ? 'Busco puestos de backend o full-stack, en Buenos Aires o remoto. Respondo todos los mensajes.'
              : 'Open to backend or full-stack roles, in Buenos Aires or remote. I answer every message.'}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--acc)] px-6 py-3.5 text-[0.84rem] font-bold text-[var(--acc-ink)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {lang === 'es' ? 'Abrir el formulario' : 'Open the form'}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          {/* The form is one click away; these are zero. */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.74rem]">
            {direct.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
                >
                  <span className="text-[var(--rule2)]">// </span>
                  {l.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
