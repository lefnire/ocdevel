import List from "./podcast/podcast._index"
import {mlgShow, mlgList} from "~/content/podcast/metas.js"
import type { Route } from "./+types/mlg._index";

export default function ListMLG(props: Route.LoaderArgs) {
  return <List
    {...props}
    show={mlgShow}
    episodesList={mlgList}
    podcastKey="mlg"
  />
}