##############################################################################
# Input Variables
##############################################################################

variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally unique name for the S3 bucket"
  type        = string
  default     = "shopsmart-artifacts-2026"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$", var.bucket_name))
    error_message = "Bucket name must be 3-63 characters, lowercase letters, numbers, hyphens, and periods only."
  }
}

variable "environment" {
  description = "Deployment environment label"
  type        = string
  default     = "dev"
}

# ── Phase 3: ECS Variables ──────────────────────────────────────────────────

variable "ecr_server_repo_name" {
  description = "Name for the server ECR repository"
  type        = string
  default     = "shopsmart-server"
}

variable "ecr_client_repo_name" {
  description = "Name for the client ECR repository"
  type        = string
  default     = "shopsmart-client"
}

variable "ecs_cluster_name" {
  description = "Name for the ECS cluster"
  type        = string
  default     = "shopsmart-cluster"
}

variable "server_image_tag" {
  description = "Docker image tag for the server container"
  type        = string
  default     = "latest"
}

variable "client_image_tag" {
  description = "Docker image tag for the client container"
  type        = string
  default     = "latest"
}
