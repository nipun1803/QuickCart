# =============================================================================
# QuickCart — S3 Bucket (Terraform-managed)
# Rubric: Unique name, versioning enabled, encryption enabled, public access blocked
# =============================================================================

resource "aws_s3_bucket" "app_storage" {
  bucket        = "${var.project_name}-storage-nipun1803"
  force_destroy = true

  tags = {
    Name      = "${var.project_name}-storage"
    Component = "storage"
  }
}

# Versioning
resource "aws_s3_bucket_versioning" "app_storage" {
  bucket = aws_s3_bucket.app_storage.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption (AES-256)
resource "aws_s3_bucket_server_side_encryption_configuration" "app_storage" {
  bucket = aws_s3_bucket.app_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# Block ALL public access
resource "aws_s3_bucket_public_access_block" "app_storage" {
  bucket = aws_s3_bucket.app_storage.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}