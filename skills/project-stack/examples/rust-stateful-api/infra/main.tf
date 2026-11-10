terraform {
  required_version = ">= 1.11, < 2.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.7.2"
    }
    ovh = {
      source  = "ovh/ovh"
      version = "2.9.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.8.2"
    }
  }
  # Commit only encrypted state; keep the passphrase recoverable outside Git.
  backend "local" {
    path = "terraform.tfstate"
  }
  encryption {
    key_provider "pbkdf2" "repo" {
      passphrase = var.state_passphrase
    }
    method "aes_gcm" "repo" {
      keys = key_provider.pbkdf2.repo
    }
    state {
      method   = method.aes_gcm.repo
      enforced = true
    }
    plan {
      method   = method.aes_gcm.repo
      enforced = true
    }
  }
}

provider "ovh" {
  endpoint = var.ovh_endpoint
}
provider "cloudflare" {}

resource "ovh_vps" "api" {
  display_name   = "notes-api"
  ovh_subsidiary = var.ovh_subsidiary
  plan = [{
    duration     = "P1M"
    plan_code    = var.vps_plan
    pricing_mode = "default"
    configuration = [
      { label = "vps_datacenter", value = var.vps_datacenter },
      { label = "vps_os", value = "Debian 13" }
    ]
  }]
  # OVH cannot discover the image UUID until the service exists. Install the
  # initial SSH key via the OVH panel, then let Ansible manage deploy keys.
  # Ordering requires an OVH payment method; apply incurs real charges.
  lifecycle {
    prevent_destroy = true
  }
}

data "ovh_vps" "api" {
  service_name = ovh_vps.api.name
}

locals {
  ipv4 = one([for ip in data.ovh_vps.api.ips : ip if can(cidrnetmask("${ip}/32"))])
}

# Generated once and retained in encrypted state, not regenerated per deployment.
# Replacing a DB password also requires updating the live PostgreSQL role.
resource "random_password" "runtime" {
  for_each = toset(["postgres", "app", "api_token"])
  length   = 64
  special  = false
}

resource "cloudflare_dns_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = var.app_host
  type    = "A"
  content = local.ipv4
  ttl     = 1
  # The origin only accepts web traffic from Cloudflare.
  proxied = true
}

resource "cloudflare_zone_setting" "security" {
  for_each = {
    ssl             = "strict"
    min_tls_version = "1.2"
    # Kamal redirects HTTP except ACME challenges; an edge redirect can break issuance.
    always_use_https = "off"
  }
  zone_id    = var.cloudflare_zone_id
  setting_id = each.key
  value      = each.value
}

output "app_host" {
  value = var.app_host
}

# Alphanumeric passwords need no URL escaping and satisfy API token validation.
output "postgres_password" {
  value     = random_password.runtime["postgres"].result
  sensitive = true
}

output "app_db_password" {
  value     = random_password.runtime["app"].result
  sensitive = true
}

output "api_token" {
  value     = random_password.runtime["api_token"].result
  sensitive = true
}

output "database_url" {
  value     = "postgres://notes:${random_password.runtime["app"].result}@notes-api-db:5432/notes"
  sensitive = true
}

output "vps_ip" {
  value = local.ipv4
}

output "vps_service_name" {
  value = ovh_vps.api.name
}
