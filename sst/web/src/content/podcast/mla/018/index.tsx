import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'Descript',
  episode: 18,
  mergeEpisode: 50,
  mla: true,
  created: '2021-11-06',
  guid: 21074042,
  libsynEpisode: 21074042,
  teaser: "(Optional episode) just showcasing a cool application using machine learning",
  body: Body,
  transcript: Transcript,
}
export default ep