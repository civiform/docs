# Terraform deploy system

Terraform - is an infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share. Civiform provides Terraform configuration files that allow to deploy Civiform on Azure and AWS. Knowledge of Terraform is not required to run them but here is the high-level [Terraform overview](https://www.terraform.io/intro) nevertheless. 

## Setup

### Outside configuration
You will need couple of values that are configured outside of Civiform before you start the setup. Some of the steps are optional meaning that you can bring up staging environment and get app working, but they need to be completed for production setup.
- [ ] (Optional) Admin auth client_id, client_secret, and discovery_uri. See [setting up Azure AD for an example](#setting-up-azure-ad)
- [ ] (Optional) Applicant auth client_id, client_secret, and discovery_uri. See setting up the [Authentication Providers](../../contributor-guide/developer-guide/authentication-providers.md)
- [ ] Domain name for your deployment. For example `civiform.mycity.gov`
- [ ] (AWS) ARN of an SSL certificate for load balancer. See [requesting AWS certificate](#requesting-aws-certificate)

### Steps to run

1. Fork the [civiform-deploy](https://github.com/civiform/civiform-deploy) repo to your organization via the UI
2. Pull the repo onto the machine you are deploying from (ideally this would be a shared instance multiple people can log onto)
3. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases)
4. Copy the civiform\_config.example.sh into civiform\_config.sh and fill out the missing values. You can get a sense of required values depending on your cloud provider by looking at [staging-azure](https://github.com/civiform/staging-azure-deploy/blob/main/civiform_config.sh) or [staging-aws](https://github.com/civiform/staging-aws-deploy/blob/main/civiform_config.sh) configs.
5. Run the `bin/doctor --tag=<version>` and install the dependencies
6. Run `bin/setup --tag=<version>`. What to expect:
    * Runs 5-10 minutes.
    * Terraform brings up resources in cloud (database, network, server, etc).
    * Asks confirmation few times before creating resources listing everything that will be created. 
    * Safe to re-run script if it fails.


## Deploy

1. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases)
2. Run `bin/deploy --tag=<version>`

## Troubleshooting

#### Terraform fails with error "Provider produced inconsistent final plan"

This error can happen when running `bin/setup` for the first time. If you set it - re-run `bin/setup`. This is a known Terraform [bug](https://github.com/hashicorp/terraform-provider-aws/issues/19583).

#### Terraform fails with other errors

The deploy command is idempotent so if it fails try running it again. The setup command can also be re-run but it does re-set a lot of variables which are kind of a pain to continually set up when you run it for Azure.

If changes were made upstream, you can change the code in the checkout env, but will need to commit PRs to fix in the main repo

#### No such file or directory

If you see error like no such file or directory 
```
./db-connection: line 2: cloud/azure/bin/lib.sh: No such file or directory
./db-connection: line 21: out::error: command not found
```
The scripts expect you to be in specific directories. You probably need to cd into the checkout directory or the top level directory. If you are running setup/deploy/revert you will need to be in the top level directory if you are running a script like db-connection you need to be in the checkout directory!

#### Terraform fails with `Error acquiring the state lock`

This situation can happen when exiting deployment scripts using "Ctrl-C". Terraform acquires lock every time you run `./bin/deploy` or `./bin/setup` and releases lock at the end of the script. This helps to prevent concurrent infrastructure changes. If deploy process exited outside of terraform - the lock remains and needs to be force removed in order to run deploy again. To do it run the following command, assuming you deploy on AWS:

```
terraform -chdir=checkout/cloud/aws/templates/aws_oidc force-unlock $LOCK_ID
```

## Helpful resources

### Requesting AWS certificate
Follow [official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).
After your certificate is ready and validated copy ARN from your console and put it into SSL_CERTIFICATE_ARN variable in your civiform\_config.sh

ARN has format of arn:aws:acm:<region>:<user_id>:certificate/\<identifier>
  
![Screen Shot 2022-08-10 at 3 50 39 PM](https://user-images.githubusercontent.com/1741747/184037024-c7ed7537-cfc6-41e9-9b32-40f1b4d03341.png)


### Setting up Azure AD

The setup scrip prompts you to set up Azure AD. There are a few additional steps.
 
In Azure Portal:
  * Go to Azure Active Directory -> App registrations
  * Click the tab for "All applications"
  * Find your app (staging-dynamic-heron for Civiform Azure Staging)
  <img width="905" alt="image" src="https://user-images.githubusercontent.com/1741747/191576453-45b0e029-7c39-4510-8e3a-a532c76d3a6d.png">

 Use menu on the left:
  * Authentication: setup the Redirect URI to be what the app expects: https://\<custom\_hostname>/callback/AdClient.
  * You will also need an admin group which creates civiform admins
  * Token configuration: To allow for civiform admins you need to have the Azure Ad return the groups claim. Add the security groups claim (you can verify the groups claim is being returned by decoding the base64 token from the token you get back from Azure AD on the website-- if you preserve the log in the Chrome Dev Tool window it should be from https://\<custom\_hostname>/callback/AdClient)

### Access the database (only Azure)

1. cd checkout
2. cloud/azure/bin/db-connection -g sgdev -d civiform-artistic-halibut -v sgdev-civiform-kv

### Restore data to the database from a dump file (only Azure)

1. If on WSL figure out what the location of the dump file (possibly /mnt/c/..)
2. cd checkout
3. cloud/azure/bin/pg-restore -g sgdev -d civiform-artistic-halibut -v sgdev-civiform-kv -f /mnt/c/pg\_dump.dump -b testData.dump

### Clear data from the database (only Azure)
1. cd checkout 
2. From checkout directory run `cloud/azure/bin/db-connection -d <database_name> -g <resource_group> -v <keyvault>`
Note that the database_name does not include the .postgres.database 
3. Wait for the application to say you can run sql (try running \dt to make sure you can see the data) 
4. Run the following command (has to be in order)
```
DELETE FROM applications;
DELETE FROM applicants;
DELETE FROM accounts;
DELETE FROM programs;
DELETE FROM questions;
DELETE FROM ti_organizations;
DELETE FROM versions;
DELETE FROM versions_programs;
DELETE FROM versions_questions;
```


