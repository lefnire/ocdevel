import React, {useCallback, useState, useMemo, useEffect, useRef} from "react";
import filter from 'lodash/filter'
import {Button, ButtonGroup} from 'react-bootstrap'
import useStore from "~/store/episodes";
import InfiniteScroll from 'react-infinite-scroll-component';
import sortBy from "lodash/sortBy";

import Teaser from './episode/teaser';
import type { Route } from "../+types/mlg._index";
import {useShallow} from "zustand/react/shallow";
import type {EpisodeType, ShowType} from '~/content/podcast/types'
import {Adsense, AdsenseScript} from "~/components/adsense"

type PodcastList = Route.LoaderArgs & {
  episodesList: EpisodeType[]
  show: ShowType
  podcastKey: "mlg" | "llh"
}

function FilterButtons ({podcastKey}: PodcastList) {
  const [showMla, showMlg, newFirst, toggleNewFirst, setMla, setMlg] = useStore(useShallow(
    s => [s.mla, s.mlg, s.newFirst, s.toggleNewFirst, s.setMla, s.setMlg]
  ))

  function btns_(active=false) {
    return {
      size: "sm",
      variant: active ? "dark" : "outline-dark",
    }
  }

  return <div className='mb-3 episodes-btn-container'>
    <Button variant='light' disabled className='text-dark'>Filters</Button>
    <Button
      {...btns_()}
      className='mx-2'
      onClick={toggleNewFirst}>
      {newFirst ? <>New&rarr;Old</> : <>Old&rarr;New</>}
    </Button>
    {podcastKey === "mlg" && <ButtonGroup className='me-2'>
      <Button
        {...btns_(showMlg)}
        onClick={setMlg}>
        MLG
      </Button>
      <Button
        {...btns_(showMla)}
        onClick={setMla}>
        MLA
      </Button>
    </ButtonGroup>}
  </div>
}

function EpisodeList({podcastKey, episodesList, show}: PodcastList) {
  const sortedEps = useMemo(() => {
    return sortBy(episodesList, e => e.created)
  }, [podcastKey])

  const [page, setPage] = useState(0)

  const [showMla, showMlg, newFirst] = useStore(useShallow(
    s => [s.mla, s.mlg, s.newFirst]
  ))

  function next() { setPage(page + 1); }

  const pageSize = 10
  let eps = newFirst ? sortedEps : sortedEps.slice().reverse()
  eps = filter(eps, e => {
    if (showMla && showMlg) {return true}
    return showMla ? e.mla : showMlg ? e.mlg : false
  })
  const fullLen = eps.length
  eps = eps.slice(0, (page+1)*pageSize)
  const hasMore = eps.length < fullLen

  function renderEpisode(e: EpisodeType, i: number) {
    const episode = <Teaser
      show={show}
      podcastKey={podcastKey}
      key={e.id}
      episode={e}
      teaser={true}
      i={i}
    />
    if (i > 0 && i % 3 === 0) {
      return [
        <Adsense key={`ad-${i}`} />,
        episode
      ]
    }
    return episode
  }

  // TODO filter episodes
  return <div>
    <InfiniteScroll
      dataLength={eps.length} //This is important field to render the next data
      next={next}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<></>}
    >
      {eps.map(renderEpisode)}
    </InfiniteScroll>
  </div>
}

export default function Index(props: PodcastList) {
  const {podcastKey} = props
  return <div>
    <FilterButtons {...props} />
    <EpisodeList {...props} />
    {podcastKey === "mlg" && <AdsenseScript />}
  </div>
}

