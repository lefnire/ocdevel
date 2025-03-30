import type {EpisodeComponent} from '~/routes/podcast/types'
import {useEffect, useState} from "react";

const lazyIframe = false
function Player_({episode: e}: EpisodeComponent) {
  const [hideIframe, setHideIframe] = useState(lazyIframe);

  useEffect(() => {
    if (!lazyIframe) { return; }
    const idleCallback = (
      typeof window !== "undefined" && window.requestIdleCallback
      || ((fn) => setTimeout(fn, 200))
    );
    idleCallback(() => setHideIframe(false));
  }, []);
  if (hideIframe) { return <div>Loading...</div>}

  const color = e.archived ? '6c757d' : '111111';
  return <iframe
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
    loading={lazyIframe ? "lazy" : undefined}
  />
}

export function Player(props: EpisodeComponent) {
  if (!props.episode.libsynEpisode) { return null; }
  // Create a wrapper div with the exact height to prevent layout shift
  return <div style={{ height: "128px", width: "100%" }}>
    <Player_ {...props} />
  </div>
}