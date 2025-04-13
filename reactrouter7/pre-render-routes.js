import {mlgList, llhList} from "./app/content/podcast/metas.js";
import blog from './app/content/blog/metas.js'

export const ssr = false

export default function getPrerenderRoutes(forSitemap) {
  const blogRoutes = blog.map(b => `/blog/${b.id}`)
  const mlgRoutes = mlgList.map(e => `/mlg/${e.id}`)
  const llhRoutes = llhList.map(e => `/llh/${e.id}`)
  const baseRoutes = [
    "/",
    "/blog",
    "/mlg",
    "/mlg/resources",
    "/mlg/recommend",
    "/llh",
    "/walk",
  ]
  const routes = [
    ...baseRoutes,
    ...blogRoutes,
    ...mlgRoutes,
    ...llhRoutes,
  ]
  if (!forSitemap) { return routes }

  // TODO put these in the meta.js files
  const changeFreq = Object.fromEntries(
    routes.map(r => {
      const freq = ['/mlg', '/blog', '/llh'].includes(r) ? 'monthly'
        : ['/walk'].includes(r) ? 'daily'
          : 'yearly'
      return [r, freq]
    })
  )
  const lookups = [
    ...baseRoutes,
    ...blog,
    ...mlgList,
    ...llhList
  ]
  const priority = Object.fromEntries(
    routes.map(r => {
      const prio = {
        '/': 0.1,
        '/mlg': 1,
        '/walk': 1,
        '/blog': 0.6,
        '/mlg/mla-22': 0.8,
        '/blog/20240110-ergo-mouse-keyboard': 0.8,
        '/blog/20250408-trackball-mouse': 0.8,
        '/blog/20210108-how-to-use-habitica': 0.8,
      }[r]
      if (prio) { return [r, prio] }
      if (r === '/mlg/recommend') { return [r, 0] }
      if (r === '/mlg/resources') { return [r, 0.2] }
      if (r.startsWith('/mlg')) {
        return [r, 0.6]
      }
      return [r, 0.3]
    })
  )
  console.log(priority)
  const lastmod = Object.fromEntries(
    routes.map((r, i) => {
      if (r === "/walk") { return new Date() }
      const meta = lookups[i];
      if (typeof meta === 'string' || !(meta.updated || meta.created)) {
        return [r, new Date()]
      }
      return [r, new Date(meta.updated || meta.created)]
    })
  )
  return { dynamicRoutes: routes, changeFreq, priority, lastmod }
}