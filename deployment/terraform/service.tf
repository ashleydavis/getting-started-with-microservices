#
# Terraform file to deploy a service to Kubernetes.
#
# Please see the file variables.tf to see what variables you must provide allow this to work.
#

resource "kubernetes_deployment" "hello_world_deployment" {
  metadata {
    name = "hello-world"

    labels = {
      pod = "hello-world"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        pod = "hello-world"
      }
    }

    template {
      metadata {
        labels = {
          pod = "hello-world"
        }
      }

      spec {
        container {
          image = "registry.digitalocean.com/<your-reposiitory>/hello-world:1"
          name  = "hello-world"

          env {
              name = "NODE_ENV"
              value = "production"
          }

        }
      }
    }
  }
}

resource "kubernetes_service" "hello_world_service" {
    metadata {
        name = "hello-world"
    }

    spec {
        selector = {
            pod = kubernetes_deployment.hello_world_deployment.metadata[0].labels.pod
        }   

        port {
            port        = 80
            target_port = 3000
        }

        type = "LoadBalancer"
    }
}
