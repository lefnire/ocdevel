import {Accordion, Card, Alert} from 'react-bootstrap'
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

const l = (href, text) => <a href={href} target='_blank'>{text}</a>

function Accordion_({title, eventKey, children}) {
  return <Card className='mx-0'>
    <Accordion.Toggle as={Card.Header} eventKey={eventKey} className='pointer'>
      {title}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={eventKey}>
      <Card.Body>{children}</Card.Body>
    </Accordion.Collapse>
  </Card>
}

function TLDR({children}) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}

const body = <>
  <p>This is {l("/contact", "lefnire")}'s usage guide to Habitica. I created Habitica but am no longer with the company. Nonetheless, I've rarely missed a day since 2012, and have learned a <em>lot</em> about psychology since then through various projects and books, and have integrated the lessons and practices into my Habitica system. This system is a tad complex, but once you get dialed it can make Habitica truly improve your life. If you're just getting started, start here. If you're a seasoned pro, read this as it might change your play style. It's like an "ultimate build guide" or "speed runner guide" for RPGs.</p>

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

    LEFT @ HERE
    ADD IMAGES

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
    <div className='text-danger'>Incomplete</div>
    <p>Rewards rewards. The least-properly-used feature of all! Yet, in my opinion, the single most impactful, most likely to sculpt your behavior, feature on the entire site. This is serious business. I say "come for the gear, stay for the guilty pleasures". People come to Habitica because for the dopamine-drip of Gold and gear. Armor, weapons, a treasure-trove of dopamine! And it works, truly. Until it doesn't. Eventually, your brain sees through the act - these trinkets are fake, they don't exist. And what even is the point? Gear has value in-game, it impacts damage dealt, incurred, etc. But something happens in your brain eventually that sees through the ruse. I really believe this, I see it time and again.</p>
    <p>The solution: custom rewards. </p>
- custom rewards
  - media
  - purchases
  - if fall off horse, keep going
  - sample prices, scales with class/perception
  </Accordion_>
  <Accordion_ eventKey="4" title={<><FaSwatchbook /> Respect the Colors</>}>
    <div className='text-danger'>Incomplete</div>
    task difficulty
- lessons in balance: rewards vs daily-colors vs goals
  - judge everything by current goal (survive, boss fight, etc)
  - life-lesson in balance, non-perfectionism, short-term pain for long-term goals
  </Accordion_>
  <Accordion_ eventKey="5" title={<><FaBrain /> Learn Your Motivator</>}>
    <div className='text-danger'>Incomplete</div>
- what classes to play / why
  - My rec: mage
    - boss damage, perfectionists
    - important: proper play style (keep colors, consistent GP)
  </Accordion_>
  <Accordion_ eventKey="6" title={<><FaHatWizard /> Classes</>}>
    <TLDR>Pick Mage</TLDR>
    <div className='text-danger'>Incomplete</div>
    <p>At level 10 you unlock the class system, where you choose Warrior, Mage, Healer, or Rogue. See each class's {l("https://habitica.fandom.com/wiki/Skills", "skills here")}, it plays into discussion below. Here's the skinny.</p>
    <ul>
      <li><b>Warrior</b> high boss damage, high defense. Warriors max STR & CON, dealing high DPS & taking low DMG. Warrior is the default class before you unlock the class system, but I consider it the default class besides - it's a good class for those who don't know what to pick. Importantly, warriors have the <em>Brutal Smash</em> skill, which is how they deal boss damage. Here's the problem. BS reduces a task's redness, making it too easy on yourself. If you're not punished for bad habits, you won't improve. Reducing the punishment reduces your chances of change. Nonetheless, if you need a bit of forgiveness in your life, BS can be handy in a pinch.</li>
      <li><b>Healer</b> takes lots of damage, and can heal self and party.</li>
      <li>Mage levels fast & deals high boss damage. Perfectionists, a bad thing. Keeps colors, consistent GP - proper play-style</li>
      <li>Rogue finds lots of loot.</li>
    </ul>
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