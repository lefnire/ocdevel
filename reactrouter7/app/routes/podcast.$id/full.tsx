import {type PropsWithChildren, Suspense, useMemo, lazy, useContext} from "react";
import Card from 'react-bootstrap/cjs/Card'
import {Link, Outlet} from "react-router";
import {BackButton} from "~/components/back-btn";
// import ReactDisqusComments from "react-disqus-comments";
import {Comments} from "~/components/comments";
import {DateHeader, buildTitle} from '~/routes/podcast/utils'
import {Player} from './player'
import {ShowContext} from "~/routes/podcast/context";
import {About} from "~/routes/podcast/about";
import {EpisodeContext} from "~/routes/podcast.$id/context";

const ResourcesFlat = lazy(() => import('./resources'));

export default function Full() {
  const podcastProps = useContext(ShowContext)
  const {podcastKey, show} = podcastProps
  const episodeProps = useContext(EpisodeContext)
  const {episode: e, transcript, resources, i=undefined} = episodeProps;
  const title = buildTitle(episodeProps) // Pass loaderData to buildTitle

  // Pass loaderData to Player, assuming it expects that structure
  const player = useMemo(() => <Player  />, [])

  function renderAbout() {
    return <div className="d-block d-md-none">
      <Section>
        <About />
      </Section>
    </div>
  }

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
      <Suspense fallback={<div>Loading...</div>}>
        <ResourcesFlat {...resources} />
      </Suspense>
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
        <DateHeader {...episodeProps} />
        {player}

        <p className='mt-2'>{e.teaser}</p>
      </Card.Body>
      {renderResources()}
      {renderAbout()}
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

function Section({title, children}: PropsWithChildren<{title?: string}>) {
  return <>
    <hr/>
    <Card.Body>
      {title && <Card.Title>{title}</Card.Title>}
      <div>{children}</div>
    </Card.Body>
  </>
}