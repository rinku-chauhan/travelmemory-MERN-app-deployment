resource "aws_security_group" "web" {

  name   = "${var.project_name}-web-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_public_ip]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-web-sg"
  }
}

resource "aws_security_group" "db" {

  name   = "${var.project_name}-db-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "MongoDB from Web Server"
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"

    security_groups = [
      aws_security_group.web.id
    ]
  }

  ingress {
    description = "SSH from Web Server"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"

    security_groups = [
      aws_security_group.web.id
    ]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-db-sg"
  }
}