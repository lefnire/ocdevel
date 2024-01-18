import {createBrowserRouter, Route, Navigate } from "react-router-dom";
import {Lazy} from "./components/utils.tsx";
import React from "react";

import App from "./components/App"
const Home = () => import("./components/home/index")

const Blog = () => import("./components/blog/index")
const Posts = () => import("./components/blog/Posts")
const Post = () => import("./components/blog/Post")

const Podcasts = () => import("./components/podcasts/index")
const Recommend = () => import('./components/podcasts/Content/Recommend')
const EpisodeRoute = () => import('./components/podcasts/Content/Episode')
const ResourcesTree = () => import('./components/podcasts/Content/Resources')
const Episodes = () => import('./components/podcasts/Content/Episodes')
const Filters = () => import("./components/podcasts/Sidebar/Filters")
const About = () => import("./components/podcasts/Sidebar/About")

const Contact = () => import("./components/contact/index")

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Lazy c={Home} />},
      { path: "blog", element: <Lazy c={Blog} />, children: [
          { index: true, element: <Lazy c={Posts} />},
          // previous mistake
          { path: "20240110-fitness-desk", element: <Navigate to="/blog/20240109-fitness-desk" />},
          { path: ":id", element: <Lazy c={Post} />},
      ]},
      { path: "mlg", element: <Lazy c={Podcasts} />, children: [
        { index: true, element: <Lazy c={Episodes} />},
        { path: "resources", element: <Lazy c={ResourcesTree} />},
        { path: "recommend", element: <Lazy c={Recommend} />},
        { path: ":id", element: <Lazy c={EpisodeRoute} />},
      ]},
      { path: "contact", element: <Lazy c={Contact} />},

      // FIXME
      // <Redirect from="/podcasts(.*)" to="/mlg"/>
    ]
  }
])