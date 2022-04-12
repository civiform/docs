# Azure Deployment via Terraform

## TLDR

We use terraform to deploy Azure. We made the choice to use [Terraform](https://www.terraform.io/intro) to make deploys replicable, versionable and simpler. Cd into `cloud/azure` directory and run a `terraform init` and then `terraform validate` to confirm the config is correct and `terraform plan` to see what will be generated with the command. If you are happy with what would be generated you can run `terraform apply` and it will go through your terraform file and create the infrastructure you've specified. Below is a more detailed background for this process (including how to login to azure, what pieces of the terraform file mean, etc)

## Terraform Overview

Terraform is 'infrastructure as code' and it is agnostic to cloud provider. The very very basics of terraform are: providers, resources, and variables. Providers are like libraries you can use the providers have online documentation (here is the link for the azure terraform provider [azurerm](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs). Resources are defined by the provider and are things you can provision with terraform (e.g `azurerm_virtual_network`). Both our provider and resources live in [main.tf](https://github.com/seattle-uat/civiform/blob/main/cloud/azure/main.tf).Variables are defined in [variables.tf](https://github.com/seattle-uat/civiform/blob/main/cloud/azure/variables.tf) and can be set with defaults. In order to keep secrets out of version control terraform has a pattern of having a '.tfvars' file that has specific values set (see [example.auto.tfvars](https://github.com/seattle-uat/civiform/blob/main/cloud/azure/example.auto.tfvars))

### Terraform Azure Overview

Terraform's Azure provider is called [azurerm](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs). If you are curious for a more in depth tutorial the terraform website includes an [azure specific walkthrough](https://learn.hashicorp.com/tutorials/terraform/infrastructure-as-code?in=terraform/azure-get-started).

### Step by Step

1. Install terraform

```
$ brew tap hashicorp/tap
$ brew install hashicorp/tap/terraform
```

1. Alias terraform to tf and init terraform

```
$ alias tf='terraform'
$ tf init
```

1. Log into Azure via the cli (only need to brew install once)

```
$ brew update && brew install azure-cli
$ az login
```

1. Change into the azure terraform directory

```
cd cloud/azure
```

1. Create a .tfvars file for your specific set up Make a copy of [example.auto.tfvars](https://github.com/seattle-uat/civiform/blob/main/cloud/azure/example.auto.tfvars) which will contain your deployments specific code that will not be checked into source control. If you do not do this you can still run the terraform commands it will just prompt you via the command line to enter in all the unset variables. Note that I'm not sure if the docker user and the docker repo name are super easy to find, but ask someone on the civiform team and they will be able to help you with this.
2. Validate your configuration

```
$ tf validate
```

1. Show the plan of what will be applied and confirm it is correct. Note here that if the code is not using a shared .tfstate the plan will not be shared among all people deploying code and could lead to conflicts. To set up shared state in azure follow the instructions [here](https://docs.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage?tabs=azure-cli)

```
$ tf plan
```

1. Deploy the code to terraform After confirming that the changes are good to go.

```
$ tf apply
```

1. Check the URL created by terraform which should allow you to access civiform

### What choices were made in the terraform config

(TBD)
