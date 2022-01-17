#!/bin/bash
yum update -y
yum install emacs git -y

# ----------
# Mount EFS
# https://docs.aws.amazon.com/efs/latest/ug/efs-mount-helper.html
mkdir -p ${efs_dst}
yum install amazon-efs-utils -y
mount -t efs ${efs_src} ${efs_dst}
echo "${efs_src}:/ ${efs_dst} efs _netdev,noresvport,tls,iam 0 0" | cat >> /etc/fstab
cp -r ${efs_dst}/configs/.ssh ${home}
cp -r ${efs_dst}/configs/.aws ${home}
cp -r ${efs_dst}/configs/.gitconfig ${home}

# ----------
# EBS
# https://thecodinginterface.com/blog/terraform-linux-ec2-ebs/
# https://devopscube.com/mount-ebs-volume-ec2-instance/
mkdir -p ${ebs_dst}
DISK_INFO=$(file -s $(readlink -f /dev/sdh) | cut -f2 -d" ")
if [ $DISK_INFO == 'data' ]; then
  mkfs -t xfs ${ebs_src}
fi
mount ${ebs_src} ${ebs_dst}
BLK_ID=$(blkid ${ebs_src} | cut -f2 -d" ")
echo "$BLK_ID ${ebs_dst} xfs defaults 0 0" | cat >> /etc/fstab  # 0 2?
mount -a
chmod go+rw ${ebs_dst}

# ----------
# Install Docker, data-dir at ~/efs/docker
%{ if (gpu) }
%{ else }
amazon-linux-extras install docker
yum install docker -y
usermod -a -G docker ec2-user
%{ endif }
#mkdir ${ebs_dst}/docker
#rm -rf ${ebs_dst}/docker/*
#echo "{\"data-root\":\"${ebs_dst}/docker\"}" > /etc/docker/daemon.json
pip3 install docker-compose

# ----------
# Terraform
yum install -y yum-utils
yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
yum -y install terraform

# ----------
# Update & restart
yum upgrade -y && reboot now