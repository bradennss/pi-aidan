output "ipv4" {
  value = local.ipv4
}
output "inventory" {
  value = {
    all = {
      hosts = {
        minecraft = {
          ansible_host = local.ipv4
          ansible_user = "deploy"
        }
      }
    }
  }
}
output "backup_repository" {
  value = "s3:https://${var.account_id}.r2.cloudflarestorage.com/${cloudflare_r2_bucket.backups.name}/minecraft"
}
