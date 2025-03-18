import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
// import "./app.css";
import "./root.scss";
import React, {useEffect} from "react";
import ReactGA from "react-ga4";
import {Button, Nav, Navbar, Stack} from "react-bootstrap";
import {LinkContainer} from "~/components/utils";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import {SiTiktok} from "react-icons/si";
// import CookieConsent from "react-cookie-consent";

export const links: Route.LinksFunction = () => [
  // {rel: "preconnect", href: "https://fonts.googleapis.com"},
  // {
  //   rel: "preconnect",
  //   href: "https://fonts.gstatic.com",
  //   crossOrigin: "anonymous",
  // },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  // },

  // Bootstrap CDN
  // {
  //   rel: "stylesheet",
  //   href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  //   integrity: "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
  //   crossOrigin: "anonymous",
  // }
];

/**
@FIXME Add these?
<!-- TODO remove this? -->
<!--<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=9f178603-558f-4b18-b4b9-b2f2f18a5ff5"></script>-->

<meta name='impact-site-verification' value='c47f4703-3b54-4a24-9d35-67f518f4dbc7' />

<!--<script data-ad-client="ca-pub-3242350243827794" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
 */

// function LocationListener() {
//   const location = useLocation()
//
//   // https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528
//   useEffect(() => {
//     if (!usingGA) {return}
//     ReactGA.send({hitType: "pageview", page: location.pathname}) //  + location.search);
//     window.scrollTo(0, 0);
//   }, [location])
//   return null
// }

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let usingGA = false;
  useEffect(() => {
    if (!import.meta.env.PROD) { return }
    if (typeof document === "undefined") { return }
    console.log("using GA")
    usingGA = true;
    ReactGA.initialize('G-0YR1STKJS3')
    // I think this is double-counting, do to hydration maybe or that I don't need to manually call this after all?
    // ReactGA.send({hitType: "pageview", page: window.location.pathname})
  }, [])

  return <div>
    {/*<LocationListener />*/}
    {/*<CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>*/}

    <Navbar bg='light' variant='light' className="border-bottom justify-content-center">
      <LinkContainer to="/">
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog" tabIndex="0">Blog</LinkContainer>
        <LinkContainer to="/mlg" tabIndex="1">MLG</LinkContainer>
        <LinkContainer to="/llh" tabIndex="2">LLH</LinkContainer>
        <LinkContainer to='/contact' tabIndex="3">Contact</LinkContainer>
      </Nav>
    </Navbar>

    {/*<Switch>*/}
    {/*  <Route path="/" exact><Lazy c={Home} /></Route>*/}
    {/*  <Route path="/blog"><Lazy c={Blog} /></Route>*/}
    {/*  <Route path="/mlg"><Lazy c={Podcasts} /></Route>*/}
    {/*  <Route path="/contact"><Lazy c={Contact} /></Route>*/}
    {/*  <Redirect from="/podcasts(.*)" to="/mlg"/>*/}
    {/*</Switch>*/}

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
