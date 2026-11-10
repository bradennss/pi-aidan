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

variable "ovh_subsidiary" {
  type        = string
  description = "OVH billing subsidiary matching the account's API endpoint, for example US, GB, or FR."
}

variable "vps_plan" {
  type        = string
  description = "Current OVH VPS plan code from the catalog."
}

variable "vps_datacenter" {
  type        = string
  description = "Datacenter code offered by the selected plan."
}

variable "cloudflare_zone_id" {
  type = string
}

variable "app_host" {
  type        = string
  description = "Fully qualified hostname in the existing Cloudflare zone."
}
