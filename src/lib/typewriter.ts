import { useEffect, useState } from 'react'

/* ============================================================================
 * Typing, in two parts.
 *
 * `useTypewriter` types one short string — the hero's `whoami` command.
 * `useHeadlineBoot` runs the sequence that follows it: a cursor appears on the
 * empty line below, blinks on its own for a beat, then writes the name out one
 * character at a time and settles back into blinking where the design ends.
 *
 * Both hold still under `prefers-reduced-motion`: the text is simply there.
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

/* --------------------------------------------------------------------------
 * The headline sequence. Four beats, in terminal order:
 *
 *   1. the command lands and its own cursor goes out
 *   2. a block cursor appears on the answer's line and blinks, alone
 *   3. the name is written, the cursor riding the end of it — solid while
 *      characters are arriving, the way a real one is
 *   4. it settles, and blinking resumes for good
 *
 * The caller starts it (`start`) once the command has finished typing.
 * -------------------------------------------------------------------------- */

const CARET_IN = 420 /* empty line, then the cursor arrives on it */
const CARET_HOLD = 940 /* it blinks alone, about one full cycle */
const NEWLINE = 260 /* the beat between one line and the next */
const SETTLE = 240 /* last character written, before blinking resumes */

type BootState = { n: number[]; caret: number; typing: boolean; done: boolean }

export function useHeadlineBoot(lines: readonly string[], start: boolean, speed = 74) {
  /* Keyed on the text, not the array: the EN and ES headlines are the same
     string, so switching language must not replay the boot. */
  const key = lines.join('\n')

  const [state, setState] = useState<BootState>(() =>
    reduced()
      ? { n: lines.map((l) => l.length), caret: lines.length - 1, typing: false, done: true }
      : { n: lines.map(() => 0), caret: -1, typing: false, done: false },
  )

  useEffect(() => {
    /* Under reduced motion the initial state is already the finished one. */
    if (!start || reduced()) return
    const all = key.split('\n')

    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))
    let t = CARET_IN

    at(t, () => setState((s) => ({ ...s, caret: 0 })))
    t += CARET_HOLD

    all.forEach((line, li) => {
      for (let i = 1; i <= line.length; i += 1) {
        t += speed
        at(t, () =>
          setState((s) => {
            const n = s.n.slice()
            n[li] = i
            return { n, caret: li, typing: true, done: false }
          }),
        )
      }
      if (li < all.length - 1) t += NEWLINE
    })

    t += SETTLE
    at(t, () => setState((s) => ({ ...s, typing: false, done: true })))

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [key, speed, start])

  return {
    /* What has been written so far, line by line. */
    out: lines.map((l, i) => (state.done ? l : l.slice(0, state.n[i] ?? 0))),
    /* Which line the cursor sits on; -1 before it appears at all. */
    caret: state.caret,
    /* Solid while characters land, blinking either side of that. */
    typing: state.typing,
    done: state.done,
  }
}
