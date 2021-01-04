export default {
  title: 'Docker',
  episode: 12,
  mla: true,
  date: "2020-11-08",
  guid: "43678922",
  teaser: "Use Docker for env setup on localhost & cloud deployment, instead of pyenv / Anaconda. I recommend Windows for your desktop.",
  body: `
For your local development environment, I recommend using Windows. You can't effectively use Mac because, due to their use of AMD rather than Nvidia, GPU-based ML frameworks can't optimize to Mac. You _could_ use Ubuntu Desktop, but it's not for the weak-of-heart due to various software compatibilities; and when it comes to laptops, drivers aren't as up-to-snuff as Windows drivers (especially with battery lifetime & wifi). So use Windows.
* Setup Windows Dev Channel and WSL2 with nvidia-docker support. [Instructions here](/blog/20201207-wsl2-gpu-docker)
* Odds-and-ends with WSL2 & Docker [here](/blog/20201208-wsl-docker-misc)
* I recommend using pre-fab Docker containers to save time, [I have some here](https://github.com/lefnire/ml-tools).

See [mlg/24](/mlg/24) for details on buying/building a good PC desktop or laptop for machine learning. 
`
}