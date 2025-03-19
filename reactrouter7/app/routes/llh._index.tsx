import List from "./podcast/podcast._index"
import {llhShow, llhList} from "~/content/podcast/metas.js"
import type { Route } from "./+types/llh._index";

export default function ListLLH(props: Route.LoaderArgs) {
  return <List
    {...props}
    show={llhShow}
    episodesList={llhList}
    podcastKey="llh"
  />
}