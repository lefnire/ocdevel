import React, {useState, useEffect} from 'react'
import {Accordion, Card, Alert, Form, Row, Col, Badge} from 'react-bootstrap'
import {
  FaBrain,
  FaCalendar,
  FaCheckSquare, FaCouch, FaDog,
  FaEyeDropper,
  FaGift,
  FaHatWizard,
  FaPallet,
  FaPlusSquare,
  FaRegBell, FaSwatchbook
} from "react-icons/all";
import _ from 'lodash'

const l = (href, text) => <a href={href} target='_blank'>{text}</a>

function Accordion_({title, eventKey, children}) {
  return <Accordion.Item eventKey={eventKey}>
    <Accordion.Header>
      {title}
    </Accordion.Header>
    <Accordion.Body eventKey={eventKey}>
      {children}
    </Accordion.Body>
  </Accordion.Item>
}

function TLDR({children}) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}

const questions = [{
  k: 'conditioning',
  t: "Conditioning",
  d: <>What style(s) of behavior-conditioning do you think work best for you? Check all that apply, but try to limit it. Ask yourself: "I'm likely to repeat behavior if _". See <a target="_blank" href="https://bcotb.com/the-difference-between-positivenegative-reinforcement-and-positivenegative-punishment/">this</a> for more. Think hard, all but the first option are worded "negatively", but everyone is different - think about your personal experiences and the results. Eg, I'm "negative reinforcement", because I'm more attune to fear than gain; and that's ok.</> ,
  opts: [{
    k: 'pr',
    t: 'Positive Reinforcement',
    d: "Motivation: good things happen. A bonus makes makes you perform, \"good job!\" makes you tick. As a kid, dessert after dinner; video games after homework drove you.",
    classes: {warrior: 1, rogue: 2, mage: 1, healer: 0}
  }, {
    k: 'nr',
    t: 'Negative Reinforcement',
    d: "Motivation: bad things being removed. As a kid, any way to make time-out end drove you.",
    classes: {warrior: 1, healer: 2, mage: 1, rogue: 0}
  }, {
    k: 'pp',
    t: 'Positive Punishment',
    d: "Motivation: bad things happening. A hand-slap ensures you won't do it again. As a kid, punishment drove you.",
    classes: {healer: 2, warrior: 1, mage: 1, rogue: 0}
  }, {
    k: 'np',
    t: 'Negative Punishment',
    d: "Motivation: not getting a good thing, because you've done a bad thing. Your toy is taken away makes you want to earn it back. As a kid, grounding (removal from friends, hobbies) drove you.",
    classes: {healer: 2, warrior: 1, mage: 1, rogue: 0} // TODO ???
  }]
}, {
  k: "rewards",
  t: "Rewards",
  d: <>Which style of rewards do you think motivates you more?</>,
  opts: [{
    k: "predictable",
    t: "Predictable",
    d: "Predictable (static) rewards. More motivated by salary than bonuses. Prefer games with a steady grind and study-able build-guides.",
    classes: {warrior: 2, mage: 2, healer: 1, rogue: 0}
  }, {
    k: "random",
    t: "Random",
    d: "Random (stochastic) rewards. More motivated by bonuses than salary. Prefer games of chance, might play lottery.",
    classes: {warrior: 1, mage: 1, rogue: 2, healer: 0}
  }]
}, {
  k: "social",
  t: "Social",
  d: <>How do you work in groups?</>,
  opts: [{
    k: 'center',
    t: "You like being the center of attention",
    d: "You LIKE groups! And you like to shine in those situations, you're a leader and like your value to be seen.",
    classes: {healer: 0, mage: 2, warrior: 2, rogue: 1}
  }, {
    k: 'help',
    t: "You're social, but don't want to be the center of attention",
    d: "You do like groups, but you don't want to lead - you want to HELP.",
    classes: {healer: 2, rogue: 1, mage: 0, warrior: 0}
  }, {
    k: "solo",
    t: "You don't like groups",
    d: "You're a freelancer professionally, or a solo in games. You want to be responsible only to yourself with your actions.",
    classes: {mage: 2, rogue: 1, warrior: 1, healer: 1}
  }]
}, {
  k: "rp",
  t: "Role Play",
  d: <>What kind of person are you in real life?</>,
  opts: [{
    k: "warrior",
    t: "Physically active",
    d: "Gym-rat, out-doorsy, physical person.",
    classes: {warrior: 2, rogue: 0, mage: 0, healer: 0}
  }, {
    k: "healer",
    t: "Healer",
    d: "A nurse, doctor, or other medical professional. Or just a person who loves to be there for their friends; feels you have a solid social gauge (social IQ), etc. A socialite.",
    classes: {healer: 2, rogue: 0, mage: 0, warrior: 0}
  }, {
    k: "mage",
    t: "Smart",
    d: "Intelligence-focused. A student, scientist, or someone otherwise very focused on education. You love books.",
    classes: {mage: 2, rogue: 0, healer: 0,  warrior: 0}
  }, {
    k: "rogue",
    t: "Independent",
    d: "You value freedom highly. You may be a freelancer / contractor. You play 1-player games, or you pick classes that are soloist classes. A free-thinker.",
    classes: {rogue: 2, mage: 0, healer: 0, warrior: 0}
  }]
}, {
  k: "other",
  t: "Other",
  d: <>What of the following is most important to you?</>,
  opts: [{
    k: 'right_play',
    t: "Improving my life",
    d: "You like this guide, and you want to use Habitica correctly - that is, in a way that improves your habits and life balance.",
    classes: {warrior: 1, mage: 2, rogue: 1, healer: 0}
  }, {
    k: "rp",
    t: "Role Play",
    d: "You like the idea of being in-game who you are IRL. A mage is a studier; a healer is a socialite or medical professional; a warrior is active; a rogue is independent.",
    classesFn: (m, form) => {
      _.each(questionsObj.rp.opts, opt => {
        if (form.rp[opt.k]) {m[opt.k] += 1}
      })
    }
  }]
}]

questions.forEach(q => {q.optsObj = _.keyBy(q.opts, 'k')})
const questionsObj = _.keyBy(questions, 'k')

function ClassCalculator() {
  const [form, setForm] = useState(_.transform(questions, (m, section, sectionId) => {
    m[section.k] = _.transform(section.opts, (m_, opt) => {
      m_[opt.k] = false
      return m
    }, {})
    return m
  }, {}))
  const [updated, setUpdated] = useState(true)
  const [klass, setKlass] = useState({mage: 1, warrior: 0, rogue: 0, healer: 0})

  const setForm_ = (k, k2) => e => {
    setForm({...form, [k]: {...form[k], [k2]: !form[k][k2]}})
    setUpdated(+new Date)
  }

  function calculateScores(form) {
    setKlass(_.transform(form, (m, section, sectionId) => {
      const qo = questionsObj
      qo[sectionId].opts.forEach(opt => {
        if (section[opt.k]) {
          if (opt.classesFn) {
            opt.classesFn(m, form)
          } else {
            _.each(opt.classes, (pts, c) => {m[c] += pts})
          }
        }
      })
      return m
    }, {
      warrior: 0,
      healer: 0,
      rogue: 0,
      mage: 0
    }))
  }

  useEffect(() => {
    calculateScores(form)
  }, [updated, form])

  return <Row>
    <Col md={9} style={{height: 500, overflowY:'scroll'}}>
      {questions.map(q => <div>
        <h5>{q.t}</h5>
        <p className='small text-muted'>{q.d}</p>
        <Form>
          {q.opts.map(o => <>
            <div key={q.k} className="mb-3">
              <Form.Check
                type='checkbox'
                id={`${q.k}-${o.k}`}
                label={o.t}
                value={o.k}
                onChange={setForm_(q.k, o.k)}
              />
              <Form.Text muted>{o.d}</Form.Text>
            </div>
          </>)}
        </Form>
      </div>)}
    </Col>
    <Col md={3}>
      <Card>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          <div>Mage: {klass.mage}</div>
          <div>Warrior: {klass.warrior}</div>
          <div>Rogue: {klass.rogue}</div>
          <div>Healer: {klass.healer}</div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
}

const body = <>
  <p>This is {l("/contact", "lefnire")}'s usage guide to Habitica. I created Habitica but am no longer with the company. Nonetheless, I've rarely missed a day since 2012, and have learned a <em>lot</em> about psychology since then through various projects and books, and have integrated the lessons and practices into my Habitica system. This system is a tad complex, but once you get dialed it can make Habitica truly improve your life. If you're just getting started, start here. If you're a seasoned pro, read this as it might change your play style. It's like an "ultimate build guide" or "speed runner guide" for RPGs.</p>

  <p>Note: this guide is incomplete. Like it in Disqus below to let me know it's worth completing; then I'll get my butt in gear.</p>

<Accordion>
  <Accordion_ eventKey="0" title={<><FaCalendar /> Dailies</>}>
    <TLDR>Things you want to complete each day. If one-per-day (exercise, take meds), then it's a standard Daily. If x-times/day (hours worked), it's a Daily with a checklist. Add an <b>[+]Overflow</b> habit for excess Daily. Digital peeps: use Pomodoro Technique with SiteKeeper.</TLDR>
    <p>You'll note the task-types are out of order (Dailies, ToDos, Habits, Rewards). I'm tackling from most-to-least understood / properly-used tasks, to ease in. Users immediately flesh out Dailies, then hesitate looking at Habits. "Wait, should this be a Habit or a Daily?" In short, Dailies are <em>must complete x times / (day|other)</em>, and Habits are <em>can trigger any number of times / day</em>. Obvious examples of Dailies are <b>Exercise</b>, <b>Journal</b>, <b>Brushed Teeth</b>. You aren't likely to do these more than 1x per day. If you do have something you want to do a certain number per day, you can add checklists to Dailies - one check per time. Me, I have a <b>Work</b> Daily with 1 check per Pomodoro session, amounting to a full day's work. More on that soon. Habits, on the other hand, are things you may or may not do multiple times / day, like <b>Smoke[-]</b>, <b>[+]Healthy Food[-]</b>, or <b>[+]Glass of Water</b>.
    </p>

    <p>My personal Dailies are:<ul>
      <li>Plan for the day (triage ToDos, work, calendar & contacts, etc)</li>
      <li>Take meds</li>
      <li>Meditate</li>
      <li>Work [8x checklist for each Pomodoro]</li>
      <li>Exercise</li>
      <li>Journal</li>
      <li>1h work-related reading</li>
      <li>(some more that won't make much sense, <b>screenshot here TODO</b></li>
    </ul></p>

    <h5>Digital workers</h5>
    <p>Recommendations for digital employees - anyone who's in front of their computer all day. Use the {l("https://francescocirillo.com/pages/pomodoro-technique", "Pomodoro Technique")}. This entails 30m of dedicated work-time (no Reddit, emails, bathroom - nothing), followed by a 5m break (email catch-up, stretch & hit the fridge, Reddit, etc). The absolute <em>best</em> tool I found for this {l("https://chrome.google.com/webstore/detail/habitica-pomodoro-sitekee/iaanigfbldakklgdfcnbjonbehpbpecl", "Habitica Pomodoro SiteKeeper")}. It's not just because of the Habitica integration - previous I spun my own Habitica integration into desktop Pomodoro timers that allowed custom trigger code; and there are other Habitica-integrated Pomodoro tools. It's that this tool is <em>very</em> full-featured. Purchase to surf, block otherwise (or free on breaks), up/down habits and a 4-pomo combo multiplier, KB shortcuts, etc. Read the page for the specs.</p>

    <h5>Daily overflow</h5>
    <p>One common question is "what if I have something I want to do at least x/day, with no ceiling?". Eg, for me and my 8x-checklist work Daily, what if I work extra that day? I want to be rewarded for overtime. The solution is to add an "overflow Habit". Eg, you could have a <b>[+]Extra Work</b> Habit you click for every Pomodoro beyond the expected Daily checklist, and more for each Daily you might overflow. Me personally, I have a general overflow Habit for all Dailies; a catch-all.</p>

    <p>Honestly, I wish Habitica merged Habits with Dailies, it would avoid confusion. This merged task would have an option "how many times per day?" where you specify a number. It would default to 1, meaning Daily; anything more is how people use checklists / overflow; and setting to 0 makes it act as a Habit (no required num/day). But we've got what we've got, so there's your workaround. Dailies for the usual stuff; add a checklist if you want <code>x</code>-times/day; add an overflow-Habit if you may exceed <code>x</code>.</p>
  </Accordion_>

  <Accordion_ eventKey="1" title={<><FaCheckSquare /> ToDos</>}>
    <TLDR>Set each ToDo's difficulty, and give it 1-3 points corresponding to that difficulty. Add a Daily called <b>ToDo</b> with a 3-mark checklist. Mark 1 check per point of completed ToDo. Feel free to use an external app if Habitica ToDo's aren't advanced enough for you. I use Workflowy.</TLDR>
    <p>Firstly, don't be afraid to use an external ToDo app - most people do. Habitica's ToDo system is relatively bare-bones - it gets the job done, but some of y'all have deeper needs. Me personally, I use {l("https://workflowy.com", "Workflowy")} for the more complex ToDos, which offers deep nesting and various advanced tools. But I <em>do</em> use Habitica ToDos for simpler tasks.</p>

    <p>Now my custom setup. Use a number system, corresponding to ToDo difficulty. In any task's settings dialog, you can specify its difficulty: Trivial, Easy, Medium, Hard. Set this on your ToDos. My system is: [Hard for >30 minute ToDos] [Medium for 10m-30m] [Easy for 1m-10m] [Trivial for &lt;1m]. Put the number in the ToDo's title, so it's visible (eg, <b>Call Mom - 3</b>. I wish Habitica showed difficulty on tasks). Add a Daily: <b>ToDo</b> with a 3x checklist.</p>

    <p>Ok, so now you have a Daily <b>ToDo (3x checklist)</b>, and your ToDos have their difficulty set, and labeled to indicate such. An Easy ToDo gives you 1 checklist mark. A Hard gives you 3. So you can do 3 Easies in one day, or 1 Hard, or 1 Easy + 1 Medium. Get it? As for Trivials, they don't count. They're still valuable, because marking ToDos gives you points, but they don't count towards the Daily.</p>

    <p>Why all this setup? ToDos don't <em>hurt</em> you, that's why. You can add ToDos till the cows come home, and you know what happens next? I've seen this over and over... a giant list of dark-red ToDos. So add a Daily to incentivize ToDo completion. Additionally, if you don't use Habitica's ToDos (as mentioned previously), the Daily will remind you to pop over to your app. As for the number system. I previously had a "1 ToDo" daily. I ended up doing 1 Trivial each day, and ignoring the painful Hards. This helps you spread your efforts properly.</p>

    <h5>Digital workers</h5>
    <p>Remember that Pomodoro system above? During your 30m work sessions, add anything that comes to mind that would normally derail you as Trivial ToDos. Eg, something popped in your head to look up, or you suddenly want to buy something - don't do it, you're in your 30m session! Instead, add it as a Trivial, and plow through those Trivials on your break. Remember, Trivials don't count towards your <b>ToDo (3x)</b> Daily, but they do still give you points. Doing this will give you dopamine for postponing gratification, thus developing good attention habits.</p>

    <p className='text-danger'>TODO ADD IMAGES</p>
  </Accordion_>

  <Accordion_ eventKey="2" title={<><FaPlusSquare /> Habits</>}>
    <TLDR>Create a single Habit <b>[+]CBT[-]</b>. Click [+] if you do the thinking exercise, and [-] if you do the bad Habit. Consider using Gnothi for added analytics.</TLDR>
    <p>Alright <em>*rolls up sleeves*</em>, the dreaded Habits. This one's hard for people to figure out, so let's do this. Create Habits for things you do any number per day, with no number in mind. Mine are <b>Smoke[-]</b>, <b>Alcohol[-]</b>, <b>Coffee[-]</b>, <b>[+]Junk/Health Food[-]</b>, <b>[+]Overflow</b>. Or these <em>were</em> my Habits, details below. The most important bit about Habits is that they reward or punish you for <em>every action</em>. This is a crucial point in self-improvement. It's a mistake to have a Daily called <b>Didn't drink yesterday</b> or <b>Only healthy food</b>; instead you want every drink and every food to count. The notion here is "my diet starts tomorrow" just because you failed once today. Your diet <em>always starts</em> - it's always on. Each slip-up is a single slap to the face (-HP), learn a lesson, and get back on the horse <em>right now</em>, not tomorrow. This sounds draconian, but it's quite the opposite - it's about self-forgiveness. Tell yourself you made a mistake, but that's ok - you're still trying moment-by-moment. This is an exercise in mindfulness and presence. Remember, if you need to do something x times / day, it's a Daily (add an overflow-Habit if needed); if it's unbounded, it's a Habit.
    </p>

    <h5>Gnothi</h5>
    <p>I created a website {l("https://gnothiai.com", "Gnothi")} which will give you insights on Habits & Dailies. It shows how tasks correlate with each other ("<em>sleep</em> is most effected by <em>coffee</em>, <em>alcohol</em>") as well as overall top-influencers ("<em>alcohol</em> has the most impact on you in general"). There's a lot to Gnothi, it's actually primarily a journal app, but it syncs with Habitica to provide valuable insights. More details on this feature {l("https://gnothiai.com/about/fields", "here")}.
    </p>

    <h5>CBT</h5>
    <p>Now. All that said, I actually recommend a totally different approach - scratch all that Habit talk, we're starting over. Delete all your Habits (except <b>Overflow</b> and any 3rd-party Habits, like SiteKeeper) and create a single Habit. It's called <b>[+]CBT[-]</b>. CBT is a powerful tool in psychology often prescribed by therapists. It can be summarized as "think before you act", but that really doesn't do it justice. I recommend listening to this {l("https://amzn.to/3s2u9Bb", "audiobook")}, but do some digging for other resources (I'll update here if I find more). Here's the system. Every time you feel the urge to smoke, or browse Reddit, or eat junkfood, etc - you think. "Why do I want to smoke? It's because I'm avoiding work, or I need a break. What does that feel like... can I cope with this feeling? It's actually going to do more harm than good, I'll increase my anxiety chemically, and add time not spent working, <em>further</em> compounding anxiety. Plus all the health consequences, etc etc. Maybe if I just do 5m of work, and see what comes after." If you do that whole thought-process (a CBT), then you get a point - click the +. Nine times out of ten, this is enough to talk you out of your brush with a bad decision; it really works. But... sometimes you'll still cave. "I don't care, I need that smoke". Then you lose a point. In this case, you gained a point and lost a point. It's ok! It's a-ok to lose a point, <em>as long as</em> you did the thought-process; because that process will change your behavior over time. Self-forgiveness, your diet always starts. The only "bad" act here is to not do the thought process first, to just skip it and do the bad habit. In that case you lost a point without gaining one. Read this section a couple of times, listen to that audiobook - CBT is transformative, it will change your life.
    </p>
    <p>A few more perks to the <b>CBT</b> Habit. First, it simplifies everything. With Habits already causing confusion, get rid of them - there's only one Habit, CBT. Second, because it's a [+][-] Habit, you're incentivized to keep it [+]-balanced when it's too red. A problem with [-] Habits is they self-heal, giving you too much leeway. If you have 10 different Habits, and you're spreading your bad habits across them, you're going to easy on yourself. With this CBT Habit, all bad choices are compounded into one, doing some real damage to your avatar. The only way to come back is to do some CBTs (stop, breath, think through the decision you're about to make). This forces you to develop CBT as a habit, and that's a really really good thing.</p>
    <p>Ok, why did I mention Gnothi above? Felt out of place. Well, if you're using a CBT Habit to replace <em>all</em> your Habits, then you'll lose some insights on Habit correlations. Eg, I learned through Gnothi that coffee was having a huge impact on my life. Don't worry 2-cuppers, it's healthy; I was drinking 8 cups / day. Switching to the CBT Habit meant losing my Habit analytics. That's ok for me now, I care more about change than insight. But if you want some Habit analytics, maybe try individual Habits as-intended for a while, paired with Gnothi, then after you've gotten a decent gauge, switch to the CBT setup.</p>
  </Accordion_>

  <Accordion_ eventKey="3" title={<><FaGift /> Rewards</>}>
    <TLDR>Use Habitica rewards (gear) as long as it lasts for you, then switch to custom rewards (gaming, TV, etc). Take this very seriously!</TLDR>
    <p>Rewards rewards. The least-properly-used feature of all! Yet, in my opinion, the single most impactful, most likely to sculpt your behavior, feature on the entire site. This is serious business. I say "come for the gear, stay for the guilty pleasures". People come to Habitica because for the dopamine-drip of in-game rewards. Gold, gear, pets - a treasure-trove of dopamine. And it works! Until it doesn't. Eventually, your brain sees through the act - these trinkets are fake, they don't exist. Gear has value in-game, it impacts damage dealt, incurred, etc. But something happens mentally where you eventually see through the ruse. I see it time and again. Users will play for a while, but find they lose motivation (or worse... more below).</p>
    <p>What you need is a <em>reason</em> for good behavior. You earned dessert because you ate vegetables. You can play video games because you did your homework. Because because - because you <em>earned it</em>. You will change your entire Habitica experience and vastly improve your behavior by switching to <b>custom rewards</b>. When you switch from meaningless dopamine to a balanced life with earned pleasures, your whole mindset changes.</p>
    <p>There's two reasons for this. First, too strong a focus on good habits creates a dull and anxious life - a Jackad'l boy (joke). It can actually have severe negative mental health consequences - it leads to burnout, existentialism, perfectionism, and anxiety. So while in-game rewards offer training wheels to the process, keeping those on too long can burn you out. Not just on Habitica, on self-improvement in general. It becomes orthorexic, leaving you with a bad taste and self doubt. Again, in-game rewards are great; continue to use them and have fun with the game aspect of Habitica; but <em>eventually</em>, when you're ready, start focusing custom rewards. The second reason for custom rewards' effectiveness is this. Guilty pleasures are the spice of life. TV, video games, cake, a beer at the end of the day. Don't give these things up - it may sound an exaggeration, but to me life is less valuable without video games (VR). The problem is that these guilty pleasures make you feel - you guessed it - guilty! Custom rewards removes the guilt. You earned it, so when you partake you feel good about it, not bad. The net result is feeling good about your self-improvement (rather than anxious) and good about your rewards (rather than guilty). No rewards, or only in-game rewards, will remove this benefit. Custom rewards allows you to enjoy what makes life liveable.
    </p>
    <p>So what's a custom reward, and what's a bad Habit? Simple: a bad Habit is something you want to quit (like smoking) and a reward is something you enjoy. Some rewards are obvious, but others make you feel guilty. Ask yourself: what's life without this guilty pleasure? Worse? Then it's a reward. You may have a balance problem with video games (read: addiction); but fitting it into an earned play-time regimen via Habitica (and a timer) adds balance. Make sure you digest that: Habitica with custom rewards adds <b>balance</b> into your life. That's the difference. It's personal to you; eg, alcohol is a common trip-up: reward or bad Habit? Just ask the question: do you want life without alcohol?
    </p>
    <p>Some more points. Consider adding real-life purchaseables as rewards. Eg, 100gp for a new book or game. Again, it relieves the guilt when earned. Also, if you fall off the horse (eg, if you do something without earning it) - that's ok, take note and try to stick to the system next time. Habitica is a constant lesson in momentary failures, self-forgiveness, then trying again to stick to the system. Finally, prices will vary per person. It depends on the number of Tasks you have, and your Perception (the attribute, usually focused on by Rogues, which maximizes in-game rewards). Below are some prices which work for me, start with that then alter the prices over time as you see fit based on your goals.</p>

    <ul>
      <li><Badge variant="warning">10GP</Badge> Read for 30m</li>
      <li><Badge variant="warning">15GP</Badge> Junk food</li>
      <li><Badge variant="warning">30GP</Badge> 1 TV episode</li>
      <li><Badge variant="warning">75GP</Badge> 1 hour gaming</li>
      <li><Badge variant="warning">100GP</Badge> Buy a new video game</li>
    </ul>
    <p>And again, I still continue to use in-game rewards (gear & items), but usually do so with excess gold. I prioritize custom rewards. Find the balance that works.</p>

  </Accordion_>
  <Accordion_ eventKey="4" title={<><FaSwatchbook /> Respect the Colors</>}>
    <TLDR>Don't be a perfectionist. Challenge yourself with heavy Dailies. Let blues go un-completed, focus on reds & yellows.</TLDR>
    <p>In Rewards (above) I pushed hard on balance. Colors is another key in Habitica to improving balance in your life. Habitica tasks change color based on how you're doing - blue, green, yellow, red, dark-red. Blue means you're doing great; red means you're doing bad (frequently-missed Daily, stale ToDo, or oft-down-ticked Habit). Focus on the reds & yellows; ease up on the greens & blues.
    </p>
    <p>Prioritizing colors improves your game-play. Completed blues gives less EXP + GP than completed reds; and missed blues hurts less than reds. This was purposefully designed, to let you take a breather where you can, and pick up on your shortcomings. But more than game-play, this approach teaches life lessons in balance. Let's break it down.</p>

    <p>Balance is a key to life, something you need to learn to thrive. In this context, balance is a matter of considering your goals (are we in a boss-fight? am I burnt out already? do I want this reward?) and acting only in accordance with your goals. A big problem, another bit that leads to burnout, is when players are perfectionists. They want to complete all their Dailies and maintain their streaks, regardless of their energy level or bigger-picture goals. If you play Habitica as a perfectionist, it's imperative to complete all Dailies. This is a mistake. I believe that perfectionism is a bad thing. And not in the "oh, I'm such a perfectionist" pretend-bad way people say respond to "what's your biggest weakness." I think perfectionism can prevent you from pursuing big goals. If you limit your Dailies to things you know you can complete each day, you won't push yourself. I've seen players do just this - limit their Dailies to basically a bucket-list of reminders, like taking their meds & brushing their teeth. Scrap those Dailies, add a whopper which you don't know how often you'll complete. Let the color speak for itself, focus on it when it's red, and let it go un-completed sometimes! Think bigger.</p>

    <p>Personally I dislike streaks & perfect-day bonuses. I think it encourages perfectionism, and perfectionism stunts big-goal pursuit. As I said, perfectionism often stays a player's hand from adding a Daily they worry is too big for their perfect-day plate. Forget about perfect days, forget about streaks. Do yellows & reds; any time left over (if you're not spent for the day) do greens. And do this for me: don't <em>ever</em> do blues. What do you think of that? Unless it's a basic reminder (like medication), I challenge you to go through the discomfort of never completing blues. What you'll find is you'll end up challenging yourself more towards bigger-picture goals (steps towards a job, degree, or travel) since you're learning first-hand how to handle short-term discomfort for long-term gain. Your health will be fine, the boss will bearly nick your party. Try it!</p>
  </Accordion_>
  <Accordion_ eventKey="6" title={<><FaHatWizard /> Classes</>}>
    <div className='text-danger'>Incomplete</div>
    <ClassCalculator />
    {/*<p>At level 10 you unlock the class system, where you choose Warrior, Mage, Healer, or Rogue. See each class's {l("https://habitica.fandom.com/wiki/Skills", "skills here")}, it plays into discussion below. Here's the skinny.</p>
    <ul>
      <li><b>Warrior</b> high boss damage, high defense. Warriors max STR & CON, dealing high DPS & taking low DMG. Warrior is the default class before you unlock the class system, but I consider it the default class besides - it's a good class for those who don't know what to pick. Importantly, warriors have the <em>Brutal Smash</em> skill, which is how they deal boss damage. Here's the problem. BS reduces a task's redness, making it too easy on yourself. If you're not punished for bad habits, you won't improve. Reducing the punishment reduces your chances of change. Nonetheless, if you need a bit of forgiveness in your life, BS can be handy in a pinch.</li>
      <li><b>Healer</b> takes lots of damage, and can heal self and party.</li>
      <li>Mage levels fast & deals high boss damage. Perfectionists, a bad thing. Keeps colors, consistent GP - proper play-style</li>
      <li>Rogue finds lots of loot.</li>
    </ul>

    <h5>Learn your motivator</h5>

    <blockquote>
      TODO
      - what classes to play / why
      - My rec: mage or warrior. Warrior problem: BS changes colors. Mage problem: freezing streaks encourages perfectionism.
      - important: proper play style (keep colors, consistent GP)
    </blockquote>*/}
  </Accordion_>
</Accordion>
</>

export default {
  id: '20210108-how-to-use-habitica',
  date: '2021-01-08',
  title: "How Habitica's Creator Uses Habitica",
  jsx: true,
  body
}