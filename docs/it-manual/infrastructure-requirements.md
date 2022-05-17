# Infrastructure Requirements

This document describes the infrastructure required to deploy CiviForm into a new jurisdiction.

CiviForm is a classic web-based client-server architecture which stores applicant data in a database. The application server typically runs in a Docker container, a type of virtualized environment which contains most of the pieces described below.

### The Subsystems

Basic architecture

![Screenshot from 2022-05-17 12-37-22](https://user-images.githubusercontent.com/473671/168895920-7662b8cd-83b0-4437-ae26-961e37450e59.png)

Note that there usually is not direct traffic between the CiviForm server and identity providers (dotted lines). Rather, users authenticate by visiting CiviForm, which redirects their browser to an identity provider, which in turn redirects them back to CiviForm.

**Load Balancer**

Software-defined load balancer to route incoming client traffic to an array of backends; required to ensure the software scales up gracefully with increased load.

If running in a cloud-service, an example would be AWS ELB or Azure Load Balancer.

If running on-prem, examples would be SeeSaw, nginx, HA Proxy, Kubernetes load balancer, etc.

**Database**

CiviForm uses the _PostgreSQL_ database.

* Only a single instance is necessary, with regular snapshot backups.
* Estimated **2 vCPU, 8GB memory, 50GB storage**.

**Application Servers**

These are the servers receiving & processing client requests.

* Minimum **2 instances** , each with **2 vCPU, 8GB memory**

**File Storage**

File storage needs are for applicant-uploaded files and depend entirely upon the civic entity's configuration and usage. We recommend limiting applicant file upload size to 10MB per file.

**Email Sending Service**

For a cloud deployment, examples would be AWS SNS or Azure SendGrid.

For a local deployment, one would need to interface with the government's own email systems.

**Authentication Systems**

Two systems are needed: one which is configured to authenticate applicants, and one configured to authenticate administrators. Both systems must be OIDC compliant, and the adminstrator-systems must have configurable claims.

### Why Cloud Deployment is Preferred

CiviForm was originally designed to run in a cloud-native environment. In theory, it could be run "on prem" (with a lot of work) if dissected into separate subsystems running across multiple on-prem machines.

That said, CiviForm depends on many small services that are low-cost add-ons in the cloud. Doing an "on prem" version means these services would need to be developed, deployed, and maintained internally. That list includes:

* provisioning
* deployment
* monitoring
* file storage and file system scaling
* email notifications
* database backups and recovery and storage scaling
* application server scaling

On-prem deployment:

_Pros_

* Total control of all machines
* Total control of all sensitive data
* Can use existing pre-approved software.

_Cons_

* Hardware capex & opex becomes expensive at scale
* Given the limited size and time-availability of civic IT departments, on-prem is much more work to scale up, and likely less reliable (more outages). Will require
* Requires building bespoke systems that are much more laborious for new contributors/maintainers to work with. In contrast, major cloud providers have extensive training and certification offerings making it straightforward to train existing personnel and identify qualified job applicants.

Cloud deployment:

_Pros_

* Instant scalability (just "add" more capacity)
* Likely more reliable (fewer outages)
* Opex cost is likely less than on-prem machine maintenance
* More efficient use of IT staff's time
* Dramatically less technical effort put towards infrastructure, meaning more time can go toward ROC's product goals

_Cons_

* Requires careful audit to ensure Cloud service is meeting government security & privacy requirements. (Many Cloud services have special clusters designed for this already.)
* May require multiple levels of gov't approval to deploy.

### What Cloud deployment looks like

In general, a **cloud provider** refers to a business like AWS, Azure, or GCP.

Similarly, a **cloud service** refers to a service within the provider (such as file storage or container orchestration.)

From the IT department's point of view:

* The CiviForm system is comprised of a set of resources (e.g. application servers, PostgreSQL database, file storage) will be running in a virtual private cloud (VPC).
  * A virtual private cloud ensures the different components of the CiviForm systems are only accessible by the entities that should have access. E.g. the database is only accessible from the application servers, the application servers are only accessible from the load balancer, etc
* For CiviForm, we have designed the system's resources and deployment to be controlled in a set of text files – these are [Terraform](https://www.terraform.io) configuration files. IT staff has the freedom to modify these files and change how cloud resources deploy, how much disk/ram/cpu to give each, etc.
* Terraform then deploys the resources to a commercial cloud provider – whether it be AWS, GCP, or Azure.
* CiviForm's Java application servers run in a tool called Docker, all cloud providers understand (natively) how to run a Docker container in groups, using container orchestration services.
  * AWS has a container service called ECS; Azure has a container service called ACI. These services run the server code in a Docker container, but are using the native cloud app-services systems under the hood.
  * Under development, a local Docker instance contains a private PostgreSQL database within the same container as the app servers. In production, multiple Docker containers are deployed to the cloud, which then access a shared SQL database (e.g. RDS on AWS, or AzureSQL on Azure).

Cloud providers also have:

* ...their own load balancing systems needed by CiviForm – they will properly route and balance incoming requests to the containers.
* ...file storage systems (e.g. to allocate to the DB and store resident-uploaded files)
* ...email sending systems

Costs of deploying into the Cloud:

* _Training_: IT staff will need to learn basic proficiency with the cloud provider.
  * How to manage cloud accounts
  * How to monitor the health / traffic / resource consumption of their containers
  * How to modify the quantity of resources consumed
* _Operating Expense_
  * Cloud providers will charge a monthly bill for resource consumption.
