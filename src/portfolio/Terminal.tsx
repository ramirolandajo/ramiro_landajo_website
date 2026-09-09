import { useEffect, useRef, useState } from 'react'
import {
  certifications,
  education,
  fetchLines,
  identity,
  languages,
  links,
  ls,
  monogram,
  roles,
  stack,
  story,
  t,
  type Lang,
} from './data'

/* ============================================================================
 * The quirk.
 *
 * A working shell, sized as one tile on the board rather than as the frame
 * around the page. Everything it can do is also a click somewhere else — it is
 * a shortcut for people who enjoy shortcuts, never a toll gate.
 * ========================================================================== */

type Line = { id: number; kind: 'in' | 'out' | 'err' | 'dim' | 'acc'; text: string }

const TARGETS = ['about', 'work', 'stack', 'education', 'contact']
const pad = (s: string, n: number) => s + ' '.repeat(Math.max(0, n - s.length))

const HELP: Record<Lang, string[]> = {
  en: [
    'whoami          the short version',
    'neofetch        system info, but the system is me',
    'ls              sections on this page',
    'open <section>  scroll to one',
    'work            roles, technical first',
    'stack [group]   what I build with',
    'edu             degrees and certifications',
    'contact         every way to reach me',
    'lang [en|es]    switch language',
    'clear',
  ],
  es: [
    'whoami          la versión corta',
    'neofetch        info del sistema, pero el sistema soy yo',
    'ls              secciones de esta página',
    'open <sección>  ir a una',
    'work            roles, primero lo técnico',
    'stack [grupo]   con qué construyo',
    'edu             títulos y certificaciones',
    'contact         formas de contactarme',
    'lang [en|es]    cambiar idioma',
    'clear',
  ],
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  goto: (id: string) => void
}

type Out = { kind: Line['kind']; text: string }

function run(raw: string, ctx: Ctx): { out: Out[]; clear?: boolean } {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  const arg = (args[0] ?? '').toLowerCase()
  const { lang } = ctx
  const es = lang === 'es'
  const O = (text: string, kind: Line['kind'] = 'out') => ({ kind, text })

  switch (cmd.toLowerCase()) {
    case '':
      return { out: [] }

    case 'help':
    case '?':
      return { out: HELP[lang].map((l) => O(l)) }

    case 'whoami':
      return {
        out: [
          O(`${identity.name} — ${t(identity.role, lang)}`, 'acc'),
          O(t(story.lede, lang)),
        ],
      }

    case 'neofetch': {
      const rows = fetchLines.map((f) => `${pad(f.k, 8)} ${t(f.v, lang)}`)
      const art = monogram
      const height = Math.max(art.length, rows.length)
      const out: Out[] = []
      for (let i = 0; i < height; i++) {
        out.push(O(`${pad(art[i] ?? '', 16)}${rows[i] ?? ''}`, i < art.length ? 'acc' : 'out'))
      }
      return { out }
    }

    case 'ls':
      return { out: [O(TARGETS.join('   '))] }

    case 'cd':
    case 'open': {
      if (!arg) return { out: [O(es ? 'uso: open <sección>' : 'usage: open <section>', 'err')] }
      const match = TARGETS.find((s) => s.startsWith(arg))
      if (!match)
        return {
          out: [
            O(es ? `open: no existe: ${args[0]}` : `open: no such section: ${args[0]}`, 'err'),
            O(TARGETS.join(', '), 'dim'),
          ],
        }
      ctx.goto(match)
      return { out: [O(`→ ${match}`, 'acc')] }
    }

    case 'work':
    case 'exp': {
      const out: Out[] = []
      for (const track of ['technical', 'other'] as const) {
        out.push(
          O(track === 'technical' ? (es ? '── técnico ──' : '── technical ──') : es ? '── otros ──' : '── other ──', 'dim'),
        )
        for (const r of roles.filter((x) => x.track === track)) {
          out.push(O(`  ${pad(r.period, 18)} ${t(r.title, lang)} · ${r.org}`))
        }
      }
      return { out }
    }

    case 'stack': {
      const groups = arg ? stack.filter((g) => g.key.startsWith(arg)) : stack
      if (!groups.length)
        return {
          out: [
            O(es ? `stack: grupo desconocido: ${args[0]}` : `stack: unknown group: ${args[0]}`, 'err'),
            O(stack.map((g) => g.key).join(', '), 'dim'),
          ],
        }
      return { out: groups.map((g) => O(`  ${pad(g.key, 12)} ${g.items.join(', ')}`)) }
    }

    case 'edu':
      return {
        out: [
          ...education.map((e) => O(`  ${pad(e.period, 13)} ${t(e.title, lang)} — ${t(e.state, lang)}`)),
          O(es ? '  certificaciones:' : '  certifications:', 'dim'),
          ...certifications.map((c) => O(`    ${ls(c.name, lang)} — ${c.org}`)),
          O(es ? '  idiomas:' : '  languages:', 'dim'),
          ...languages.map((l) => O(`    ${ls(l.name, lang)} — ${ls(l.level, lang)}`)),
        ],
      }

    case 'contact':
      return { out: links.map((l) => O(`  ${pad(ls(l.label, lang), 10)} ${l.value}`)) }

    case 'lang': {
      const next = arg === 'en' || arg === 'es' ? arg : lang === 'en' ? 'es' : 'en'
      ctx.setLang(next)
      return { out: [O(next === 'es' ? 'idioma: español' : 'language: english', 'acc')] }
    }

    case 'clear':
      return { out: [], clear: true }

    case 'sudo':
      return {
        out: [
          O(
            es
              ? 'sudo: ramiro no está en el archivo sudoers. Se reportará este incidente.'
              : 'sudo: ramiro is not in the sudoers file. This incident will be reported.',
            'err',
          ),
        ],
      }

    default:
      return {
        out: [
          O(es ? `${cmd}: comando no encontrado` : `${cmd}: command not found`, 'err'),
          O(es ? "escribí 'help'" : "type 'help'", 'dim'),
        ],
      }
  }
}

const TONE: Record<Line['kind'], string> = {
  in: 'text-[var(--fg)]',
  out: 'text-[var(--dim)]',
  err: 'text-[var(--warn)]',
  dim: 'text-[var(--faint)]',
  acc: 'text-[var(--acc)]',
}

export function Terminal({
  lang,
  setLang,
  goto,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  goto: (id: string) => void
}) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const seq = useRef(0)

  useEffect(() => {
    seq.current = 0
    setLines([
      { id: seq.current++, kind: 'dim', text: `${lang === 'es' ? 'Descubrí más sobre mí con ésta consola funcional' : 'Find out more about me with this working shell!'}` },
      {
        id: seq.current++,
        kind: 'dim',
        text: lang === 'es' ? "probá 'help', 'neofetch' o 'whoami'." : "try 'help', 'neofetch' or 'whoami'.",
      },
    ])
  }, [lang])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = value
    setValue('')
    if (raw.trim()) {
      setHistory((h) => [raw, ...h].slice(0, 40))
      setHIdx(-1)
    }
    const res = run(raw, { lang, setLang, goto })
    if (res.clear) {
      setLines([])
      return
    }
    setLines((prev) => [
      ...prev,
      { id: seq.current++, kind: 'in', text: raw },
      ...res.out.map((o) => ({ id: seq.current++, kind: o.kind, text: o.text })),
    ])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    if (!history.length) return
    e.preventDefault()
    const next = e.key === 'ArrowUp' ? Math.min(hIdx + 1, history.length - 1) : Math.max(hIdx - 1, -1)
    setHIdx(next)
    setValue(next === -1 ? '' : history[next])
  }

  const prompt = `system@linux:~$`

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={logRef}
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 overflow-y-auto px-5 pb-2 pt-3 text-[0.72rem] leading-[1.75]"
      >
        {lines.map((l) => (
          <p key={l.id} className={`out-in whitespace-pre-wrap break-words ${TONE[l.kind]}`}>
            {l.kind === 'in' ? <span className="text-[var(--acc)]">{prompt} </span> : null}
            {l.text}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-[var(--rule)] px-5 py-3">
        <label htmlFor="term" className="shrink-0 text-[0.72rem] text-[var(--acc)]">
          {prompt}
        </label>
        <input
          id="term"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          aria-label={lang === 'es' ? 'Escribí un comando' : 'Type a command'}
          placeholder="help"
          className="min-w-0 flex-1 border-0 bg-transparent text-[0.72rem] text-[var(--fg)] caret-[var(--acc)] outline-none placeholder:text-[var(--rule2)]"
        />
      </form>
    </div>
  )
}
