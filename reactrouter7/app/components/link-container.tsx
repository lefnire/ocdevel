import {NavLink} from "react-router";
import type {PropsWithChildren} from "react";

type LinkContainer = PropsWithChildren
export function LinkContainer({children, ...props}: LinkContainer) {
  return <NavLink
    role="button"
    className={({ isActive, isPending, isTransitioning }) =>
      [
        isPending ? "pending" : "",
        isActive ? "active" : "",
        isTransitioning ? "transitioning" : "",
        "nav-link"
      ].join(" ").trim()
    }
    {...props}
  >
    {children}
  </NavLink>
}