variable "environment" {
  type = string
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Choose staging or production."
  }
}

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
  description = "Service name of an existing Debian 13 VPS. Environments may use the same VPS."
  validation {
    condition     = length(trimspace(var.vps_service_name)) > 0
    error_message = "Provide the OVH service name of the target Debian 13 VPS."
  }
}

variable "vps_public_key" {
  type        = string
  description = "Public key installed by Ansible for this environment's deployment user."
  validation {
    condition     = startswith(var.vps_public_key, "ssh-ed25519 ")
    error_message = "Provide the public key matching this environment's Ed25519 deployment key."
  }
}

variable "cloudflare_zone_id" {
  type = string
}

variable "api_host" {
  type = string
}

variable "web_host" {
  type = string
  validation {
    condition     = var.web_host != var.api_host
    error_message = "API and web apps must use different hostnames."
  }
}
