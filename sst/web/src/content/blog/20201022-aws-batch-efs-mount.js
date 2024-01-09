export default {
  id: "20201022-aws-batch-efs-mount",
  date: "2020-10-22",
  title: "AWS Batch with EFS mount",
  body: String.raw`
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
}