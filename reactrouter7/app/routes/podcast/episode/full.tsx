import React, {useMemo} from "react";
import {Card, Alert, Badge} from 'react-bootstrap'
import {Accordion_} from "~/components/utils";
import {Link} from "react-router";
import {BackButton} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import {ResourceNode} from '~/routes/mlg.resources'
import {episodes as episodeResources, flat} from '~/content/podcast/resources'
import {Comments} from "~/components/comments";
import {type EpisodeComponent, Player, Markdown_, DateHeader, buildTitle} from './utils'

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

export default function Full(props: EpisodeComponent) {
  const {episode: e, teaser, podcastKey, show, i=null} = props
  const title = buildTitle(props)

  const resources = (
      podcastKey === "llh" ? null
      : episodeResources[e.mla ? 'mla' : 'mlg']?.[e.episode]
  )

  const player = useMemo(() => <Player {...props} />, [])

  const body = e.default
  const items = [
    (body && {
      title: "Show Notes",
      body: <>
        {podcastKey !== "llh" && <Alert variant="success">
          Support this show by trying a <Link to="/walk">walking desk</Link>!
        </Alert>}
        <Markdown_ Content={body} />
      </>
    }),
    (resources && {
      title: "Resources",
      body: <>
        <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
        <ResourcesFlat nids={resources} />
      </>
    }),
    (e.transcript && {
      title: "Transcript",
      body: <Markdown_ Content={e.transcript} />
    }),
  ]

  return <div>
    <BackButton to={podcastKey === "llh" ? "/llh" : "/mlg"} />
    <Card>
      <Card.Body>

        <Card.Title>{title}</Card.Title>
        <DateHeader {...props} />
        {player}

        <Markdown_ Content={e.teaser} />
        <Accordion_ items={items} />

      </Card.Body>
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