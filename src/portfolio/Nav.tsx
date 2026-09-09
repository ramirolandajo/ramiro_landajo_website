import { identity, nav, type Lang } from './data'

export function Nav({
  lang,
  setLang,
  active,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  active: string
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[88rem] items-center gap-4 px-4 py-3 sm:px-7">
        <a href="#home" className="shrink-0 text-[0.86rem] font-bold tracking-[-0.02em]">
          {identity.name.split(' ')[0].toLowerCase()}
          <span className="text-[var(--acc)]">.</span>
          <span className="caret text-[var(--acc)]">_</span>
        </a>

        {/* Numbered comment-style nav, lifted from the Tamal Sen reference —
            it is the cheapest possible way to say "this person writes code". */}
        <nav aria-label={lang === 'es' ? 'Secciones' : 'Sections'} className="mx-auto hidden lg:block">
          <ul className="flex items-start gap-7">
            {nav.map((n) => {
              const on = active === n.id
              return (
                <li key={n.id}>
                  <a href={`#${n.id}`} aria-current={on ? 'true' : undefined} className="group/n block">
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
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
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
          behind a hamburger — six items is not enough to earn a menu. */}
      <nav
        aria-label={lang === 'es' ? 'Secciones' : 'Sections'}
        className="overflow-x-auto border-t border-[var(--rule)] lg:hidden"
      >
        <ul className="flex min-w-max px-4 sm:px-7">
          {nav.map((n) => {
            const on = active === n.id
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`block px-3 py-2 text-[0.72rem] transition-colors duration-200 ${
                    on ? 'text-[var(--acc)]' : 'text-[var(--faint)]'
                  }`}
                >
                  <span className="text-[var(--rule2)]">// </span>
                  {n[lang]}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
