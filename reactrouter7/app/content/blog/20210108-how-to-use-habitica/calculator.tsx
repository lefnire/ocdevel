import React, {memo, useEffect, useState, type ChangeEvent} from "react"; // Use type-only import for ChangeEvent
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col_ from "react-bootstrap/Col";

const Col = Col_.default || Col_

// Define types
type ClassName = 'warrior' | 'healer' | 'rogue' | 'mage';
type KlassScores = Record<ClassName, number>;
type FormOptionState = Record<string, boolean>;
type FormState = Record<string, FormOptionState>;

interface Option {
  k: string;
  t: string;
  d: string | React.ReactElement;
  classes?: Partial<KlassScores>; // Points for each class
  classesFn?: (scores: KlassScores, form: FormState) => void; // Custom logic function
}

interface Question {
  k: string;
  t: string;
  d: React.ReactElement;
  opts: Option[];
  optsObj?: Record<string, Option>; // Added optional optsObj based on later usage
}

type QuestionsObj = Record<string, Question>;
// Background information moved to UI component below

const questions: Question[] = [{ // Added Question[] type
  k: 'conditioning',
  t: "Conditioning",
  d: <>What style(s) of behavior-conditioning do you think work best for you? Check all that apply, but try to limit it.
    Ask yourself: "I'm likely to repeat behavior if _". See <a target="_blank" href="https://bcotb.com/the-difference-between-positivenegative-reinforcement-and-positivenegative-punishment/">this</a> for
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
    classes: {mage: 2, healer: 0, warrior: 0, rogue: 0} // Mage prevents streak loss (NP)
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
    classes: {mage: 2, rogue: 2, warrior: 0, healer: 0} // Mage (brain-forward) & Rogue (independent) prefer solo
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
    classesFn: (m: KlassScores, form: FormState) => { // Added types
      const rpQuestion = questionsObj['rp']; // Safer access
      if (rpQuestion?.opts) {
        rpQuestion.opts.forEach(opt => { // opt is implicitly Option here
          if (form['rp']?.[opt.k]) { // Safer access
            // Ensure the key exists on m before incrementing
            const classKey = opt.k as ClassName; // Assume opt.k matches a ClassName here based on context
            if (classKey in m) {
              m[classKey] = (m[classKey] || 0) + 1;
            }
          }
        });
      }
    }
  }, { // <<< Added missing closing brace here
    k: "rp",
    t: "Role Play",
    d: "You like the idea of being in-game who you are IRL. A mage is a studier; a healer is a socialite or medical professional; a warrior is active; a rogue is independent.",
    classesFn: (m: KlassScores, form: FormState) => { // Added types
      const rpQuestion = questionsObj['rp']; // Safer access
      if (rpQuestion?.opts) {
        rpQuestion.opts.forEach(opt => { // opt is implicitly Option here
          if (form['rp']?.[opt.k]) { // Safer access
            // Ensure the key exists on m before incrementing
            const classKey = opt.k as ClassName; // Assume opt.k matches a ClassName here based on context
            if (classKey in m) {
              m[classKey] = (m[classKey] || 0) + 1;
            }
          }
        });
      }
    }
  }]
}]

// Pre-compute optsObj for each question
questions.forEach((q: Question) => { // Added type for q
  q.optsObj = (q.opts || []).reduce((obj: Record<string, Option>, item) => { // Added type for obj
    obj[item.k] = item;
    return obj;
  }, {});
});

// Pre-compute questionsObj
const questionsObj: QuestionsObj = questions.reduce((obj: QuestionsObj, item) => { // Added type for obj
  obj[item.k] = item;
  return obj;
}, {} as QuestionsObj); // Added type assertion for initial value

const ClassCalculator = memo(() => {
  // Initialize form state robustly with types
  const initialFormState = (): FormState => {
    const state: FormState = {};
    questions.forEach(q => {
      state[q.k] = {};
      q.opts.forEach(o => {
        state[q.k][o.k] = false;
      });
    });
    return state;
  };
  const [form, setForm] = useState<FormState>(initialFormState);

  const [updated, setUpdated] = useState<boolean>(true); // Explicit boolean type
  // Initialize klass state with type
  const [klass, setKlass] = useState<KlassScores>({mage: 0, warrior: 0, rogue: 0, healer: 0}); // Start all at 0

  // Typed event handler
  const setForm_ = (k: string, k2: string) => (e: ChangeEvent<HTMLInputElement>) => { // Added types
    // Ensure k and k2 exist in form before updating
    const currentSection = form[k] || {};
    const newValue = !currentSection[k2];
    setForm({...form, [k]: {...currentSection, [k2]: newValue}});
    setUpdated(u => !u); // Toggle boolean state to trigger effect
  }

  // Typed function
  function calculateScores(currentForm: FormState) { // Added type
    setKlass(Object.entries(currentForm).reduce((m, [sectionId, section]) => {
      const questionSection = questionsObj[sectionId]; // sectionId is string
      const sectionState = section as FormOptionState; // Assert type for section
      if (questionSection?.opts) {
        questionSection.opts.forEach(opt => { // opt is Option
          if (sectionState[opt.k]) { // Access asserted type
            if (opt.classesFn) {
              // Pass copies to avoid direct state mutation if classesFn modifies them
              opt.classesFn({...m}, {...currentForm});
            } else if (opt.classes) {
              // Ensure c is a valid ClassName before indexing m
              (Object.entries(opt.classes) as [ClassName, number][]).forEach(([c, pts]) => {
                if (c in m) { // Type guard
                  m[c] = (m[c] || 0) + (pts || 0);
                }
              });
            }
          }
        });
      }
      return m;
    }, {
      // Initial scores object with type
      warrior: 0,
      healer: 0,
      rogue: 0,
      mage: 0
    } as KlassScores)); // Added type assertion
  }

  useEffect(() => {
    calculateScores(form)
  }, [updated, form])

  return <>
    <Row>
      <Col md={9} style={{maxHeight: 500, overflowY: 'scroll', paddingRight: '1rem'}}>
        {questions.map((q) => <div key={q.k} className="mb-4">
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
                  checked={form[q.k]?.[o.k] ?? false} // Use nullish coalescing for safer access
                  onChange={setForm_(q.k, o.k)}
                />
                <Form.Text muted>{o.d}</Form.Text>
              </div>
            ))}
          </Form>
        </div>)}
      </Col>
      <Col md={3}>
        <Card style={{position: 'sticky', top: '1rem'}}> {/* Make results sticky */}
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
  </>
})
export default ClassCalculator