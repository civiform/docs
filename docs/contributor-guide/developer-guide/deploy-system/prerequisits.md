# Prerequisits and developer setup

This page contains instructions for the setup you should go through before you start development work on the deploy system.
It is intended as a step by step guide and you are encouraged to improve the documentation if any step is not straight forward in its current state.

 TODO([#4324](https://github.com/civiform/civiform/issues/4324))This entire page needs to be rewritten. For each item in the list explain what it is and how to install/get it, remove or change the existing documentation below as required. 
 * Access you need to ask for to not get blocked on later steps
 * Required tools(python3, terraform etc, pip, yapf)
 * AWS accounts(including differences depending on who your employer is)
 * AWS CLI
 * AWS nuke
 * Git setup for cross repository development 
    * for developing and running directly from deploy-infra 
    * for running from deploy like an civic entity sre would

### Before running scripts
1. Required to be installed: bash, python, cloud provider CLIs.
2. User needs to be authenticated with cloud provider.
    * AWS: run `aws configure` or export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
    * Azure: run `az login`

## Development setup for developent across git branches

Most deployment system changes happen in the cloud-deploy-infra repository. The deployment script however is located in the civiform-deploy
Because of the code being located in different git repositories
The setup.py script starts the deployment in the civiform-deploy repository, but most of the code is in the cloud-deploy-infra repository. Therefore additional steps have to be taken so changes made to the cloud-deploy-infra repository are visible when you run the setup.py script: 

### Option 1(current, to be deprecated): Direct checkout
Use git to copy a part of the cloud-deploy-infra repository into the civiform-deploy repository before running the setup.sh script:

All scripts currently do the following:
1. Source civiform config which exports variables to ENV.
2. Require `CIVIFORM_CLOUD_DEPLOYMENT_VERSION` to be set. This determines which version is getting checked out in the next step.
2. Checkout remote repo (see [checkout.sh](https://github.com/civiform/civiform-deploy/blob/main/bin/lib/checkout.sh)) into checkout/ folder.
3. Call [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py)

## Option 2 (future): Using Docker (preferred going forward, but not fully ready yet)
Build a new docker image [civiform/civiform-cloud-deployment](https://hub.docker.com/r/civiform/civiform-cloud-deployment)on every commit to civiform-deploy-infra repo and use it to run commands.

A [Github action](https://github.com/civiform/cloud-deploy-infra/blob/main/.github/workflows/build_push_image.yaml) calls the [build script](https://github.com/civiform/cloud-deploy-infra/blob/main/bin/build-cloud-deployment) that uses  [Dockerfile](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/cloud.Dockerfile).

In the image:
* All dependencies that we need, including versions of CLIs used, and python packages.
* Copy of cloud/ directory with the scripts to run.

In civiform-deploy:
1. When env variable `USE_DOCKER=true` it will call [run-from-docker](https://github.com/civiform/civiform-deploy/blob/main/bin/lib/run_from_docker) script.
2. We're passing env variables used to Authentication with cloud provider to the image.
3. `CIVIFORM_CLOUD_DEPLOYMENT_VERSION` is used as a tag to get image from Dockerhub.
4. Inside the image call  [run.py](https://github.com/civiform/cloud-deploy-infra/blob/main/cloud/shared/bin/run.py).


### Get access

You will need to reach out to team members to get accounts for the following:

For AWS:
- AWS account 
- (optional) Auth0 Civiform-Staging

For Azure:
- Azure (must be added as a contributor AND owner)
- AWS account (yes, we use it in Azure deploy)
- (optional) Login Radius Civiform-Staging 

