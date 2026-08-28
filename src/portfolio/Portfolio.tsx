import { useCallback, useEffect, useState } from 'react'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { Contact, Experience, Expertise, Projects, ShellSection } from './Sections'
import { identity, nav, type Lang } from './data'

const ACCENT_IDS = ['green', 'amber', 'mono']

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>('en')
  const [active, setActive] = useState('home')
  const [accent, setAccent] = useState(() => {
    try {
      const saved = localStorage.getItem('rl.accent')
      if (saved && ACCENT_IDS.includes(saved)) return saved
    } catch {
      /* storage blocked */
    }
    return 'green'
  })

  useEffect(() => {
    document.documentElement.dataset.accent = accent
    try {
      localStorage.setItem('rl.accent', accent)
    } catch {
      /* non-fatal */
    }
  }, [accent])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /* Which section the nav should highlight. A callback only reports what
     CHANGED, so the set has to be held across calls or the highlight sticks. */
  useEffect(() => {
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })
        const first = nav.find((n) => visible.has(n.id))
        if (first) setActive(first.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  /* Fade every section and card in once, as it arrives. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.seen = 'true'
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.03 },
    )
    document.querySelectorAll('[data-fade]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [lang])

  const goto = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[var(--acc)] focus:px-4 focus:py-2 focus:text-[0.8rem] focus:font-bold focus:text-[var(--acc-ink)]"
      >
        {lang === 'es' ? 'Ir al contenido' : 'Skip to content'}
      </a>

      <Nav lang={lang} setLang={setLang} accent={accent} setAccent={setAccent} active={active} />

      <main>
        <Hero lang={lang} />
        <Expertise lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <ShellSection lang={lang} setLang={setLang} setAccent={setAccent} goto={goto} />
        <Contact lang={lang} />
      </main>

      <footer className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-[88rem] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-8 text-[0.68rem] text-[var(--faint)] sm:px-7">
          <span>
            © {new Date().getFullYear()} {identity.name}
          </span>
          <span className="text-[var(--rule2)]">
            {identity.handle}@{identity.host}
            <span className="caret text-[var(--acc)]">_</span>
          </span>
          <span className="ml-auto">
            {lang === 'es' ? 'React · Vite · Tailwind' : 'React · Vite · Tailwind'}
          </span>
        </div>
      </footer>
    </>
  )
}
