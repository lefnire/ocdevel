export default {
  title: 'Docker',
  episode: 12,
  mergeEpisode: 42,
  mla: true,
  created: "2020-11-08",
  guid: "dea2c40c-42a7-45e8-9561-6e71bf0dbc5b",
  libsynEpisode: 16726955,
  teaser: "Use Docker for env setup on localhost & cloud deployment, instead of pyenv / Anaconda. I recommend Windows for your desktop.",
  body: `
For your local development environment, I recommend using Windows. You can't effectively use Mac because, due to their use of AMD rather than Nvidia, GPU-based ML frameworks can't optimize to Mac. You _could_ use Ubuntu Desktop, but it's not for the weak-of-heart due to various software compatibilities; and when it comes to laptops, drivers aren't as up-to-snuff as Windows drivers (especially with battery lifetime & wifi). So use Windows.

Use [Docker](https://www.docker.com/). You'll need it eventually for cloud-deploy anyway, so might as well start now and gain the dev environment benefits.  To use Docker with GPU on Windows, follow these instructions.

* Setup Windows Dev Channel and WSL2 with nvidia-docker support. [Instructions here](/blog/20201207-wsl2-gpu-docker)
* Odds-and-ends with WSL2 & Docker [here](/blog/20201208-wsl-docker-misc)
* Create a Dockerfile inheriting from a popular pre-vetted ML setups like [nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04](https://hub.docker.com/layers/nvidia/cuda/10.1-cudnn7-runtime-ubuntu18.04/images/sha256-a24cf3e988666a634937c9a8b856ecc77d5afe25b636fa3141fe089f440ed370?context=explore), [huggingface/transformers-gpu](https://hub.docker.com/r/huggingface/transformers-gpu/dockerfile), or Gnothi's [ml-tools](https://github.com/lefnire/ml-tools) kitchen-sink.

[Details](/mlg/24) on buying / building a good PC desktop or laptop for machine learning. Details on [front-end stack + cloud-hosting](/mlg/mla-13) and [ML cloud-hosting](/mlg/mla-14). 
`
}