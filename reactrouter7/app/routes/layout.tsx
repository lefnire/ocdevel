import {GoogleConsentMode} from "~/components/analytics";
import Button from 'react-bootstrap/cjs/Button';
import Nav from 'react-bootstrap/cjs/Nav';
import Navbar from 'react-bootstrap/cjs/Navbar';
import Stack from 'react-bootstrap/cjs/Stack';
import {LinkContainer} from "~/components/utils";
import {Outlet, useSearchParams} from "react-router";
import {FaFacebook} from "@react-icons/all-files/fa/FaFacebook";
import {FaInstagram} from "@react-icons/all-files/fa/FaInstagram";
import {FaYoutube} from "@react-icons/all-files/fa/FaYoutube";
import {SiTiktok} from "@react-icons/all-files/si/SiTiktok";
import {useEffect} from "react";
import {PopoverSingleton} from "~/components/popover";

function ClearUtm() {
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    return;
    setTimeout(() => {
      let deleted = false
      for (const k of ['utm_source', 'utm_campaign', 'utm_medium']) {
        if (searchParams.get(k)) {
          searchParams.delete(k)
          deleted = true
        }
      }
      if (deleted) {
        setSearchParams(searchParams)
      }
    }, 1)
  }, [])
  return null
}

export default function Layout() {
  return <div>
    <Navbar bg='light' variant='light' className="border-bottom justify-content-center">
      <LinkContainer to="/">
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog" tabIndex="0">Blog</LinkContainer>
        <LinkContainer to="/walk" tabIndex="1">Walk</LinkContainer>
        <LinkContainer to="/mlg" tabIndex="2">MLG</LinkContainer>
        <LinkContainer to="/llh" tabIndex="3">LLH</LinkContainer>
      </Nav>
    </Navbar>

    <Outlet />

    <ClearUtm />
    <GoogleConsentMode />
    <PopoverSingleton />

    <footer className='footer text-center mt-auto shadow'>
      <div className="d-flex justify-content-around align-items-center h-100">
        <div>
          {/*<span>Copyright © 2009-2024 OCDevel LLC</span>*/}
          <span>© 2009-2025 OCDevel LLC</span>
        </div>
        <div>
          <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            {[
              { href: "https://youtube.com/@ocdevel", Icon: FaYoutube },
              { href: "https://instagram.com/ocdevel", Icon: FaInstagram },
              { href: "https://tiktok.com/@lefnire", Icon: SiTiktok },
              { href: "https://facebook.com/ocdevel", Icon: FaFacebook }
            ].map(({ href, Icon }) => (
              <Button
                key={href}
                href={href}
                target="_blank"
                variant="link"
                className="p-1 text-dark fs-5"
              >
                <Icon />
              </Button>
            ))}
          </Stack>
        </div>
      </div>
    </footer>
  </div>
}