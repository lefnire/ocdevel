import React, {useMemo} from "react";
import {Card, Alert} from 'react-bootstrap'
import {Link, Outlet} from "react-router";
import {BackButton} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import {ResourceNode} from '~/routes/mlg.resources/tree'
import {episodes as episodeResources, flat} from '~/content/podcast/resources'
import {Comments} from "~/components/comments";
import {DateHeader, buildTitle} from '~/routes/podcast/utils'
import {Markdown_} from './markdown'
import {Player} from './player'
import type {Route} from './+types/route.tsx'

export default function Full({loaderData}: Route.ComponentProps) {
  const props = loaderData
  const {episode: e, podcastKey, show, transcript, i=undefined} = loaderData
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
          <Link to="/walk">Try a walking desk</Link> to stay healthy while you study or work!
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