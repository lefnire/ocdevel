import Episode from "~/components/podcast/podcast.$id.tsx"
import {llh, llhEpisodesObj} from "~/content/podcast";

export default function EpisodeLLH(props) {
  return <Episode {...props} />
}

export function meta({params, matches}) {
  const episodes = llhEpisodesObj
  const show = llh
  const {id} = params
  const e = episodes[id]
  return [
    { title: `${e.title} | ${show.title}` },
    { name: "description", content: e.teaser }
  ]
}