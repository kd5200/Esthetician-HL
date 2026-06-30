locals {
  name_prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
  use_custom_domain = length(var.domain_names) > 0 && var.acm_certificate_arn != null
}
