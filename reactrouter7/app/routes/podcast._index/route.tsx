import {useState, useMemo, useContext} from "react";
import Button, { type ButtonProps } from 'react-bootstrap/cjs/Button'
import ButtonGroup from 'react-bootstrap/cjs/ButtonGroup'
import useStore from "./store";
import InfiniteScroll from 'react-infinite-scroll-component';

import Teaser from './teaser';
import {useShallow} from "zustand/react/shallow";
import type {EpisodeType, ShowType} from '~/route/podcast/types'
import {llhList, mlgList} from "~/content/podcast/metas.js";
import type {Route} from './+types/route.tsx'
import {ShowContext} from "~/routes/podcast/context";
import {EpisodeContext} from "~/routes/podcast.$id/context";
import {EpisodesContext} from "~/routes/podcast._index/context";

// git-blame: adsense

export function loader({request}: Route.LoaderArgs) {
  const pathname = (new URL(request.url)).pathname;
  const llh = pathname.includes('/llh')
  const episodesList = (llh ? llhList : mlgList) as unknown as EpisodeType[]
  return {episodesList}
}

export default function Index({loaderData: {episodesList}}: Route.ComponentProps) {
  // const {podcastKey} = loaderData
  return <EpisodesContext.Provider value={{episodesList}}>
    <FilterButtons />
    <EpisodeList />
  </EpisodesContext.Provider>
}

function FilterButtons () {
  const {podcastKey} = useContext(ShowContext)
  const [showMla, showMlg, newFirst, toggleNewFirst, setMla, setMlg] = useStore(useShallow(
    s => [s.mla, s.mlg, s.newFirst, s.toggleNewFirst, s.setMla, s.setMlg]
  ))

  function btns_(active=false): ButtonProps {
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

function EpisodeList() {
  const {podcastKey, show} = useContext(ShowContext)
  const {episodesList} = useContext(EpisodesContext)
  const sortedEps = useMemo(() => {
    // Create a shallow copy before sorting to avoid mutating the original list
    return [...episodesList].sort((a, b) => {
      // Assuming 'created' is a comparable value (like Date or number)
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateA.getTime() - dateB.getTime();
    });
  }, [podcastKey])

  const [page, setPage] = useState(0)

  const [showMla, showMlg, newFirst] = useStore(useShallow(
    s => [s.mla, s.mlg, s.newFirst]
  ))

  function next() { setPage(page + 1); }

  const pageSize = 10
  let eps = newFirst ? sortedEps : sortedEps.slice().reverse()
  eps = eps.filter((e: any) => { // Use 'any' temporarily for JS object flexibility
    if (podcastKey === "llh") { return true; } // LLH episodes don't have mla/mlg flags
    // MLG specific filtering:
    if (showMla && showMlg) { return true; } // Show both types
    if (showMla) { return e.mla; } // Show only MLA
    if (showMlg) { return e.mlg; } // Show only MLG
    return false; // Hide both if neither button is active (shouldn't happen with ButtonGroup?)
  });
  const fullLen = eps.length
  eps = eps.slice(0, (page+1)*pageSize)
  const hasMore = eps.length < fullLen

  function renderEpisode(episode: EpisodeType, i: number) {
    // TODO see if this is ok, lacking resources,transcript
    const context = {episode} as unknown as EpisodeContext
    return <EpisodeContext.Provider value={context} key={episode.id}>
      <Teaser i={i} />
    </EpisodeContext.Provider>
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
