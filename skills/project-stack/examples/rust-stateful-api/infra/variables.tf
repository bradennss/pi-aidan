variable "state_passphrase" {
  type      = string
  sensitive = true
  validation {
    condition     = length(var.state_passphrase) >= 32
    error_message = "Use a random state passphrase of at least 32 characters, stored outside Git."
  }
}

variable "ovh_endpoint" {
  type        = string
  description = "OVH API endpoint for the account."
  default     = "ovh-us"
}

variable "vps_service_name" {
  type        = string
  description = "Service name of an existing, dedicated OVH VPS, for example vps-123456.ovh.net."
  validation {
    condition     = length(trimspace(var.vps_service_name)) > 0
    error_message = "Create the VPS first and provide its OVH service name."
  }
}

variable "vps_image_id" {
  type        = string
  description = "Debian 13 image UUID available for this VPS. Changing it reinstalls the VPS and erases its data."
  validation {
    condition     = can(regex("^[a-fA-F0-9-]{36}$", var.vps_image_id))
    error_message = "Provide the Debian 13 image UUID from the existing VPS's available images."
  }
}

variable "vps_public_key" {
  type        = string
  description = "CI deployment public SSH key. Changing it reinstalls the VPS and erases its data."
  validation {
    condition     = startswith(var.vps_public_key, "ssh-ed25519 ")
    error_message = "Provide the public key derived from the CI Ed25519 deployment key."
  }
}

variable "cloudflare_zone_id" {
  type = string
}

variable "staging_host" {
  type = string
}

variable "production_host" {
  type = string
  validation {
    condition     = var.production_host != var.staging_host
    error_message = "Staging and production must use different hostnames."
  }
}
