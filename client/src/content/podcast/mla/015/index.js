import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'SageMaker 1',
  episode: 15,
  mla: true,
  created: '2021-11-03',
  guid: 21048182,
  libsynEpisode: 21048182,
  teaser: "Part 1 of deploying your ML models to the cloud with SageMaker (MLOps)",
  body: Body,
  transcript: Transcript,
  mergeEpisode: 45
}
export default ep