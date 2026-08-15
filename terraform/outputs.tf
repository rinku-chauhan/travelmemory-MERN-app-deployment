output "vpc_id" {
  value = module.networking.vpc_id
}

output "public_subnet_id" {
  value = module.networking.public_subnet_id
}

output "private_subnet_id" {
  value = module.networking.private_subnet_id
}

output "internet_gateway_id" {
  value = module.networking.internet_gateway_id
}

output "nat_gateway_id" {
  value = module.networking.nat_gateway_id
}

output "web_public_ip" {
  value = module.compute.web_public_ip
}

output "web_private_ip" {
  value = module.compute.web_private_ip
}

output "db_private_ip" {
  value = module.compute.db_private_ip
}