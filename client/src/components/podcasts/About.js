import React, {useState} from "react";
import scout from "../../assets/mlg_square.jpg";
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {btns, patreonLink, Popover_, ReactMarkdown_} from "./utils";
import {
  FaArrowLeft, FaBriefcase, FaDollarSign, FaEnvelope, FaGithub,
  FaItunesNote, FaLightbulb,
  FaPatreon,
  FaRegCheckCircle,
  RiGooglePlayLine,
  RiSpotifyLine,
  SiRss,
  SiStitcher
} from "react-icons/all";
import podcast from "../../content/podcast";
import librarian from "../../assets/mla_square.jpg";
import {LinkContainer} from "react-router-bootstrap";
import {useStoreState} from "easy-peasy";
import {Link} from "react-router-dom";

export default function About() {
  const [showGetMLG, setShowGetMLG] = useState(false)
  const [showGetMLA, setShowGetMLA] = useState(false)

  const [showHire, setShowHire] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const enableHire = false
  const enableDonate = false
  // d75998bd cryptocurrency

  function renderMLG() {
    return <>
      <div className="logo text-center">
        <img src={scout} />
      </div>

      {showGetMLG ? <>
        <ButtonGroup className='d-block' vertical>
          <Button {...btns.iconBtn} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
            <FaItunesNote {...btns.icon} target="_blank" /> iTunes
          </Button>
          <Button {...btns.iconBtn} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
            <RiSpotifyLine {...btns.icon} target="_blank" /> Spotify
          </Button>
          <Button {...btns.iconBtn} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
            <RiGooglePlayLine {...btns.icon} target="_blank" /> Google Podcasts
          </Button>
          <Button {...btns.iconBtn} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
            <SiStitcher {...btns.icon} target="_blank" /> Stitcher
          </Button>
          <Button {...btns.iconBtn} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
            <SiRss {...btns.icon} target="_blank" /> Custom (RSS)
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

  function miscResources() {
    const li = {
      className: 'list-inline-item mr-4'
    }

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

      <ul className='list-inline w-100 text-center mb-0'>

        {enableDonate && <li {...li} onClick={() => setShowDonate(true)}>
          <FaDollarSign {...btns.icon} /> Donate
        </li>}

        {enableHire && <li
          className={li.className + ' pointer'}
          onClick={() => setShowHire(true)}
        >
          <FaBriefcase {...btns.icon} /> Hire Me
        </li>}

        <li {...li}>
          <Link to="/mlg/recommend" className='text-dark'>
            <FaLightbulb {...btns.icon} /> Suggest an Episode
          </Link>
        </li>

        <li {...li}>
          <Popover_ content="Get notified of new episodes / announcements" opts={{placement: 'bottom'}}>
            <a href="http://eepurl.com/cUUWfD" target="_blank" className='text-dark'>
              <FaEnvelope {...btns.icon} /> Mailing List
            </a>
          </Popover_>
        </li>

        <li className='list-inline-item'>
          <a className='text-dark' href="https://github.com/lefnire/gnothi" target='_blank'>
            <FaGithub {...btns.icon} /> Podcast Project
          </a>
        </li>
      </ul>

    </div>
  }

  const check = <FaRegCheckCircle className='text-primary' />

  function renderPatreon() {
    return <Card>
      <Card.Header className='border-bottom-0'>
        <Card.Title className='text-center mb-0'>Patreon</Card.Title>
      </Card.Header>
      <Card.Body>
          <Card.Title>MLA <span className='text-muted'>$5</span></Card.Title>
          <ul className='list-unstyled'>
            <li>{check} Machine Learning Applied <span className='text-muted'>podcast access</span></li>
            <li>{check} Gnothi Premium <span className='text-muted'>account</span></li>
            <li>{check} Ad-free MLG</li>
          </ul>
          <Card.Title>Discord Q&A <span className='text-muted'>$10</span></Card.Title>
          <ul className='list-unstyled'>
            <li>{check} Discord access, <span className='text-muted'>where I'll answer your ML questions</span></li>
            <li>{check} Rewards above</li>
          </ul>
          <Card.Title>Office Hours <span className='text-muted'>$100</span></Card.Title>
          <ul className='list-unstyled'>
            <li>{check} 1h live video session <span className='text-muted'>for subscribers, also acts as office hours where I'll answer ML questions and provide help / support.</span></li>
            <li>{check} Rewards above</li>
          </ul>
          {/*<Col>
            <Card.Subtitle>Job Hunter <span className='text-muted'>$200</span></Card.Subtitle>
          </Col>*/}
        <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> More Info</Button>
      </Card.Body>
    </Card>
  }

  return <Col className='sidebar-podcasts'>
    <Card className='mb-2'>
      <Card.Header className='border-bottom-0'>
        <Card.Title className='text-center mb-0'>Machine Learning Podcasts</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title className='text-center'>Theory</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Guide</Card.Subtitle>
            {renderMLG()}
          </Col>
          <Col>
            <Card.Title className='text-center'>Hands-On</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Applied</Card.Subtitle>
            {renderMLA()}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='border-top-0'>
        {miscResources()}
      </Card.Footer>
    </Card>
    {renderPatreon()}
  </Col>
}