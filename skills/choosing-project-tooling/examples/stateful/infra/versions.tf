terraform {
  required_version = "= 1.13.8"
  required_providers {
    ovh = {
      source  = "ovh/ovh"
      version = "2.24.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.28.1"
    }
  }
  backend "local" {
    path = "production.tfstate"
  }
}
