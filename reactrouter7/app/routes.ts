import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("contact", "routes/contact.tsx"),
    layout("routes/blog/layout.tsx", [
      ...prefix("blog", [
        index("routes/blog/list.tsx"),
        route(":id", "routes/blog/full.tsx")
      ])

    ])
  ])

  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     { index: true, element: <Lazy c={Home} />},
  //     { path: "blog", element: <Lazy c={Blog} />, children: [
  //         { index: true, element: <Lazy c={BlogPosts} />},
  //         // previous mistake
  //         { path: "20240110-fitness-desk", element: <Navigate to="/blog/20240109-fitness-desk" />},
  //         { path: ":id", element: <Lazy c={BlogPost} />},
  //     ]},
  //     { path: "mlg", element: <Lazy c={Podcasts} />, children: [
  //       { index: true, element: <Lazy c={Episodes} />},
  //       { path: "resources", element: <Lazy c={ResourcesTree} />},
  //       { path: "recommend", element: <Lazy c={Recommend} />},
  //       { path: ":id", element: <Lazy c={EpisodeRoute} />},
  //     ]},
  //     { path: "llh", element: <Lazy c={Podcasts} />, children: [
  //       { index: true, element: <Lazy c={Episodes} />},
  //       { path: ":id", element: <Lazy c={EpisodeRoute} />},
  //     ]},
  //     { path: "contact", element: <Lazy c={Contact} />},
  //
  //     { path: "walk", element: <Navigate to="/blog/20240109-fitness-desk" />},
  //     { path: "podcasts/*", element: <Navigate to="/mlg" />},
  //     { path: "*", element: <Navigate to="/" />}
  //   ]
  // }


] satisfies RouteConfig;
