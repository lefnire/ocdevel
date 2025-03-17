import Alert from 'react-bootstrap/Alert'
import {Link} from "react-router";

export function TLDR({children}) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}

export function BattleStation() {
  return <p>This is part of my <Link to="/blog/20240111-tylers-setup">battlestation setup</Link>, where I discuss fitness desks, ergo peripherals, laptops, and more.</p>;
}