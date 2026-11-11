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
  backend "local" {
    path = "states/${var.environment}.tfstate"
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

data "ovh_vps" "host" {
  service_name = var.vps_service_name
}

locals {
  ipv4 = one([for ip in data.ovh_vps.host.ips : ip if can(cidrnetmask("${ip}/32"))])
  dns_hosts = {
    api = var.api_host
    web = var.web_host
  }
}

resource "random_password" "runtime" {
  for_each = toset(["postgres", "app", "api_token"])
  length   = 64
  special  = false
}

resource "cloudflare_dns_record" "app" {
  for_each = local.dns_hosts
  zone_id  = var.cloudflare_zone_id
  name     = each.value
  type     = "A"
  content  = local.ipv4
  ttl      = 1
  proxied  = true
}

output "runtime" {
  sensitive = true
  value = {
    host              = var.api_host
    web_host          = var.web_host
    postgres_password = random_password.runtime["postgres"].result
    app_db_password   = random_password.runtime["app"].result
    api_token         = random_password.runtime["api_token"].result
    database_url      = "postgres://notes:${random_password.runtime["app"].result}@notes-api-${var.environment}-db:5432/notes"
  }
}

output "vps_ip" {
  value = local.ipv4
}

output "vps_service_name" {
  value = var.vps_service_name
}
