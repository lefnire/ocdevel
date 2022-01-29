import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
//const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'Kubeflow',
  episode: 20,
  mergeEpisode: 52,
  mla: true,
  created: '2022-01-28',
  guid: 21939530,
  libsynEpisode: 21939530,
  teaser: "Conversation with Dirk-Jan Kubeflow (vs cloud native solutions like SageMaker)",
  body: Body,
  //transcript: Transcript,
}
export default ep