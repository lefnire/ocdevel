import {llhShow} from "~/content/podcast/metas.js";
import Podcast from './podcast'
import img from '~/assets/logos/llh290.png?w=250&h=250&format=webp&effort=max'
import type {Route} from './+types/route_llh'

export function loader({request}: Route.LoaderArgs) {
  return {podcastKey: "llh", show: llhShow}
}

export default function RouteLLH({loaderData}: Route.ComponentProps) {
  return <>
    <Podcast {...loaderData} img={img} />
  </>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.show.title} Podcast`},
    {name: "description", content: data.show.body},
  ]
}