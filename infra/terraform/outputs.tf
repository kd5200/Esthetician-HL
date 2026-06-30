output "s3_bucket_name" {
  description = "S3 bucket for static site assets."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront URL — use until custom domain is wired."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "site_url" {
  description = "HTTPS URL for the deployed site."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "github_deploy_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC deploy."
  value       = var.enable_github_deploy_role ? aws_iam_role.github_deploy[0].arn : null
}
