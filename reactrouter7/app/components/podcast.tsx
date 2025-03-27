import type {EpisodeType, ShowType} from "~/content/podcast/types";
import {dateFmt, ReactMarkdown_} from "~/components/utils";
import React, {type ReactElement, useRef} from "react";
import {Card} from "react-bootstrap";
import moment from "dayjs";
import padStart from "lodash/padStart";

export interface EpisodeComponent {
  episode: EpisodeType
  teaser?: boolean
  i?: number // debugging MLG/MLA numbering issue
  podcastKey: "llh" | "mlg"
  show: ShowType
}

// 8d7997de switched from component to returning memoized JSX, since iframe being
// re-rendered slowly each time. This trick doesn't seem to work either, figure out later
export function Player({episode: e}: EpisodeComponent) {
  // if (e.mla) {return <div>TODO move to MLG</div>}
  const id = e.libsynEpisode
  if (!id) {return null}
  const color = e.archived ? '6c757d' : '111111';
  console.log("player render")
  // Create a wrapper div with the exact height to prevent layout shift
  return (
    <div style={{ height: "128px", width: "100%" }}>
      <iframe
        title="Embed Player"
        src={`//play.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/128/theme/modern/size/standard/thumbnail/no/custom-color/${color}/time-start/00:00:00/download/no/hide-show/no/direction/backward/hide-playlist/no/hide-subscribe/no/hide-share/no`}
        height="128"
        width="100%"
        scrolling="no"
        allowFullScreen={undefined}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        oallowfullscreen="true"
        msallowfullscreen="true"
        style={{border: "none"}}
      />
    </div>
  )
}

const teaserRenderers = {
  heading: ({children}) => {
    return <><strong>{children}</strong><br/></>
  }
}

const teaserMDX = {
  components: {
    h1: props => <><strong {...props} /><br/></>
  }
}

export function Markdown_({Content, teaser=false}) {
  if (!Content) {return null}
  // Switching to new MDX setup, away from ReactMarkdown
  const isMdx = typeof Content !== "string";
  const opts = teaser ? (isMdx ? teaserMDX : teaserRenderers) : {}
  return typeof Content === "string" ?
    <ReactMarkdown_ source={Content} {...opts} />
    : <Content {...opts} />;
}

export function DateHeader({episode: e}: EpisodeComponent) {
  if (!(e.created || e.date)) {
    return <Card.Subtitle className='mb-2 text-danger'>
      Podcast episode not yet released
    </Card.Subtitle>
  }
  return <Card.Subtitle className='text-muted mb-2'>
    {moment(e.created).format(dateFmt)}
    {e.updated && <>
      <span> (updated {moment(e.updated).format(dateFmt)})</span>
    </>}
  </Card.Subtitle>
}

export function buildTitle({episode: e, podcastKey}: EpisodeComponent) {
  const num = padStart(e.episode, 3, '0');
  const titleStart = podcastKey === "llh" ? "LLH" : e.mla ? "MLA" : "MLG"
  return `${titleStart} ${num} ${e.title}`;
}