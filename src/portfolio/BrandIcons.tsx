/* Brand marks. lucide dropped these for trademark reasons, and a brand glyph
   should be the real mark rather than a generic approximation — so they are
   authored here, sized and coloured to sit with the lucide set. */

export function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function LinkedinMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.58 16V5.19H0V16h3.58ZM1.79 3.72c1.25 0 2.02-.83 2.02-1.86C3.79.8 3.04 0 1.82 0 .59 0-.21.8-.21 1.86c0 1.03.77 1.86 1.98 1.86h.02ZM5.56 16h3.58v-6.04c0-.32.02-.64.12-.87.26-.64.85-1.31 1.84-1.31 1.3 0 1.82.99 1.82 2.44V16H16.5V9.81c0-3.31-1.77-4.85-4.12-4.85-1.92 0-2.77 1.06-3.24 1.79h.02V5.19H5.56c.05 1.01 0 10.81 0 10.81Z" />
    </svg>
  )
}
