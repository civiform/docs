# Deploy system technical overview

## Main technologies
The deployment system was originally a set of bash scripts. To make the system more maintainable and scalable for development, it is being transitioned to python. Much of the current state of the code base is a result of this ongoing transition. We use terraform, an infrastructure as code tool, to define the infrastructure that a deployment requiress and we support Aws and Azure as cloud providers which a civic entity can run their server on. 

## Code locations
There are 3 major code locations that you will need to undestand for effective development on the deploy system.
Most of the deploy system code is located in the [cloud-deploy-infra](https://github.com/civiform/cloud-deploy-infra) git repository.
Scripts that a user, such as the operations team of a civic entity, runs to configure and deploy a system is in a separate [civiform-deploy](https://github.com/civiform/civiform-deploy) repository. Both repositories are separate from the [civiform](https://github.com/civiform/civiform)repository, which contains the server code.
You will be working across those three repositories and changes in one repository are not automatically visible in the others. You will come across implications of this throughout the setup instructions and developer guide.

## Bringing up a new deployment
At a high level, the operations team of a civic entity does the following from the civiform-deploy repository
* provide various configuration values for the deployment (see an example config for aws staging [here](https://github.com/civiform/civiform-staging-deploy/blob/main/aws_staging_civiform_config.sh))
* run the [setup script](https://github.com/civiform/civiform-deploy/blob/main/bin/setup) to start the deployment. 
The script extracts the provided configuration. It declares the required infrastructure using terraform and brings up the infrastructure and server on the cloud provider(AWS or Azure).

We recommend also having a look at the [initial deployment instructions]{https://docs.civiform.us/it-manual/sre-playbook/initial-deployment} in the it-manual. The it-manual contains instructions for the operations teams who are in charge of deploying a system for a civic entity. Reading it will make you see the system from a users' perspective.

