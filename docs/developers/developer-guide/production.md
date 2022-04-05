# Production
Our production infrastructure is managed declaratively by [cloudformation](https://github.com/seattle-uat/civiform/tree/main/infra). To deploy, `run bin/deploy-prod`. You will need the AWS CLI - `brew install awscli`.

Production can also be deployed by kicking off the workflow for this prober [here](https://github.com/seattle-uat/civiform/actions/workflows/cron.yaml). We have turned off scheduled probe and deploys for now.

## Resources not managed by CloudFormation

### DNS records
The records for staging.seattle.civiform.com and seattle.civiform.com are created in hosted zones managed via Route 53.  
The civiform.com domain name is registered through [Google Domains](https://domains.google.com/registrar/civiform.com/dns) and DNS for the domain is configured to use custom name servers pointing to AWS Route 53. This is necessary to allow AWS to dynamically reassign hosts. 

The City of Seattle maintains the DNS record for civiform.seattle.gov. While this should change in the future to avoid taking a dependency on civiform.com, civiform.seattle.gov is currently an alias for seattle.civiform.com so Seattle can leverage AWS name servers without delegating control over an entire subdomain.

### SSL Certificates
The SSL certs for staging.seattle.civiform.com and seattle.civiform.com are managed in AWS Certificate Manager.  The certificate for civiform.seattle.gov is managed by the City of Seattle and is stored in Certificate Manager.  Certificate rotation will be enabled for *.civiform.com, but not for civiform.seattle.gov, since it is impossible to rotate manually managed certificates.

### Notification endpoints
The messages for tickets or production failures are sent to SNS queues which are maintained by CloudFormation.  The distribution lists of those queues are managed in the console.

### Log processing
Our logs are processed by [this Lambda function](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/prod-log-processor?tab=code), which is also managed by the console.  You'll need to be signed in to the Civiform AWS account, which you can reach [here](https://seattle-commercial.awsapps.com/start#/).

The logging input is configured in [this panel](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/prod-log-processor?tab=configure), and you can read more about how to work with Lambda and CloudWatch logs [here](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) and [here](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchlogs.html).
