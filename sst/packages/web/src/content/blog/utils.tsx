import Alert from 'react-bootstrap/Alert'
export function TLDR({children}) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}