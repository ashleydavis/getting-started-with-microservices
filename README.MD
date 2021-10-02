# Getting started with Microservices

Example code created during live coding at my talk "Getting Started with Microservices" at London Code Skill Buddy.

[You can watch the video here](https://youtu.be/G2EfOAoNEfY)

[Click here for the slides](https://www.slideshare.net/AshleyDavis33/getting-started-with-microservices-249514243)

Please read the code, it is well commented! 

Learn more about microservices with my book [Bootstrapping Microservices](http://bit.ly/2o0aDsP).

If you like this project, please star this repo and [support my work](https://www.codecapers.com.au/about#support-my-work)

Follow the instructions below to get it running for yourself.

# Run it in development

While developing code you need to be able to run it and test it on your development computer.

## Pre requisites

To run the microservice in this code repo directly on your computer you need to have [Node.js](https://nodejs.org/) installed. 

## Run it

Before running the code, install dependnencies:

```bash
cd getting-started-with-microservices
npm install
```

Now run it like this:

```
npm start
```

# Run it in production

You can use the configuration included in this code repo to deploy the microservice to your own Kubernetes cluster.

## Pre requisites

The configuration here is designed to work with [Digital Ocean](https://www.digitalocean.com/) (DO), so you'll need an account with DO.

If you understand a bit about AWS, Azure or GCP you can also get this code working in those cloud vendors.

To build and publish the image for the microservice you need to have [Docker](https://www.docker.com/products/docker-desktop) installed. 

You need a container registry to which you can publish the image for the microservice (create this on DO).

Search for `<your-repository>` in this code repo and replace it with the name of your registry on DO.

To deploy to Kubernetes you need to have [Kubectl](https://kubernetes.io/docs/tasks/tools/) installed.

You need a Kubernetes cluster to which you can deploy your microservice (create this on DO).

You need to create a Digital Ocean API key so you can authenticate to publish the image to your container registry and deploy the container to your cluster.

Make sure you connect your container registry and Kubernetes cluster in the DO dashboard (on the container registry page) so that you don't need image pull secrets to deploy containers to your cluster from your registry (this just keeps things simpler when you are using DO).

If you want to deploy using [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) you also need that installed. The configuration in this repo works with Terraform v0.15.3 which is a bit out of date now but I haven't had time to update and test it yet.


## Build and publish the Docker image

### Build your image and tag it with your registry details:

```bash
cd getting-started-with-microservices
docker build -t registry.digitalocean.com/<your-repository>/hello-world:1 .
```

Replace `<your-repository>` with the name of your repository in your container registry.

### Login to your container registry:

#### Windows

```bash
set DO_TOKEN=<your-DO-api-key>
echo -n %DO_TOKEN% | docker login registry.digitalocean.com --username %DO_TOKEN% --password-stdin
```

#### MacOS / Linux

```bash
export DO_TOKEN=<your-DO-api-key>
echo -n $DO_TOKEN | docker login registry.digitalocean.com --username $DO_TOKEN --password-stdin
```

### Publish your image to your container registry:

```bash
docker push registry.digitalocean.com/<your-repository>/hello-world:1
```

Replace `<your-repository>` with the name of your repository in your container registry.

## Deploy to Kubernetes with Kubectl

Now you can deploy two ways, either with Kubectl or Terraform.

Don't forget to edit your configuration file and replace `<your-repository>` with the name of your repository in your container registry.

Here's how to deploy your microservice with Kubectl and a simple Yaml file:

```bash
cd getting-started-with-microservices/deployment/kubectl
kubectl apply -f deploy.yaml
```

You can delete your microservice deployment like this:

```bash
kubectl delete -f deploy.yaml
```

## Deploy to Kubernetes with Terraform

The other way to deploy is using Terraform. Kubectl + simple Yaml does the job, but Terraform supports templating, variables, programming constructs and Terraform is bascially just smarter than Kubectl.

Before doing the first deployment you need to initialize:

```bash
cd getting-started-with-microservices/deployment/terraform
terraform init
```

Don't forget to edit your configuration file and replace `<your-repository>` with the name of your repository in your container registry.

Now do the deployment:

```bash
terraform apply
```

Answer the questions that come up (you'll need your DO API key and the name of your cluster).

You can delete your microservice deployment like this:

```bash
terraform destroy
```


