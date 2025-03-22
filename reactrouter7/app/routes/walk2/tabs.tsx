import {useShallow} from "zustand/react/shallow";
import {Link, useNavigate} from "react-router";
import React, {useEffect, useRef} from "react";
import {Badge, Button, Col, Nav, Row, Tab} from "react-bootstrap";
import {create} from "zustand/index";
import essentials from './essentials-links'
import {VideoButton} from "./utils";

export type TabKey = "why_desk" | "buying_guide" | "care" | "essentials"
export const tabStore = create<{
  tab: TabKey | null
  setTab: (tab: TabKey) => void
  optionals: boolean
  showOptionals: () => void
}>()((set, get) => ({
  tab: "essentials",
  setTab: (tab) => set({tab}),
  optionals: false,
  showOptionals: () => set({optionals: true}),
}));

export const tabs: Record<TabKey, string> = {
  why_desk: "Why Walking Desk?",
  buying_guide: "Buying Guide",
  care: "Treadmill Care",
  essentials: "More Essentials"
}

export default function Tabs() {
  const [tab, setTab, optionals, showOptionals] = tabStore(useShallow(s => [s.tab, s.setTab, s.optionals, s.showOptionals]))
  const alreadyScrolled = useRef(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (!tab) { return; }
    if (alreadyScrolled.current) { return; }
    alreadyScrolled.current = true;
    setTimeout(() => navigate('#tabs-tabpane-' + tab), 1)
  }, [tab])
  console.log(tab)
  return <div className={tab ? 'my-2' : 'd-none'}>
    <Tab.Container
      id="tabs"
      activeKey={tab}
      onSelect={(k) => k && setTab(k as TabKey)}
    >
      <Row>
        <Col sm={2}>
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
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="why_desk">
              <h5>Focus</h5>
              <p>Unlike bikes & steppers (manual devices), treadmills (electric devices) move <em>you</em> (just keep up). This satisfy the mind jitters. Its <em>extremely</em> valuable for ADHD.</p>
              {/*<p>one of the few aids that works for me (along with the <Link to={"/blog/20240117-pomodoro-thinkers"}>Modified Pomodoro</Link>).</p>*/}
              <h5>Energy</h5>
              <p>Moving keeps blood and endorphins pumping. It keeps you alert and on task all day. Oxygen and endorphins help not just with energy, but focus. You'll need less caffeine.</p>
              <h5>Health</h5>
              <p>Calories and heart-rate. At my best, I've clocked 320 active zone minutes (Fitbit) in a day. That's 5.3 hrs of gym time. This eliminates the gym, saving time and money. At my worst, I clock the minimum-recommend 10k steps. Further, your posture is ideal while walking, better than sitting <em>and</em> standing.</p>
               <VideoButton href="https://www.youtube.com/watch?v=_6EiAK-jmYQ" />

            </Tab.Pane>
            <Tab.Pane eventKey="buying_guide">
              <h5>Get extended warranty</h5>
              <p>Some mills offer one through their website. Amazon offers Asurion. With the budget treadmills, since YYMV and the reviews are fairly inconsistent, you'll want the peace of mind. I estimate the lifespan of them to be 2 years, based on my own experience.</p>
              <h5>Budget</h5>
              <p>The budget mills can be more loud, and deal less effectively with heat. To deal with this, reduce the amount of at-one-time walking (eg 30-45 min on, 2-5 min break). Generally expect to get around 2 years out of these mills; compared to the non-budgets which could last a life-time. Personally I take the trade-off; I don't know where I'll be in 2 years, and I also have an extended warranty. You can buy a new budget-mill every 2 years for 12 years before you hit the cost of the non-budgets.</p>
              <h5>Non-budget</h5>
              <p>These can bear more weight than the budget picks, and can run continuously for much longer. They're quieter, and they're likely to need less servicing. However, I can't in good faith recommend these, given I haven't needed to service my budget mills after 2 years; I contend that the budget picks are less an issue of quality; and more an issue of using them wisely, like non-continuous use.</p>
              <h5>Using the table below</h5>
              <p>TL;DR: sort by <strong>Rank</strong>, enter a <strong>Price</strong> max.</p>
              <p><strong>Rank</strong> is a weighted sum of each rows' attributes. "Weighted" because some attributes are more important than others. Eg, <strong>App</strong> support has <code>weight=1</code>, where <strong>Sturdy</strong> has <code>weight=10</code>. You can see how each cell ranks in the bottom corner of that cell, eg <Badge bg="success">10</Badge></p>
              <div>This is particularly interesting for <strong>Star Rating</strong>. The value shown in the cell is the rating (usually from Amazon). But the bottom-right number is the adjusted rating:
                <ul className="m-0">
                  <li>star ratings, downplayed if too few ratings present</li>
                  <li>modified by the FakeSpot grade, for both the product and company</li>
                  <li>and taking 1-star skew into consideration</li>
                </ul> So in reality, that little number is more valuable than the rating itself.
              </div>
              <p></p>
              <p>Anywhere there's a <span style={{borderBottom: "1px dotted #000"}}>dotted underline</span>, click it for details. I try to make these count.</p>
            </Tab.Pane>
            <Tab.Pane eventKey="care">
              <h5>Lube</h5>
              <p>Every so 50 hours or 3 months of use, apply this lube in a zig-zag motion under the belt (between belt and pad). Then run the treadmill at 1mph for 2 minutes without walking on it. This reduces heat build-up on the pad; which heat would be transferred to the motor, which would cause degradation. You'll want <a href={essentials.lube} target="_blank">one with a long syringe</a>, rather than the wobbly tube - those are harder to control. <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
              </p>
              <h5>Adjusting the belt</h5>
              <p>If the belt starts to drift one way or another, you take an Alan wrench and tighten <em>the side which is too tight / close (not not the side with slack)</em>. This pulls the belt away from that too-tight side towards the slack side. Think of it as if you created a slope that the belt rolls down. Do quarter turns clock-wise while the belt is running, wait 15 seconds to see if it fixes itself, and do another quarter turn if not (repeat until it&#39;s fixed). Then you just leave it - it&#39;s something I don&#39;t understand, not &quot;undoing&quot; the tightening after the fix, but whatever - you just leave it. This situation happens say once every week or two, is something you do with all the treadmills; necessary evil.
                <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
              </p>
              <h5>Walk 30-45 min, break 1-5 min</h5>
              <div>Budget mills deal less effectively with heat. To deal with this, reduce the amount of at-one-time
                walking. I recommend 30-45 minutes of walking, and a 1-5 minute break (turn off via remote). The
                occasional hour or two won&#39;t kill these machines; but running the belt for 8hrs a day might. I&#39;m
                a fan of the Pomodoro Technique for focus management. You work for 25 minutes (don&#39;t check emails /
                texts / Slack, nothing - pure hardcore work) and then take a break for 5 minutes to catch up on
                everything, or just de-steam. This fits perfectly with the treadmill. Work for 25-30, turn it off and go
                check your texts in the bathroom or whatever for 5 min, repeat.
              </div>


            </Tab.Pane>
            <Tab.Pane eventKey="essentials">
              <h5><a href={essentials.mat} target="_blank">Treadmill Mat</a></h5>
              <p>Adds a layer of shock absorption for your knees, and prevents shock damage to hard floor. Over time
                the rubber stoppers will at worst damage the floor, at best smear rubber that's hard to remove. Adds a
                protection layer against high-pile carpet, so you're not pulling debris into the hardware.
              </p>

              <h5>Standing Desk: <a href={essentials.flexispot} target="_blank">Flexispot</a> ($100-200)</h5>
              <p>My budget pick. I've abused this cheapie for 3 years without a hitch, so I don't see the point in the
                $1,000 Herman Millers championed on <a
                  href="https://www.reddit.com/r/StandingDesks/">https://www.reddit.com/r/StandingDesks/</a>. But if you
                want to splurge, browse that subreddit. I have seen Flexispot starting to gain traction there recently;
                in particular the E7 / E7-Pro. You'll definitely want an electric desk which can sit or stand, because
                after walking or standing all day, you'll need a break sometimes.
              </p>

              <h5>Shoes: Brooks or Hoka (<a href={essentials.shoes_men} target="_blank">Men</a>, <a href={essentials.shoes_women} target="_blank">Women</a>)</h5>
              <p>There are shoes more tailored towards prolonged walking or standing rather than running. I research
                what nurses swear by (articles, Reddit, etc) since it's the closest lifestyle to a walking desk. They're
                quite bullish on two: Brooks Ghost Max 2, and Hoka Clifton / Bondi
              </p>

              <h5>Standing board: <a href={essentials.fluidstance} target="_blank">FluidStance PlaneCloud</a></h5>
              <p>Sometimes you don't feel like walking. I spent a long time researching the perfect standing setup.
                Standing on a hard surface for prolonged periods is NOT good for you (even with good shoes); it's better
                to just sit. So my next move was standing-specific mats. When things really changed was in exploring
                wobble boards (Yes4All, Fezibo, Gymba, etc). By wobbling, you're exerting a sort of added "cushion"
                which lets your body alleviate tension here then there. It's less effort, and more comfort, than you'd
                think. Plus this improves posture, and evidently burns some 200-300 calories extra per 8hr standing day.
                I went through quite a few of these, but they all suffered from a lack of good angle or weight
                distribution. Eg, Yes4All is too "ballerina pose". Fezibo has you over-pronating, which is terrible for
                your ankles. Revbalance is too hard-core, there's no way you'll focus while surfing. So the end-game was
                Fluidstance.
              </p>

              <p>You'll want the cushioned one specifically (PlaneCloud). Prolonged standing is so hard on your feet,
                that you need all the cushion you can get. The top is cushioned, the wobbling aspect itself provides a
                pseudo "cushion" (you're sort of floating around), and I recommend <em>also</em> wearing shoes. Cushion!
              </p>

              <p>Please note: if you've walked all day, you shouldn't switch to standing; you should sit. Use a
                standing board for days you don't walk, otherwise sit. Walking and standing put strain on your knees,
                and to preserve your health you should <em>choose one or the other</em>; and then sit to recover.
              </p>

              {!optionals ? (
                <Button variant="link" onClick={showOptionals}>Show more essentials...</Button>
              ) : <>
                <h5><Link to="/20240110-ergo-mouse-keyboard">Ergonomic keyboard & mouse</Link></h5>
                <p>When you're walking or stepping, you're moving your arms more than usual. People often develop RSI
                  (Repetitive Stress Injury, a cousin of Carpal Tunnel) when seated with a standard mouse, due to the arm
                  motion - that type of wrist motion is bad for you. This is amplified big-time on fitness desks, due to
                  the fitness motion. It could take 6 months, it could take a 5 years, but almost everyone I've talked to
                  who have fitness desks have experienced an RSI uptick. Ergo peripherals solve this definitively.
                </p>

                <div>
                  <ul>
                    <li>Mouse: <a href={essentials.slimblade} target="_blank">Slimblade Pro</a> $110</li>
                    <li>Keyboard: <a href={essentials.keychron} target="_blank">Keychron Q11</a> $200</li>
                  </ul>
                  The two budget picks are Keychron Q11 ($200) and <a href={essentials.mistel} target="_blank">Mistel Barocco MD770</a> ($144).
                  I own Mistel, but the internet favors Keychron. The splurge pick is <a
                  href="https://www.moergo.com/collections/glove80-keyboards">Glove80</a> ($400)
                </div>
                <p></p>

                <h5><a href={essentials.esd_wristband} target="_blank">ESD Wristband</a></h5>
                <p>When walking on a treadmill, you'll build static electricity. If you touch anything metal connected
                  to your computer, you'll cause "electrostatic discharge" or ESD. This can be a monitor, peripherals
                  which have any metal components, your laptop itself, etc. This can damage the electronics in the
                  components you touched, and your computer (the current sent from the component through the connecting
                  wire). There are two solutions: (1) make sure all the components you touch are plastic (SlimBlade and
                  MD770 are), and never touch anything else (you monitor, laptop, etc) while walking; this is what I do.
                  Or (2) buy an anti-static wristband, clamp it to something grounded, and now you don't have to worry
                  about what you touch.
                </p>

                <h5><a href={essentials.gloves} target="_blank">Fingerless gloves</a></h5>
                <p>Since you'll be sweating a bunch, get some cheap cloth fingerless gloves to catch the sweat so it
                  doesn't get on your keyboard or mouse. I tried wrist-bands, but it didn't catch sweat from the hands
                  themselves.
                </p>

                <h5><a href="https://amzn.to/4guIAGd" target="_blank">Wrist weights</a></h5>
                <p>If you wanna get really hard-core, use some wrist weights while you walk and type. This will engage
                  your arms, shoulders, and back. I use these ankle weights (so I can crank up the weight, wrist weights
                  are typically lighter) and wear them all day.
                </p>

                <h5>Monitor Arms: <a href={essentials.vivo}>VIVO</a> or <a href={essentials.mountup}>MountUp</a></h5>
                <p>I highly recommend using monitor arms instead of a stand; especially if you have multiple monitors.
                  This allows you to position the monitors in a tighter cluster, since you have flexibility to angle them
                  without worry of the base leaning over the edge. It also allows you to pull the monitors closer to your
                  face, just above your mouse and keyboard, in a way you couldn't do with a stand.
                </p>
              </>}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </div>
}