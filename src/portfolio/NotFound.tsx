import { Link, useOutletContext } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'
import type { Lang } from './data'

/* The catch-all the Vercel rewrite makes reachable: every unknown path serves
   index.html, so without this the app would render an empty <main>. */
export default function NotFound() {
  const lang = useOutletContext<Lang>()
  const es = lang === 'es'
  return (
    <>
      <title>{es ? 'No encontrado — Ramiro Landajo' : 'Not found — Ramiro Landajo'}</title>
      <section className="mx-auto flex min-h-[70svh] max-w-[88rem] flex-col justify-center px-4 py-32 sm:px-7">
        <p className="text-[0.82rem]">
          <span className="text-[var(--acc)]">system@{'linux'}</span>
          <span className="text-[var(--faint)]">:~$ </span>
          <span>cd {location.pathname}</span>
        </p>
        <p className="mt-4 text-[0.82rem] text-[var(--bad)]">
          {es ? 'no existe el directorio' : 'no such file or directory'}
        </p>
        <h1 className="mt-8 text-[clamp(2.6rem,9vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">404</h1>
        <Link
          to="/"
          className="group/b mt-10 inline-flex w-fit items-center gap-2 text-[0.8rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
        >
          <MoveLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/b:-translate-x-1"
          />
          {es ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </section>
    </>
  )
}
