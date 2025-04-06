import Alert from "react-bootstrap/cjs/Alert";
import type {PropsWithChildren} from "react";

export function TLDR({children}: PropsWithChildren) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}