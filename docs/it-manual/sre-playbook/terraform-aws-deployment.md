# AWS Deployment with Terraform Guide

Information specific to Civiform Terraform deploy scripts for AWS.

For general information see [Terraform deploy system](terraform-deploy-system.md).


## Infrastructure

Civiform app:
* VPC
* Fargate ECS cluster
* RDS with Postgres
* S3 bucket
* SES

Supporting Infrastructure:
* S3 bucket for terraform backend state
* Cloudwatch export for logs

## Code and examples
Code can be found [here](https://github.com/civiform/civiform/tree/main/cloud/aws).

Our staging enviroment is at [staging-aws.civiform.dev](https://staging-aws.civiform.dev).

Config for staging environment is [here](https://github.com/civiform/staging-aws-deploy/blob/main/civiform_config.sh).

## Troubleshooting

After running setup or deploy script you can login to [AWS ECS console](https://console.aws.amazon.com/ecs/v2/clusters to check status of Civiform. Make sure to select correct region in the top right corner.

You should see Cluster with app_preffix-civiform name. Click on it and go to Tasks tab. If everything is going well you should see task in the Running state.

### Inspecting task config

You can see task configuration by clicking on Task definition tab, finding latest revision, and opening JSON tab. 

### Inspecting logs

You can see logs on the task page by clicking into specific task and selecting tab Logs.

Logs are also available in Cloudwatch. Search for app_prefix-civiformlogs group.

 
