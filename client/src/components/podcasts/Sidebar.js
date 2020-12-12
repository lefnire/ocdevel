import {Button, ButtonGroup, Card, Modal, OverlayTrigger, Popover} from "react-bootstrap";
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
import {patreonLink} from './utils'

export default function Sidebar() {
  const [showHire, setShowHire] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const enableHire = false
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

  function miscResources() {
    const buttonAttrs = {
      variant: 'light',
      className: 'icon-btn'
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

      <ButtonGroup className='d-block' vertical>
        <Button {...buttonAttrs} onClick={() => setShowDonate(true)}>
          <FaDollarSign /> Donate
        </Button>
        {enableHire && <Button {...buttonAttrs} onClick={() => setShowHire(true)}>
          <FaBriefcase /> Hire Me
        </Button>}
        <LinkContainer to="/mlg/recommend">
          <Button {...buttonAttrs}>
            <FaLightbulb /> Recommend an Episode
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
          <Button {...buttonAttrs} href="http://eepurl.com/cUUWfD" target="_blank">
            <FaEnvelope /> Mailing List
          </Button>
        </OverlayTrigger>
        <Button {...buttonAttrs} href="https://github.com/lefnire/gnothi" target='_blank'>
          <FaGithub /> Podcast Project: Gnothi
        </Button>
      </ButtonGroup>

    </div>
  }

  const btnOpts = {
    variant: 'light',
    className: 'icon-btn',
    target: '_blank'
  }
  return <>
    {renderHireModal()}
    <Card className='mb-3'>
      <Card.Body>
        <div className="logo text-center mb-3">
          <img src={podcast.image} />
        </div>
        <Card.Title>Machine Learning Guide</Card.Title>
        <p>{podcast.body}</p>

        <ButtonGroup className='d-block' vertical>
          <Button {...btnOpts} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
            <FaItunesNote size={24}/> iTunes
          </Button>
          <Button {...btnOpts} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
            <RiSpotifyLine size={24}/> Spotify
          </Button>
          <Button {...btnOpts} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
            <RiGooglePlayLine size={24} /> Google Podcasts
          </Button>
          <Button {...btnOpts} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
            <SiStitcher size={24} /> Stitcher
          </Button>
          <Button {...btnOpts} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
            <SiRss size={24} /> Custom (RSS)
          </Button>
        </ButtonGroup>
        <hr />
        <Card.Title>Machine Learning Applied</Card.Title>
        <p>Is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes.</p>
        <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
        <LinkContainer to='/mlg/free-access'>
          <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
        </LinkContainer>
        <hr />
        {miscResources()}
      </Card.Body>
    </Card>
  </>
}