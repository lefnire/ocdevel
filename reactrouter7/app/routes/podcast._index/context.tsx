import type {EpisodeType} from "~/routes/podcast/types";
import {createContext} from "react";

type EpisodesContext = {episodesList: EpisodeType[]}
// @ts-ignore
export const EpisodesContext = createContext<EpisodesContext>()