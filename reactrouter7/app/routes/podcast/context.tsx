import type {Route} from './+types/route_mlg'
import {createContext} from "react";

type PodcastContext = Route.ComponentProps['loaderData'] & {img: string}
// @ts-ignore
export const PodcastContext = createContext<PodcastContext>()