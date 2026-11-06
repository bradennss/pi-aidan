resource "ovh_vps" "server" {
  display_name   = "minecraft"
  ovh_subsidiary = "US"
  plan = [{
    duration     = "P1M"
    plan_code    = var.vps_plan_code
    pricing_mode = "default"
    configuration = [
      { label = "vps_datacenter", value = "US-EAST-VA" },
      { label = "vps_os", value = "Debian 13" }
    ]
  }]
  lifecycle {
    prevent_destroy = true
  }
}

data "ovh_vps" "server" {
  service_name = ovh_vps.server.name
}

locals {
  ipv4 = one([for ip in data.ovh_vps.server.ips : ip if can(cidrnetmask("${ip}/32"))])
}

resource "cloudflare_dns_record" "game" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "A"
  content = local.ipv4
  ttl     = 300
  proxied = false
}

resource "cloudflare_r2_bucket" "backups" {
  account_id    = var.account_id
  name          = var.backup_bucket
  location      = "enam"
  storage_class = "Standard"
  lifecycle {
    prevent_destroy = true
  }
}
