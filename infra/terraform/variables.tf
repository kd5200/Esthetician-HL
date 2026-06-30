variable "project_name" {
  description = "Short project slug used in resource names."
  type        = string
  default     = "hajime-lente-skin-studio"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region for S3 and supporting resources. CloudFront is global."
  type        = string
  default     = "us-east-1"
}

variable "domain_names" {
  description = "Optional custom domain aliases for CloudFront (e.g. hajimelente.com)."
  type        = list(string)
  default     = []
}

variable "acm_certificate_arn" {
  description = "Optional ACM cert ARN in us-east-1 for HTTPS on custom domains."
  type        = string
  default     = null
}

variable "github_repository" {
  description = "GitHub repo (org/name) allowed to assume the deploy role via OIDC."
  type        = string
  default     = "kd5200/Esthetician-HL"
}

variable "enable_github_deploy_role" {
  description = "Create IAM role for GitHub Actions OIDC deploy."
  type        = bool
  default     = true
}
