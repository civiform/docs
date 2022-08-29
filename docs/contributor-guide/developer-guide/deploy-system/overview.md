# Deploy system dev overview

## Code
Deployment related code can be found in https://github.com/civiform/civiform/tree/main/cloud.

Scripts that a user would run are in https://github.com/civiform/civiform-deploy.

### High level Flow

Scripts in civiform-deploy call into civiform/cloud/shared folder that delegate to cloud provider specific implementation.

All scripts currently do the following:
1. Source civiform config (exports bunch of variables to ENV)
2. Validate variables
3. If succesfull - create tfvars file based on those variables.
4. Run terraform. Terraform automatically uses tfvars files to populate values.

## Running locally

For Azure specific steps also see [Dev Azure](dev-azure.md) page.

Use https://github.com/civiform/civiform/tree/main/cloud/deploys to run your scripts locally.

### Get access

You will need to reach out to team members to get accounts for the following:

For AWS:
- AWS account 
- (optional) Auth0 Civiform-Staging

For Azure:
- Azure (must be added as a contributor AND owner)
- AWS account (yes, we use it in Azure deploy)
- (optional) Login Radius Civiform-Staging

### Create civiform config

1. Copy staging configs ([AWS](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh), [Azure](https://github.com/civiform/civiform-staging-deploy/blob/main/azure_staging_civiform_config.sh)) to ```cloud/deploys/dev_{azure|aws}/```
2. Modify APP_PREFIX to be unique - it is used as a prefix for all resources created.

### Run

After that you can start the setup by running the below command and following
the instructions. For the image tag, you can grab one from
docker: https://hub.docker.com/r/civiform/civiform/tags

Make sure you're running this from the project root directory.

```
cloud/deploys/dev_{azure|aws}/bin/setup --tag=<IMAGE_TAG>
```

Setup will ask you to provide secret values. You can enter random values and click yes as needed.
At the end the script should print url to your dev server!

You can run any other command from cloud/deploys/...

### Running more terraform commands

If you need to run a terraform command that's not exported in a script:
1. Run deploy script to create tfvars from your config (otherwise you will need to populate them all by hand)
2. Use chdir to run commands directly

For example:

```
terraform -chdir=cloud/aws/templates/aws_oidc plan
```

### Tear down

After you're done with your instance - please tear down. You can run

```
cloud/deploys/dev_{azure|aws}/bin/destroy --tag=<IMAGE_TAG>
```


## Troubleshooting

### Error acquiring the state lock

```
│ Error: Error acquiring the state lock
│ 
│ Error message: ConditionalCheckFailedException: The conditional request
│ failed
│ Lock Info:
│   ID:        XXXXXXX

```

This could happen if you cancel a deployment manually either on local or in the github action.

To unlock run:
 
```
 terraform -chdir=cloud/aws/templates/aws_oidc init
 terraform -chdir=cloud/aws/templates/aws_oidc force-unlock LOCK_ID

```
