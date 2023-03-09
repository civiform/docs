# Deploying with Dev Azure

## Configuring Github Actions

Current actions need the following secrets:
 * ARM_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }} Can be found in https://portal.azure.com/ under Subscriptions.
 * ARM_TENANT_ID: ${{ secrets.AZURE_SERVICE_PRINCIPAL_TENANT }} Can be found in https://portal.azure.com/ -> App registrations -> civiform-staging-deploy. Field: _Directory (tenant) ID_
 * ARM_CLIENT_ID: ${{ secrets.AZURE_SERVICE_PRINCIPAL_ID }} Can be found in https://portal.azure.com/ -> App registrations -> civiform-staging-deploy. Field: _Application (client) ID_
 * ARM_CLIENT_SECRET: ${{ secrets.AZURE_SERVICE_PRINCIPAL_PASSWORD }} Can be found in https://portal.azure.com/ -> App registrations -> civiform-staging-deploy -> Certificates and secrets -> New client secret.  

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
Since this is a required field, you can use the following placeholder for now,
and update it later with the string generated during setup:

```
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
```

For the rest of the fields, you need to copy the details from a previous working
setup in login radius, so look back at the staging one to fill yours out.

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
adds you, you must re-login since this doesn't refresh automatically.
Run `az logout` and `az login` to refresh your credentials.

# Tearing down

Use `terraform -chdir=cloud/azure/templates/azure_saml_ses destroy` to turn off
any cloud resources created and managed by terraform. The keystore and saml
storage buckets will need to be manually deleted in Azure.
