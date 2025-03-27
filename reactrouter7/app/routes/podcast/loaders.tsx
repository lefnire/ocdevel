import * as metas from "~/content/podcast/metas";
import type {EpisodeType, ShowType} from "~/content/podcast/types";

type Loader = any
export type LoaderReturn = {
  show: ShowType,
  podcastKey: "mlg" | "llh",
  episodesList: EpisodeType [],
  episode: EpisodeType
  isResources?: boolean
}
export function loadShow({request}: Loader, id?: string): LoaderReturn {
  const llh = request.url.includes('/llh')
  const isResources = request.url.includes('/mlg/resources')
  if (llh) {
    const obj = {podcastKey: "llh", show: metas.llhShow, isResources}
    return {
      ...obj,
      episode: id ? metas.llhObj[id] : {},
      episodesList: id ? [] : metas.llhList
    }
  }
  const obj = {podcastKey: "mlg", show: metas.mlgShow, isResources}
  return {
    ...obj,
    episode: id ? metas.mlgObj[id] : {},
    episodesList: id ? [] : metas.mlgList
  }
}