/*
I'm using react-router-v7 (the next version of Remix, which is SSR/SSG). I'm trying
to use react-boostrap with it, which is an old project and seemingly not up-to-date
with SSR tech. My bundle-size for the project is very high, and it's due to the
whole react-bootstrap library being imported when I do things like this:
 */
// import {Row} from 'react-bootstrap'
/*
This works, but again - huge bundle size
 */


/*
So the recommended approach is individual imports, as shown in their docs:
 */
import Row from 'react-bootstrap/cjs/Row'
import Col_ from 'react-bootstrap/cjs/Col'
const Col = Col_.default || Col_
import Container from 'react-bootstrap/cjs/Container'
import Stack from 'react-bootstrap/cjs/Stack'
import Button from 'react-bootstrap/cjs/Button'
import Alert from "react-bootstrap/cjs/Alert";
// import ThemeProvider from 'react-bootstrap/cjs/ThemeProvider';

/*
This gives the error:
TypeError: Cannot read properties of null (reading 'useContext')
    at exports.useContext (http://localhost:5173/node_modules/.vite/deps/chunk-3ISELJEO.js?v=d46263f2:1082:27)
    at useFrameworkContext (http://localhost:5173/node_modules/.vite/deps/chunk-KAMMW474.js?v=d46263f2:8088:24)
    at Meta (http://localhost:5173/node_modules/.vite/deps/chunk-KAMMW474.js?v=d46263f2:8299:37)
    at react-stack-bottom-frame (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:16190:20)
    at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:4304:24)
    at updateFunctionComponent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:5970:21)
    at beginWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:7046:20)
    at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:724:18)
    at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:10829:98)
    at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=72b56112:10690:43)
 */

/*
And if I try directly through their /esm folder:
 */
// import ThemeProvider from 'react-bootstrap/cjs/esm/ThemeProvider'
// import Row from 'react-bootstrap/cjs/esm/Row'
/*
Then I get the error:
Cannot find module '/home/lefnire/Sites/ocdevel/reactrouter7/node_modules/react-bootstrap/cjs/esm/ThemeProvider' imported from /home/lefnire/Sites/ocdevel/reactrouter7/node_modules/react-bootstrap/cjs/esm/Row.js

Though ThemeProvider.js is definitely in that folder
 */



export default function Test() {
  return <Container>
  <Row>
    <Col xs={12} lg={3} className="hi">hi</Col>
    <Col xs={12} lg={3}>hi</Col>
  </Row>
  <Alert>hi</Alert>
  <Container><div></div></Container>
  <Stack><div></div></Stack>
  <Button>hi</Button>
  </Container>
}
