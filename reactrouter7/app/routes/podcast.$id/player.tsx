import type {EpisodeComponent} from '~/routes/podcast/types'

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