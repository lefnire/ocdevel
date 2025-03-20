import React from "react";
import type { Route } from "../+types/mlg.$id.tsx"
import type {EpisodeComponent} from "~/routes/podcast/episode/utils";
import Full from "./episode/full"

type EpisodeLoaderArgs = Route.LoaderArgs & EpisodeComponent
export default function EpisodeRoute(props: EpisodeLoaderArgs) {
  return <Full
    {...props}
    teaser={false}
  />
}
