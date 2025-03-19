import React, {useCallback, useState, useMemo, useEffect, useRef} from "react";
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

// const AD_CLIENT = "ca-pub-3242350243827794";
const AD_CLIENT = false;

type PodcastList = Route.LoaderArgs & {
  episodesList: EpisodeType[]
  show: ShowType
  podcastKey: "mlg" | "llh"
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function List({podcastKey, episodesList, show}: PodcastList) {
  const adsenseScript = useMemo(() => {
    if (!AD_CLIENT) { return null;}
    if (podcastKey !== "mlg") { return null; }
    return <ExternalScript
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      options={{
        id: "adsense-script",
        crossOrigin: "anonymous",
        async: true,
      }}
    />
  }, [podcastKey])

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

  function renderEpisode(e: EpisodeType, i: number) {
    const episode = <EpisodeComponent
      show={show}
      podcastKey={podcastKey}
      key={e.id}
      episode={e}
      teaser={true}
      i={i}
    />
    if (!AD_CLIENT) { return episode; }
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
    {renderButtons()}
    <InfiniteScroll
      dataLength={eps.length} //This is important field to render the next data
      next={next}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<></>}
    >
      {eps.map(renderEpisode)}
    </InfiniteScroll>

    {adsenseScript}
  </div>
}

function Adsense({pageLevelAds=false}: {pageLevelAds?: boolean}) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only run this once per ad unit
    if (initialized.current) { return; }
    if (typeof document === "undefined" || !adRef.current) { return; }

    initialized.current = true;

    // Handle page-level ads if needed
    const params = pageLevelAds ? {
      google_ad_client: AD_CLIENT,
      enable_page_level_ads: true
    } : {};

    // Push the ad after a short delay to ensure DOM is ready
    (window.adsbygoogle = window.adsbygoogle || []).push(params);
  }, [pageLevelAds, adRef.current]);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{display: "block"}}
        data-ad-format="fluid"
        data-ad-layout-key="-f9+5v+4m-d8+7b"
        data-ad-client={AD_CLIENT}
        data-ad-slot="8958942863"
      />
    </div>
  );
}