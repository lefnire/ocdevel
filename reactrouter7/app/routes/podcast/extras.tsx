import Card from 'react-bootstrap/cjs/Card';
import Col_ from 'react-bootstrap/cjs/Col';
const Col = Col_.default || Col_
import Row from 'react-bootstrap/cjs/Row';
import {IconButton} from "~/components/icon-btn";
import {icons} from '~/components/collapsible-icons'
import {FaDiscord} from "@react-icons/all-files/fa/FaDiscord";
import {FaEnvelope} from "@react-icons/all-files/fa/FaEnvelope";
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
// import {FaItunesNote} from "@react-icons/all-files/fa/FaItunesNote";
import {FaLightbulb} from "@react-icons/all-files/fa/FaLightbulb";
// import {FaYoutube} from "@react-icons/all-files/fa/FaYoutube";
import {type PropsWithChildren} from "react";
import useStore from "~/routes/podcast._index/store";
import {Link} from "react-router";
import {useShallow} from "zustand/react/shallow";
import type {Route} from './+types/route.tsx'
import {PopoverTrigger} from "~/components/popover";
type Props = Route.ComponentProps['loaderData']

/**
 * Not actually used like this; just showing that PopoverProvider is required
 * if we want to bring any of these back
 */
export default function Extras(props: Props) {
  return <PopoverProvider>
    <AboutSection title=""></AboutSection>
    <Links {...props} />
    <Updates {...props} />
  </PopoverProvider>
}

type AboutSection = PropsWithChildren<{title: string, top?: boolean}>
function AboutSection({children, title, top=false}: AboutSection) {
  const [showAbout, toggleAbout] = useStore(useShallow(state => [state.showAbout, state.toggleAbout]))
  return <>
    <Card.Header
      className={`pointer border-bottom-0 ${top ? '' : 'border-top'}`}
      onClick={toggleAbout}
    >
      <Card.Title className='text-center mb-0'>
        {showAbout ? icons.down : icons.right}{' '}
        {title}
      </Card.Title>
    </Card.Header>
    {showAbout && <Card.Body>{children}</Card.Body>}
  </>
}

function Links({podcastKey}: Props) {
  if (podcastKey === "llh") { return null; }
  return null;
  const common = {
    div: {xs: 12, md: 6, className: 'p-1'},
  }
  const btn = {variant: 'light'}

  function SuggestEpisode() {
    // no longer working
    return <Col {...common.div}>
      <IconButton
        {...btn}
        href="/mlg/recommend"
        Icon={FaLightbulb}
        >Suggest Episode</IconButton>
    </Col>
  }

  function MailingList() {
    return <PopoverTrigger
      content={{
        title: undefined,
        body: () => <div>Get notified of new episodes and announcements</div>
      }}
      placement='bottom'
    >
      <Col {...common.div}>
        <IconButton {...btn} href="http://eepurl.com/cUUWfD" target="_blank" Icon={FaEnvelope}>
          Mailing List
        </IconButton>
      </Col>
    </PopoverTrigger>
  }

  function PodcastProject() {
    return <PopoverTrigger
      content={{
        title: undefined,
        body: () => <div>Gnothi, oft-mentioned in MLG, is open source. See how to implement ML in Python.</div>
      }}
      placement='bottom'
    >
      <Col {...common.div}>
        <IconButton {...btn} href="https://github.com/lefnire/gnothi" target='_blank' Icon={FaGithub}>
          Podcast Project
        </IconButton>
      </Col>
    </PopoverTrigger>
  }

  function Community() {
    // Discord gone after Dept
    return <PopoverTrigger
      content={{
        title: undefined,
        body: () => <div>Join fellow learners on Discord to ask questions and network</div>
      }}
      placement='bottom'
    >
      <Col {...common.div}>
        <IconButton {...btn} href="https://discord.gg/2j2RUVbu" target='_blank' Icon={FaDiscord}>
          Community
        </IconButton>
      </Col>
    </PopoverTrigger>
  }

  return <>
    <hr />
    <Row>
      <SuggestEpisode />
      <MailingList />
      <PodcastProject />
      <Community />
    </Row>
  </>
}

function Updates(props: Props) {
  // hiding for now; bring bakc later
  return null;
  const show = useStore(s => s.showUpdates)
  const toggle = useStore(s => s.toggleUpdates)

  return <AboutSection title='Updates' show={show} toggle={toggle}>
    <div className="mb-3 mlg-update ps-3">
      <Card.Title className='mb-1'>2024-01-11: Battle Station</Card.Title>
      <p>See Tyler's workstation recommendations: <Link to="/walk">walking desk</Link> and <Link to="/blog/20240110-ergo-mouse-keyboard">keyboard + mouse.</Link></p>
    </div>
    {/* git-blame dept */}
    <hr />
    <div className="text-muted mb-3 ps-3">
      <Card.Title className='mb-1'>2020-12-19: Podcast re-do</Card.Title>
      <p>I'm re-doing MLG (2nd edition) to refresh resources & concepts to 2021. Starting now use <Link to="/mlg/resources">Resources</Link>, and ignore the resources discussed in the episodes. Then I can to keep resources updated without editing episodes. I'm removing checkpoints and irrelevant episodes to make room for new ones - so if you see see "holes" that's normal. I'll keep the Bitcoin Trading episode, as it's info-packed, but the podcast project is now <a href='https://gnothiai.com' target='_blank'>Gnothi</a>.</p>
    </div>
  </AboutSection>
}