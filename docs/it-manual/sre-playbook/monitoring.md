# Monitoring a CiviForm deployment

CiviForm supports server monitoring via [Prometheus](https://prometheus.io/) metrics visualized in [Grafana](https://grafana.com/). These metrics are related to server status, things like latency and error rates, and do not contain sensitive data, such as who is applying to what programs.

![](<../../.gitbook/assets/monitoring-architecture.png>)

## Enabling metrics export

Exporting metrics from the server is optional, and must be enabled by setting the `CIVIFORM_SERVER_METRICS_ENABLED` environment variable to `true`. When enabled, the server exports metrics from the `/metrics` HTTP route. While these metrics data are not sensitive, it is a good practice to prevent access to this route from the public internet (which is done by default when using the [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/)).

## Viewing metrics

### AWS

The [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/) for AWS deploys the monitoring stack automatically. After deployment, user access to the Grafana dashboard and configuration of the dashboard need to be done manually.

#### Configure access

[AWS Managed Grafana](https://aws.amazon.com/grafana/) uses [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) for access management.

**Note that this is a different service from [AWS IAM](https://aws.amazon.com/iam/). The accounts/user profiles in AWS IAM Identity Center are completely separate from accounts in AWS IAM.**

1. Login to the AWS console and navigate to the IAM Identity Center service
1. In the left nav, click "Users"
1. For each user you'd like to grant access to viewing metrics, click the "Add user" button and follow the workflow
1. Follow instructions [here](https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-users-and-groups-AMG.html) for adding users to your Grafana workspace
1. In AWS console for your Grafana workspace, grant permissions to the users you added for the workspace

#### Configure dashboard

Once you have an Identity Center user with permissions to administer your Grafana workspace, it's time to configure the workspace dashboard. From the Grafana workspace page in the AWS console, click the link under "Grafana workspace URL". After signing in this will take you to your Grafana workspace. 

To enable viewing metrics, add the Prometheus server as a data source for your Grafana workspace: 

1. In AWS console for your Grafana workspace, click on the 'Data sources' tab
1. Click on the 'Configure in Grafana' link on the 'Amazon Managed Service for Prometheus' row
1. Select the region where CiviForm is deployed
1. Select the '[deployment name]-CiviForm_metrics' row 
1. Select 'add 1 data source'

With Prometheus connected as a Grafana workspace, panels can now be created in Grafana that display metrics from the CiviForm server. There are many metrics available, and many ways to display them. You can get started with the some basic metrics by importing a pre-built CiviForm dashboard. This pre-built dashboard includes:

- Requests per minute, split out by controller action
- Requests per minute, split out by URL path pattern
- Client errors (4XX status codes) per minute, split out by controller action and status code
- Server errors per minute (500 status code), split out by controller action
- 50th percentile 5-minute trailing average request latency, split out by controller action 
- 90th percentile 5-minute trailing average request latency, split out by controller action 
- 99th percentile 5-minute trailing average request latency, split out by controller action 
- Database query counts and latency
- Email send counts and latency
- Address correction / lookup counts and latency (if address correction is enabled)

To import this pre-built dashboard: 

1. Click on the "Data Sources" tab and select the Prometheus data source
2. Change the Name value to PROMETHEUS_DATA
3. Hover over the "+" icon in the left nav
4. Click the "Import" option 
5. Paste [the JSON here](https://gist.githubusercontent.com/dkatzz/a7048a6db9a2cbb14ef96f744f5fd964/raw/f65295421e47782cc55eecdbf70653d676121070/grafana_json) into the "Import via panel JSON" 
7. Click "Load"
8. Fill in the details for the imported dashboard, selecting your CiviForm prometheus instance for the data source

## Additional AWS monitoring

In addition to the server metrics provided by Prometheus, there are some additional places within AWS you can go to see metrics.

### CloudWatch

#### Dashboards

CloudWatch has some default dashboards that allow you to see graphs with metrics on different parts of the deployment. Not all of these are relevant, but these can be helpful in seeing CPU utilization in RDS (the database) and Elastic Container Service, as well as requests to the Application ELB (load balancer), metrics about S3, etc.
![](<../../.gitbook/assets/aws-cloudwatch-dashboards.png>)

#### Alarms

Some alarms are configured by default through terraform, which includes the following: 
- ECS:
  - High CPU alarm
    - Related variables: `ECS_MAX_CPU_THRESHOLD`, `ECS_MAX_CPU_EVALUATION_PERIOD`, `ECS_MAX_CPU_PERIOD`, `ECS_SCALE_TARGET_MAX_CAPACITY`
  - Low CPU alarm
    - Related variables: `ECS_MIN_CPU_THRESHOLD`, `ECS_MIN_CPU_EVALUATION_PERIOD`, `ECS_MIN_CPU_PERIOD`, `ECS_SCALE_TARGET_MIN_CAPACITY`
- RDS:
  - High CPU alarm
    - Related variables: `RDS_CREATE_HIGH_CPU_ALARM`, `RDS_MAX_CPU_UTILIZATION_THRESHOLD`
  - High disk queue depth alarm
    - Related variables: `RDS_CREATE_HIGH_QUEUE_DEPTH_ALARM`, `RDS_DISK_QUEUE_DEPTH_HIGH_THRESHOLD`
  - Low disk space alarm
    - Related variables: `RDS_CREATE_LOW_DISK_SPACE_ALARM`, `RDS_DISK_FREE_STORAGE_LOW_THRESHOLD`
  - Low freeable memory alarm
    - Related variables: `RDS_CREATE_LOW_MEMORY_SPACE_ALARM`, `RDS_LOW_MEMORY_THRESHOLD`
  - Maximum used transaction IDs alarm
      - Related variable: `RDS_MAX_USED_TRANSACTION_IDS_HIGH_THRESHOLD`

There are also the following alarms that can be enabled for RDS, but aren't created by default:
  - Low CPU credit alarm
    - Related variables: `RDS_CREATE_LOW_CPU_CREDIT_ALARM`, `RDS_LOW_CPU_CREDIT_BALANCE_THRESHOLD`
  - Low disk burst alarm
    - Related variables: `RDS_CREATE_LOW_DISK_BURST_ALARM`, `RDS_DISK_BURST_BALANCE_LOW_THRESHOLD`
  - High memory swap usage alarm
    - Related variables: `RDS_CREATE_SWAP_ALARM`, `RDS_CREATE_SWAP_ALARM`
  - Anomalous connection count alarm
    - Related variable: `RDS_CREATE_ANOMALY_ALARM`

For each of the RDS alarms, the variables `RDS_ALARM_EVALUATION_PERIOD` and `RDS_ALARM_STATISTIC_PERIOD` also apply.

These alarms can be viewed through the AWS management console by clicking `All alarms` in the CloudWatch menu.

The related variables can be added to the civiform_config.sh file of the forked civiform-deploy repository to customize the alarm settings or disable / enable certain alarms.

If there are alarms that you wish to have, please let us know.

### RDS database metrics

If you navigate to `RDS` in the AWS Console and click `Databases` in the navigation menu, you will see your database. In clicking on the database, you can see some basic metrics, like the current CPU percentage and activity. Additional metrics, which are the same as those in CloudWatch can be seen in the `Monitoring` section, and you can click other tabs (Logs, Configuration, etc.) to understand more about the Database configuration. 

Database customization variables, including the one for the instance class and storage amount can be added to the civiform_config.sh file of the forked civiform-deploy repository to customize the configuration. 

### Elastic Container Service (ECS) metrics

If you navigate to `Elastic Container Service` in the AWS Console and click `Clusters` in the menu, you'll see the CiviForm cluster. When you click on the service, you can see health metrics (similar to those in CloudWatch).

In the Configuration section of the service, you can see the Auto Scaling policies that are set up. 

By default, there is a high and low CPU auto-scaling policy, which adds or removes a task if the CPU is higher / lower than the alarm thresholds (mentioned above).

You can change the task and memory sizes by updating the variables `ECS_TASK_CPU` and `ECS_TASK_MEMORY` in the civiform_config.sh file of the forked civiform-deploy repository.