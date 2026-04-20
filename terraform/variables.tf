# =============================================================================
# Input Variables
# =============================================================================

# --- General ---

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "quickcart"
}

variable "environment" {
  description = "Deployment environment (dev, staging, production)"
  type        = string
  default     = "production"
}

# --- Container Images ---

variable "backend_image_tag" {
  description = "Docker image tag for the backend container"
  type        = string
  default     = "latest"
}

variable "frontend_image_tag" {
  description = "Docker image tag for the frontend container"
  type        = string
  default     = "latest"
}

# --- Container Resources ---

variable "backend_port" {
  description = "Port the backend container listens on"
  type        = number
  default     = 5001
}

variable "frontend_port" {
  description = "Port the frontend container listens on"
  type        = number
  default     = 80
}

variable "backend_cpu" {
  description = "CPU units for the backend task (1 vCPU = 1024)"
  type        = number
  default     = 256
}

variable "backend_memory" {
  description = "Memory (MiB) for the backend task"
  type        = number
  default     = 512
}

variable "frontend_cpu" {
  description = "CPU units for the frontend task (1 vCPU = 1024)"
  type        = number
  default     = 256
}

variable "frontend_memory" {
  description = "Memory (MiB) for the frontend task"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of desired running tasks per service"
  type        = number
  default     = 1
}

# --- Backend Environment Variables ---

variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
  default     = ""
}

variable "session_secret" {
  description = "Express session secret"
  type        = string
  sensitive   = true
  default     = ""
}

variable "cloudinary_cloud_name" {
  description = "Cloudinary cloud name for image uploads"
  type        = string
  default     = ""
}

variable "cloudinary_api_key" {
  description = "Cloudinary API key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "cloudinary_api_secret" {
  description = "Cloudinary API secret"
  type        = string
  sensitive   = true
  default     = ""
}

variable "google_client_id" {
  description = "Google OAuth client ID"
  type        = string
  default     = ""
}

variable "google_client_secret" {
  description = "Google OAuth client secret"
  type        = string
  sensitive   = true
  default     = ""
}
