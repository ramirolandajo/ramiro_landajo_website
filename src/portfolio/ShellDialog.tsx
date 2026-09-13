import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Terminal } from './Terminal'
import { identity, type Lang } from './data'

/* ============================================================================
 * The quirk, promoted.
 *
 * The shell used to be section 05 — a 26rem card you scrolled past once. It is
 * now a modal over every route, opened from the nav button or the `~` key, so
 * it costs the page no height and follows you to /contact.
 *
 * Native <dialog> rather than a hand-rolled overlay: showModal() gives the
 * focus trap, Escape, an inert background, top-layer painting (which matters —
 * the nav's backdrop-blur creates a filter context a plain fixed overlay has
 * to fight) and focus restoration to the button that opened it.
 * ========================================================================== */
export function ShellDialog({
  open,
  onClose,
  lang,
  setLang,
  goto,
}: {
  open: boolean
  onClose: () => void
  lang: Lang
  setLang: (l: Lang) => void
  goto: (id: string) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  /* Where the mouse went down. A terminal invites drag-selecting output, and
     releasing outside the panel reports a click on the dialog itself — which
     would close it mid-selection. Only a press that both starts and ends on
     the backdrop counts. */
  const downOnBackdrop = useRef(false)

  /* Never render <dialog open>: the attribute makes it NON-modal — no
     backdrop, no trap, no inert. It has to be imperative, and it has to be
     guarded, because Escape closes the node natively while React still thinks
     it is open, and a second showModal() on an open dialog throws. */
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      /* React's autoFocus is an imperative focus() at MOUNT — and this input
         mounts with the page, long before the dialog opens, so it never fires.
         showModal() then hands focus to the first focusable, which is the
         close button. Put the caret where a shell's caret belongs. */
      d.querySelector<HTMLInputElement>('#term')?.focus()
    }
    if (!open && d.open) d.close()
  }, [open])

  /* showModal() blocks interaction, not scrolling. `scrollbar-gutter: stable`
     in index.css keeps the fixed header from shifting when the bar goes. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const es = lang === 'es'

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onMouseDown={(e) => {
        downOnBackdrop.current = e.target === ref.current
      }}
      onClick={(e) => {
        if (downOnBackdrop.current && e.target === ref.current) onClose()
      }}
      aria-labelledby="shell-title"
      /* m-auto is not optional: Tailwind's preflight zeroes the UA's
         `dialog { margin: auto }`, which otherwise pins the panel top-left. */
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-[#05050799] backdrop:backdrop-blur-[2px]"
    >
      <div className="flex h-[100dvh] w-screen flex-col overflow-hidden border-[var(--rule2)] bg-[var(--card)] sm:h-[min(32rem,78vh)] sm:w-[min(52rem,92vw)] sm:rounded-xl sm:border">
        <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-2.5">
          <span id="shell-title" className="text-[0.66rem] text-[var(--faint)]">
            system@{identity.host}
          </span>
          <span className="ml-auto hidden text-[0.62rem] text-[var(--rule2)] sm:inline">
            {es ? "escribí 'help'" : "type 'help'"}
          </span>
          <button
            type="button"
            onClick={onClose}
            /* Escape does not exist on a phone. */
            aria-label={es ? 'Cerrar consola' : 'Close shell'}
            className="ml-3 inline-flex items-center gap-1.5 text-[0.62rem] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--acc)]"
          >
            <span className="hidden sm:inline">esc</span>
            <X size={14} aria-hidden="true" />
          </button>
        </div>

        <Terminal lang={lang} setLang={setLang} goto={goto} />
      </div>
    </dialog>
  )
}
