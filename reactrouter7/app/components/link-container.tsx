import {NavLink, type NavLinkProps, type NavLinkRenderProps, useLocation} from "react-router";
import {type NavLinkProps as BootstrapProps} from 'react-bootstrap/cjs/NavLink'
import {type PropsWithChildren, useCallback} from "react";

type LinkContainer = PropsWithChildren<BootstrapProps & NavLinkProps>
export function LinkContainer(props: LinkContainer) {
  const className = useCallback((
    {isActive, isPending, isTransitioning}: NavLinkRenderProps
  ) => {
    const state = [
      isPending ? "pending" : null,
      isActive ? "active" : null,
      isTransitioning ? "transitioning" : null,
      props.className,
    ].filter(Boolean)
    return [...state, "nav-link"].join(" ")
  }, [])
  return <div className="nav-item">
    <NavLink
      role="button"
      // data-rr-ui-event-key={props.to}
      className={className}
      {...props}
    />
  </div>
}