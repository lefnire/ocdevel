import {GoogleConsentMode} from "~/components/analytics";
import {Button, Nav, Navbar, Stack} from "react-bootstrap";
import {LinkContainer} from "~/components/utils";
import {Outlet, useSearchParams} from "react-router";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import {SiTiktok} from "react-icons/si";
import React, {useEffect} from "react";

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
    <ClearUtm />
    <GoogleConsentMode />
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