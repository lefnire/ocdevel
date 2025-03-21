import {clickAffiliate} from '~/components/analytics'
import {Container, Col, Nav, Row, Tab} from "react-bootstrap";
import {walkingDeskLinks} from "~/content/workflowy/walking-desk-links";
import {FaYoutube} from "react-icons/fa";
import {create} from "zustand"
import './route.css'
import {useShallow} from "zustand/react/shallow";
import {Link, useNavigate} from "react-router";
import {useEffect} from "react";

type TabKey = "why_desk" | "buying_guide" | "care" | "essentials"
const useStore = create<{
  tab: TabKey | null
  setTab: (tab: TabKey) => void
}>()((set, get) => ({
  tab: null,
  setTab: (tab) => set({tab}),
}));

// TOOD locale
const treadmills = [
    {
      key: 'cyberpad',
      image: '/walk_thumbs/cyberpad.jpg',
      title: 'Premium: CyberPad',
      description: <div>
        <span>Sturdiest, quietest, most features.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://cyberpad"],
      linkText: "~$500 on Amazon",
      price: 500,
    },
    {
      key: 'urevo_3s',
      image: '/walk_thumbs/3s.jpg',
      title: 'Value: 3S',
      description: <div>
        <span>One size fits all, bang for buck.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://urevo_3s"],
      linkText: "~$350 on Amazon",
      price: 350,
    },
    {
      key: 'deerrun',
      image: '/walk_thumbs/deerrun.jpg',
      title: 'Budget: DeerRun',
      description: <div>
        <span>Test the waters. No incline, 1-2yrs life; but good price.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://deerrun"],
      linkText: "~$150 on Amazon",
      price: 150,
    },
]

const otherProducts = [
  {
    key: 'flexispot',
    image: '/walk_thumbs/desk.jpg',
    title: 'Desk: FlexiSpot',
    description: 'Electric sit/stand',
    link: walkingDeskLinks["key://flexispot"],
    linkText: "~$150 on Amazon",
    price: 150,
  },
  {
    key: 'mat',
    image: '/walk_thumbs/mat.jpg',
    title: 'Mat: Urevo',
    description: 'Prevents floor damage, protects knees',
    link: walkingDeskLinks["key://mat"],
    linkText: "$40 on Amazon",
    price: 40,
  },
  {
    key: 'lube_godora',
    image: '/walk_thumbs/lube.jpg',
    title: 'Lube: Godora',
    description: 'Silicone treadmill lubricant. Apply every 50hrs',
    link: walkingDeskLinks["key://lube"],
    linkText: "$35 on Amazon",
    price: 35,
  }
  // {
  //   image: '/walk_thumbs/fluidstance.jpg',
  //   title: 'Board: FluidStance',
  //   description: 'Cushioned balance board for non-walking times.',
  //   link: walkingDeskLinks["key://fluidstance"],
  //   linkText: 'View on FluidStance'
  // }
];

const tabs: Record<TabKey, string> = {
  why_desk: "Why Walking Desk?",
  buying_guide: "Buying Guide",
  care: "Treadmill Care",
  essentials: "More Essentials"
}

interface Product {
  image: string;
  title: string;
  description: string | React.ReactElement;
  link: string;
  linkText?: string;
  key: string;
  price: number;
}

function Product(product: Product) {
  return <div className="mb-4" key={product.key}>
    <div className="d-flex">
      <div className="me-3">
        <img src={product.image} className="product-thumbnail" alt={product.title} />
      </div>
      <div className="d-flex flex-column">
        <h6 className="mb-1">{product.title}</h6>
        <small className="text-body-secondary mb-2">{product.description}</small>
        <a
          href={product.link}
          onClick={clickAffiliate({label: product.key, value: product.price })}
          target="_blank"
          className="btn btn-primary align-self-start"
        >
          <span>{product.linkText || 'View on Amazon'}</span>
        </a>
      </div>
    </div>
  </div>
}

interface Products {
  title: string
  links: TabKey[]
  products: Product[]
}
export function ProductsCard ({ title, links, products }: Products) {
  const setTab = useStore(s => s.setTab);
  return <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map(Product)}
    </div>
    <div className="card-body">
      {links.map(l => (
        <a onClick={() => setTab(l)} className="card-link">{tabs[l]}</a>
      ))}
    </div>
  </div>
}

function Tabs() {
  const [tab, setTab] = useStore(useShallow(s => [s.tab, s.setTab]))
  const navigate = useNavigate()
  useEffect(() => {
    if (!tab) { return; }
    setTimeout(() => navigate('#tabs-tabpane-' + tab), 1)
  }, [tab])
  console.log(tab)
  return <div className={tab ? 'my-2' : 'd-none'}>
    <Tab.Container
      id="tabs"

      activeKey={tab}
      onSelect={(k) => setTab(k)}
    >
      <Row>
        <Col sm={3}>
          <Nav variant="underline" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="why_desk">{tabs.why_desk}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="buying_guide">{tabs.buying_guide}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="care">{tabs.care}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="essentials">{tabs.essentials}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="why_desk">
              <h5>Focus</h5>
              <div>Unlike bikes & steppers, treadmills move *you* (just keep up), and satisfy the mind jitters. It *really* helps with ADHD; one of the only things that works for me (along with the <Link to={"/blog/20240117-pomodoro-thinkers"}>Modified Pomodoro</Link>.</div>
              <h5>Energy</h5>
              <div>Moving keeps blood and endorphins pumping. It keeps you alert and on task all day. Oxygen and endorphins help not just with energy, but focus. You'll need less caffeine.</div>
              <h5>Health</h5>
              <div>Calories and heart-rate. At my best, I've clocked 320 active zone minutes (Fitbit) in a day. That's 5.3 hrs of gym time. Excessive likely - but suffice it eliminates the gym, saving time and money. At my worst, I clock the minimum-recommend 10k steps. Further, your posture is ideal while walking, better than sitting *and* standing.</div>



            </Tab.Pane>
            <Tab.Pane eventKey="buying_guide">
              <h5>Get extended warranty if available</h5>
              <div>Asurion or whatever it is. With the budget treadmills, since YYMV and the reviews are fairly inconsistent, you'll want the peace of mind. I estimate the lifespan of them to be 2 years, based on my own experience.</div>
              <h5>Budget</h5>
              <div>The budget mills can be more loud, and deal less effectively with heat. To deal with this, reduce the amount of at-one-time walking (eg 30-45 min on, 2-5 min break). Generally expect to get around 2 years out of these mills; compared to the non-budgets which could last a life-time. Personally I take the trade-off; I don't know where I'll be in 2 years, and I also have an extended warranty. You can buy a new budget-mill every 2 years for 12 years before you hit the cost of the non-budgets.</div>
              <h5>Non-budget</h5>
              <div>These can bear more weight than the budget picks, and can run continuously for much longer. They're quieter, and they're likely to need less servicing. However, I can't in good faith recommend these, given I haven't needed to service my budget mills after 2 years; I contend that the budget picks are less an issue of quality; and more an issue of using them wisely, like non-continuous use.
              </div>
              <h5>Using this table</h5>
              <div className="alert alert-warning">TODO</div>

            </Tab.Pane>
            <Tab.Pane eventKey="care">
<h5><a href="key://lube">Lube</a></h5>
<div><a href="https://www.youtube.com/watch?v=WG1TDtDhbI0">How-to video</a>. Every so 50 hours or 3 months of use, apply this lube in a zig-zag motion under the belt (between belt and pad). Then run the treadmill at 1mph for 2 minutes without walking on it. This reduces heat build-up on the pad; which heat would be transferred to the motor, which would cause degradation. You&#39;ll want one a long syringe, rather than the wobbly tube - those are harder to control.</div>
<h5>Adjusting the belt</h5>
<div><a href="https://www.youtube.com/watch?v=PcjWc-tjLHA">How-to video</a>. If the belt starts to drift one way or another, you take an Alan wrench and tighten <em>the side which is too tight / close (not not the side with slack)</em>. This pulls the belt away from that too-tight side towards the slack side. Think of it as if you created a slope that the belt rolls down. Do quarter turns clock-wise while the belt is running, wait 15 seconds to see if it fixes itself, and do another quarter turn if not (repeat until it&#39;s fixed). Then you just leave it - it&#39;s something I don&#39;t understand, not &quot;undoing&quot; the tightening after the fix, but whatever - you just leave it. This situation happens say once every week or two, is something you do with all the treadmills; necessary evil.</div>
<h5>Walk 30-45 min, break 1-5 min</h5>
<div>Budget mills deal less effectively with heat. To deal with this, reduce the amount of at-one-time walking. I recommend 30-45 minutes of walking, and a 1-5 minute break (turn off via remote). The occasional hour or two won&#39;t kill these machines; but running the belt for 8hrs a day might. I&#39;m a fan of the Pomodoro Technique for focus management. You work for 25 minutes (don&#39;t check emails / texts / Slack, nothing - pure hardcore work) and then take a break for 5 minutes to catch up on everything, or just de-steam. This fits perfectly with the treadmill. Work for 25-30, turn it off and go check your texts in the bathroom or whatever for 5 min, repeat. </div>

            </Tab.Pane>
            <Tab.Pane eventKey="essentials">
              <p>More Essentials</p>
<blockquote>
<p>Sit/stand desk; stands and arms; peripherals</p>
</blockquote>
<ul>
<li><a href="key://mat">Treadmill Mat</a><blockquote>
<p>Adds a layer of shock absorption for your knees, and prevents shock damage to hard floor. Over time the rubber stoppers will at worst damage the floor, at best smear rubber that&#39;s hard to remove. Adds a protection layer against high-pile carpet, so you&#39;re not pulling debris into the hardware.</p>
</blockquote>
</li>
<li>Standing Desk: <a href="key://flexispot">Flexispot</a> ($100-200)<blockquote>
<p>My budget pick. I&#39;ve abused this cheapie for 3 years without a hitch, so I don&#39;t see the point in the $1,000 Herman Millers championed on <a href="https://www.reddit.com/r/StandingDesks/">https://www.reddit.com/r/StandingDesks/</a>. But if you want to splurge, browse that subreddit. I have seen Flexispot starting to gain traction there recently; in particular the E7 / E7-Pro. You&#39;ll definitely want an electric desk which can sit or stand, because after walking or standing all day, you&#39;ll need a break sometimes. </p>
</blockquote>
</li>
<li>Shoes: Brooks or Hoka (<a href="key://shoes_men">Men</a>, <a href="key://shoes_women">Women</a>)<blockquote>
<p>There are shoes more tailored towards prolonged walking or standing rather than running. I research what nurses swear by (articles, Reddit, etc) since it&#39;s the closest lifestyle to a walking desk. They&#39;re quite bullish on two: Brooks Ghost Max 2, and Hoka Clifton / Bondi</p>
</blockquote>
</li>
<li>Standing board: <a href="key://fluidstance">FluidStance PlaneCloud</a><blockquote>
<p>Sometimes you don&#39;t feel like walking. I spent a long time researching the perfect standing setup. Standing on a hard surface for prolonged periods is NOT good for you (even with good shoes); it&#39;s better to just sit. So my next move was standing-specific mats. When things really changed was in exploring wobble boards (Yes4All, Fezibo, Gymba, etc). By wobbling, you&#39;re exerting a sort of added &quot;cushion&quot; which lets your body alleviate tension here then there. It&#39;s less effort, and more comfort, than you&#39;d think. Plus this improves posture, and evidently burns some 200-300 calories extra per 8hr standing day. I went through quite a few of these, but they all suffered from a lack of good angle or weight distribution. Eg, Yes4All is too &quot;ballerina pose&quot;. Fezibo has you over-pronating, which is terrible for your ankles. Revbalance is too hard-core, there&#39;s no way you&#39;ll focus while surfing. So the end-game was Fluidstance. </p>
<p>You&#39;ll want the cushioned one specifically (PlaneCloud). Prolonged standing is so hard on your feet, that you need all the cushion you can get. The top is cushioned, the wobbling aspect itself provides a pseudo &quot;cushion&quot; (you&#39;re sort of floating around), and I recommend <em>also </em>wearing shoes. Cushion!</p>
<p>Please note: if you&#39;ve walked all day, you shouldn&#39;t switch to standing; you should sit. Use a standing board for days you don&#39;t walk, otherwise sit. Walking and standing put strain on your knees, and to preserve your health you should <em>choose one or the other</em>; and then sit to recover.</p>
</blockquote>
</li>
<li><a href="https://ocdevel.com/blog/20240110-ergo-mouse-keyboard">Ergonomic keyboard &amp; mouse</a> #c<blockquote>
<p>When you&#39;re walking or stepping, you&#39;re moving your arms more than usual. People often develop RSI (Repetitive Stress Injury, a cousin of Carpal Tunnel) when seated with a standard mouse, due to the arm motion - that type of wrist motion is bad for you. This is amplified big-time on fitness desks, due to the fitness motion. It could take 6 months, it could take a 5 years, but almost everyone I&#39;ve talked to who have fitness desks have experienced an RSI uptick. Ergo peripherals solve this definitively. </p>
<ul>
<li>Mouse: <a href="key://slimblade">Slimblade Pro</a> $110</li>
<li>Keyboard: <a href="key://keychron">Keychron Q11</a> $200
The two budget picks are Keychron Q11 ($200) and <a href="key://mistel">Mistel Barocco MD770</a> ($144). I own Mistel, but the internet favors Keychron. The splurge pick is <a href="https://www.moergo.com/collections/glove80-keyboards">Glove80</a> ($400)</li>
</ul>
</blockquote>
</li>
<li><a href="https://amzn.to/4guIAGd">Wrist weights</a><blockquote>
<p>If you wanna get really hard-core, use some wrist weights while you walk and type. This will engage your arms, shoulders, and back. I use these ankle weights (so I can crank up the weight, wrist weights are typically lighter) and wear them all day.</p>
</blockquote>
</li>
<li>Monitor Arms: <a href="key://vivo">VIVO</a> or <a href="key://mountup">MountUp</a><blockquote>
<p>I highly recommend using monitor arms instead of a stand; especially if you have multiple monitors. This allows you to position the monitors in a tighter cluster, since you have flexibility to angle them without worry of the base leaning over the edge. It also allows you to pull the monitors closer to your face, just above your mouse and keyboard, in a way you couldn&#39;t do with a stand.</p>
</blockquote>
</li>
<li><a href="key://esd_wristband">ESD Wristband</a><blockquote>
<p>When walking on a treadmill, you&#39;ll build static electricity. If you touch anything metal connected to your computer, you&#39;ll cause &quot;electrostatic discharge&quot; or ESD. This can be a monitor, peripherals which have any metal components, your laptop itself, etc. This can damage the electronics in the components you touched, and your computer (the current sent from the component through the connecting wire). There are two solutions: (1) make sure all the components you touch are plastic (SlimBlade and MD770 are), and never touch anything else (you monitor, laptop, etc) while walking; this is what I do. Or (2) buy an anti-static wristband, clamp it to something grounded, and now you don&#39;t have to worry about what you touch.</p>
</blockquote>
</li>
<li><a href="key://gloves">Fingerless gloves</a><blockquote>
<p>Since you&#39;ll be sweating a bunch, get some cheap cloth fingerless gloves to catch the sweat so it doesn&#39;t get on your keyboard or mouse. I tried wrist-bands, but it didn&#39;t catch sweat from the hands themselves.</p>
</blockquote>
</li>
</ul>

            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </div>
}

export default function TopSection() {
  // TODO replace ./route.css with image loaders for remix
  return <Container>
    <div className="row g-4 mb-4">
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Walking Pads"
          products={treadmills}
          links={["why_desk", "buying_guide"]}
        />
      </div>
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Essentials"
          products={otherProducts}
          links={["care", "essentials"]}
        />
      </div>
    </div>
    <Tabs />
    </Container>
}
