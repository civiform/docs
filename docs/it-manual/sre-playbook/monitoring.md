# Monitoring a CiviForm deployment

CiviForm supports server monitoring via [Prometheus](https://prometheus.io/) metrics visualized in [Grafana](https://grafana.com/). These metrics are related to server status, things like latency and error rates, and do not contain sensitive data, such as who is applying to what programs.

![](<../../.gitbook/assets/monitoring-architecture.png.png>)

## Enabling metrics export

Exporting metrics from the server is optional, and must be enabled by setting the `CIVIFORM_SERVER_METRICS_ENABLED` environment variable to `true`. When enabled, the server exports metrics from the `/metrics` HTTP route. While these metrics data are not sensitive, it is a good practice to prevent access to this route from the public internet (which is done by default when using the [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/)).

## Viewing metrics

### AWS

The [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/) for AWS deploys the monitoring stack automatically. After deployment, user access to the Grafana dashboard and configuration of the dashboard need to be done manually.

#### Configure access

[AWS Managed Grafana](https://aws.amazon.com/grafana/) uses [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) for access management.

**Note that this is a different service from [AWS IAM](https://aws.amazon.com/iam/) the accounts/user profiles in AWS IAM Identity Center are completely separate from accounts in AWS IAM.**

1. Login to the AWS console and navigate to the IAM Identity Center service
1. In the left nav, click "Users"
1. For each user you'd like to grant access to viewing metrics, click the "Add user" button and follow the workflow
1. Follow instructions [here](https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-users-and-groups-AMG.html) for adding users to your Grafana workspace
1. In AWS console for your Grafana workspace, grant permissions to the users you added for the workspace

#### Configure dashboard

Once you have an Identity Center user with permissions to administer your Grafana workspace, it's time to configure the workspace dashboard. From the Grafana workspace page in the AWS console, click the link under "Grafana workspace URL". After signing in this will take you to your Grafana workspace. 

To enable viewing metrics, add the Prometheus server as a data source for your Grafana workspace: 

1. In AWS console for your Grafana workspace, lick on the 'Data sources' tab
1. Click on the 'Configure in Grafana' link on the 'Amazon Managed Service for Prometheus' row
1. Select the region where civiform is deployed
1. Select the '[deployment name]-CiviForm_metrics' row 
1. Select 'add 1 data source'

With Prometheus connected as a Grafana workspace, panels can now be created in Grafana that display metrics from the CiviForm server. There are many metrics available, and many ways to display them. You can get started with the some basic metrics by importing a pre-built CiviForm dashboard. This pre-built dashboard includes:

- Requests per minute, split out by controller action
- Requests per minute, split out by URL path pattern
- Client errors (4XX status codes) per minute, split out by controller action and status code
- Server erors per minute (500 status code), split out by controller action
- 50th percentile 5-minute trailing average request latency, split out by controller action 
- 90th percentile 5-minute trailing average request latency, split out by controller action 
- 99th percentile 5-minute trailing average request latency, split out by controller action 

To import this pre-built dashboard: 

1. Hover over the "+" icon in the left nav
1. Click the "Import" option 
1. Paste [the JSON here](https://gist.githubusercontent.com/bion/9c5e9293a887f4ea76f123908fb35ef7/raw/c179075f37026544124475ed46646861fda16a5f/civiform_grafana_dashboard.json) into the "Import via panel JSON" and click "Load"
1. Fill in the details for the imported dashboard, selecting your CiviForm prometheus instance for the data source
