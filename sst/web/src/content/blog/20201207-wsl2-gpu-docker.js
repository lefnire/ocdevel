export default {
  id: "20201207-wsl2-gpu-docker",
  date: "2020-12-07",
  title: "WSL2 + GPU + Docker",
  body: `
Full details for this post at [docs.nvidia.com/cuda/wsl-user-guide](https://docs.nvidia.com/cuda/wsl-user-guide/index.html), this post expands links' instructions and distills just the essential commands without their about text. 

#### Switch to Windows Dev Channel
[[Details]](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#installing-wip)

1. Register for [Windows Insider Program](https://insider.windows.com/en-us/getting-started/#register)
1. Settings > Update & Security > Windows Insider Program > switch from \`Beta Channel (Recommended)\` to \`Dev Channel\`
1. Settings > Update & Security > Advanced Options > turn on \`Receive updates for other Microsoft products when you update Windows\`
1. Settings > Update & Security > Check for updates, download, restart.

#### Install Nvidia WSL2-compatibile driver
[[Details]](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#installing-nvidia-drivers)

1. [Nvidia link](https://developer.nvidia.com/cuda/wsl) > \`Get CUDA Driver\` > download, install. Do this _before_ below!

#### Install WSL2
[[Details]](https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10)

1. Run Powershell as Administrator
1. \`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart\`
1. \`dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart\`
1. Restart computer
1. (back in Powershell) \`wsl --set-default-version 2\`

#### Install Ubuntu
1. Install Ubuntu 18.04 from [MS Store](https://www.microsoft.com/en-gb/p/ubuntu-1804-lts/9n9tngvndl3q).
   I recommend 18.04 over 20.04, easier Nvidia setup without modification.
1. Install [this thing](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package).
   You'd get an Ubuntu error with that link as a fix anyway.

#### Install Docker + Nvidia stuff
[[Details]](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#setting-containers)

1. Setup Docker, Nvidia
    \`\`\`
    curl https://get.docker.com | sh
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
    curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
    curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    curl -s -L https://nvidia.github.io/libnvidia-container/experimental/$distribution/libnvidia-container-experimental.list | sudo tee /etc/apt/sources.list.d/libnvidia-container-experimental.list
    sudo apt-get update
    sudo apt-get install -y nvidia-docker2
    sudo usermod -aG docker $USER
    \`\`\`
1. Edit \`/etc/docker/daemon.json\`, add \`"default-runtime"\`
    \`\`\`
    { "runtimes": { "nvidia": { "path": "nvidia-container-runtime", "runtimeArgs": [] } }, "default-runtime": "nvidia" }
    \`\`\`
1. Restart Docker
    \`\`\`
    sudo service docker stop
    sudo service docker start
    \`\`\`

#### Test
[[Details]](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#running-containers)

1. \`docker run --gpus all nvcr.io/nvidia/k8s/cuda-sample:nbody nbody -gpu -benchmark\`

If it fails, eg \`Error: only 0 Devices available, 1 requested. Exiting.\`:
1. Restart PC, try again
1. If you're on a laptop, open Device Manager > Display Adapters
   1. Right-click Nvidia GPU > Disable > Yes
   1. Right-click > Enable
   1. This is an Nvidia bug. "NVIDIA is aware of a specific installation issue reported on mobile platforms with the WIP driver 465.12 posted on 11/16/2020. A known workaround will be to disable and reenable the GPU adapter from device manager at system start. We are working on a fix for this issue and will have an updated driver soon."
1. Try adding \`"node-generic-resources": ["NVIDIA-GPU=0"]\` to \`/etc/docker/daemon.json\` | [Details](https://github.com/docker/compose/issues/6691#issuecomment-696465142)

#### Further tweaks
[[Details]](/blog/20201208-wsl-docker-misc). Click for additional setup tweaks like making all RAM available, docker-compose with GPU, etc.
`
}