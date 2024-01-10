export default {
  id: "20201209-unable-to-fetch-archives",
  date: "2020-12-09",
  title: "Docker error: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?",
  body: `
If you get this error \`E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?\` at a \`apt-get\` step of your Dockerfile, try adding \`apt-get update\` above that step.

Most public Dockerfiles which you'll be inheriting from add \`rm -rf /var/lib/apt/lists\` after their \`apt-get install\` steps. This is to save space, we want our Docker images to be as minimal as possible. I don't know how much space it actually saves, but apt-get will cache install files in case you need to re-install quickly. When \`/var/lib/apt/lists\` is removed, there's some indexing that goes wacky and apt-get gets confused. You can easily reset it back to normal via \`apt-get update\` before attempting any installs. Don't listen to its \`--fix-missing\` advice: that won't fix your problem, just do an \`apt-get update\`.

So your Dockerfile might look like this:
\`\`\`
FROM nvidia/cuda:10.1-cudnn7-runtime-ubuntu18.04
RUN apt-get update && \\
    apt-get install -y wget && \\
    rm -rf /var/lib/apt/lists  # follow their lead, create small/clean images
\`\`\` 
`
}