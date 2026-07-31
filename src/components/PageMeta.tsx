import { useEffect } from 'react'

type Props = {
  title: string
  description: string
  path?: string
}

const SITE = 'Red Eye Cafe'

function setMeta(attr: string, key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Sets document title, meta description, and canonical URL per route — for SEO. */
export default function PageMeta({ title, description, path = '/' }: Props) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)

    const origin = window.location.origin
    setMeta('property', 'og:url', `${origin}${path}`)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${origin}${path}`
  }, [title, description, path])

  return null
}

export function pageTitle(page: string) {
  return `${page} | ${SITE} · Montclair, NJ`
}
