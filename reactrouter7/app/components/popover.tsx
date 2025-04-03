import {
  useEffect,
  type FC
} from "react";
import OverlayTrigger from 'react-bootstrap/cjs/OverlayTrigger';
import Popover from 'react-bootstrap/cjs/Popover';
import type { OverlayTriggerProps } from 'react-bootstrap';
import {create} from 'zustand'
import {useShallow} from "zustand/react/shallow";

type PopoverContent = {title?: string, body: FC}
const usePopoverStore = create<{
  popover: OverlayTriggerProps['overlay'],
  content: PopoverContent
}>()((set) => ({
  popover: <Popover id="popover-init"></Popover>,
  content: {title: undefined, body: () => null},
}))

export function PopoverSingleton() {
  const content = usePopoverStore(s => s.content)

  const {title, body: Content} = content
  const popover = <Popover id="popover-singleton">
    {title && <Popover.Header as={typeof title === "string" ? "h3" : "div"}>
      {title}
    </Popover.Header>}
    <Popover.Body><Content /></Popover.Body>
  </Popover>

  useEffect(() => {
    usePopoverStore.setState({popover})
  }, [popover])

  return null
}

type PopoverTrigger = Omit<OverlayTriggerProps, 'overlay'> & {
  content: PopoverContent
}
export function PopoverTrigger(props: PopoverTrigger) {
  const popover = usePopoverStore(s => s.popover)
  const {content, ...rest} = props
  function onToggle(nextShow: boolean) {
    if (!nextShow) { return }
    usePopoverStore.setState({content})
  }
  return <OverlayTrigger
    overlay={popover}
    onToggle={onToggle}

    trigger={["hover", "focus"]}
    placement="bottom"
    {...rest}
  />
}