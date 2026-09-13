import { Link } from 'react-router-dom'
import { SquareTerminal } from 'lucide-react'
import { identity, nav, type Lang, type NavItem } from './data'

/* A section item scrolls, a route item navigates. `to` in the data says which,
   so neither list below has to know about contact by name. */
const linkTo = (n: NavItem) => n.to ?? { pathname: '/', hash: `#${n.id}` }

export function Nav({
  lang,
  setLang,
  active,
  onOpenShell,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  active: string
  onOpenShell: () => void
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[88rem] items-center gap-4 px-4 py-3 sm:px-7">
        <Link to="/" className="shrink-0 text-[0.86rem] font-bold tracking-[-0.02em]">
          {identity.name.split(' ')[0].toLowerCase()}
          <span className="text-[var(--acc)]">.</span>
          <span className="caret text-[var(--acc)]">_</span>
        </Link>

        {/* Numbered comment-style nav, lifted from the Tamal Sen reference —
            it is the cheapest possible way to say "this person writes code". */}
        <nav aria-label={lang === 'es' ? 'Secciones' : 'Sections'} className="mx-auto hidden lg:block">
          <ul className="flex items-start gap-7">
            {nav.map((n) => {
              const on = active === n.id
              return (
                <li key={n.id}>
                  <Link to={linkTo(n)} aria-current={on ? 'true' : undefined} className="group/n block">
                    <span
                      className={`block text-right text-[0.56rem] leading-none transition-colors duration-200 ${on ? 'text-[var(--acc)]' : 'text-[var(--rule2)]'}`}
                    >
                      {n.n}
                    </span>
                    <span
                      className={`mt-0.5 block text-[0.78rem] leading-none transition-colors duration-200 ${
                        on ? 'text-[var(--acc)]' : 'text-[var(--faint)] group-hover/n:text-[var(--fg)]'
                      }`}
                    >
                      <span className="text-[var(--rule2)]">// </span>
                      {n[lang]}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {/* The shell's only reliable affordance: the `~` hotkey is a dead
              key on Latin-American layouts, and phones have no keyboard. */}
          <button
            type="button"
            onClick={onOpenShell}
            aria-haspopup="dialog"
            aria-keyshortcuts="~"
            aria-label={lang === 'es' ? 'Abrir consola' : 'Open shell'}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--rule2)] px-2.5 py-1 text-[var(--faint)] transition-colors duration-200 hover:border-[var(--acc)] hover:text-[var(--acc)]"
          >
            <SquareTerminal size={13} aria-hidden="true" />
            <span aria-hidden="true" className="hidden text-[0.64rem] lg:inline">
              ~
            </span>
          </button>

          <div className="flex overflow-hidden rounded-full border border-[var(--rule2)]">
            {(['en', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 text-[0.64rem] uppercase transition-colors duration-200 ${
                  lang === l ? 'bg-[var(--acc)] text-[var(--acc-ink)]' : 'text-[var(--faint)] hover:text-[var(--fg)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Below lg the nav becomes its own scrollable strip rather than hiding
          behind a hamburger — five items is not enough to earn a menu. */}
      <nav
        aria-label={lang === 'es' ? 'Secciones' : 'Sections'}
        className="overflow-x-auto border-t border-[var(--rule)] lg:hidden"
      >
        <ul className="flex min-w-max px-4 sm:px-7">
          {nav.map((n) => {
            const on = active === n.id
            return (
              <li key={n.id}>
                <Link
                  to={linkTo(n)}
                  aria-current={on ? 'true' : undefined}
                  className={`block px-3 py-2 text-[0.72rem] transition-colors duration-200 ${
                    on ? 'text-[var(--acc)]' : 'text-[var(--faint)]'
                  }`}
                >
                  <span className="text-[var(--rule2)]">// </span>
                  {n[lang]}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
