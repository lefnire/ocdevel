import React from "react";
import type {Route} from './+types/route.tsx'
import fs from 'fs';
import path from 'path';
import {llhShow, mlgShow, llhObj, mlgObj} from "~/content/podcast/metas.js";
import Full from './full'


export function loader(props: Route.LoaderArgs) {
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

  return {
    podcastKey,
    show: pod.show,
    episode: pod.obj[id],
    transcript,
    i: undefined // can't remember what for?
  }
}

export default function PodcastId(props: Route.ComponentProps) {
  return <Full {...props} />
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.episode.title} | ${data.show.title} Podcast`},
    {name: "description", content: data.episode.teaser}
  ]
}