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

import {
  to = ovh_vps.api
  id = var.vps_service_name
}

resource "ovh_vps" "api" {
  display_name   = "notes-api"
  image_id       = var.vps_image_id
  public_ssh_key = var.vps_public_key
  plan           = []
  lifecycle {
    prevent_destroy = true
  }
}

data "ovh_vps" "api" {
  service_name = ovh_vps.api.name
}

locals {
  ipv4 = one([for ip in data.ovh_vps.api.ips : ip if can(cidrnetmask("${ip}/32"))])
  environments = {
    staging    = var.staging_host
    production = var.production_host
  }
  credentials = setproduct(keys(local.environments), ["postgres", "app", "api_token"])
}

resource "random_password" "runtime" {
  for_each = { for pair in local.credentials : "${pair[0]}_${pair[1]}" => pair }
  length   = 64
  special  = false
}

resource "cloudflare_dns_record" "api" {
  for_each = local.environments
  zone_id  = var.cloudflare_zone_id
  name     = each.value
  type     = "A"
  content  = local.ipv4
  ttl      = 1
  proxied  = true
}

resource "cloudflare_zone_setting" "security" {
  for_each = {
    ssl              = "strict"
    min_tls_version  = "1.2"
    always_use_https = "off"
  }
  zone_id    = var.cloudflare_zone_id
  setting_id = each.key
  value      = each.value
}

output "runtime" {
  sensitive = true
  value = {
    for environment, host in local.environments : environment => {
      host              = host
      postgres_password = random_password.runtime["${environment}_postgres"].result
      app_db_password   = random_password.runtime["${environment}_app"].result
      api_token         = random_password.runtime["${environment}_api_token"].result
      database_url      = "postgres://notes:${random_password.runtime["${environment}_app"].result}@notes-api-${environment}-db:5432/notes"
    }
  }
}

output "vps_ip" {
  value = local.ipv4
}

output "vps_service_name" {
  value = ovh_vps.api.name
}
