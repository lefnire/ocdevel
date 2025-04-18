// import Alert from "react-bootstrap/cjs/Alert";
import type {PropsWithChildren} from "react";

export function TLDR({children}: PropsWithChildren) {
  return <p className='ps-3 notice-card'><b>TL;DR</b> {children}</p>
  // return <div className="text-bg-info p-3 rounded-2 my-2"><b>TL;DR</b> {children}</div>
}