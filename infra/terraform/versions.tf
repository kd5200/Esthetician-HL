terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  # Uncomment after creating a state bucket (see infra/README.md).
  # backend "s3" {
  #   bucket = "YOUR-TF-STATE-BUCKET"
  #   key    = "esthetician-hl/terraform.tfstate"
  #   region = "us-east-1"
  # }
}
