import React, {useMemo} from "react";
import {Card, Alert} from 'react-bootstrap'
import {Link, Outlet} from "react-router";
import {BackButton} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import {ResourceNode} from '~/routes/mlg.resources/tree'
import {episodes as episodeResources, flat} from '~/content/podcast/resources'
import {Comments} from "~/components/comments";
import {Player, Markdown_, DateHeader, buildTitle} from '~/components/podcast'
import type {Route} from './+types/route.tsx'
import fs from 'fs';
import path from 'path';
import _ from 'lodash'
import {llhShow, mlgShow, llhObj, mlgObj} from "~/content/podcast/metas.js";


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
    i: null // can't remember what for?
  }
}

export default function PodcastId({loaderData}: Route.ComponentProps) {
  const props = loaderData
  const {episode: e, podcastKey, show, transcript, i=null} = loaderData
  const title = buildTitle(props)

  const resources = (
      podcastKey === "llh" ? null
      : episodeResources[e.mla ? 'mla' : 'mlg']?.[e.episode]
  )

  const player = useMemo(() => <Player {...props} />, [])

  const items = [
    (!e.empty && {
      title: "Show Notes",
      body: <>
        <Outlet />
      </>
    }),
    (resources && {
      title: "Resources",
      body: <>
        <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
        <ResourcesFlat nids={resources} />
      </>
    }),
    (transcript && {
      title: "Transcript",
      body: <Markdown_ Content={transcript} />
    }),
  ].filter(Boolean)

  return <div>
    <BackButton to={podcastKey === "llh" ? "/llh" : "/mlg"} />
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <DateHeader {...props} />
        {player}

        <p className='mt-2'>{e.teaser}</p>
        {podcastKey !== "llh" && <Alert variant="success">
          Stay healthy while you learn, try a <Link to="/walk">walking desk</Link>!
        </Alert>}
      </Card.Body>
      {items.map((item, i) => (
        <Card.Body key={i}>
          <Card.Title>{item.title}</Card.Title>
          <Card.Body>{item.body}</Card.Body>
        </Card.Body>
      ))}
      {e.guid && <Card.Footer>
        <Comments
          shortname="ocdevel"
          identifier={e.guid}
          title={`${e.title} | ${show.title}`}
          url={`https://ocdevel.com/${podcastKey}/${e.id}`}/>
      </Card.Footer>}
    </Card>
  </div>
}

function ResourcesFlat({nids}: {nids: string[]}) {
  let seen: Record<string, boolean> = {}
  function render(id: string) {
    const full = flat[id]
    if (!full) { return null }
    if (!full.pick) {
      if (seen[id]) {return null}
      seen[id] = true
      return <ResourceNode node={{id}} key={id} />
    }
    // using full.v instead of node.v, since we don't want filters
    return full.v.map(render)
  }
  return <div className='resources'>
    {nids.map(render)}
  </div>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.episode.title} | ${data.show.title} Podcast`},
    {name: "description", content: data.episode.teaser}
  ]
}