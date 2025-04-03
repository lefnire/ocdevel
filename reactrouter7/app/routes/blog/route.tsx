import Container from 'react-bootstrap/cjs/Container';
import {Outlet} from "react-router";

export default function Blog() {
  return <Container>
    <Outlet />
  </Container>
}