import { importMDX } from 'mdx.macro'
const Body = importMDX.sync('./body.mdx')
const Transcript = importMDX.sync('./transcript.mdx')

const ep = {
  title: 'SageMaker 2',
  episode: 16,
  mergeEpisode: 48,
  mla: true,
  created: '2021-11-04',
  guid: 21059909,
  libsynEpisode: 21059909,
  teaser: "Part 2 of deploying your ML models to the cloud with SageMaker (MLOps)",
  body: Body,
  transcript: Transcript,
}
export default ep