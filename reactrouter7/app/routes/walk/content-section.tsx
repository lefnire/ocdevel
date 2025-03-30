import {Link, useNavigate} from "react-router";
import React, {useState} from "react";
import {Button, type ButtonProps, Container} from "react-bootstrap";
import essentials, {affiliateLink} from '~/content/product-links'
import {VideoButtonLg as VideoButton} from "./utils";
import {ScoreInfo} from "~/routes/walk/treadmills/utils";
import {FaArrowUp} from "react-icons/fa";
import type {ListenerProps} from "~/routes/walk/url-listener";

export const contentSections = {
  why_desk: "Why Walking Desk?",
  buying_guide: "Buying Guide",
  care: "Treadmill Care",
  essentials: "More Essentials"
} as const;

export default function ContentSection(props: ListenerProps) {
  const [optionals, setOptionals] = useState(false)
  const showOptionals = () => setOptionals(true)
  if (props.isFiltered || props.isCompareMode) { return null}
  const scrollToTop = () => {
    window.scroll(0, 0)
  }
  const header = (key: keyof typeof contentSections) => {
    return <h3 id={key} className='mt-2'>{contentSections[key]}</h3>
  }
  const toTop = <div>
    <Button
      size='sm'
      className='my-2'
      variant='link'
      onClick={scrollToTop}
    >
      Back To Top <FaArrowUp />
    </Button>
  </div>
  return <Container>
    {header("why_desk")}
    <h5>Focus</h5>
    <p>Unlike bikes & steppers (manual devices), treadmills (electric devices) move <em>you</em> (just keep up). This
      satisfy the mind jitters. Its <em>extremely</em> valuable for ADHD.</p>
    {/*<p>one of the few aids that works for me (along with the <Link to={"/blog/20240117-pomodoro-thinkers"}>Modified Pomodoro</Link>).</p>*/}
    <h5>Energy</h5>
    <p>Moving keeps blood and endorphins pumping. It keeps you alert and on task all day. Oxygen and endorphins help not
      just with energy, but focus. You'll need less caffeine.</p>
    <h5>Health</h5>
    <p>Calories and heart-rate. At my best, I've clocked 320 active zone minutes (Fitbit) in a day. That's 5.3 hrs of
      gym time. This eliminates the gym, saving time and money. At my worst, I clock the minimum-recommend 10k steps.
      Further, your posture is ideal while walking, better than sitting <em>and</em> standing.</p>
    <VideoButton href="https://www.youtube.com/watch?v=_6EiAK-jmYQ"/>
    {toTop}


    {header("buying_guide")}
    <h5>Get extended warranty</h5>
    <p>Some treadmills offer one through their website. Amazon offers Asurion. With the budget treadmills, since YYMV and reviews are inconsistent, you'll want the peace of mind.</p>
    <p></p>
    <h5>Budget</h5>
    <p>The budget mills can be more loud, and deal less effectively with heat. To deal with this, reduce the amount of at-one-time walking (eg 30-45 min on, 2-5 min break). Generally expect 1-2 years out of these mills; compared to the non-budgets which could last 10 years. Personally I take the trade-off - I don't know where I'll be in 2 years. And with Amazon's extended warranty, I've been refunded for every malfunction.</p>
    <h5>Non-budget</h5>
    <p>LifeSpan, Unsit, Walkolution, etc. These can bear more weight than the budget picks, and can run continuously for much longer (6-9hrs for LifeSpan, no limit for Walkolution). They're quieter, and much more durable. When you do have problems, they come with long warranties and you'll typically have a service rep come fix it. They're much larger and heavier than budget mills, so they'll be more a permanent fixture than a wheel-away.</p>
    <h5>Using the table above</h5>
    <p>TL;DR: sort by <strong>Score</strong>, enter a <strong>Price</strong> max.</p>
    <ScoreInfo/>
    <p></p>
    <p>Anywhere there's a <span style={{borderBottom: "1px dotted #000"}}>dotted underline</span>, click it for details.
      I try to make these count.</p>
    {/*<p>I switch up the default links sometimes when one has a better deal (either price, warranty, or added goodies).</p>*/}
    {toTop}


    {header("care")}
    <h5>Lubrication</h5>
    <div className="py-1">Every 50 hours or 3 months of use, apply lube in a zig-zag motion under the belt (between belt and pad). Then run the treadmill at 1mph for 2 minutes without walking on it. This reduces friction on the pad, which prevents overworking the motor, which extends the treadmill's life. Get one with a firm applicator; wobbly tubes are hard to control. {affiliateLink(essentials.godora_lube, "Godora")} is easier, {affiliateLink(essentials.sekoday_lube, "Sekoday")} is cheaper. <VideoButton
        href="https://www.youtube.com/shorts/QK-BGSrCFXY"/>
    </div>
    <h5>Adjusting the belt</h5>
    <div className="py-1">If the belt starts to drift one way or another, you take an Alan wrench and tighten <em>the
      side which is too tight / close (not not the side with slack)</em>. This pulls the belt away from that too-tight
      side towards the slack side. Think of it as if you created a slope that the belt rolls down. Do quarter turns
      clock-wise while the belt is running, wait 15 seconds to see if it fixes itself, and do another quarter turn if
      not (repeat until it&#39;s fixed). Then you just leave it - it&#39;s something I don&#39;t understand,
      not &quot;undoing&quot; the tightening after the fix, but whatever - you just leave it. This situation happens say
      once every week or two, is something you do with all the treadmills; necessary evil.&nbsp;
      <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY"/>
    </div>
    <h5>Walk 30-45 min, break 1-5 min</h5>
    <div className="py-1">Budget mills deal less effectively with heat. To deal with this, reduce the amount of
      at-one-time
      walking. I recommend 30-45 minutes of walking, and a 1-5 minute break (turn off via remote). The
      occasional hour or two won&#39;t kill these machines; but running the belt for 8hrs a day might. I&#39;m
      a fan of the Pomodoro Technique for focus management. You work for 25 minutes (don&#39;t check emails /
      texts / Slack, nothing - pure hardcore work) and then take a break for 5 minutes to catch up on
      everything, or just de-steam. This fits perfectly with the treadmill. Work for 25-30, turn it off and go
      check your texts in the bathroom or whatever for 5 min, repeat.
    </div>
    {toTop}


    {header("essentials")}
    <h5>Treadmill Mat</h5>

    <p>{affiliateLink(essentials.urevo_mat, "Urevo Mat")}. Adds a layer of shock absorption for your knees, and prevents shock damage to hard floor. Over time
      the rubber stoppers will at worst damage the floor, at best smear rubber that's hard to remove. Adds a protection layer against high-pile carpet, so you're not pulling debris into the hardware.
    </p>

    <h5>Standing Desk</h5>
    <p>{affiliateLink(essentials.flexispot_en1, "Flexispot")}. My budget pick. I've abused this cheapie for 3 years without a hitch, so I don't see the point in the
      $1,000 Herman Millers championed on <a href="https://www.reddit.com/r/StandingDesks/" target="_blank">/r/StandingDesks</a>. But if you want to splurge, browse that sub. I've seen FlexiSpot gaining traction there recently;
      in particular the E7 series. You'll definitely want an electric desk which can sit or stand, because after walking or standing all day, you'll need a break.
    </p>

    <h5>Shoes: Brooks or Hoka</h5>
    <p>{affiliateLink(essentials.shoes_men, "Men")}, {affiliateLink(essentials.shoes_women, "Women")}. There are shoes more tailored towards prolonged walking or standing rather than running. I research what nurses champion, since it's the closest lifestyle to a walking desk. They're quite bullish on two: Brooks Ghost Max 2, and Hoka Clifton / Bondi
    </p>

    <h5>Ergonomic keyboard & mouse</h5>
    <p><Link to="/blog/20240110-ergo-mouse-keyboard">Article</Link>. People often develop RSI (Repetitive Stress Injury, a cousin of Carpal Tunnel) when seated with a standard mouse, due to the arm motion. That type of wrist motion is bad for you. When you walk, you move your arms more than usual, which amplifies RSI risk significantly. It could take 6 months, it could take a 5 years, but many I've talked to with walking desks have experienced an RSI uptick. Ergo peripherals solve this. Read that article for recommendations (different budgets & styles), but hot-take budget-picks are (Mouse: {affiliateLink(essentials.kensington_slimbladepro, "Slimblade Pro")}, Keyboard: {affiliateLink(essentials.keychron_q11, "Keychron Q11")})
    </p>
    <p></p>


    {/*<div>
                <VideoButton href="https://www.youtube.com/shorts/fHjxqYBIPKA" label="Video 1" />
              </div>
              <div>
                <VideoButton href="https://www.youtube.com/shorts/BLvJmlB3j7Q" label="Video 2" />
              </div>*/}

    {!optionals ? (
      <Button variant="link" onClick={showOptionals}>Show More Essentials...</Button>
    ) : <>

      <h5>ESD Wristband</h5>
      <p>{affiliateLink(essentials.esdwristband, "Wristband")}. When walking on a treadmill, you'll build static electricity. If you touch anything metal connected
        to your computer, you'll cause "electrostatic discharge" or ESD. This can be a monitor, peripherals
        which have any metal components, your laptop itself, etc. This can damage the electronics in the
        components you touched, and your computer (the current sent from the component through the connecting
        wire). There are two solutions: (1) make sure all the components you touch are plastic (SlimBlade and
        MD770 are), and never touch anything else (you monitor, laptop, etc) while walking; this is what I do.
        Or (2) buy an anti-static wristband, clamp it to something grounded, and now you don't have to worry
        about what you touch.
      </p>

      <h5>Standing Board</h5>
      <p>{affiliateLink(essentials.fluidstance_planecloud, "FluidStance PlaneCloud")}. Sometimes you don't feel like walking. I spent a long time researching the perfect standing setup.
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

      <h5>Fingerless Gloves</h5>
      <p>{affiliateLink(essentials.fingerlessgloves, "Gloves")}. Since you'll be sweating a bunch, get some cheap cloth fingerless gloves to catch the sweat so it
        doesn't get on your keyboard or mouse. I tried wrist-bands, but it didn't catch sweat from the hands
        themselves.
      </p>

      {/*<h5>{affiliateLink(essentials.wristweights, "Wrist weights")}</h5>
                <p>If you wanna get really hard-core, use some wrist weights while you walk and type. This will engage
                  your arms, shoulders, and back. I use these ankle weights (so I can crank up the weight, wrist weights
                  are typically lighter) and wear them all day.
                </p>*/}

      <h5>Monitor Arms</h5>
      <p>{affiliateLink(essentials.vivo, "VIVO")} or {affiliateLink(essentials.mountup, "MountUp")}. I highly recommend using monitor arms instead of a stand; especially if you have multiple monitors.
        This allows you to position the monitors in a tighter cluster, since you have flexibility to angle them
        without worry of the base leaning over the edge. It also allows you to pull the monitors closer to your
        face, just above your mouse and keyboard, in a way you couldn't do with a stand.
      </p>
    </>}
    {toTop}
  </Container>
}