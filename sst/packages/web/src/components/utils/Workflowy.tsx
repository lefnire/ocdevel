
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const id = '20240109-fitness-desk'
export const date = '2024-01-09'
export const title = "Fitness Desk"
export const jsx = true
import {useCallback, useEffect, useMemo, useState} from "react";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {shallow} from "zustand/shallow";
import wf from "../../content/workflowy/walking-desk.opml";

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
  const active = useStore(store => store.tags?.[name])
  const clickFilter = () => {
    useStore.getState().toggleTag(name)
  }

  if (name === 'c') {return null}
  return <span
    className={`me-1 text-muted pointer text-decoration-underline ${active ? "bg-info" : ""}`}
    onClick={clickFilter}
  >
    #{name}
  </span>
}

function AppliedTags() {
  const [anyTags, tags] = useStore(store => [store.anyTags, store.tags], shallow)
  if (!anyTags) { return null }
  const appliedTags = Object.entries(tags).filter(([k, v]) => v).map(([k, v]) => (
    <Tag name={k} />
  ))
  return <div className="card">
    <div className="card-body">
      <h6>Applied tags (click to remove)</h6>
      {appliedTags}
    </div>
  </div>
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
    // FIXME filters are OR, not AND. Should be AND
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
    if (!hasChildren) { return <span>-</span> }
    if (open) {return <FaChevronUp />}
    return <FaChevronDown />
  }, [open, children])

  return <div
    className="ps-2"
  >
    <div
      className={`${show ? "" : "visually-hidden"}`}
    >
      {/* FIXME use flex-box instead of floats */}
      <div
        className="pointer me-2 d-inline"
        onClick={toggle}
      >{chevron}</div>
      <div
        className='me-2 d-inline'
        dangerouslySetInnerHTML={{__html: text}}
        // style={{wordWrap: "break-word", whiteSpace: "normal"}}
      />
      <div className='d-inline'>
        {Object.keys(tags).map(k => <Tag name={k} />)}
      </div>
    </div>
    <div
      className={`text-muted lh-sm ms-1 ${show ? "" : "visually-hidden"}`}
      style={{fontSize: '0.85rem'}}
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

interface Workflowy {
  wf: Node
}
export function Workflowy({wf}: Workflowy) {
  useEffect(() => {
    // in case they navigate to another workflowy tree
    useStore.setState({tags: {}, anyTags: false})
  }, [wf])

  return <>
    <AppliedTags />
    {wf.children.map((child) => <Node
      key={child.id}
      {...child}
      depth={0}
    />)}
  </>
}