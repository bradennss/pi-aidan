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
  default     = "vps-essential-2-4-40"
}
