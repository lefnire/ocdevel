data "aws_caller_identity" "current" {}

data "aws_vpc" "gnothi" {
  filter {
    name = "tag:Name"
    values = ["gnothi-dev"]
  }
}

resource "aws_vpc_peering_connection" "gnothi" {
  peer_owner_id = data.aws_caller_identity.current.account_id
  peer_vpc_id   = data.aws_vpc.gnothi.id
  vpc_id        = module.vpc.vpc_id
  auto_accept   = true
}

# https://docs.aws.amazon.com/efs/latest/ug/efs-different-vpc.html
# I didn't seeem to need /etc/hosts, IAM, etc?
data "aws_efs_file_system" "gnothi" {
  tags = {
    Name = "gnothi-dev"
  }
}

resource "aws_efs_mount_target" "gnothi" {
  file_system_id = data.aws_efs_file_system.gnothi.id
  subnet_id      = element(module.vpc.private_subnets, 0)  
  security_groups = [aws_security_group.efs.id]
}
