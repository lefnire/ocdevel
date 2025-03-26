import {useEffect, useRef} from "react";
import ReactGA from "react-ga4";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import {useLocation} from "react-router";
import './analytics.css'

// Google Consent Mode
// https://cookieconsent.orestbida.com/advanced/google-consent-mode.html
const CAT_ANALYTICS = "analytics";
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'

const TEST = false;
const PROD = import.meta.env.PROD;
const USE_GA = TEST || PROD

function canGa () {
  return (
    USE_GA &&
    CookieConsent?.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS)
  )
}

interface Event {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
  transport?: "beacon" | "xhr" | "image"
}
type Affiliate = {label: string, value: number}
export const clickAffiliate = ({label, value}: Affiliate) => () => {
  if (!canGa) { return; }
  ReactGA.event({
    category: "Affiliate",
    action: "AffiliateClick",
    label,
    // 12% conversion rate, 3% commission
    value: value * .12 * .03
  })
  // Track individually. TODO consolidate, use gtag
  // https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
  ReactGA.gtag("event", `aff_${label}`, {})
}

export function GoogleConsentMode() {
  const {pathname} = useLocation()
  // It's calling twice sometimes for some reason
  const lastPageView = useRef("");

  function sendPageView() {
    // Probably don't need to check, since Google will admit/deny what goes through
    if (!canGa()) { return; }
    debugger
    if (pathname !== lastPageView.current) {
      lastPageView.current = pathname;
      const page_path = TEST ? "/test" : pathname;
      ReactGA.gtag('event', 'page_view', {page_path});
    }
  }

  // I don't know why having a location listner is necessary, I thought remix SSR/SSG refreshes
  // each link click?
  useEffect(() => {
    // let gtag script load first. Am I doing this right?
    setTimeout(sendPageView, 1)
  }, [pathname])

  useEffect(() => {
    if (!USE_GA) { return; }

    ReactGA.initialize('G-0YR1STKJS3', { gtagOptions: { send_page_view: false } })

    // Set default consent to 'denied' (this should happen before changing any other dataLayer)
    ReactGA.gtag('consent', 'default', {
      [SERVICE_ANALYTICS_STORAGE]: 'denied',
    });

    /**
     * Update gtag consent according to the users choices made in CookieConsent UI
     */
    function updateGtagConsent() {
      ReactGA.gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
      });
    }

    CookieConsent.run({
      // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
      // ...

      guiOptions: {
        consentModal: {
          // layout: 'bar inline',
          equalWeightButtons: false,
        }
      },

      // Trigger consent update when user choices change
      onFirstConsent: () => {
        updateGtagConsent();
        sendPageView()
      },
      onConsent: () => {
        updateGtagConsent();
      },
      onChange: () => {
        updateGtagConsent();
      },

      // Configure categories and services
      categories: {
        [CAT_ANALYTICS]: {
          autoClear: {
            cookies: [
              {
                name: /^_ga/,   // regex: match all cookies starting with '_ga'
              },
              {
                name: '_gid',   // string: exact cookie name
              }
            ]
          },
          // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
          services: {
            [SERVICE_ANALYTICS_STORAGE]: {
              label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
            }
          }
        },
      },

      language: {
        default: 'en',
        translations: {
          en: {
            // See: https://support.google.com/tagmanager/answer/10718549?hl=en
            consentModal: {
              // title: 'We use cookies',
              title: 'Cookies',
              // description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
              description: 'This website uses Google Analytics to help me understand how visitors use the site.',
              acceptAllBtn: 'Accept',
              acceptNecessaryBtn: 'Reject',
            },
            preferencesModal: {sections: []}
          }
        }
      }
    });
  }, []);
  return null
}