import React, {useCallback, useState, useMemo, useEffect} from "react";
import filter from 'lodash/filter'
import {Button, ButtonGroup} from 'react-bootstrap'
import useStore from "~/store/episodes";
import InfiniteScroll from 'react-infinite-scroll-component';
import sortBy from "lodash/sortBy";

import {EpisodeComponent} from './podcast.$id';
import type { Route } from "../+types/mlg._index";
import {useShallow} from "zustand/react/shallow";
import type {EpisodeType, ShowType} from '~/content/podcast/types'
import {ExternalScript} from "~/components/external-scripts";

type PodcastList = Route.LoaderArgs & {
  episodesList: EpisodeType[]
  show: ShowType
  podcastKey: "mlg" | "llh"
}
export default function List({podcastKey, episodesList, show}: PodcastList) {
  const showAds = podcastKey === "mlg";

  const adsenseScript = useMemo(() => {
    if (!showAds) { return null; }
    return <ExternalScript
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3242350243827794"
      options={{
        crossOrigin: "anonymous",
        async: true,
      }}
      callback={() => {
        if (window.adsbygoogle?.loaded) { return; }
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }}
    />
  }, [showAds])

  const sortedEps = useMemo(() => {
    return sortBy(episodesList, e => e.created)
  }, [podcastKey])

  const [page, setPage] = useState(0)

  const [showMla, showMlg, newFirst, toggleNewFirst, setMla, setMlg] = useStore(useShallow(
    s => [s.mla, s.mlg, s.newFirst, s.toggleNewFirst, s.setMla, s.setMlg]
  ))

  function next() {
    setPage(page + 1)
  }

  const pageSize = 5
  let eps = newFirst ? sortedEps : sortedEps.slice().reverse()
  eps = filter(eps, e => {
    if (showMla && showMlg) {return true}
    return showMla ? e.mla : showMlg ? e.mlg : false
  })
  const fullLen = eps.length
  eps = eps.slice(0, (page+1)*pageSize)
  const hasMore = eps.length < fullLen

  function btns_(active=false) {
    return {
      size: "sm",
      variant: active ? "dark" : "outline-dark",
    }
  }

  function renderButtons() {
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

  function renderAd(i: number) {
    return <ins
      key={i}
      className="adsbygoogle"
      style={{display:"block"}}
      data-ad-format="fluid"
      data-ad-layout-key="-f9+5v+4m-d8+7b"
      data-ad-client="ca-pub-3242350243827794"
      data-ad-slot="8958942863">
    </ins>
  }

  function renderEpisodes(eps: EpisodeType[]) {
    return eps.map((e: EpisodeType, i: number) => {
      if (i % 3 === 3) {
        return renderAd(i)
      }
      return <EpisodeComponent
        show={show}
        podcastKey={podcastKey}
        key={e.id}
        episode={e}
        teaser={true}
        i={i}
      />
    })
  }

  // TODO filter episodes
  return <div>
    {renderButtons()}

    <InfiniteScroll
      dataLength={eps.length} //This is important field to render the next data
      next={next}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<></>}
    >
      {renderEpisodes(eps)}
    </InfiniteScroll>

    {adsenseScript}
  </div>
}