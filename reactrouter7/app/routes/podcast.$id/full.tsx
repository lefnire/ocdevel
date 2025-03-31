import React, {type PropsWithChildren, useMemo} from "react";
import {Card, Alert} from 'react-bootstrap'
import {Link, Outlet} from "react-router";
import {BackButton} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import {ResourceNode} from '~/routes/mlg.resources/tree'
import {episodes as episodeResources, flat} from '~/content/podcast/resources'
import {Comments} from "~/components/comments";
import {DateHeader, buildTitle} from '~/routes/podcast/utils'
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

  function renderNotes() {
    if (e.empty) { return null; }
    return <Section title="Show Notes">
      <Outlet />
    </Section>
  }
  function renderResources() {
    if (!resources) { return null; }
    return <Section title="Resources">
      <Alert variant='warning' className='p-2 my-1'>Note: Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
      <ResourcesFlat nids={resources} />
    </Section>
  }
  function renderTranscript() {
    if (!transcript) {return null;}
    return <Section title="Transcript">
      <div style={{whiteSpace: 'pre-wrap'}}>{transcript}</div>
    </Section>
  }
  return <div>
    <BackButton to={podcastKey === "llh" ? "/llh" : "/mlg"} label={"All Episodes"} />
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
      {renderNotes()}
      {renderResources()}
      {renderTranscript()}
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

function Section({title, children}: PropsWithChildren<{title: string}>) {
  return <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Body>{children}</Card.Body>
  </Card.Body>
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
  const built = nids.map(render)
  debugger
  return <div className='resources'>
    {built}
  </div>
}