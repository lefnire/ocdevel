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

data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  name = "ocdevel-general"
  region = "us-east-1"
  main_az = "us-east-1a"
  mount_path = "/home/ec2-user/efs"
  myip = ["${chomp(data.http.myip.body)}/32"]
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

  # These 3 required for dns-resolution of EFS mount URL. https://bit.ly/33v239F , https://github.com/aws/efs-utils/issues/21
  enable_dns_hostnames = true
  enable_dns_support   = true
  # At least this definitely is, but the above 2 seemed required too? (Don't move a muscle!)
  enable_dhcp_options = true

  tags = local.tags
}

resource "aws_security_group" "sg_ec2" {
  name        = "${local.name}-sg-ec2"
  description = "${local.name} dev SG (ssh)"
  vpc_id      = module.vpc.vpc_id
  tags = local.tags

  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = local.myip
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_security_group" "sg_efs" {
  name        = "${local.name}-sg-efs"
  description = "${local.name} dev SG (efs)"
  vpc_id      = module.vpc.vpc_id
  tags = local.tags

  ingress {
    description = "EFS mount target"
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    security_groups = [aws_security_group.sg_ec2.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_efs_file_system" "efs" {
  creation_token = "${local.name}-efs"
  encrypted = true
  tags = local.tags
}

resource "aws_efs_mount_target" "mount" {
  file_system_id = aws_efs_file_system.efs.id
  subnet_id      = element(module.vpc.private_subnets, 0)  
  security_groups = [aws_security_group.sg_efs.id]
}

locals {
  # As local so I can print the commands as output, to debug via SSH.
  # Using Amazon Linux 2 AMI (yum) since it was easier to get working with amazon-efs-utils / nfs-utils than Ubuntu
  user_data = <<EOF
#!/bin/bash
yum install amazon-efs-utils -y
mkdir -p ${local.mount_path}
mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport ${aws_efs_file_system.efs.dns_name}:/ ${local.mount_path}
echo ${aws_efs_file_system.efs.dns_name}:/ ${local.mount_path} nfs4 defaults,_netdev 0 0  | cat >> /etc/fstab
chmod go+rw ${local.mount_path}

yum update -y && yum upgrade -y && reboot now
EOF
}

# EFS setup: https://github.com/Apeksh742/EFS_with_terraform/blob/master/main.tf
module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = local.name

  ami                    = "ami-0ed9277fb7eb570c9"
  instance_type          = "t2.medium"
  key_name = "aws-general"
  availability_zone           = local.main_az
  subnet_id                   = element(module.vpc.public_subnets, 0)
  vpc_security_group_ids      = [aws_security_group.sg_ec2.id]
  associate_public_ip_address = true

  tags = local.tags

  user_data = local.user_data
}

resource "aws_eip" "eip" {
  instance = module.ec2_instance.id
  vpc      = true
}

output "ec2_ip" {
  value = "ssh -i ~/.ssh/aws-general.pem ec2-user@${aws_eip.eip.public_ip}"
}

output "efs_dns" {
  value = local.user_data
}