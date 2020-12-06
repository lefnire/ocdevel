import jp0 from './jobpig/0'
import jp1 from './jobpig/1'
import jp2 from './jobpig/2'
import jp3 from './jobpig/3'
import jp4 from './jobpig/4'

const blog = [
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