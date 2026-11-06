variable "state_passphrase" {
  type      = string
  sensitive = true
}
variable "fail" {
  type    = bool
  default = false
}
resource "terraform_data" "changed" {
  input = sensitive("local-state-rehearsal-sensitive-marker")
}
resource "terraform_data" "later" {
  depends_on       = [terraform_data.changed]
  triggers_replace = var.fail
  provisioner "local-exec" {
    command = var.fail ? "exit 1" : "true"
  }
}
