import type {Route} from './+types/route.tsx'
import fs from 'fs';
import path from 'path';
import {llhShow, mlgShow, llhObj, mlgObj} from "~/content/podcast/metas.js";
import Full from './full'
import {transform} from '~/content/workflowy/mlg-resources'
import {PopoverSingleton} from "~/components/popover";

export async function loader(props: Route.LoaderArgs) {
  const {request} = props
  const podcastKey = request.url.includes('/llh') ? 'llh' : 'mlg'
  const pod = {
    mlg: {show: mlgShow, obj: mlgObj},
    llh: {show: llhShow, obj: llhObj}
  }[podcastKey]
  const parts = request.url.split('/')
  const id = parts[parts.length - 1]

  // Load the transcript, if available
  // FIXME better way to look these up
  const [series, epId] = id.startsWith('mla') ? id.split('-') : ['mlg', id]
  const transcriptPath = `./app/content/podcast/${series}/${epId}/transcript.mdx`
  let transcript: string | null = null
  // Check if we have a transcript path for this episode
  try {
    // Read the file content using Node.js fs module
    const filePath = path.resolve(transcriptPath);
    transcript = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    // console.error(`Error loading transcript for episode ${id}:`, error);
  }
  const resources = (
    podcastKey === 'llh' ? {flat: {}, top: {}, nids: []}
    : await transform({id: epId, podcast: (series as 'mlg' | 'mla')})
  )

  return {
    resources,
    podcastKey,
    show: pod.show,
    episode: pod.obj[id],
    transcript,
    i: undefined // can't remember what for?
  }
}

export default function PodcastId(props: Route.ComponentProps) {
  return <>
    <Full {...props} />
    <PopoverSingleton />
  </>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.episode.title} | ${data.show.title} Podcast`},
    {name: "description", content: data.episode.teaser},
    // Possibly helps with LCP on the iframe? Anyway, using click-to-play now
    // {
    //   tagName: "link",
    //   rel: "preconnect",
    //   href: "https://play.libsyn.com",
    // },
  ]
}