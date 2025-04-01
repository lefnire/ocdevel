import {
  layout,
  type RouteConfig,
  index,
  route,
  prefix
} from "@react-router/dev/routes";
import {llhList, mlgList} from "./app/content/podcast/metas.js";
import blogList from './app/content/blog/metas.js'

// export default flatRoutes() satisfies RouteConfig;

// 378e6c99 for routes SDK

type Id = {id: string | number, jsx?: boolean}
export default [
  // route("test", "routes/test.tsx"),
  layout("routes/layout.tsx", [
    index("routes/_index.tsx"),
    route("walk", "routes/walk/route.tsx"),
    route("blog", "routes/blog/route.tsx", [
      index("routes/blog._index.tsx"),
      layout("routes/blog.$id.tsx",
        blogList.map((ep: Id) => {
          const id = `${ep.id}`
          const ext = ep.jsx ? 'tsx' : 'mdx'
          return route(id, `content/blog/${id}/route.${ext}`, {id: `blog.${id}`})
        })
      )
    ]),
    route("mlg/resources", "routes/mlg.resources/route.tsx", {id: "mlg.resources"}),
    route("mlg", "routes/podcast/route_mlg.tsx", {id: "mlg"}, [
      index("routes/podcast._index/route.tsx", {id: "mlg._index"}),
      route("recommend", "routes/mlg.recommend.tsx", {id: 'mlg.recommend'}),
      layout("routes/podcast.$id/route.tsx", {id: "mlg._podcast.$id"},
        mlgList.map((ep: Id) => {
          const id = `${ep.id}`
          const [path, modId] = id.startsWith('mla') ? id.split('-') : ['mlg', id]
          return route(id, `content/podcast/${path}/${modId}/route.mdx`, {id: `${path}.${modId}`})
        })
      )
    ]),
    route("llh", "routes/podcast/route_llh.tsx", {id: "llh"}, [
      index("routes/podcast._index/route.tsx", {id: "llh._index"}),
      layout("routes/podcast.$id/route.tsx", {id: "llh._podcast.$id"},
        llhList.map((ep: Id) => {
          const id = `${ep.id}`;
          return route(id, `content/podcast/llh/${id}/route.mdx`, {id: `llh.${id}`})
        })
      ),
    ]),
  ]),

  route("*", "routes/$.tsx"),

] satisfies RouteConfig;
