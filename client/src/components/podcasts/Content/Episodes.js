import React, {useCallback, useLayoutEffect, useEffect, useState} from "react";
import filter from 'lodash/filter'
import times from 'lodash/times'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import useStore from "../../../store/episodes";
import InfiniteScroll from 'react-infinite-scroll-component';
import sortBy from "lodash/sortBy";

import {episodes} from "../../../content/podcast";
import {Episode} from './Episode';

const sortedEps = sortBy(episodes, e => e.created)

export default function Episodes() {
  const [page, setPage] = useState(0)

  const showMla = useStore(state => state.mla)
  const showMlg = useStore(state => state.mlg)
  const newFirst = useStore(state => state.newFirst);

  const toggleNewFirst = useCallback(useStore(actions => actions.toggleNewFirst), []);
  const setMla = useCallback(useStore(actions => actions.setMla), []);
  const setMlg = useCallback(useStore(actions => actions.setMlg), []);

  useLayoutEffect(() => {
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, 0);
  }, [])

  function next() {
    setPage(page + 1)
  }

  const pageSize = 3
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
      <ButtonGroup className='me-2'>
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
      </ButtonGroup>
    </div>
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
      {eps.map((e, i) => <Episode key={e.id} e={e} teaser={true} i={i} />)}
    </InfiniteScroll>
  </div>
}