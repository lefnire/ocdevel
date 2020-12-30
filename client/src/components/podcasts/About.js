import React, {useState} from "react";
import scout from "../../assets/mlg_square.jpg";
import {Button, ButtonGroup, Card, Col, Row,
FormGroup, InputGroup, FormControl, Form, Alert} from "react-bootstrap";
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
import {mlg, mla, episodes} from "../../content/podcast";
import librarian from "../../assets/mla_square.jpg";
import {LinkContainer} from "react-router-bootstrap";
import {useStoreState} from "easy-peasy";
import {Link} from "react-router-dom";

function AboutSection({children, title, top=false}) {
  const [show, setShow] = useState(true)

  return <>
    <Card.Header
      className={`pointer border-bottom-0 ${top ? '' : 'border-top'}`}
      onClick={() => setShow(!show)}
    >
      <Card.Title className='text-center mb-0'>{title}</Card.Title>
    </Card.Header>
    {show && <Card.Body>{children}</Card.Body>}
  </>
}

function ShowMoreLess({podcast}) {
  const [showMore, setShowMore] = useState(false)

  return <div className="mt-2 text-center">
    {showMore ? <div>{podcast.body}</div> : <div>
      <div>{podcast.teaser}</div>
    </div>}
    <div
      className='text-primary text-underline pointer'
      onClick={() => setShowMore(!showMore)}
    >Show {showMore ? "less" : "more"}</div>
  </div>
}

function MLG() {
  const [showLinks, setShowLinks] = useState(false)

  return <>
    <div className="logo text-center">
      <img src={scout} />
    </div>

    {showLinks ? <>
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
      <Button variant='outline-primary w-100' onClick={() => setShowLinks(true)}>Get It</Button>
    </>}

    <ShowMoreLess podcast={mlg} />
  </>
}

function MLA() {
  const [showLinks, setShowLinks] = useState(false)

  return <>
    <div className="logo text-center">
      <img src={librarian} />
    </div>
    {showLinks ? <>
      <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
      <LinkContainer to='/mlg/free-access'>
        <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
      </LinkContainer>
    </> : <>
      <Button variant='outline-primary w-100' onClick={() => setShowLinks(true)}>Get It</Button>
    </>}
    <ShowMoreLess podcast={mla}/>
  </>
}

function Podcasts() {
  function renderHeader(title, subtitle) {
    return <>
      <Card.Title className='text-center'>{title}</Card.Title>
      <Card.Subtitle className='text-center text-muted mb-1'>{subtitle}</Card.Subtitle>
    </>
  }
  return <AboutSection title='Machine Learning Podcasts' top={true}>
    <Row>
      <Col>
        {renderHeader('Theory', mlg.title)}
        <MLG />
      </Col>
      <Col>
        {renderHeader('Hands-On', mla.title)}
        <MLA />
      </Col>
    </Row>
  </AboutSection>
}

function Patreon() {
  const check = <FaRegCheckCircle className='text-primary' />

  return <AboutSection title='Patreon'>
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
  </AboutSection>
}

function MoreLinks() {
  const [showDonate, setShowDonate] = useState(false)
  const enableHire = true
  const enableDonate = true

  const link = {
    className: 'text-dark pointer'
  }

  function prependField(id, prepend, value) {
    return <>
      <Form.Label htmlFor={id} srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2" size='sm'>
        <InputGroup.Prepend>
          <InputGroup.Text>{prepend}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id={id} value={value} readOnly />
      </InputGroup>
    </>
  }

  return <AboutSection title='Links'>
    <Row>
      <Col>
        {enableHire && <div>
          <Link to='contact' {...link}>
            <FaBriefcase {...btns.icon} /> Hire Me
          </Link>
        </div>}

        {enableDonate && <div {...link} onClick={() => setShowDonate(true)}>
          <FaDollarSign {...btns.icon} /> Donate
        </div>}

        <div>
          <a {...link} href={patreonLink} target='_blank'><FaPatreon /> Patreon</a>
        </div>
      </Col>
      <Col>
        <div>
          <Link to="/mlg/recommend" {...link}>
            <FaLightbulb {...btns.icon} /> Suggest an Episode
          </Link>
        </div>

        <div>
          <Popover_ content="Get notified of new episodes / announcements" opts={{placement: 'bottom'}}>
            <a {...link} href="http://eepurl.com/cUUWfD" target="_blank" className='text-dark'>
              <FaEnvelope {...btns.icon} /> Mailing List
            </a>
          </Popover_>
        </div>

        <div>
          <a {...link} className='text-dark' href="https://github.com/lefnire/gnothi" target='_blank'>
            <FaGithub {...btns.icon} /> Podcast Project
          </a>
        </div>
      </Col>
    </Row>
    {showDonate && <Alert variant='info' className='mt-3' onClose={() => setShowDonate(false)} dismissible>
      <Card.Title className='text-center'>Donate</Card.Title>
      <p>The best way to show support is via Patreon (above), plus you'll receive perks like access to an exclusive podcast series on applied ML. But if you don't like that, donate below - and <em>thank you!</em></p>
      <hr/>

      <div className='text-center'>
        <Card.Subtitle className='mb-2'>PayPal</Card.Subtitle>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="9A9KRVTQFFLFC" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
      <hr />

      <Card.Subtitle className='mb-2 text-center'>Crypto</Card.Subtitle>
      {prependField('btc', 'BTC', '1Mgi64qWNYAcUhjvyoc8oYDNN6oKPzpaWs')}
      {prependField('bch', 'BCH', '17VMYyAHFZSfy8EzLcy69Sie9sw5qe8nyP')}
      {prependField('eth', 'ETH', '0x250092887eC61E75f0F82edcBC741fF428D5c8d5')}

    </Alert>}
  </AboutSection>
}

export default function About() {
  return <Col className='sidebar-podcasts'>
    <Card className='border-0'>
      <Podcasts />
      <Patreon />
      <MoreLinks />
    </Card>
  </Col>
}