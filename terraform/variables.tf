variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name used for tagging resources"
  type        = string
  default     = "mern-terraform-ansible-deployment"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "Learning"
}

variable "owner" {
  description = "Owner of the infrastructure"
  type        = string
  default     = "Rinku Chauhan"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for Public Subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for Private Subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "availability_zone" {
  description = "Availability Zone"
  type        = string
  default     = "ap-south-1a"
}

variable "my_public_ip" {
  description = "Public IP allowed to SSH"
  type        = string
}