import React from 'react'
import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: "What is AI / ML",
  episode: 2,
  mergeEpisode: 2,
  created: "2017-02-09",
  guid: "129d0157-fbda-4cc6-aaae-1c96745c12c9",
  libsynEpisode: 5440757,
  teaser: "What is artificial intelligence and machine learning? What's the difference? How about compared to statistics and data science? AI history.",
  body: Body,
  transcript: Transcript
}
export default ep