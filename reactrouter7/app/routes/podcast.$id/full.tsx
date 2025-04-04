import {type PropsWithChildren, useMemo} from "react";
import Card from 'react-bootstrap/cjs/Card'
import Alert from 'react-bootstrap/cjs/Alert'
import {Link, Outlet} from "react-router";
import {BackButton} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import {Comments} from "~/components/comments";
import {DateHeader, buildTitle} from '~/routes/podcast/utils'
import {Player} from './player'
import type {Route} from './+types/route.tsx'
import {ResourcesFlat} from "~/routes/podcast.$id/resources";

export default function Full({loaderData}: Route.ComponentProps) {
  const props = loaderData
  const {episode: e, podcastKey, show, transcript, resources, i=undefined} = loaderData
  const title = buildTitle(props)

  const player = useMemo(() => <Player {...props} />, [])

  function renderNotes() {
    if (e.empty) { return null; }
    return <Section title="Show Notes">
      <Outlet />
    </Section>
  }
  function renderResources() {
    if (!resources?.nids?.length) { return null; }
    return <Section title="Resources">
      <div className='text-muted my-0'>Resources best viewed <Link to='/mlg/resources'>here</Link></div>
      <ResourcesFlat {...resources} />
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
        {podcastKey !== "llh" && <Alert variant="success my-0">
          <Link to="/walk">Try a walking desk</Link> to stay healthy while you study or work!
        </Alert>}
      </Card.Body>
      {renderResources()}
      {renderNotes()}
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