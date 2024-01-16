
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const id = '20240109-fitness-desk'
export const date = '2024-01-09'
export const title = "Fitness Desk"
export const jsx = true
import wf from '../workflowy/walking-desk.opml'
import {useCallback, useMemo, useState} from "react";
import create from "zustand";
import {immer} from "zustand/middleware/immer";
import Badge from "react-bootstrap/Badge";
import {shallow} from "zustand/shallow";

interface UseStore {
  tags: Record<string, boolean>
  anyTags: boolean
  toggleTag: (tag: string) => void
}
const useStore = create<UseStore>()(immer((set, get) => ({
  tags: {},
  anyTags: false,
  toggleTag: (tag: string) => {
    set(state => {
      state.tags[tag] = !get().tags[tag]
      state.anyTags = Object.values(state.tags).filter(Boolean).length > 0
    })
  }
})))

function Tag({name}: {name: string}) {
  const clickFilter = () => {
    useStore.getState().toggleTag(name)
  }

  if (name === 'c') {return null}
  return <Badge
    className='me-1'
    bg="secondary pointer"
    onClick={clickFilter}
  >
    {name}
  </Badge>
}

interface Node {
  id: string
  text: string
  note: string
  tags: Record<string, string | true>
  children: Node[]
  depth: number
  passesFilter: boolean
}
function Node({id, text, note, tags, children, depth, passesFilter}: Node) {
  const [anyTags, appliedTags] = useStore(store => [store.anyTags, store.tags], shallow)
  const [open, setOpen] = useState(!tags?.c)

  const hasChildren = children?.length > 0
  let show = true
  if (anyTags) {
    if (!passesFilter) {
      show = Object.keys(tags).some(key => tags[key] === true && appliedTags[key] === true);
    }
  }

  const toggle = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(!open)
  }, [open])

  const chevron = useMemo(() => {
    if (!hasChildren) { return <div>•</div> }
    if (open) {return <FaChevronUp />}
    return <FaChevronDown />
  }, [open, children])

  return <div
    className="ps-2"
  >
    <div
      className={`gap-2 d-flex flex-row ${show ? "" : "visually-hidden"}`}
    >
      <div
        className="pointer"
        onClick={toggle}
      >{chevron}</div>
      <div className='' dangerouslySetInnerHTML={{__html: text}} />
      <div className=''>
        {Object.keys(tags).map(k => <Tag name={k} />)}
      </div>
    </div>
    <div
      className={`text-muted lh-sm fw-light ms-1 ${show ? "" : "visually-hidden"}`}
      dangerouslySetInnerHTML={{__html: note}}
    />
    <div
      className={open ? "" : "visually-hidden"}
      style={{
        borderLeft: '1px solid grey',
        marginLeft: `1rem`
      }}
    >
      {children.map((child) => (
        <Node
          key={child.id}
          {...child}
          depth={depth+1}
          passesFilter={show}
        />
      ))}
    </div>
  </div>
}

function AppliedTags() {
  const [anyTags, tags] = useStore(store => [store.anyTags, store.tags], shallow)
  if (!anyTags) { return null }
  const appliedTags = Object.entries(tags).filter(([k, v]) => v).map(([k, v]) => (
    <Tag name={k} />
  ))
  return <div>
    <div>Applied tags (click to remove)</div>
    {appliedTags}
    <hr/>
  </div>
}

function Body() {
  const tree = wf.children.map((child) => (
    <Node
      key={child.id}
      {...child}
      depth={0}
    />
  ))
  return <div>
    <p>Severe ADHD, broke, and busy. Had to stop taking Adderall a while back, found that a fitness desk did as much to
      help as the meds. Treadmills in particular, where you set a speed and it "moves you" (you just keep up) occupy a
      jitters part of your brain, like a fidget-spinner. One of the only things that works for me (along with the
      Pomodoro Technique). Moving keeps blood and endorphins pumping. It keeps you alert and on task all day. Oxygen and
      endorphins help not just with energy, but focus. My caffeine intake is significantly reduced when I'm at fitness
      desk. Weight-loss: At my best, I've clocked 320 active zone minutes (Fitbit) in a day. That's 5.3 hrs of gym time.
      Excessive - should probably be reconsidered - but suffice it eliminates the gym, saving time and money. At my
      worst, I do 5 miles in a day; that's the 10k steps minimum recommendation. Further, your posture is improved while
      walking. Obviously compared to sitting desks; but I've found posture is better walking than standing, even.</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/-YFrgeEK4lU?si=oFjG8CeWAjquj9HH"
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
    <AppliedTags />
    {tree}
  </div>

}

const body = <Body/>
export default body