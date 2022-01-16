import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
//const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'DevOps',
  episode: 19,
  mergeEpisode: 51,
  mla: true,
  created: '2022-01-13',
  guid: 21770120,
  libsynEpisode: 21770120,
  teaser: "Chatting with co-workers about the role of DevOps in a machine learning engineer's life",
  body: Body,
  //transcript: Transcript,
}
export default ep