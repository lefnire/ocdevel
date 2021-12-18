terraform {
  backend "s3" {
    bucket = "lefnire-private"
    key    = "ocdevel/terraform.tfstate"
    region = "us-east-1"
    profile = "terraform"
  }
}

provider "aws" {
  region  = local.region
  shared_credentials_file = "/home/lefnire/.aws/credentials"
  profile                 = "terraform"

  # Make it faster by skipping some things
  skip_get_ec2_platforms      = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true

  # skip_requesting_account_id should be disabled to generate valid ARN in apigatewayv2_api_execution_arn
  skip_requesting_account_id = false
}

locals {
  name = "ocdevel-general"
  region = "us-east-1"
  availability_zone = "us-east-1a"
  tags = {
    app = local.name
    Name = local.name
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = local.name
  cidr = "10.98.0.0/18"

  azs              = ["${local.region}a", "${local.region}b", "${local.region}c"]
  public_subnets   = ["10.98.0.0/24", "10.98.1.0/24", "10.98.2.0/24"]
  private_subnets  = ["10.98.3.0/24", "10.98.4.0/24", "10.98.5.0/24"]
  database_subnets = ["10.98.7.0/24", "10.98.8.0/24", "10.98.9.0/24"]

  tags = local.tags
}

module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = local.name
  description = "OCDevel general development security group (ssh, efs, etc)"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["ssh-tcp", "nfs-tcp"]
  egress_rules        = ["all-all"]

  tags = local.tags
}

locals {
  subnet_id = element(module.vpc.public_subnets, 0)  
}

resource "aws_efs_file_system" "efs" {
  creation_token = "${local.name}-efs"
  tags = local.tags
}

resource "aws_efs_mount_target" "mount" {
  file_system_id = aws_efs_file_system.efs.id
  subnet_id      = local.subnet_id
  security_groups = [module.security_group.security_group_id]
}

module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = "ocdevel-general"

  ami                    = "ami-04505e74c0741db8d"
  instance_type          = "t2.medium"
  key_name = "aws-general"
  availability_zone           = local.availability_zone
  subnet_id                   = local.subnet_id
  vpc_security_group_ids      = [module.security_group.security_group_id]
  associate_public_ip_address = true

  tags = local.tags

  user_data = <<EOF
#cloud-config
package_update: true
package_upgrade: true
runcmd:
- apt-get -y install amazon-efs-utils
- apt-get -y install nfs-common
- mkdir -p "/mnt/efs/fs1"
- test -f "/sbin/mount.efs" && printf "\n${aws_efs_file_system.efs.id}:/ /mnt/efs/fs1 efs tls,_netdev\n" >> /etc/fstab || printf "\n${aws_efs_file_system.efs.id}.efs.${local.region}.amazonaws.com:/ /mnt/efs/fs1 nfs4 nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport,_netdev 0 0\n" >> /etc/fstab
- test -f "/sbin/mount.efs" && grep -ozP 'client-info]\nsource' '/etc/amazon/efs/efs-utils.conf'; if [[ $? == 1 ]]; then printf "\n[client-info]\nsource=liw\n" >> /etc/amazon/efs/efs-utils.conf; fi;
- retryCnt=15; waitTime=30; while true; do mount -a -t efs,nfs4 defaults; if [ $? = 0 ] || [ $retryCnt -lt 1 ]; then echo File system mounted successfully; break; fi; echo File system not available, retrying to mount.; ((retryCnt--)); sleep $waitTime; done;
EOF

}