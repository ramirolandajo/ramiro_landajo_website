import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Nav } from './Nav'
import { ShellDialog } from './ShellDialog'
import { identity, nav, type Lang } from './data'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ============================================================================
 * Everything that outlives a route: language, the nav and its highlight, the
 * shell overlay, scroll behaviour, and the footer. The two pages are just the
 * <Outlet>.
 * ========================================================================== */
export default function Layout() {
  const [lang, setLang] = useState<Lang>('en')
  const [spyActive, setSpyActive] = useState('home')
  const [shellOpen, setShellOpen] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()
  const home = loc.pathname === '/'
  /* Off home there is nothing to observe and one right answer, so derive it
     rather than pushing it into state from an effect. */
  const active = home ? spyActive : 'contact'

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /* Which section the nav should highlight. A callback only reports what
     CHANGED, so the set has to be held across calls or the highlight sticks.
     Keyed on the path because the sections only exist on home — child effects
     run before parent ones, so they are already mounted by the time this does. */
  useEffect(() => {
    if (!home) return
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })
        const first = nav.find((n) => visible.has(n.id))
        if (first) setSpyActive(first.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [home])

  /* Fade every section and card in once, as it arrives. This MUST re-run per
     route: [data-fade] starts at opacity 0, so a route whose elements mounted
     after the observer was built would render permanently invisible. */
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
  }, [lang, loc.pathname])

  /* One place that scrolls. Keyed on location.key rather than pathname+hash,
     because navigating to the hash you are already on produces an identical
     location and would otherwise fire nothing — `open projects` twice in a row
     has to work. */
  const prevPath = useRef(loc.pathname)
  useEffect(() => {
    const samePage = prevPath.current === loc.pathname
    prevPath.current = loc.pathname

    if (!loc.hash) {
      /* A route change with no hash must go to the top, or you land on
         /contact still scrolled to the footer you clicked from. */
      if (!samePage) window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const el = document.querySelector(loc.hash)
    if (!el) return
    /* Smooth only within a page: animating straight after a route swap runs
       from a stale offset through content that has only just mounted. And the
       CSS scroll-behavior reset under reduced motion does not reach a JS
       scrollIntoView, so the check has to happen here. */
    const behavior: ScrollBehavior = samePage && !reducedMotion() ? 'smooth' : 'auto'
    const raf = requestAnimationFrame(() => el.scrollIntoView({ behavior, block: 'start' }))
    return () => cancelAnimationFrame(raf)
  }, [loc.key, loc.hash, loc.pathname])

  /* `~` anywhere opens the shell — except while you are typing, which covers
     both the contact form and the terminal's own prompt. Ctrl/Cmd+K is the
     second binding: on Latin-American keyboard layouts backtick is a dead key
     and may never produce a keydown we can read. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el?.isContentEditable || el?.closest?.('input, textarea, select, [contenteditable]')) return
      const mod = e.ctrlKey || e.metaKey
      const palette = mod && (e.key === 'k' || e.key === 'K')
      const backtick = !mod && (e.key === '`' || e.key === '~' || e.code === 'Backquote')
      if (!palette && !backtick) return
      e.preventDefault()
      setShellOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* The terminal's `open <section>`. It navigates and lets the scroll effect
     above do the scrolling — one mechanism, and cross-route jumps come free. */
  const goto = useCallback(
    (id: string) => {
      setShellOpen(false)
      const item = nav.find((n) => n.id === id)
      if (item?.to) navigate(item.to)
      else navigate({ pathname: '/', hash: `#${id}` })
    },
    [navigate],
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[var(--acc)] focus:px-4 focus:py-2 focus:text-[0.8rem] focus:font-bold focus:text-[var(--acc-ink)]"
      >
        {lang === 'es' ? 'Ir al contenido' : 'Skip to content'}
      </a>

      <Nav lang={lang} setLang={setLang} active={active} onOpenShell={() => setShellOpen(true)} />

      {/* tabIndex so the skip link actually moves focus and not just scroll. */}
      <main id="main" tabIndex={-1}>
        <Outlet context={lang satisfies Lang} />
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
          <span className="ml-auto">React · Vite · Tailwind</span>
        </div>
      </footer>

      <ShellDialog
        open={shellOpen}
        onClose={() => setShellOpen(false)}
        lang={lang}
        setLang={setLang}
        goto={goto}
      />
    </>
  )
}
