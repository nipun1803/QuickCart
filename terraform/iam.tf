# =============================================================================
# IAM — AWS Academy Compatibility
# =============================================================================

# In AWS Academy Learner Labs, we are not authorized to create IAM roles.
# We must use the pre-created "LabRole" for all services.

data "aws_iam_role" "lab_role" {
  name = "LabRole"
}
