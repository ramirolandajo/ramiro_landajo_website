import { useEffect, useState } from 'react'

/* ============================================================================
 * Types a short string one character at a time.
 *
 * Used only for the hero's `whoami` prompt — the command, never the headline.
 * The headline arrives whole; watching a page spell out its own title is the
 * thing everyone hates about terminal portfolios.
 * ========================================================================== */

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTypewriter(text: string, speed = 58, startDelay = 260) {
  const [state, setState] = useState(() => ({ text, n: reduced() ? text.length : 0 }))

  /* Derive on change during render, so a new string is correct immediately and
     the effect below is left to do only what it is for: driving the timer. */
  if (state.text !== text) setState({ text, n: reduced() ? text.length : 0 })

  useEffect(() => {
    if (reduced()) return
    let i = 0
    let tid = 0
    const step = () => {
      i += 1
      setState({ text, n: i })
      if (i < text.length) tid = window.setTimeout(step, speed)
    }
    tid = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(tid)
  }, [text, speed, startDelay])

  const n = state.text === text ? state.n : 0
  return { out: text.slice(0, n), done: n >= text.length }
}
