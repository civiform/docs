# Disaster Recovery

## Overview

This guide will walk you through performing a full restoration of your CiviForm environment in the event you need to recover a broken installation. This process will allow you to specify a database snapshot and will build out a full, brand new environment. 

We do not recommend trying to restore over an existing environment for two reasons. The first is that keeping the old one allows for future investigation on the cause of a failure at a later date when there is no pressure to restore services. 

The second is that by building out a brand new environment there is no chance of introducing incorrect settings with system components that may be in an unknown working state.

{% hint style="danger" %}
This disaster recover process is currently only tested and supported for AWS installations. Do NOT use on Azure.
{% endhint %}

## Prerequisites

This guide assumes there has already been an initial setup of the system as outlined in the [setup guide](https://docs.civiform.us/it-manual/sre-playbook/initial-deployment/terraform-deploy-system).

{% hint style="info" %}
Steps outlined in this guide assume they are being run from the root folder of your fork of the [civiform-deploy](https://github.com/civiform/civiform-deploy) repository.
{% endhint %}

## Prepare config file

- Find the existing config file for the environment needing restoration. The default name is often `civiform_config.sh`.
- Make a copy of the original config file that was used for the last successful deployment.

### Edit the new config file

Make a few edits to the new configuration file. 

- Change `APP_PREFIX` to a new value.
  {% hint style="warning" %}
  This should be new and different from any current deployed environments.
  {% endhint %}

  {% hint style="danger" %}
  Do NOT use the same `APP_PREFIX` of the environment needing restoration.
  {% endhint %}

- Set `POSTGRESQL_VERSION` to the version of the existing database.
  
  - To find the postgres version go to the AWS console and navigate to RDS.
  - Click on the database you will be restoring to get the details page
  - Click on the "Configuration" tab
  - Look for "Engine version" to get the value for `POSTGRESQL_VERSION`.

  {% hint style="warning" %}
  Upgrading Postgres versions should NOT be done at the same time as restoring an environment. Restoring a snapshot of the old database to a new database with differing Postgres versions increases the risk of failure and compatibility.
  {% endhint %}

- Set POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER to the snapshot to restore. 
  
  - To find the snapshot identifier go to the AWS console and navigate to RDS > Snapshots.
  - Use the snapshot identifier (not the name, the identifier begins with `rds:`) for the value for `POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER`.

Do NOT change any other settings.

{% hint style="danger" %}
The `CIVIFORM_VERSION` MUST be the same version that was in use with the selected snapshot. Upgrading the version of CiviForm should NOT be done at the same time as restoring an environment.
{% endhint %}

## Initialize the deployment

Verify that deployment tool is correctly setup by running `run bin/doctor --config=NEWCONFIGFILE`

## Restore into new environment

{% hint style="warning" %}
This process will take some time to run. Depending upon the size of the database being restored expect on average 30-60 minutes for completion. There will be large periods where you need to wait while the setup runs, but there are also points where you will be prompted for values.
{% endhint %}

- To begin the restoration run `bin/setup --config=NEWCONFIGFILE`.
- Wait as setup runs
- When prompted enter the values for all the requested secrets.
- When prompted for Postgres snapshot restore follow all prompts. You will be asked for the app prefix of the old environment. This is the value from `APP_PREFIX` of the original config file.
- Wait as setup runs

When complete, make note of the endpoint url listed at the end of the deployment. It will be the one that has the `APP_PREFIX` from your new config file and ends with "elb.amazonaws.com".

At this point the new environment is setup and should be online at the above endpoint url if no errors occurred during this process.

## Verify the new site is working

Test that the site responds by using the endpoint url from the previous section.

- Paste the endpoint url into your browser, you will see an invalid SSL certificate error and may not be able to proceed depending on your browser settings. If you can temporarily accept the invalid certificate you should see the CiviForm program page load.
- Alternatively, you can run `curl --insecure --location PUT_ENDPOINT_URL_HERE`. The results should be HTML.

{% hint style="info" %}
The site will load at this url. There are however many features that depend on running from your real domain name such as authentication.
{% endhint %}

## Change DNS settings to point to new site

- Go to AWS Route53
- Go to `Hosted zones`
- Click the `Hosted zone name` link for the site you just restored
- Select the `A` record type
- Click "Edit record" in the flyout panel
- Set Route traffic to
    - Alias to Application and Classic Load Balancer
    - The AWS Region you use
    - Select the newly created environment's load balancer from the list
- Click Save

{% hint style="info" %}
While it is often instantaneous, it may take a few minutes for the DNS update to propagate.
{% endhint %}

## Testing

- Verify you can log in as an admin and an applicant
- Check Cloudwatch for errors

The newly restored environment is now up and running.

## Post restoration

- Remove the POSTGRES_RESTORE_SNAPSHOT_IDENTIFIER from the config file.

Going forward with new deployments you will continue to use this new file.


