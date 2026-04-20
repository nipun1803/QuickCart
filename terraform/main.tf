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
  # Remote Backend (uncomment for production use)
  # Requires an S3 bucket and DynamoDB table to be created first.
  # -------------------------------------------------------------------------
  # backend "s3" {
  #   bucket         = "quickcart-terraform-state"
  #   key            = "terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "quickcart-terraform-locks"
  #   encrypt        = true
  # }
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
