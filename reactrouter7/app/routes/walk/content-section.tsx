import {Link, useNavigate} from "react-router";
import {memo, type PropsWithChildren, useContext, useState} from "react";
import Button from 'react-bootstrap/cjs/Button';
import Container from 'react-bootstrap/cjs/Container';
import products, {affiliateLink as al} from '~/content/product-links'
import {VideoButtonLg as VideoButton} from "../../components/video-btn";
import {ScoreInfo} from "~/content/treadmills/utils";
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";
import {ProductContext} from "~/routes/walk/context";

export const contentSections = {
  why_desk: "Why Walking Desk?",
  buying_guide: "Buying Guide",
  care: "Treadmill Care",
  essentials: "More Essentials"
} as const;
type SectionKey = keyof typeof contentSections

const H = memo(({id}: {id: SectionKey}) => {
  return <>
    <hr/>
    <h3 id={id}>{contentSections[id]}</h3>
  </>
})
function Sub({children}: PropsWithChildren) {
  return <h5 className="pt-2">{children}</h5>
}

const ToTop = memo(() => {
  const scrollToTop = () => {
    window.scroll(0, 0)
  }
  return <div>
    <Button
      size='sm'
      className='ms-0 ps-0 my-1'
      variant='link'
      onClick={scrollToTop}
    >
      Back To Top <FaArrowUp />
    </Button>
  </div>
})

const ContentSection = memo(() => {
  const {isFiltered, isCompareMode} = useContext(ProductContext)
  const [optionals, setOptionals] = useState(false)
  const showOptionals = () => setOptionals(true)
  if (isFiltered || isCompareMode) { return null}
  
  return <Container>
    <H id="why_desk" />
    <Sub>Focus</Sub>
    <p>Unlike bikes & steppers (manual devices), treadmills (electric devices) move <em>you</em> (just keep up). This satisfy the mind jitters. Its <em>extremely</em> valuable for ADHD.</p>
    {/*<p>one of the few aids that works for me (along with the <Link to={"/blog/20240117-pomodoro-thinkers"}>Modified Pomodoro</Link>).</p>*/}
    <Sub>Energy</Sub>
    <p>Moving keeps blood and endorphins pumping. It keeps you alert and on task all day. Oxygen and endorphins help not just with energy, but focus. You'll need less caffeine.</p>
    <Sub>Health</Sub>
    <p>Calories and heart-rate. At my best, I've clocked 320 active zone minutes (Fitbit) in a day. That's 5.3 hrs of gym time. This eliminates the gym, saving time and money. At my worst, I clock the minimum-recommend 10k steps. Further, your posture is ideal while walking, better than sitting <em>and</em> standing.</p>
    <VideoButton className='mt-0 mb-3' href="https://www.youtube.com/watch?v=_6EiAK-jmYQ"/>
    <ToTop />

    <H id="buying_guide" />
    <Sub>Get extended warranty</Sub>
    <p>Some treadmills offer one through their website, Amazon offers Asurion. Motors don't last forever, the motor <em>will die</em>. When, not if - and sooner with the budget treadmills. With the warranty, there's nothing to worry about. I've gone through three for the price of one.</p>
    <Sub>Budget</Sub>
    <p>The budget mills can be more loud, and deal less effectively with heat. To deal with this, reduce the amount of at-one-time walking (eg 30-45 min on, 2-5 min break). Generally expect 1-2 years out of these mills; compared to the non-budgets which could last 10 years. Personally I take the trade-off - I don't know where I'll be in 2 years. And with Amazon's extended warranty, I've been refunded for every malfunction.</p>
    <Sub>Non-budget</Sub>
    <p>LifeSpan, Unsit, Walkolution, etc. These can bear more weight than the budget picks, and can run continuously for much longer (6-9hrs for LifeSpan, no limit for Walkolution). They're quieter, and much more durable. When you do have problems, they come with long warranties and you'll typically have a service rep come fix it. They're much larger and heavier than budget mills, so they'll be more a permanent fixture than a wheel-away.</p>
    <Sub>Using the table above</Sub>
    <p>TL;DR: sort by <strong>Score</strong>, enter a <strong>Price</strong> max.</p>
    <ScoreInfo/>
    <p>Anywhere there's a <span style={{borderBottom: "1px dotted #000"}}>dotted underline</span>, click it for details.
      I try to make these count.</p>
    {/*<p>I switch up the default links sometimes when one has a better deal (either price, warranty, or added goodies).</p>*/}
    <ToTop />


    <H id="care" />
    <Sub>Lubrication</Sub>
    <p>Every 50 hours or 3 months of use, apply lube in a zig-zag motion under the belt (between belt and pad). Then run the treadmill at 1mph for 2 minutes without walking on it. This reduces friction on the pad, which prevents overworking the motor, which extends the treadmill's life. Get one with a firm applicator; wobbly tubes are hard to control. {al(products.godora_lube, "Godora")} is easier, {al(products.sekoday_lube, "Sekoday")} is cheaper.
    </p>
    <VideoButton className='mt-0 mb-3' href="https://www.youtube.com/shorts/QK-BGSrCFXY"/>

    <Sub>Adjusting the belt</Sub>
    <p>If the belt starts to drift one way or another, you take an Alan wrench and tighten <em>the side which is too tight / close (not not the side with slack)</em>. This pulls the belt away from that too-tight side towards the slack side. Think of it as if you created a slope that the belt rolls down. Do quarter turns clock-wise while the belt is running, wait 15 seconds to see if it fixes itself, and do another quarter turn if not (repeat until it's fixed). Then you just leave it - it's something I don't understand,  not "undoing" the tightening after the fix, but whatever - you just leave it. This situation happens say once every week or two, is something you do with all the treadmills; necessary evil.</p>
    <p>Also! A sloppy belt-adjustment leads to early motor, bearings, or drive-belt failure. It puts too much strain on one side, angles the rolling pin, and causes downstream degradation. Signs of this are jerky motions, squeaking or grinding, and smells. And make sure the belt is not-too-tight, not-too-loose (I'll make a video soon, Google it for now).</p>
    <VideoButton className='mt-0 mb-3' href="https://www.youtube.com/shorts/QK-BGSrCFXY"/>

    <Sub>Walk 30-45 min, break 1-5 min</Sub>
    <p>Budget mills deal less effectively with heat. To deal with this, reduce the amount of
      at-one-time
      walking. I recommend 30-45 minutes of walking, and a 1-5 minute break (turn off via remote). The
      occasional hour or two won't kill these machines; but running the belt for 8hrs a day might. I'm
      a fan of the Pomodoro Technique for focus management. You work for 25 minutes (don't check emails /
      texts / Slack, nothing - pure hardcore work) and then take a break for 5 minutes to catch up on
      everything, or just de-steam. This fits perfectly with the treadmill. Work for 25-30, turn it off and go
      check your texts in the bathroom or whatever for 5 min, repeat.
    </p>

    <Sub>De-dust frequently</Sub>
    <p>Dust & pet-hair are an enemy to motors, rollers, and bearings. You want to blow air into the motor area - just through any vents or openings available, to blow out dust and hair. Do this frequently - at least once a week (I do it every day or two). Use a high RPM electric duster, like {al(products.wolfbox_air)}.</p>
    <ToTop />


    <H id="essentials" />
    <Sub>Treadmill Mat</Sub>

    <p>{al(products.urevo_mat)} adds more absorption; {al(products.sunny_mat)} is cheaper. Adds a layer of shock absorption for your knees. Absorbs sound. Prevents shock damage to hard floor. Over time the rubber stoppers will at worst damage the floor, at best smear rubber that's hard to remove. Adds a protection layer against high-pile carpet, so you're not pulling debris into the hardware.
    </p>

    <Sub>Standing Desk</Sub>
    <p>{al(products.flexispot_en1)}. My budget pick. I've abused this cheapie for 3 years without a hitch, so I don't see the point in the
      $1,000 Herman Millers championed on <a href="https://www.reddit.com/r/StandingDesks/" target="_blank">/r/StandingDesks</a>. But if you want to splurge, browse that sub. I've seen FlexiSpot gaining traction there recently;
      in particular the E7 series. You'll definitely want an electric desk which can sit or stand, because after walking or standing all day, you'll need a break.
    </p>

    <Sub>Shoes: Hoka or Brooks</Sub>
    <p>{al(products.shoes_men, "Men")}, {al(products.shoes_women, "Women")}. There are shoes more tailored towards prolonged walking or standing rather than running. I research what nurses champion, since it's the closest lifestyle to a walking desk. They're quite bullish on two: Brooks Ghost Max 2, and Hoka Clifton / Bondi.
    </p>

    <Sub>Ergonomic keyboard & mouse</Sub>
    <p><Link to="/blog/20240110-ergo-mouse-keyboard">Article</Link>. People often develop RSI (Repetitive Stress Injury, a cousin of Carpal Tunnel) when seated with a standard mouse, due to the arm motion. That type of wrist motion is bad for you. When you walk, you move your arms more than usual, which amplifies RSI risk significantly. It could take 6 months, it could take a 5 years, but many I've talked to with walking desks have experienced an RSI uptick. Ergo peripherals solve this - specifically a "wedge-style" trackball mouse and a split + tented keyboard. Read that article for recommendations (different budgets & styles), but hot-take budget-picks are (Mouse: {al(products.ploopy_adept)}, Keyboard: {al(products.epomaker_split65)})
    </p>

    {/*<div>
                <VideoButton href="https://www.youtube.com/shorts/fHjxqYBIPKA" label="Video 1" />
              </div>
              <div>
                <VideoButton href="https://www.youtube.com/shorts/BLvJmlB3j7Q" label="Video 2" />
              </div>*/}

    {!optionals ? (
      <Button className='mb-3' variant="outline-dark" onClick={showOptionals}>Show More Essentials</Button>
    ) : <>

      <Sub>ESD Wristband</Sub>
      <p>{al(products.esdwristband, "Wristband")}. When walking on a treadmill, you'll build static electricity. If you touch anything metal connected
        to your computer, you'll cause "electrostatic discharge" or ESD. This can be a monitor, peripherals
        which have any metal components, your laptop itself, etc. This can damage the electronics in the
        components you touched, and your computer (the current sent from the component through the connecting
        wire). There are two solutions: (1) make sure all the components you touch are plastic (SlimBlade and
        MD770 are), and never touch anything else (you monitor, laptop, etc) while walking; this is what I do.
        Or (2) buy an anti-static wristband, clamp it to something grounded, and now you don't have to worry
        about what you touch.
      </p>

      <Sub>Standing Board</Sub>
      <p>{al(products.fluidstance_planecloud, "FluidStance PlaneCloud")}. Sometimes you don't feel like walking. I spent a long time researching the perfect standing setup.
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

      <Sub>Fingerless Gloves</Sub>
      <p>{al(products.fingerlessgloves, "Gloves")}. Since you'll be sweating a bunch, get some cheap cloth fingerless gloves to catch the sweat so it
        doesn't get on your keyboard or mouse. I tried wrist-bands, but it didn't catch sweat from the hands
        themselves.
      </p>

      {/*<h5>{affiliateLink(essentials.wristweights, "Wrist weights")}</h5>
                <p>If you wanna get really hard-core, use some wrist weights while you walk and type. This will engage
                  your arms, shoulders, and back. I use these ankle weights (so I can crank up the weight, wrist weights
                  are typically lighter) and wear them all day.
                </p>*/}

      <Sub>Monitor Arms</Sub>
      <p>{al(products.vivo, "VIVO")} or {al(products.mountup, "MountUp")}. I highly recommend using monitor arms instead of a stand; especially if you have multiple monitors.
        This allows you to position the monitors in a tighter cluster, since you have flexibility to angle them
        without worry of the base leaning over the edge. It also allows you to pull the monitors closer to your
        face, just above your mouse and keyboard, in a way you couldn't do with a stand.
      </p>
    </>}
    <ToTop />
  </Container>
})
export default ContentSection