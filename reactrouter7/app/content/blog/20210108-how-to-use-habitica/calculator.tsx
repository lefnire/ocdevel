import React, {memo, useState} from "react"; // Removed unused imports: useEffect, useState, ChangeEvent
import { create } from 'zustand'; // Added zustand
import { produce } from 'immer'; // Added immer
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col_ from "react-bootstrap/Col";
import Button from "react-bootstrap/cjs/Button";
// This is required due to an SSG bug in react-bootstrap. Ignore the typescript error.
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
    d: "You are motivated by *adding desirable outcomes*. Earning rewards (like gold, items, XP), achieving goals, receiving praise, or seeing tangible progress keeps you engaged.",
    classes: {rogue: 2, warrior: 1, mage: 1, healer: 0} // Score unchanged
  }, {
    k: 'nr',
    t: 'Negative Reinforcement',
    d: "You are motivated by *removing or avoiding aversive conditions*. Preventing penalties, stopping something annoying (like task reminders or party damage), or escaping a negative situation drives your actions.",
    classes: {healer: 2, warrior: 2, mage: 0, rogue: 0}
  }, {
    k: 'pp',
    t: 'Positive Punishment',
    d: "You learn effectively from *experiencing direct negative consequences* for undesirable actions. A setback (like taking damage from a missed Daily) strongly discourages repeating the behavior that led to it.",
    classes: {warrior: 2, healer: 0, mage: 0, rogue: 0}
  }, {
    k: 'np',
    t: 'Negative Punishment',
    d: "You are motivated by the potential *loss of desirable things* due to inaction or mistakes. Fear of losing progress (like task streaks), missing out on rewards, or having privileges revoked encourages you to stay on track.",
    classes: {mage: 2, rogue: 1, warrior: 0, healer: 0}
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
  }] // Removed duplicate 'rp' option object
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

// --- Zustand Store Definition ---

interface CalculatorState {
  form: FormState;
  klassScores: KlassScores;
  toggleOption: (questionKey: string, optionKey: string) => void;
  _calculateScores: (state: CalculatorState) => Partial<CalculatorState>; // Internal helper
}

// Helper to calculate initial form state
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

const useCalculatorStore = create<CalculatorState>((set, get) => {
  // Internal score calculation logic, moved into the store setup
  const _calculateScores = (currentState: CalculatorState): Partial<CalculatorState> => {
    const newScores = Object.entries(currentState.form).reduce((m, [sectionId, section]) => {
      const questionSection = questionsObj[sectionId];
      const sectionState = section as FormOptionState;
      if (questionSection?.opts) {
        questionSection.opts.forEach(opt => {
          if (sectionState[opt.k]) {
            if (opt.classesFn) {
              // Pass copies to avoid direct state mutation if classesFn modifies them
              // Note: classesFn might need adjustment if it relies on external state not in the store
              opt.classesFn({...m}, {...currentState.form});
            } else if (opt.classes) {
              (Object.entries(opt.classes) as [ClassName, number][]).forEach(([c, pts]) => {
                if (c in m) {
                  m[c] = (m[c] || 0) + (pts || 0);
                }
              });
            }
          }
        });
      }
      return m;
    }, { warrior: 0, healer: 0, rogue: 0, mage: 0 } as KlassScores);
    return { klassScores: newScores };
  };

  return {
    form: initialFormState(),
    klassScores: { warrior: 0, healer: 0, rogue: 0, mage: 0 }, // Initial scores
    _calculateScores: _calculateScores, // Expose for internal use if needed, though calculation happens in toggleOption

    toggleOption: (questionKey, optionKey) => set(produce((draft: CalculatorState) => {
      // Ensure the structure exists before toggling
      if (!draft.form[questionKey]) {
        draft.form[questionKey] = {};
      }
      draft.form[questionKey][optionKey] = !draft.form[questionKey][optionKey];
      // Recalculate scores immediately after toggling an option
      const newScoresState = _calculateScores(draft); // Calculate based on the draft state
      draft.klassScores = newScoresState.klassScores!; // Update scores in the draft
    })),
  };
});


// --- React Component ---

const ClassCalculator = memo(() => {
  // Get state and actions from the Zustand store
  const { form, klassScores, toggleOption } = useCalculatorStore();

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
                  onChange={() => toggleOption(q.k, o.k)} // Use store action
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
            {/* Display scores from store state */}
            <div>Mage: {klassScores.mage}</div>
            <div>Warrior: {klassScores.warrior}</div>
            <div>Rogue: {klassScores.rogue}</div>
            <div>Healer: {klassScores.healer}</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <p></p>
    <Cheese />
  </>
})
export default ClassCalculator

function Cheese() {
  const [cheese, setCheese] = useState(false)
  const [doubleCheese, setDoubleCheese] = useState(false)

  if (!cheese) {
    return <Button onClick={() => setCheese(true)} variant="link">
      Want to cheese the system?
    </Button>
  }
  if (!doubleCheese) {
    return <div>
      <Button onClick={() => setDoubleCheese(true)} variant="link">
        Are you absolutely sure?
      </Button>
      <p>I'm literally gonna show you how to cheat.</p>
    </div>
  }
  return <div>
    <h6>INT</h6>
    <p>Intelligence is the most valuable stat, and it doesn't matter which class you play. Firstly, it impacts your level speed; the faster you level, the faster you gain more in all categories - so it's an "investment". And every time you level up, you heal - so this mitigates HP concerns. Further, spells contribute significantly, and INT drives spell power. Eg, boss damage from dailies and to-dos are a pittance compared to Brutal Smash or Burst of Flames. So go 100% INT, no matter your class or preferences.</p>
    <h6>Warrior + Brutal Smash</h6>
    <p>The most powerful spell in the game against bosses is Brutal Smash. Stack that with 100% INT, and you can mow through bosses. And boss rewards are significant; including EXP, meaning you can level up fast and stay alive long (healing from leveling up).</p>
  </div>
}