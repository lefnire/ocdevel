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
  main_az = "us-east-1a"
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

