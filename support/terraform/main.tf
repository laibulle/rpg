terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 2.0"
    }
  }
}

provider "cloudflare" {
  email   = "xxxxx"
  api_key = "xxxxxxxx"
}

provider "openstack" {
  auth_url    = "https://auth.cloud.ovh.net/v3"
  domain_name = "default"
  alias       = "ovh"
}

#resource "openstack_networking_floatingip_v2" "floatip_1" {
#  pool = "public"
#}

data "openstack_images_image_v2" "web" {
  name        = "trenr-web-production"
  most_recent = true
}

resource "openstack_compute_keypair_v2" "test_keypair" {
  provider   = openstack.ovh
  name       = "test_keypair"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "openstack_compute_volume_attach_v2" "va_1" {
  instance_id = openstack_compute_instance_v2.backend_1.id
  volume_id   = openstack_blockstorage_volume_v3.volume_backend_data_production.id
}

resource "openstack_compute_instance_v2" "web_1" {
  name        = "web_production"
  provider    = openstack.ovh
  image_id    = data.openstack_images_image_v2.web.id
  flavor_name = "s1-2"
  key_pair    = openstack_compute_keypair_v2.test_keypair.name
  network {
    name = "Ext-Net"
  }

  connection {
    type        = "ssh"
    host        = self.network.0.fixed_ip_v4
    user        = "ubuntu"
    private_key = file("~/.ssh/id_rsa")
  }

  provisioner "remote-exec" {
    inline = [
      "echo '${openstack_compute_instance_v2.backend_1.network.0.fixed_ip_v4} postgres' | sudo tee -a /etc/hosts",
    ]
  }
}

data "cloudflare_zones" "rpg_laibulle_dev" {
  filter {
    name = "rpg.laibulle.dev"
  }
}

# Add a record to the domain
resource "cloudflare_record" "root" {
  zone_id = data.cloudflare_zones.rpg_laibulle_dev.zones[0].id
  name    = "rpg.laibulle.dev"
  value   = openstack_compute_instance_v2.web_1.network.0.fixed_ip_v4
  type    = "A"
  ttl     = 3600
}
