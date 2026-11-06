output "ipv4" {
  value = local.ipv4
}
output "inventory" {
  value = {
    all = {
      hosts = {
        app = {
          ansible_host = local.ipv4
          ansible_user = "deploy"
        }
      }
    }
  }
}
