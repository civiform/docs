# Terraform deploy system

Terraform is an infrastructure-as-code tool that allows you to define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share. CiviForm provides Terraform configuration files that allow you to deploy CiviForm on AWS. Knowledge of Terraform is not required to run them, but reading the high-level [Terraform overview](https://www.terraform.io/intro) may be useful.

More detailed information on our deploy system can be found in our [developer docs](https://github.com/civiform/civiform/wiki/Deploy-System).

## Setup

### Outside configuration

You will need some values that are configured outside of CiviForm before you start the setup. Some of the steps are optional, meaning that you can bring up a staging environment and get the app working without them, but they will need to be completed for production setup.
* (Optional) Admin auth client_id, client_secret, and discovery_uri. See [setting up Azure AD for an example](#setting-up-azure-a-d)
* (Optional) Applicant auth client_id, client_secret, and discovery_uri. See setting up the [Authentication Providers](https://github.com/civiform/civiform/wiki/Authentication-Providers)
* Domain name for your deployment. For example `civiform.mycity.gov`
* (AWS) ARN of an SSL certificate for load balancer. See [requesting AWS certificate](#requesting-aws-certificate)
* (AWS) Decision around where deployments will live. See [AWS deployment setup options](#aws-deployment-setup-options)

### Steps to run

1. Fork the [civiform-deploy](https://github.com/civiform/civiform-deploy) repo to your organization via the GitHub webpage.
1. Clone the repo onto the machine you are deploying from. Ideally, this would be a shared instance that multiple people can log onto.
1. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases).
1. Copy the [`civiform_config.example.sh`](https://github.com/civiform/civiform-deploy/blob/main/civiform_config.example.sh) into `civiform_config.sh` and fill out the missing values. You can get a sense of required values depending on your cloud provider by looking at [staging-aws](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh) configs.
1. Run `bin/doctor` and install the dependencies.
1. Run `bin/setup`. What to expect:
    * Takes up to 20 minutes to run. Make sure you have time to allow the script to run to completion to avoid errors.
    * Terraform brings up resources in the cloud (database, network, server, etc).
    * Asks confirmation a few times before creating resources, listing everything that will be created. 
    * Safe to re-run the script if it fails (re-runs will take longer because resources must be destroyed before being re-created).
    * The configuration values in `civiform_config.sh` represent the desired state of your CiviForm deployment. The `bin/setup` and `bin/deploy` commands work to make your cloud environment match the desired state. If a command fails, your cloud environment may not match the desired state. These commands are safe to retry if they fail. If a command is persistently failing, you can work with our on-call engineer to resolve the issue. Our on-call engineer [responds to new issues in the CiviForm issue tracker](../../governance-and-management/project-management/on-call-guide#on-call-responsibilities).

Note: If you are running `bin/doctor` or another command for a config file other than `civiform_config.sh`, you can specify that with the config flag (i.e. `bin/doctor --config=civiform_staging_config.sh`)

## Deploy

1. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases).
1. Update the `CIVIFORM_VERSION` value in `civiform_config.sh`.
1. Run `bin/deploy`.

## Rotating the application secret

The Play Framework used by CiviForm utilizes an [application secret key](https://www.playframework.com/documentation/2.9.x/ApplicationSecret). This key is used for signing session cookies and CSRF tokens, among other things. While this secret is secured storely by the deployment system, it's a good idea to rotate it periodically in order to mitigate the risk of a leaked secret.

IMPORTANT: When the secret is rotated, all user sessions will be invalidated. This means that any guest users in the middle of an application that have not submitted it yet will lose that application, and any logged in users or admins will get logged out. It is recommended that this rotation happen at a low traffic time of day. You may also want to give users a warning before it happens.

To rotate the secret, run `bin/run`, and enter the `rotate_app_secret` command. This will redeploy CiviForm, changing the secret key to a new, random value.

Additionally, you should add `export RANDOM_PASSWORD_LENGTH=64` to your `civiform_config.sh` file. The secret length was originally only 16 characters, and when CiviForm moves to using version 2.9 or later of the Play Framework, 32 will be the minimum.

## Troubleshooting

#### Terraform fails with error "Provider produced inconsistent final plan"

This error can happen when running `bin/setup` for the first time. If you see it, re-run `bin/setup`. This is a known Terraform [bug](https://github.com/hashicorp/terraform-provider-aws/issues/19583).

#### Terraform fails with other errors

The deploy command is idempotent, so if it fails, try running it again. The setup command can also be re-run, but it may have partially created resources in AWS that you will need to delete before re-running.

If changes were made upstream, you can change the code in the checkout env, but will need to commit PRs to fix in the main repo.

#### No such file or directory

If you see error like "no such file or directory"
```
./db-connection: line 2: cloud/aws/bin/lib.sh: No such file or directory
./db-connection: line 21: out::error: command not found
```
The scripts expect you to be in specific directories. You probably need to `cd` into the checkout directory or the top level directory. If you are running `setup`/`deploy`/`revert`, you will need to be in the top level directory. If you are running a script like `db-connection`, you need to be in the checkout directory.

#### Terraform fails with `Error acquiring the state lock`

This situation can happen when exiting deployment scripts using "Ctrl-C". Terraform acquires a lock every time you run `./bin/deploy` or `./bin/setup`, and releases the lock at the end of the script. This helps to prevent concurrent infrastructure changes. If the deploy process exited outside of Terraform, the lock remains and needs to be force removed in order to run deploy again. The end of the error message will contain the `LOCK_ID`. To unlock, re-run either `bin/deploy` or `bin/setup` with `FORCE_UNLOCK_ID` set like this:

```
FORCE_UNLOCK_ID="$LOCK_ID" ./bin/deploy
```

Alternatively, it can be done by manually calling terraform like this:

```
terraform -chdir=checkout/cloud/aws/templates/aws_oidc force-unlock $LOCK_ID
```

#### (AWS) Notes on using CloudShell for deployment

It is an option to use CloudShell for doing deployments, but you should be aware that installations aren't persisted (see (FAQs)[https://aws.amazon.com/cloudshell/faqs/]), so it may be easier to use the AWS CLI.

If you do choose to use CloudShell, you likely will need to install Java and Terraform.

Java can be installed with `sudo yum install java` and terraform can be installed by following the [installation commands](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli#install-terraform) under `Linux` / `Amazon Linux`.

## Helpful resources

### Requesting AWS certificate
Follow [official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).
After your certificate is ready and validated, copy the ARN from your console and put it into the `SSL_CERTIFICATE_ARN` variable in your `civiform_config.sh`

ARN has format of arn:aws:acm:<region>:<user_id>:certificate/\<identifier>
  
![Screen Shot 2022-08-10 at 3 50 39 PM](https://user-images.githubusercontent.com/1741747/184037024-c7ed7537-cfc6-41e9-9b32-40f1b4d03341.png)

### AWS deployment setup options

Before going through the AWS deployment, it is helpful to understand how you plan to manage various deployments, if you plan to create multiple instances of CiviForm (i.e. staging, prod, etc.).

By default, each deployment will have its own prefix, which allows you to distinguish the different ones from each other, but [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) is a way of keeping deployments more separate from each other.

Some benefits of using AWS environments are:
- There is more separation between environments, which makes it easier to remove resources without worrying about causing any issues to another deployment environment
- It is easier to see cost breakdowns by deployment

A drawback to be aware of is that you'll have to create profiles in the AWS CLI and switch between the different profiles when doing deployments or, if using CloudShell, you'll have to do this in separate CloudShell for each environment.

### Setting up Azure AD

The setup script prompts you to set up Azure AD. There are a few additional steps.
 
In Azure Portal:
  * Go to Azure Active Directory -> App registrations
  * Click the tab for "All applications"
  * Find your app (staging-dynamic-heron for CiviForm Azure Staging)
  <img width="905" alt="image" src="https://user-images.githubusercontent.com/1741747/191576453-45b0e029-7c39-4510-8e3a-a532c76d3a6d.png">

 Use the menu on the left:
  * Authentication: setup the Redirect URI to be what the app expects: https://\<custom\_hostname>/callback/AdClient.
  * You will also need an admin group which creates CiviForm admins
  * Token configuration: To allow for CiviForm admins, you need to have Azure AD return the groups claim. Add the security groups claim (you can verify the groups claim is being returned by decoding the base64 token from the token you get back from Azure AD on the website-- if you preserve the log in the Chrome Dev Tool window it should be from https://\<custom\_hostname>/callback/AdClient)

### Access the database for emergency repair

The CiviForm deployment system provides a mechanism for temporary and secure direct access to the production database via the [pgadmin](https://www.pgadmin.org/)

For details on how to access the database with pgadmin visit the [Production Database Access](./production-database-access.md) page.
