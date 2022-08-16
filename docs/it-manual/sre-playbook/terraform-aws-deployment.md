# AWS Deployment with Terraform Guide

Information specific to Civiform Terraform deploy scripts for AWS.

For general information see [Terraform deploy system](terraform-deploy-system.md).


## Infrastructure

![AWS System Diagram](https://user-images.githubusercontent.com/1741747/184951252-1a33c8c8-8a86-44ea-b39a-cebea71e7495.png)


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

After running setup or deploy script you can login to [AWS ECS console](https://console.aws.amazon.com/ecs/v2/clusters) to check status of Civiform. Make sure to select correct region in the top right corner.

You should see Cluster with app_preffix-civiform name. Click on it and go to Tasks tab. If everything is going well you should see task in the Running state.

<img width="1240" alt="Screen Shot 2022-08-15 at 5 18 55 PM" src="https://user-images.githubusercontent.com/1741747/184758808-c1081316-7baf-45dc-9c76-a64594a9de5e.png">

### Inspecting task config

You can see task configuration by clicking on Task definition tab, finding latest revision, and opening JSON tab. 

<img width="812" alt="Screen Shot 2022-08-15 at 5 21 53 PM" src="https://user-images.githubusercontent.com/1741747/184758833-fce81bec-9f2c-49be-a102-2d5b38aa58dd.png">


### Inspecting logs

You can see logs on the task page by clicking into specific task and selecting tab Logs.

<img width="1073" alt="Screen Shot 2022-08-15 at 5 23 27 PM" src="https://user-images.githubusercontent.com/1741747/184758931-a8374a7a-d1dc-4308-8676-7617d4237d7a.png">



Logs are also available in Cloudwatch. Search for app_prefix-civiformlogs group.

<img width="952" alt="Screen Shot 2022-08-15 at 5 26 42 PM" src="https://user-images.githubusercontent.com/1741747/184758880-f92b064b-658c-401e-ad71-175f64fde305.png">


 
