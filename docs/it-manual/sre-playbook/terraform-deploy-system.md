# Terraform deploy system

## Setup

### Outside configuration
You will need couple of values that are configured outside of Civiform before you start the setup.
- [ ] Admin auth client_id, client_secret, and discovery_uri. See [setting up Azure AD for an example](#setting-up-azure-ad)
- [ ] Applicant auth client_id, client_secret, and discovery_uri. See setting up the [Authentication Providers](../../contributor-guide/developer-guide/authentication-providers.md)
- [ ] Domain name for your deployment
- [ ] (AWS) ARN of an SSL certificate for load balancer. See [requesting AWS certificate](#requesting-aws-certificate)

### Steps to run

1. Fork the [civiform-deploy](https://github.com/civiform/civiform-deploy) repo to your organization via the UI
2. Pull the repo onto the machine you are deploying from (ideally this would be a shared instance multiple people can log onto)
3. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases)
4. Run the `bin/doctor --tag=<version>` and install the dependencies
5. Copy the civiform\_config.example.sh into civiform\_config.sh and fill out the missing values. You can get a sense of required values depending on your cloud provider by looking at [staging-azure](https://github.com/civiform/staging-azure-deploy/blob/main/civiform_config.sh) or [staging-aws](https://github.com/civiform/staging-aws-deploy/blob/main/civiform_config.sh) configs.
6. Run `bin/setup --tag=<version>`


## Deploy

1. Find the version that you want to deploy on [Github](https://github.com/civiform/civiform/releases)
2. Run `bin/deploy --tag=<version>`

## Troubleshooting

#### Terraform fails

The deploy command is idempotent so if it fails try running it again. The setup command can also be re-run but it does re-set a lot of variables which are kind of a pain to continually set up when you run it for Azure.

If changes were made upstream, you can change the code in the checkout env, but will need to commit PRs to fix in the main repo

#### No such file or directory

If you see error like no such file or directory 
```
./db-connection: line 2: cloud/azure/bin/lib.sh: No such file or directory
./db-connection: line 21: out::error: command not found
```
The scripts expect you to be in specific directories. You probably need to cd into the checkout directory or the top level directory. If you are running setup/deploy/revert you will need to be in the top level directory if you are running a script like db-connection you need to be in the checkout directory!

## Helpful resources

### Requesting AWS certificate
Follow [official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).
After your certificate is ready and validated copy ARN from your console and put it into SSL_CERTIFICATE_ARN variable in your civiform\_config.sh

ARN has format of arn:aws:acm:<region>:<user_id>:certificate/\<identifier>
  
![Screen Shot 2022-08-10 at 3 50 39 PM](https://user-images.githubusercontent.com/1741747/184037024-c7ed7537-cfc6-41e9-9b32-40f1b4d03341.png)


### Setting up Azure AD

The setup scrip prompts you to set up Azure AD. There are a few additional steps.

* You will need to setup the Redirect URI to be what the app expects: https://\<custom\_hostname>/callback/AdClient.
* You will also need an admin group which creates civiform admins
* To allow for civiform admins you need to have the Azure Ad return the groups claim. Do this in the token configuration section of the Azure portal and add the security groups claim (you can verify the groups claim is being returned by decoding the base64 token from the token you get back from Azure AD on the website-- if you preserve the log in the Chrome Dev Tool window it should be from https://\<custom\_hostname>/callback/AdClient)


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


