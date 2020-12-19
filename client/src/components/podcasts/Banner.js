import React, {useState} from "react";
import {Card, Modal} from "react-bootstrap";
import {FaBriefcase, FaDollarSign, FaEnvelope, FaGithub, FaLightbulb} from "react-icons/all";
import {btns, Popover_} from "./utils";
import {Link} from "react-router-dom";

export default function Banner() {
  const [showHire, setShowHire] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
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

  const li = {
    className: 'list-inline-item border-right pr-2 banner-li'
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

  return <>
    {renderHireModal()}
    <Card className="mb-3 shadow-sm free-mla-card ">
      <Card.Body>
        <Card.Title>2020-12-19 Update</Card.Title>
        <p>I'm re-doing MLG from scratch! MLG 2nd edition, to refresh resources & concepts to 2020. Starting now use this site your resources list, and ignore the ones I discuss in each episode. This allows me to keep resources up-to-date here without having to edit episodes.</p>
      </Card.Body>
      <Card.Footer className='border-top-0'>
        {miscResources()}
      </Card.Footer>
    </Card>
  </>
}