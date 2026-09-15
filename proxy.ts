import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Next's file-convention metadata routes (icon.tsx, opengraph-image.tsx)
  // are root-level, not per-locale — without excluding them here, this
  // middleware redirects /icon to /en/icon, which doesn't exist, and the
  // favicon silently 404s in every browser.
  matcher: ['/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)'],
}
