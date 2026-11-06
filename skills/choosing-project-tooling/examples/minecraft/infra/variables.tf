variable "state_passphrase" {
  type      = string
  sensitive = true
}
variable "zone_id" {
  type = string
}
variable "domain" {
  type = string
}
variable "vps_plan_code" {
  type        = string
  description = "Confirm live US catalog eligibility, capacity, and monthly noncommitment pricing before an authorized order."
  default     = "vps-comfort-4-8-80"
}
variable "account_id" {
  type = string
}
variable "backup_bucket" {
  type        = string
  description = "Unique private R2 bucket name, dedicated to this world's restic repository."
}
