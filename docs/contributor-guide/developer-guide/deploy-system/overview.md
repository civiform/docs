# Deploy system dev overview

## Code
Deployment related code can be found in https://github.com/civiform/cloud-deploy-infra.

Scripts that a user would run are in https://github.com/civiform/civiform-deploy.

### High level Flow

#### Before running scripts
1. Required to be installed: bash, python, cloud provider CLIs.
2. User needs to be authenticated with cloud provider.
    * AWS: run `aws configure` or export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
    * Azure: run `az login`

#### Direct checkout (to be deprecated)
Scripts in civiform-deploy call into cloud-deploy-infra/cloud/shared folder that delegate to cloud provider specific implementation.

All scripts currently do the following:
1. Source civiform config which exports variables to ENV.
2. Require `CIVIFORM_CLOUD_DEPLOYMENT_VERSION` to be set. This determines which version is getting checked out in the next step.
2. Checkout remote repo (see [checkout.sh](https://github.com/civiform/civiform-deploy/blob/main/bin/lib/checkout.sh)) into checkout/ folder.
3. Call [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py)

#### Using Docker (preferred going forward, but not fully ready yet)
Going forward we're building a docker image [civiform/civiform-cloud-deployment](https://hub.docker.com/r/civiform/civiform-cloud-deployment) and using it to run commands.

New image is build on every commit to civiform-deploy-infra repo: [Github action](https://github.com/civiform/cloud-deploy-infra/blob/main/.github/workflows/build_push_image.yaml) calls [build script](https://github.com/civiform/cloud-deploy-infra/blob/main/bin/build-cloud-deployment) that uses  [Dockerfile](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/cloud.Dockerfile).

In the image:
* All dependencies that we need, including versions of CLIs used, and python packages.
* Copy of cloud/ directory with the scripts to run.

In civiform-deploy:
1. When env variable `USE_DOCKER=true` it will call [run-from-docker](https://github.com/civiform/civiform-deploy/blob/main/bin/lib/run_from_docker) script.
2. We're passing env variables used to Authentication with cloud provider to the image.
3. `CIVIFORM_CLOUD_DEPLOYMENT_VERSION` is used as a tag to get image from Dockerhub.
4. Inside the image call  [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py).


## Running locally

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

1. Copy staging configs ([AWS](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh), [Azure](https://github.com/civiform/civiform-staging-deploy/blob/main/azure_staging_civiform_config.sh)) to ```cloud/```
2. Modify APP_PREFIX to be unique - it is used as a prefix for all resources created.

### Run

Use [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py) with necessary parameters.

* To setup (run once): `cloud/shared/bin/run.py --command=setup --tag=latest --config=<path_to_config>`
* To deploy: `cloud/shared/bin/run.py --command=deploy --tag=latest --config=<path_to_config>`
* You can pass any terraform command into --command flag for example `cloud/shared/bin/run.py --command="terraform init" --tag=latest --config=<path_to_config>`

Setup will ask you to provide secret values. You can enter random values and click yes as needed.
At the end the script should print url to your dev server!

### Running more commands

If you need to run a terraform command that's not exported in a script:
1. Run `run.py` script to create tfvars from your config (otherwise you will need to populate them all by hand)
2. Use chdir to run commands directly

For example:

```
terraform -chdir=cloud/aws/templates/aws_oidc plan
```

### Tear down

After you're done with your instance - please tear down. You can run

```
cloud/shared/bin/run.py --command=destroy
```


## Troubleshooting

For Azure specific steps also see [Dev Azure](dev-azure.md) page.

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
