import React, {useEffect, useRef} from "react";
import {ExternalScript} from "~/components/external-scripts";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AD_CLIENT = "ca-pub-3242350243827794";
// const AD_CLIENT = false;

export function Adsense({pageLevelAds=false}: {pageLevelAds?: boolean}) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only run this once per ad unit
    if (!AD_CLIENT) { return; }
    if (initialized.current) { return; }
    if (typeof document === "undefined" || !adRef.current) { return; }

    initialized.current = true;

    // Handle page-level ads if needed
    const params = pageLevelAds ? {
      google_ad_client: AD_CLIENT,
      enable_page_level_ads: true
    } : {};

    // Push the ad after a short delay to ensure DOM is ready
    (window.adsbygoogle = window.adsbygoogle || []).push(params);
  }, [pageLevelAds, adRef.current]);

  if (!AD_CLIENT) {
    return null;
  }
  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{display: "block"}}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client={AD_CLIENT}
        data-ad-slot="8958942863"
      />
    </div>
  );
}

export function AdsenseScript() {
  if (!AD_CLIENT) { return null; }
  return <ExternalScript
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
    options={{
      id: "adsense-script",
      crossOrigin: "anonymous",
      async: true,
    }}
  />
}