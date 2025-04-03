import React, {createContext, type PropsWithChildren, type ReactElement, useContext, useMemo, useState} from "react";
import {OverlayTrigger, type OverlayTriggerProps, Popover} from "react-bootstrap";


type PopoverContent = {title?: string, body: React.FC}
type PopoverContext = {
  setContent: (content: PopoverContent) => void
  popover: ReactElement
}
export const PopoverContext = createContext<PopoverContext>({
  setContent: (content) => {},
  popover: <div></div>
})
export function PopoverProvider({children}: PropsWithChildren) {
  const [content, setContent] = useState<PopoverContent>({
    title: undefined,
    body: () => null
  })

  const popover = useMemo(() => {
    const {title, body: Content} = content
    return <Popover id="popover-singleton">
      {title && <Popover.Header as={typeof title === "string" ? "h3" : "div"}>
        {title}
      </Popover.Header>}
      <Popover.Body><Content /></Popover.Body>
    </Popover>
  }, [content]);

  return <PopoverContext.Provider value={{setContent, popover}}>
    {children}
  </PopoverContext.Provider>
}

type PopoverTrigger = Omit<OverlayTriggerProps, 'overlay'> & {
  content: PopoverContent
}
export function PopoverTrigger(props: PopoverTrigger) {
  const pop = useContext(PopoverContext)
  const {content, ...rest} = props
  function onToggle(nextShow: boolean) {
    if (!nextShow) { return }
    pop.setContent(content)
  }
  return <OverlayTrigger
    overlay={pop.popover}
    onToggle={onToggle}

    trigger={["hover", "focus"]}
    placement="bottom"
    {...rest}
  />
}