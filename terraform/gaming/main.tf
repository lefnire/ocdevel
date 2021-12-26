# https://aws.amazon.com/blogs/gametech/enabling-quest-2-ar-vr-on-ec2-with-nice-dcv/
# Can't setup EC2 instance by AMI unfortunately

## Keeping in EFS
# terraform {
#   backend "s3" {
#     bucket = "lefnire-private"
#     key    = "gaming/terraform.tfstate"
#     region = "us-west-2"
#     profile = "terraform"
#   }
# }

provider "aws" {
  region  = local.region
  shared_credentials_file = "/home/ec2-user/.aws/credentials"
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
  name = "ocdevel-gaming"
  region = "us-west-2"
  main_az = "us-west-2a"
  tags = {
    app = local.name
    Name = local.name
  }

  tcp = 6
  udp = 17
  myip = "166.70.182.82/32"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = local.name
  cidr = "10.97.0.0/18"

  azs              = ["${local.region}a", "${local.region}b", "${local.region}c"]
  public_subnets   = ["10.97.0.0/24", "10.97.1.0/24", "10.97.2.0/24"]

  tags = local.tags
}

module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = local.name
  description = "Gaming security group (NICE DCV, Remote Desktop, etc)"
  vpc_id      = module.vpc.vpc_id

  egress_rules        = ["all-all"]

  ingress_with_cidr_blocks = [
    {
      rule        = "ssh-tcp"
      cidr_blocks = local.myip
    },
    {
      rule        = "rdp-tcp"
      cidr_blocks = local.myip
    },
    {
      from_port   = 38810
      to_port     = 38840
      protocol    = local.udp
      description = "Virtual Desktop VR"
      cidr_blocks = local.myip
    },
    {
      from_port   = 38810
      to_port     = 38840
      protocol    = local.tcp
      description = "Virtual Desktop VR"
      cidr_blocks = local.myip
    },
    {
      from_port   = 8443
      to_port     = 8443
      protocol    = local.udp
      description = "NiceDCV QUIC"
      cidr_blocks = local.myip
    },
    {
      from_port   = 8443
      to_port     = 8443
      protocol    = local.tcp
      description = "NiceDCV QUIC"
      cidr_blocks = local.myip
    },
  ]

  tags = local.tags
}

