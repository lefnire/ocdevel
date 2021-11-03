import React, {useCallback, useLayoutEffect, useEffect, useState} from "react";
import filter from 'lodash/filter'
import times from 'lodash/times'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import useStore from "../../../store/episodes";

import {episodes} from "../../../content/podcast";
import {Episode} from './Episode';

export default function Episodes() {
  const [page, setPage] = useState(0)

  const showMla = useStore(state => state.mla)
  const showMlg = useStore(state => state.mlg)
  const newFirst = useStore(state => state.newFirst);

  const toggleNewFirst = useStore(actions => actions.toggleNewFirst);
  const setMla = useStore(actions => actions.setMla);
  const setMlg = useStore(actions => actions.setMlg);

  const toggleNewFirst_ = useCallback(() => toggleNewFirst(), [])
  const setMla_ = useCallback(() => setMla(), [])
  const setMlg_ = useCallback(() => setMlg(), [])

  useEffect(() => {
    setPage(0)
  }, [showMla, showMlg, newFirst])

  useLayoutEffect(() => {
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, 0);
  }, [page])

  let eps = newFirst ? episodes : episodes.slice().reverse()
  eps = filter(eps, e => {
    if (showMla && showMlg) {return true}
    return showMla ? e.mla : showMlg ? e.mlg : false
  })

  const pageSize = 10
  const epsPage = eps.slice(page*pageSize, (page+1)*pageSize)
  const numPages = Math.ceil(eps.length / pageSize)

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
        onClick={toggleNewFirst_}>
        {newFirst ? <>New&rarr;Old</> : <>Old&rarr;New</>}
      </Button>
      <ButtonGroup className='me-2'>
        <Button
          {...btns_(showMlg)}
          onClick={setMlg_}>
          MLG
        </Button>
        <Button
          {...btns_(showMla)}
          onClick={setMla_}>
          MLA
        </Button>
      </ButtonGroup>
      {renderPager()}
    </div>
  }
  
  function renderPager() {
    return <ButtonGroup>
      <Button
        {...btns_()}
        onClick={() => setPage(page-1)}
        disabled={page === 0}
      >&larr;</Button>
      {times(numPages, p => <>
        <Button
          {...btns_(p === page)}
          onClick={() => setPage(p)}
        >{p}</Button>
      </>)}
      <Button
        {...btns_(false)}
        onClick={() => setPage(page+1)}
        disabled={page === numPages - 1}
      >&rarr;</Button>
    </ButtonGroup>
  }

  // TODO filter episodes
  return <div>
    {renderButtons()}
    {epsPage.map(e => <Episode key={e.id} e={e} teaser={true} />)}
    {renderPager()}
  </div>
}