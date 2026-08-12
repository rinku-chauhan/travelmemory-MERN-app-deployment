data "aws_ami" "ubuntu" {

  most_recent = true

  owners = ["099720109477"]

  filter {
    name = "name"

    values = [
      "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
    ]
  }

  filter {
    name = "virtualization-type"

    values = ["hvm"]
  }
}

resource "tls_private_key" "ssh_key" {

  algorithm = "RSA"

  rsa_bits = 4096
}

resource "local_sensitive_file" "private_key" {

  filename = "${path.root}/generated/generated-key.pem"

  content = tls_private_key.ssh_key.private_key_pem

  file_permission = "0400"
}

resource "aws_key_pair" "generated" {

  key_name = "${var.project_name}-key"

  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "aws_instance" "web" {

  ami = data.aws_ami.ubuntu.id

  instance_type = "t3.micro"

  subnet_id = var.public_subnet_id

  vpc_security_group_ids = [
    var.web_sg_id
  ]

  key_name = aws_key_pair.generated.key_name

  iam_instance_profile = var.instance_profile

  associate_public_ip_address = true

  metadata_options {

    http_tokens = "required"
  }

  root_block_device {

    encrypted = true

    volume_size = 20
  }

  tags = {

    Name = "${var.project_name}-web"
  }
}

resource "aws_instance" "database" {

  ami = data.aws_ami.ubuntu.id

  instance_type = "t3.micro"

  subnet_id = var.private_subnet_id

  vpc_security_group_ids = [
    var.db_sg_id
  ]

  key_name = aws_key_pair.generated.key_name

  iam_instance_profile = var.instance_profile

  metadata_options {

    http_tokens = "required"
  }

  root_block_device {

    encrypted = true

    volume_size = 20
  }

  tags = {

    Name = "${var.project_name}-db"
  }
}