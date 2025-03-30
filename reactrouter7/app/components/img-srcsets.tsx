/**
 * Build out this component for me based on your understand of what I'm trying to achieve.
 * Don't spend too much time making fail-safes and types; I'll use this sparingly, and
 * I'm ok needing to know exactly how to use it
 */


interface ImgSrcsets {
  // list of avif urls. The first being for the first typical dimension (eg mobile
  // phones). If there's a 2nd item, it's for medium and above. If there's a 3rd item,
  // then large and above. Set reasonable breakpoints, whatever's common in web standards
  // (I'm new to all this). This parameter is optional, but `webp` is not.
  avif?: string[]
  // Same number urls. Again, same breakpoint expecatations. The last item in the webp
  // list will be the fallback (the src)
  webp: string[]

  // Then the rest are standard img properties. Maybe this can just merge from some
  // HTML Type? And I'm not sure which of these properties should be required vs
  // optional when we're doing this srcset stuff
  width: number
  height: number
  loading: "eager" | ...
  fetchpriority: "high" | ...
}
export function ImgSrcsets(images: ImgSrcsets) {
  // returns a <picture> src-set stuff tag for all the image sources and the img
}

/* Sample:
<ImgSrcsets
  avif={[ "./img50px.avif", "./img150px.avif" ]}
  webp={[ "./img50px.webp", "./img150px.webp" ]}
  laoding="eager" fetchpriority="high" decoding="async"
  width={200} height={200}
  className="rounded"
/>
 */