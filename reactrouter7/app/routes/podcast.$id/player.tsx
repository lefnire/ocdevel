import type {EpisodeComponent} from '~/routes/podcast/types'
import {type PropsWithChildren, useState} from "react";

const CLICK_TO_PLAY = true;

function Player_({episode: e}: EpisodeComponent) {
  const color = e.archived ? '6c757d' : '111111';
  return <iframe
    title="Embed Player"
    src={`//play.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/128/theme/modern/size/standard/thumbnail/no/custom-color/${color}/time-start/00:00:00/download/no/hide-show/no/direction/backward/hide-playlist/no/hide-subscribe/no/hide-share/no`}
    height="128"
    width="100%"
    scrolling="no"
    allowFullScreen={undefined}
    // Using data attributes for non-standard attributes
    data-webkit-allowfullscreen="true"
    data-moz-allowfullscreen="true"
    data-o-allowfullscreen="true"
    data-ms-allowfullscreen="true"
    style={{border: "none"}}
    loading="lazy"
  />
}

function ClickToPlay({children}: PropsWithChildren) {
  const [showIframe, setShowIframe] = useState(false);

  if (!showIframe){
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        onClick={() => setShowIframe(true)}
        style={{
          height: "100%",
          width: "100%",
          cursor: "pointer",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6"
        }}
      >
        <div className="d-flex align-items-center">
          {/* Simple black play triangle */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: "12px solid #212529",
              marginRight: "8px"
            }}
          />
          <span className="text-secondary">Click to Play Episode</span>
        </div>
      </div>
    );
  }
  return children
}

export function Player(props: EpisodeComponent) {
  if (!props.episode.libsynEpisode) { return null; }
  const player = <Player_ {...props} />
  const wrapped = CLICK_TO_PLAY ? <ClickToPlay>{player}</ClickToPlay> : player
  // Create a wrapper div with the exact height to prevent layout shift
  return <div style={{ height: "128px", width: "100%" }}>
    {wrapped}
  </div>
}