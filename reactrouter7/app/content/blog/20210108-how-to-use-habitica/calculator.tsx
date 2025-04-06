import {memo, useEffect, useState} from "react";
import Row from "react-bootstrap/cjs/Row";
import Form from "react-bootstrap/cjs/Form";
import Card from "react-bootstrap/cjs/Card";
import Col_ from "react-bootstrap/cjs/Col";
const Col = Col_.default || Col_

/*
 Background information:

Picking a class simple guide:
* Warrior
  * Role-play: you're a physical person; gym rat, construction worker, etc.
  * In-game: deals boss damage, prevent dailies going too red.
  * Motivation: positive punishment (keeps reds at in check) and positive reinforcement (boss damage)
* Healer
  * Role-play: you're social, helper, shoulder to lean on
  * In-game: heals everyone (most essential class for bosses), protects against damage
  * Motivation: Positive punishment (defense & heal)
* Rogue
  * Role-play: you're an independent (soloist, freelancer), finance-forward person
  * In-game: collects things. The other type of quest (besides Bosses) are Collection Quests. Rogues find all the items during these.
  * Motivation: Stochastic positive reinforcement. You find way more items (gear, gold, pets); but randomly. Like slot machine.
* Mage
  * Role-play: you're brain-forward. A student, knowledge-worker, reader.
  * In-game: levels up the fastest. Then some strange other perks (the weirdest class)
  * Motivation: Negative punishment. They prevent streaks from being stolen; which streaks contribute to downstream bonuses

Parties most benefit with at least a healer and warrior. Rogues and mages are optional, if your party is small
*/

const questions = [{
  k: 'conditioning',
  t: "Conditioning",
  d: <>What style(s) of behavior-conditioning do you think work best for you? Check all that apply, but try to limit it.
    Ask yourself: "I'm likely to repeat behavior if _". See <a target="_blank"
                                                               href="https://bcotb.com/the-difference-between-positivenegative-reinforcement-and-positivenegative-punishment/">this</a> for
    more. Think hard, all but the first option are worded "negatively", but everyone is different - think about your
    personal experiences and the results. Eg, I'm "negative reinforcement", because I'm more attune to fear than gain;
    and that's ok.</>,
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
    classes: {mage: 2, rogue: 0, healer: 0, warrior: 0}
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
      (questionsObj.rp.opts || []).forEach(opt => {
        if (form.rp?.[opt.k]) { // Added optional chaining for safety
          m[opt.k] = (m[opt.k] || 0) + 1; // Ensure m[opt.k] exists and increment
        }
      });
    }
  }]
}]

questions.forEach(q => {
  q.optsObj = (q.opts || []).reduce((obj, item) => {
    obj[item.k] = item;
    return obj;
  }, {});
})
const questionsObj = questions.reduce((obj, item) => {
  obj[item.k] = item;
  return obj;
}, {});

const ClassCalculator = memo(() => {
  const [form, setForm] = useState(() => questions.reduce((m, section) => {
    m[section.k] = (section.opts || []).reduce((m_, opt) => {
      m_[opt.k] = false;
      return m_;
    }, {});
    return m;
  }, {}));
  const [updated, setUpdated] = useState(true)
  const [klass, setKlass] = useState({mage: 1, warrior: 0, rogue: 0, healer: 0})

  const setForm_ = (k, k2) => e => {
    setForm({...form, [k]: {...form[k], [k2]: !form[k][k2]}})
    setUpdated(+new Date)
  }

  function calculateScores(currentForm) { // Renamed form to currentForm to avoid shadowing
    setKlass(Object.entries(currentForm).reduce((m, [sectionId, section]) => {
      const questionSection = questionsObj[sectionId];
      if (questionSection?.opts) { // Check if questionSection and opts exist
        questionSection.opts.forEach(opt => {
          if (section[opt.k]) {
            if (opt.classesFn) {
              opt.classesFn(m, currentForm);
            } else if (opt.classes) { // Check if opt.classes exists
              Object.entries(opt.classes).forEach(([c, pts]) => {
                m[c] = (m[c] || 0) + (pts || 0); // Ensure m[c] and pts exist
              });
            }
          }
        });
      }
      return m;
    }, {
      warrior: 0,
      healer: 0,
      rogue: 0,
      mage: 0
    }));
  }

  useEffect(() => {
    calculateScores(form)
  }, [updated, form])

  return <Row>
    <Col md={9} style={{height: 500, overflowY: 'scroll'}}>
      {questions.map((q) => <div key={q.k}>
        <h5>{q.t}</h5>
        <p className='small text-muted'>{q.d}</p>
        <Form>
          {q.opts.map((o) => (
            <div key={o.k} className="mb-3">
              <Form.Check
                type='checkbox'
                id={`${q.k}-${o.k}`}
                label={o.t}
                value={o.k}
                onChange={setForm_(q.k, o.k)}
              />
              <Form.Text muted>{o.d}</Form.Text>
            </div>
          ))}
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
})
export default ClassCalculator