import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'AWS Local Development',
  episode: 17,
  mergeEpisode: 49,
  mla: true,
  created: '2021-11-05',
  guid: 21070127,
  libsynEpisode: 21070127,
  teaser: "Developing on AWS first (SageMaker or other)",
  body: Body,
  transcript: Transcript,
}
export default ep