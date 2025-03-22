import {mlgList, llhList} from "./app/content/podcast/metas.js";
import blog from './app/content/blog/metas.js'

export default function getPrerenderRoutes(forSitemap) {
  const blogRoutes = blog.map(b => `/blog/${b.id}`)
  const mlgRoutes = mlgList.map(e => `/mlg/${e.id}`)
  const llhRoutes = llhList.map(e => `/llh/${e.id}`)
  const baseRoutes = [
    "/",
    "/contact",
    "/blog",
    "/mlg",
    "/mlg/resources",
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
      const prio = ['/mlg', '/walk'].includes(r) ? 1
        : ['/blog'].includes(r) ? 0.6
        : 0.3;
      return [r, prio]
    })
  )
  const lastmod = Object.fromEntries(
    routes.map((r, i) => {
      const meta = lookups[i];
      if (typeof meta === 'string' || !(meta.updated || meta.created)) {
        return [r, new Date()]
      }
      return [r, new Date(meta.updated || meta.created)]
    })
  )
  return { dynamicRoutes: routes, changeFreq, priority, lastmod }
}