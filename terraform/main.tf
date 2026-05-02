# =============================================================================
# QuickCart — Terraform Configuration
# Provisions AWS infrastructure for ECS Fargate deployment
# =============================================================================

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # -------------------------------------------------------------------------
  # S3 Remote Backend — State is stored in an encrypted, versioned S3 bucket
  # The bucket is created by the CI pipeline before terraform init.
  # -------------------------------------------------------------------------
  backend "s3" {
    bucket         = "quickcart-tfstate-nipun1803"
    key            = "quickcart/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "quickcart-terraform-locks"  
}
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      ManagedBy   = "Terraform"
      Environment = var.environment
    }
  }
}
