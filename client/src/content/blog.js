import jp0 from './jobpig/0'
import jp1 from './jobpig/1'
import jp2 from './jobpig/2'
import jp3 from './jobpig/3'
import jp4 from './jobpig/4'

const blog = [
{
  id: "10e3c2bf-c1a4-4c2d-af02-c6e09e278e2d",
  date: "2020-12-08",
  title: "WSL2 + Docker odds & ends",
  body: `
#### Use more than 8GB RAM
[[Details]](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig). Docker + WSL2 defaults to only use 8GB system RAM. Bump it up to max. 

1. Edit \`C:\\Users\\yourUserName\\.wslconfig\`
   \`\`\`
   [wsl2]
   #kernel=C:\\\\temp\\\\myCustomKernel
   memory=4GB # Limits VM memory in WSL 2 to 4 GB
   #processors=2 # Makes the WSL 2 VM use two virtual processors
   \`\`\`
1. Restart WSL (\`wsl --shutdown\` in Powershell)

#### .profile tweaks
1. WSL2 uses \`.profile\`, but many installs default to \`.bashrc\` (eg Anaconda). Load \`.bashrc\` via \`.profile\`
    \`\`\`
    if [ -n "$BASH_VERSION" ]; then
        # include .bashrc if it exists
        if [ -f "$HOME/.bashrc" ]; then
            . "$HOME/.bashrc"
        fi
    fi
    \`\`\`
1. Tmux with colors: \`export TERM=xterm-256color\`

#### Clear cache (mem leak)
Docker on WSL2 has a memory leak. Periodically clear the cache
1. \`echo 1 | sudo tee /proc/sys/vm/drop_caches\`

#### Install Python
1. Download [Anaconda for Linux](https://www.anaconda.com/products/individual#linux)
1. \`sh ./Anaconda-whatever.sh\`
1. If \`conda\` command not recognized after shell restart, try moving whatever it added to \`~\\.bashrc\` to \`~\\.profile\` 

#### docker-compose w GPU support
[[Details]](https://github.com/docker/compose/issues/6691#issuecomment-670700674)

1. Install forked docker-compose via pip
    \`\`\`
    pip install git+https://github.com/docker/docker-py.git
    pip install git+https://github.com/yoanisgil/compose.git@device-requests --ignore-installed PyYAML
    \`\`\`
1. Edit \`~/.profile\`: \`export COMPOSE_API_VERSION=auto\`
1. Looks like the above got merged into docker-compose, but still not working for me without forked docker-compose. Revisit.

#### Other
See more tricks [here](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly) (note-to-self: add the useful ones into this post). 
`
},
{
  id: "a666c140-9100-4a1d-b20a-f6b8d7f48e8e",
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
[[Details]](/blog/10e3c2bf-c1a4-4c2d-af02-c6e09e278e2d). Click for additional setup tweaks like making all RAM available, docker-compose with GPU, etc.
`
},

{
  id: "c364fa6e-e916-4d5d-a2bf-2284eaa8fea5",
  date: "2020-12-06",
  title: "VR 2020: buy either Index or Quest 2",
  body: `
I'm an absolute *obsessor* over VR news, specs, reviews, speculations. I've played CV1 & owned Vive, Pimax, Odyssey+, Quest1, Index, Rift S, Quest2 (I'm not rich - I return or sell, and keep 2). I've had my eye on HP Reverb G2 *big time* - and let me tell you, that [controllers-tracking issue](https://uploadvr.com/hp-reverb-g2-review/) ain't looking good. That's a real bummer to me, because (1) the resolution, (2) the full comfort/audio Index-style setup, (3) I *am* a believer in a future of inside-out tracking. IOT is (1) portable, (2) simpler setup, and (3) sells better (due to 2). Portable has been more important to me than I'd anticipated over the years (not during COVID obv.). So on IOT, that really leaves some cheap WMR options, which IMO can have some pretty hit-or-miss tracking based on environment (I've had *very* bad experience with WMR tracking, but I'm also spoiled by Steam Base Stations). As for Pimax, you'll really only like it if you come from a background hacking Gentoo Linux kernels with lots of time on hand. And Rift S is discontinued.

So in the end, it's down to two sane options: Index vs Quest 2. And luckily for buyers, that's a *very* distinct choice. Would you prefer a home-theater with surround-sound and huge sofas, auto-dimming lights, and a popcorn machine? But it'll cost you an arm & a leg + time in setup & maintenance. Or do you just want to watch movies on an iPad? It's cheap, portable, and once you're immersed in a movie, do you really notice the details anyway?

Those are the two I own now. Index is obviously God-like, nothing much to say there. Quest2 is *less bad* than I thought it'd be. And especially the IOT tracking, it truly is not a problem for 99% of scenarios (unlike WMR, which had me tied to certain games I could play effectively). You'll want [Link cable](https://www.oculus.com/accessories/oculus-link) if you don't have a modern enough router for Virtual Desktop streaming (I don't); and you'll definitely want an alternative headstrap (Elite Strap or the 3rd party Halo Strap). So after you accessorize $150, you have a very solid headset, plus it's portable. Of course, the Facebook thing so that's up to you. 

I've got a tentative eye on DecaGear, but from my Pimax experience I'm not hopeful of no-namers with big promises. G2 was my deus ex machina, alas. Of course, some are fitting into their SteamVR pipeline, swapping out the Index HMD; but that's another story. So I think the decision goes like this:

1. **Index**. Home-theater style setup. No compromises, but expensive & time-consuming. 
   1. [Index Kit](https://store.steampowered.com/sub/354231/) for the "just works" package
   1. You're willing to spend & tinker more for better resolution, Index [Controllers](https://store.steampowered.com/app/1059550/Valve_Index_Controllers/) + [Base Stations](https://store.steampowered.com/app/1059570/Valve_Index_Base_Station/), [G2 HMD](https://www8.hp.com/us/en/vr/reverb-g2-vr-headset.html) (and shelf the controllers). [How to do this](https://uploadvr.com/how-to-use-hp-reverb-g2-with-valve-index-controllers/).
2. **Quest 2**. Portable, simple, & cheap.
   1. No gaming PC, just [the Quest](https://amzn.to/2VGEi7A)
   1. You have a gaming PC 
      1. You have a modern, expensive router. [Stream games via Virtual Desktop](https://uploadvr.com/how-to-play-pc-vr-oculus-quest-2/).
      1. You don't know, or my router is old-ish. [Get Quest with Link](https://amzn.to/37D74vi) (this link comes with a carrying-case too, and the _whole package_ is cheaper than HMD + Link separately) 
3. You want both: portable *and* powerful. (1) If you can afford both, get both; (2) if not, get Quest 2 & mod it. Search for Halo Strap vs Elitestrap, over-ear headphones, controller hand-straps, etc. I'd link things, but it's fast-changing.
`
},
{
  id: "116246ad-42d3-4ef6-afec-1c9e41d3ec71",
  date: "2020-11-12",
  title: "Install Emacs 27 on Ubuntu 18.04",
  body: `
I use [Spacemacs](https://www.spacemacs.org/) (highly recommended) who's latest versions aren't compatible with earlier Emacs (eg, 25 is common on 18.04).

\`\`\`
# Install Emacs 27
sudo add-apt-repository ppa:kelleyk/emacs
sudo apt update
sudo apt install emacs27

# Install Spacemacs
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d
\`\`\`    
`
},
{
  id: "061a8427-ae59-4bcf-a3e9-a36e1288ca2e",
  date: "2020-10-22",
  title: "AWS Batch with EFS mount",
  body: `
I'm using AWS Batch for ML model-runs on [Gnothi](https://gnothiai.com). I'm using hugginface/transformers, UKPLab/sentence-transformers, Gensim, spaCy, and more which download large model artifacts ([ml-tools](https://github.com/lefnire/ml-tools)). I could add these to the Dockerfile run by Batch via their CLI download commands (eg \`python -m spacy download en\`), but the Dockerfile would be huge, incurring an unnecessary provision uptime cost to Batch. It's preferred to download these models once to an external mounted file-system, for re-mount & re-use across all the Batch runs. AWS's [own tutorial](https://aws.amazon.com/premiumsupport/knowledge-center/batch-mount-efs/) on this was pretty lacking, so here are my steps.

1.  Create two security groups (SG).   
    1. One for the Batch _compute environment_. Mine is called  "ml_jobs ". Outbound=* (0.0.0.0/0), inbound you'll likely want SSH (0.0.0.0/0)  
    2. One for EFS. Outbound=*. Mine's called  "EFS "  
    3. Modify each SG to have Inbound=* from _each other's SG_. You only actually need NFS (and maybe SSH?), but hey, they're only talking to each other; you're safe.  
    [Discussion here.](https://forums.aws.amazon.com/thread.jspa?threadID=235344)
2.  Create an EFS file system ([link](https://console.aws.amazon.com/efs/home?region=us-east-1#/file-systems))  
    1. At the security-group step, x out each subnet it suggests, and replace it with the SG subnets you created in (1).
3.  Create a launch template. [Link here](https://aws.amazon.com/premiumsupport/knowledge-center/batch-mount-efs/), this is the tutorial provided by AWS (the only info I found in this adventure).   
    1. Per the rest of this post, I did mine in Console (not API), so just copy/paste the that big text-blob from the link onto (bottom of launch-template page) > Advanced details > User data (replacing the file_system_id_01)  
    2. Add Storage (volumes) to reflect that tutorial. That is, Volume=EBS, Delete on termination=Yes, Device name=/dev/xvda, Volume type=gp2.  
    3. Make sure everything else on this page, including sub-fields of Storage, is set to  "Don't include in launch template ".
4.  Setup Batch. Create a _compute environment.  
    1. Add an EC2 keypair if you want to SSH in. You likely will, since you'll want to \`scp\` in files.  
    2. Probably select managed/spot, 100% cost. That's my setup, up to you.  
    3. p2 family or greater(I'm using p2.xlarge). Don't use g family, Nvidia drivers not compatible! Make sure you remove  "Optimal "  
    4. In one of the advanced bits, select your launch template from (3), version=$Latest  
    5. VPC ID = the same VPC you used for your EFS, select all subnets  
    6. Specify the SG from (1.1).
5.  _Job definition_  
    1. Volumes. Name=efs, Source path=/mnt/efs  
    2. Mount points. Source volume=efs, Container path=/storage (or wherever your container expects the mount)  
    3. Number of GPUs=1  
    4. Privileged=true  
    Details on the above. Volumes specifies the name/tag/label you're referring to this mount path on the system, and Mount points references that to place it into the container at  "Container path ". Number of GPUs requests a GPU, and an Nvidia driver from host. Privileged is required for this setup, as the /mnt/efs will be \`chown root\`.
`
},

  jp4, jp3, jp2, jp1, jp0
]
export default blog