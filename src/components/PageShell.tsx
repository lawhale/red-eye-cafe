import type { ReactNode } from 'react'

/** Top padding clears the fixed nav on inner pages. */
export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-[calc(100vh-12rem)]">{children}</div>
}
