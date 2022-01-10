resource "aws_iam_role" "ec2" {
  name = "${local.name}-ec2"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  tags = local.tags
}

resource "aws_iam_instance_profile" "ec2" {
  name = "${local.name}-ec2"
  role = "${aws_iam_role.ec2.name}"
  tags = local.tags
}

resource "aws_iam_role_policy" "ec2" {
  name = "${local.name}-ec2"
  role = aws_iam_role.ec2.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}