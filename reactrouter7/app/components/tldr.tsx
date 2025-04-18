// import Alert from "react-bootstrap/cjs/Alert";
import type {PropsWithChildren} from "react";

type TLDR = {
  multiline?: boolean
}
export function TLDR({children, multiline}: PropsWithChildren<TLDR>) {
  if (multiline) {
    return <div className='tldr'>
      <strong className="text-decoration-underline">TL;DR</strong>
      <div>{children}</div>
    </div>
  }
  return <div className='tldr'>
    <strong className='text-decoration-underline me-2'>TL;DR</strong>
    {children}
  </div>
  // return <div className="text-bg-info p-3 rounded-2 my-2"><b>TL;DR</b> {children}</div>
}
