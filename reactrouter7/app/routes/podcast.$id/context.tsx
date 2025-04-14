import {createContext} from "react";
import type {Route} from './+types/route'

type EpisodeContext = Route.ComponentProps['loaderData']

// @ts-ignore
export const EpisodeContext = createContext<EpisodeContext>()