output "web_sg_id" {
  description = "Web Security Group ID"
  value       = aws_security_group.web.id
}

output "db_sg_id" {
  description = "Database Security Group ID"
  value       = aws_security_group.db.id
}