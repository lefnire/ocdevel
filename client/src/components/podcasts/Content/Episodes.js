import React, {useCallback, useLayoutEffect, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import _ from "lodash";
import {Button, ButtonGroup} from "react-bootstrap";
import {FaEnvelope, FaGithub, FaLightbulb} from "react-icons/all";
import {useStoreActions, useStoreState} from "easy-peasy";

import {episodes} from "../../../content/podcast";
import {btns, Popover_} from "../utils";
import {Episode} from './Episode';

export function Episodes() {
  const [page, setPage] = useState(0)

  const showMla = useStoreState(state => state.episodes.mla)
  const showMlg = useStoreState(state => state.episodes.mlg)
  const newFirst = useStoreState(state => state.episodes.newFirst);

  const toggleNewFirst = useStoreActions(actions => actions.episodes.toggleNewFirst);
  const setMla = useStoreActions(actions => actions.episodes.setMla);
  const setMlg = useStoreActions(actions => actions.episodes.setMlg);

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
  eps = _.filter(eps, e => {
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
      <Button variant='link' disabled className='text-dark'>Filters</Button>
      <Button
        {...btns_()}
        className='mx-2'
        onClick={toggleNewFirst_}>
        {newFirst ? <>New&rarr;Old</> : <>Old&rarr;New</>}
      </Button>
      <ButtonGroup className='mr-2'>
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
      {_.times(numPages, p => <>
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