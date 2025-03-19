import EpisodeRoute from "./podcast/podcast.$id"
import {mlgShow, mlgObj} from "~/content/podcast/fulls";
import type { Route } from "./+types/mlg.$id";

export default function EpisodeMLG(props: Route.LoaderArgs) {
  return <EpisodeRoute
    {...props}
    episode={mlgObj[props.params.id]}
    podcastKey="mlg"
    show={mlgShow}
  />
}

export function meta({params, matches}: Route.MetaArgs) {
  const {id} = params
  const e = mlgObj[id]
  return [
    { title: `${e.title} | ${mlgShow.title}` },
    { name: "description", content: e.teaser }
  ]
}