import Plausible_ from 'plausible-tracker'
const Plausible = Plausible_.default || Plausible_
import {memo, useEffect, useRef} from "react";
import {useLocation, useSearchParams} from "react-router";

const TEST = false;
const PROD = import.meta.env.PROD;
let TRACK = TEST || PROD;

const plausible = Plausible({
  domain: 'ocdevel.com',
  trackLocalhost: TEST,
  // hashMode: false,
})
// const plausible = {trackEvent: () => {}, trackPageview: () => {}}

export const clickAffiliate = (key: string) => () => {
  if (!TRACK) { return; }
  // console.log("affiliate")
  plausible.trackEvent(
    'affiliate',
    {
      // callback: () => null,
      props: { product: key}
    },
    //{} TODO investigate
  )
}
export const PlausibleListener = memo(() => {
  const {pathname} = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  // It's calling twice sometimes for some reason
  const lastPathname = useRef("");
  const didSetNoTrack = useRef(false)

  useEffect(() => {
    if (didSetNoTrack.current) { return; } // navigated to new page
    // TODO set window.localStorage.plausible_ignore = 'true'
    const notrack = searchParams.get('notrack')
    if (notrack === null || notrack === undefined) { return; }
    TRACK = false;
    didSetNoTrack.current = true;
    // console.log("notrack")
  }, [searchParams])

  useEffect(() => {
    if (!TRACK) { return; }
    // double-calling sometimes
    if (pathname === lastPathname.current) { return; }
    // console.log("pageview")
    lastPathname.current = pathname;
    plausible.trackPageview({

    }, {
      callback: clearUtm
    })
  }, [pathname])

  function clearUtm() {
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
  }

  return null
})


// git-blame: google analytics
export const GoogleConsentMode= () => null;