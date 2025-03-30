import React from 'react';
import {mlgShow} from "~/content/podcast/metas.js";
import Podcast from './podcast'
import Navbar from './navbar'
import img from "~/assets/logos/MLG-Option-1.jpg?w=290&h=290&format=webp&effort=max"
import type {Route} from './+types/route_mlg'

export function loader({request}: Route.LoaderArgs) {
  return {podcastKey: "mlg", show: mlgShow}
}

export default function RouteMLG({loaderData}: Route.ComponentProps) {
  return <>
    <Navbar />
    <Podcast {...loaderData} img={img} />
  </>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.show.title} Podcast`},
    {name: "description", content: data.show.body}
  ]
}