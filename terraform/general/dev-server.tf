locals {
  gpu = true

  # Instances
  # ami-0192cf25bf5367cc8 - Deep Learning Base AMI (Amazon Linux 2) Version 48.0. 
  # ami-0b331a9baeb8467ca - Deep Learning AMI
  # ami-0ed9277fb7eb570c9 - Amazon Linux basic
  # TODO data.aws_ami to search latest (how do I find AMI names for xx-*-yy?)
  ami = local.gpu ? "ami-0c95d2cdfa25bfd0b" : "ami-08e4e35cccc6189f4"
  instance_type = local.gpu ? "g4dn.2xlarge" : "t3.2xlarge" # m6i.2xlarge
  
  myip = ["${chomp(data.http.myip.body)}/32"]

  # As local so I can print the commands as output, to debug via SSH.
  # Using Amazon Linux 2 AMI (yum) since it was easier to get working with amazon-efs-utils / nfs-utils than Ubuntu
  home="/home/ec2-user"
  ebs_src="/dev/sdh"
  user_data = templatefile("${path.module}/user_data.sh", { 
    home=local.home,
    gpu=local.gpu
    ebs_src=local.ebs_src, 
    ebs_dst="${local.home}/ebs",
    efs_src=aws_efs_file_system.efs.id, 
    efs_dst="${local.home}/efs",
    gnothi_src=data.aws_efs_file_system.gnothi.id, 
    gnothi_dst="${local.home}/gnothi"
  })
}

data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

resource "aws_security_group" "ec2" {
  name        = "${local.name}-ec2"
  description = "${local.name} dev SG - ssh, web"
  vpc_id      = module.vpc.vpc_id
  tags = local.tags

  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = local.myip
  }
  ingress {
    description = "Web from VPC"
    from_port   = 80
    to_port     = 80
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


resource "aws_security_group" "efs" {
  name        = "${local.name}-efs"
  description = "${local.name} dev SG - efs"
  vpc_id      = module.vpc.vpc_id
  tags = local.tags

  ingress {
    description = "EFS mount target"
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    security_groups = [aws_security_group.ec2.id]
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
  security_groups = [aws_security_group.efs.id]
}

# EFS setup: https://github.com/Apeksh742/EFS_with_terraform/blob/master/main.tf
module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = local.name
  ami = local.ami
  instance_type = local.instance_type

  key_name = "aws-general"
  availability_zone           = local.main_az
  subnet_id                   = element(module.vpc.public_subnets, 0)
  vpc_security_group_ids      = [aws_security_group.ec2.id]
  associate_public_ip_address = true
  iam_instance_profile = aws_iam_instance_profile.ec2.name

  # create_spot_instance = true
  # spot_price = "0.5"
  # spot_wait_for_fulfillment = true
  # spot_instance_interruption_behavior	= "terminate"
  # spot_type = "one-time"

  tags = local.tags

  user_data = local.user_data

  root_block_device = [
    {
      encrypted   = true
      volume_type = "gp3"
      volume_size = 64
      delete_on_termination = true

      # iops                  = lookup(root_block_device.value, "iops", null)
      # kms_key_id            = lookup(root_block_device.value, "kms_key_id", null)
      # throughput            = lookup(root_block_device.value, "throughput", null)
      # tags                  = lookup(root_block_device.value, "tags", null)
    },
  ]
}

resource "aws_volume_attachment" "this" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.this.id
  instance_id = module.ec2_instance.id
  stop_instance_before_detaching = true
}

resource "aws_ebs_volume" "this" {
  availability_zone = local.main_az
  size              = 30
  encrypted = true
  type = "gp3"
  tags = local.tags
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