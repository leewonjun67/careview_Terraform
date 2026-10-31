variable "db_username" {

  description = "RDS master username"
  type        = string
}


variable "db_password" {

  description = "RDS master password"
  type        = string
  sensitive   = true

}

variable "backend_secret_name" {

  description = "Secrets Manager secret name for backend"
  type        = string

}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
}
