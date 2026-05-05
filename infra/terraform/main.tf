##############################################################################
# Terraform – ShopSmart S3 Infrastructure
# Provisions a private, versioned, encrypted S3 bucket for the project.
##############################################################################

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# ── Provider ────────────────────────────────────────────────────────────────
provider "aws" {
  region = var.aws_region
}

# ── S3 Bucket ───────────────────────────────────────────────────────────────
resource "aws_s3_bucket" "shopsmart" {
  bucket = var.bucket_name

  tags = {
    Project     = "ShopSmart"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = false
    ignore_changes  = [tags]
  }
}

# ── Versioning ──────────────────────────────────────────────────────────────
resource "aws_s3_bucket_versioning" "shopsmart" {
  bucket = aws_s3_bucket.shopsmart.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ── Server-Side Encryption (AES-256) ───────────────────────────────────────
resource "aws_s3_bucket_server_side_encryption_configuration" "shopsmart" {
  bucket = aws_s3_bucket.shopsmart.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# ── Block ALL Public Access ─────────────────────────────────────────────────
resource "aws_s3_bucket_public_access_block" "shopsmart" {
  bucket = aws_s3_bucket.shopsmart.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
