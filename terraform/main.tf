module "networking" {
  source = "./modules/networking"

  project_name        = var.project_name
  vpc_cidr            = var.vpc_cidr
  public_subnet_cidr  = var.public_subnet_cidr
  private_subnet_cidr = var.private_subnet_cidr
  availability_zone   = var.availability_zone
}

module "security" {
  source = "./modules/security"

  project_name = var.project_name
  vpc_id       = module.networking.vpc_id
  my_public_ip = var.my_public_ip
}

module "iam" {
  source = "./modules/iam"

  project_name = var.project_name
}

module "compute" {
  source = "./modules/compute"

  project_name      = var.project_name
  public_subnet_id  = module.networking.public_subnet_id
  private_subnet_id = module.networking.private_subnet_id

  web_sg_id = module.security.web_sg_id
  db_sg_id  = module.security.db_sg_id

  instance_profile = module.iam.instance_profile_name
}