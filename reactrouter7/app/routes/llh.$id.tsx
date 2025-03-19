import EpisodeRoute from "./podcast/podcast.$id"
import {llhShow, llhObj} from "~/content/podcast/fulls";
import type { Route } from "./+types/llh.$id";

export default function EpisodeLLH(props: Route.LoaderArgs) {
  return <EpisodeRoute
    {...props}
    episode={llhObj[props.params.id]}
    podcastKey="llh"
    show={llhShow}
  />
}

export function meta({params, matches}: Route.MetaArgs) {
  const {id} = params
  const e = llhObj[id]
  return [
    { title: `${e.title} | ${llhShow.title}` },
    { name: "description", content: e.teaser }
  ]
}