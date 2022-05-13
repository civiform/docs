# Dev Azure

The main difference between the dev azure deploy is that it doesn't use a shared
state (since we don't want to share state among devs). Please remember
to [tear down](#tearing-down) your dev instance as it does cost money.

# Running the dev deploy

## Go to the civiform dev directory

All of these are run within the main repo and the files can be found in
cloud/deploys/dev_azure.

## Copy the civiform_config.example.sh

Copy the civiform_config.example.sh into civiform_config.sh and change the
required variables.

## Get access to correct technologies

You will need to reach out to team members to get accounts for the following:

- Azure (must be added as a contributor AND owner)
- AWS
- Login Radius Civiform-Staging

## Setup Local Machine

Run through the doctor script to make sure you have the right things on your
machine:

```
cloud/shared/bin/doctor
```

## Setup Login Radius For Local Development

Go to [Login Radius Dashboard](https://dashboard.loginradius.com/) and click the
existing civiform-staging app. Click into the Integration tab, and add a new
civiform integration. Choose the outbound SSO Saml.

From there add an app with "Sp initiated login" and pick a name (this gets put
into the config as `LOGIN_RADIUS_SAML_APP_NAME`).

To generate the private key for the form, run the following commands. Paste the
entire output into the dashboard under "Id Provider Certificate Key". This
creates a file in your current directory with your own private key, so make sure
you are not accidentally adding and pushing this to the GitHub repo.

```
openssl genrsa -out private.key 2048
cat private.key
```

For generating the cert, run the following commands. Paste the output into the
dashboard "Id Provider Certificate".

```
openssl req -new -x509 -key private.key -out certificate.cert -days 365 -subj /CN=civiform-staging.hub.loginradius.com
cat certificate.cert
```

"Service Provider Certificate" will be generated later while running setup.

For the rest of the fields, you need to copy the details from a previous working
setup in login radius, so look back at the staging one to fill yours out.

## Run

After that you can start the setup by running the below command and following
the instructions. For the image tag, you can grab one from
docker: https://hub.docker.com/r/civiform/civiform/tags

```
cloud/deploys/dev_azure/bin/setup --tag=<IMAGE_TAG>
```

For dev, you do not need to set any names when prompted. Just hit enter or
type "yes" as needed.

The setup script will output a certificate and prompt you to update the "Service
Provider Certificate" in login radius as mentioned earlier in this doc. Go back
to the dashboard and add the certificate.

The script will also have you set up a new authentication provider in the azure
portal.

Finally, the script will output a url labeled app_service_default_hostname.
Navigate to this url to see your dev instance!

# Local Docker Build to Remote Azure Deploy

If you want to do local onto terraform we build/tag/deploy the docker image and
then update the azure app service to point to the local image.

## 1. Build, Tag and Push the Docker Image

Run the following script which takes the DOCKER_REPOSITORY, DOCKER_USERNAME from
your civiform_config.sh and builds/tags/pushes your local up to docker hub. You
must specify the image_tag to use for docker. You will need a custom docker hub
in order to do this. Check with team on how to pay for docker hub pro.

```
cloud/deploys/dev_azure/bin/docker-build-tag-push --tag=<IMAGE_TAG>
```

## 2. Deploy the new version

Deploy via the deploy script

```
cloud/deploys/dev_azure/bin/deploy --tag=<IMAGE_TAG>
```

or Within the app service resource, you can select Deployment Center, and within
the registry settings change the 'Full Image Name and Tag' to be (the image_tag
is what you specified in the build/tag/push)
`<DOCKER_USERNAME>/<DOCKER_REPOSITORY>:<IMAGE_TAG>`

# Troubleshooting

## Azure "SkuNotAvailable" Error

### Error

`The requested size for resource is currently not available in location 'eastus'`

### Resolution

Make sure you've upgraded Azure to a paid subscription. If you cannot create any
VMs (including in the Azure portal - no sizes are avalible, with error
NotAvailableForSubscription), you'll need to file a support request. Follow
[this help article](https://docs.microsoft.com/en-us/troubleshoot/azure/general/region-access-request-process)
to request access.

## Terraform already exists Error

### Error

`A resource with the ID "/subscriptions/....." already exists`

### Resolution

You may have already deployed to this project. Delete the resources in the azure
portal and try again.

## AWS CreateAccessKey limit

### Error

`An error occurred (LimitExceeded) when calling the CreateAccessKey operation: Cannot exceed quota for AccessKeysPerUser: 2`

### Resolution

Each AWS user can only generate 2 access keys (including the one used for the
CLI). Either delete an unused one, or create an additional user in the
[AWS IAM Console](https://console.aws.amazon.com).

## Azure access errors

### Error

Various Azure permission errors.

### Resolution

You must be added as both a contributor and owner in Azure. After a teammate
adds you, you must re-login since this doesn't refresh automatically. Run `az
logout` and `az login` to refresh your credentials.

## Azure access errors

### Error

Various Azure permission errors.

### Resolution

You must be added as both a contributor and owner in Azure. After a teammate
adds you, you must re-login since this doesn't refresh automatically. Run `az
logout` and `az login` to refresh your credentials.

# Tearing down

Use `terraform -chdir=cloud/azure/templates/azure_saml_ses destroy` to turn off
any cloud resources created and managed by terraform. The keystore and saml
storage buckets will need to be manually deleted in Azure.
