import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import podcast from "../../content/podcast";
import {
  FaBriefcase,
  FaDollarSign, FaEnvelope, FaGithub,
  FaItunesNote, FaLightbulb,
  FaPatreon,
  RiGooglePlayLine,
  RiSpotifyLine,
  SiRss,
  SiStitcher
} from "react-icons/all";
import {LinkContainer} from "react-router-bootstrap";
import React, {useState} from "react";
import {patreonLink, btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters} from "../../content/podcast/resources";
import _ from "lodash";

import librarian from '../../assets/mla_square.jpg'
import scout from '../../assets/mlg_square.jpg'

const sidebarBtn = active => ({
  size: "sm",
  variant: active ? 'outline-dark' : 'outline-secondary',
  className: active ? 'icon-btn filter-selected' : 'icon-btn'
})

function Filter({fk}) {
  const selected = useStoreState(state => state.filters[fk])
  const setSelected = useStoreActions(actions => actions.filters[`set_${fk}`])
  const [help, setHelp] = useState()

  const f = filters[fk]
  if (!f.opts) {return null}
  return <Card className='mb-2'>
    <Card.Body>
      <Card.Subtitle className='mb-2'>{f.t}</Card.Subtitle>
      <ButtonGroup vertical className='w-100'>
        {_.map(f.opts, (v,k) => <Button
            key={k}
            {...sidebarBtn(selected[k])}
            onClick={() => setSelected({[k]: !selected[k]})}
            onMouseEnter={() => setHelp(v.d)}
            onMouseLeave={() => setHelp(null)}
          >
            {v.i && <span className='mr-2'>{v.i}</span>}
            {v.t}
        </Button>)}
      </ButtonGroup>
    </Card.Body>
    <Card.Footer className='small'>{help || f.d}</Card.Footer>
  </Card>
}

function Filters() {
  const episodeOrder = useStoreState(state => state.episodeOrder)
  const setEpisodeOrder = useStoreActions(actions => actions.setEpisodeOrder)
  const viewAs = useStoreState(state => state.viewAs)
  const mla = useStoreState(state => state.mla)
  const setMla = useStoreActions(actions => actions.setMla)
  const mlg = useStoreState(state => state.mlg)
  const setMlg = useStoreActions(actions => actions.setMlg)

  return <div className='sidebar-filters'>
    {viewAs === 'episodes' && <Card className='mb-2'><Card.Body>
      <Card.Subtitle className='mt-3 mb-1'>Podcast</Card.Subtitle>
      <ButtonGroup className='w-100'>
        <Button
          {...sidebarBtn(mlg)}
          onClick={() => setMlg(!mlg)}
        >MLG</Button>
        <Button
          {...sidebarBtn(mla)}
          onClick={() => setMla(!mla)}
        >MLA</Button>
      </ButtonGroup>
      <Card.Subtitle className='mt-3 mb-1'>Sort</Card.Subtitle>
      <ButtonGroup className='w-100'>
        <Button
          {...sidebarBtn(episodeOrder === 'old2new')}
          onClick={() => setEpisodeOrder('old2new')}
        >Old&rarr;New</Button>
        <Button
          {...sidebarBtn(episodeOrder === 'new2old')}
          onClick={() => setEpisodeOrder('new2old')}
        >New&rarr;Old</Button>
      </ButtonGroup>
    </Card.Body></Card>}
    {filterKeys.map(fk => <Filter fk={fk} key={fk} />)}
  </div>
}

function Podcasts() {
  const [showHire, setShowHire] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [showGetMLG, setShowGetMLG] = useState(false)
  const [showGetMLA, setShowGetMLA] = useState(false)
  const enableHire = false
  const enableDonate = false
  // d75998bd cryptocurrency

  const renderHireModal = () => (
    <Modal show={showHire} onHide={() => setShowHire(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Hire Me</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="/files/profile_pic.jpeg" style={{float:'left', paddingRight:10, paddingBottom: 5, width: 150}} />
        <h4>Tyler Renelle</h4>
        <p>Machine learning engineer focused on time series & reinforcement (esp. NLP & algo-trading). Background in full-stack JavaScript, 10 years web & mobile. Tech: Python, TensorFlow, React / React Native.</p>
        <p>Creator of HabitRPG, a startup begun on Kickstarter which now has ~2M users. Built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients such as Adidas, BigFix, and UCSF. Obsessed with AI - bonafide Singularitarian and herald for the takeover.</p>
        <p>Looking for remote work, or local to Portland, OR.</p>
        <ul className="list-unstyled">
          <li><a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin d-block">LinkedIn</a></li>
          <li><a target="_blank" href="https://github.com/lefnire" className="zocial github d-block">Github</a></li>
          <li><a href="mailto:tylerrenelle@gmail.com" className="zocial email d-block">Email</a></li>
        </ul>
      </Modal.Body>
    </Modal>
  );

  const iconBtn = {
    btn: {
      variant: 'light',
      size: "sm",
      className: 'icon-btn'
    },
    icon: {
      size: 20
    }
  }

  function miscResources() {
    return <div>
      {showDonate && (
        <Card className='mb-2'>
          <Card.Header>Donate</Card.Header>
          <Card.Body>
            <p>The best way to show support is via Patreon (above), plus you'll receive perks like access to an exclusive podcast series on applied ML.</p>
            <hr/>

            Paypal:
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="9A9KRVTQFFLFC" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </Card.Body>
        </Card>
      )}

      <ButtonGroup className='d-block' vertical>
        {enableDonate && <Button {...iconBtn.btn} onClick={() => setShowDonate(true)}>
          <FaDollarSign {...iconBtn.icon} /> Donate
        </Button>}
        {enableHire && <Button {...iconBtn.btn} onClick={() => setShowHire(true)}>
          <FaBriefcase {...iconBtn.icon} /> Hire Me
        </Button>}
        <LinkContainer to="/mlg/recommend">
          <Button {...iconBtn.btn}>
            <FaLightbulb {...iconBtn.icon} /> Recommend an Episode
          </Button>
        </LinkContainer>
        <OverlayTrigger
          placement="right"
          overlay={(
            <Popover id="popover-positioned-right">
              Get notified of new episodes / announcements
            </Popover>
          )}
        >
          <Button {...iconBtn.btn} href="http://eepurl.com/cUUWfD" target="_blank">
            <FaEnvelope {...iconBtn.icon} /> Mailing List
          </Button>
        </OverlayTrigger>
        <Button {...iconBtn.btn} href="https://github.com/lefnire/gnothi" target='_blank'>
          <FaGithub {...iconBtn.icon} /> Podcast Project: Gnothi
        </Button>
      </ButtonGroup>

    </div>
  }

  function renderMLG() {
    return <>
      <div className="logo text-center">
        <img src={scout} />
      </div>

      {showGetMLG ? <>
        <ButtonGroup className='d-block' vertical>
          <Button {...iconBtn.btn} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
            <FaItunesNote {...iconBtn.icon} target="_blank" /> iTunes
          </Button>
          <Button {...iconBtn.btn} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
            <RiSpotifyLine {...iconBtn.icon} target="_blank" /> Spotify
          </Button>
          <Button {...iconBtn.btn} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
            <RiGooglePlayLine {...iconBtn.icon} target="_blank" /> Google Podcasts
          </Button>
          <Button {...iconBtn.btn} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
            <SiStitcher {...iconBtn.icon} target="_blank" /> Stitcher
          </Button>
          <Button {...iconBtn.btn} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
            <SiRss {...iconBtn.icon} target="_blank" /> Custom (RSS)
          </Button>
        </ButtonGroup>
      </> : <>
        <Button variant='outline-primary w-100' onClick={() => setShowGetMLG(true)}>Get It</Button>
      </>}

      <p className="mt-2 text-center">{podcast.body}</p>
    </>
  }

  function renderMLA() {
    return <>
       <div className="logo text-center">
        <img src={librarian} />
      </div>
      {showGetMLA ? <>
        <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
        <LinkContainer to='/mlg/free-access'>
          <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
        </LinkContainer>
      </> : <>
        <Button variant='outline-primary w-100' onClick={() => setShowGetMLA(true)}>Get It</Button>
      </>}
      <p className="mt-2 text-center">Is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes.</p>

    </>
  }

  return <div className='sidebar-podcasts'>
    {renderHireModal()}
    <Card className='mb-3'>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Card.Title className='text-center'>Theory</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Guide</Card.Subtitle>
            {renderMLG()}
          </Col>
          <Col md={6}>
            <Card.Title className='text-center'>Applied</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Applied</Card.Subtitle>
            {renderMLA()}
          </Col>
        </Row>
        {miscResources()}
      </Card.Body>
    </Card>
  </div>
}

function Flowchart() {
  return <h4>Coming soon</h4>
}

export default function Sidebar() {
  const tab = useStoreState(state => state.tab)
  const setTab = useStoreActions(actions => actions.setTab)

  return <div className='sidebar'>
    {btns.tabs(tab, setTab, [
      {k: 'podcasts', v: "Podcasts"},
      {k: 'filters', v: "Filters"}
    ])}
    {{
      podcasts: <Podcasts />,
      filters: <Filters/>,
      flowchart: <Flowchart />
    }[tab]}
  </div>
}