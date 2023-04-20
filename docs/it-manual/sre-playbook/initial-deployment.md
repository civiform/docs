# Initial Deployment

This guide is for SREs or DevOps folks. It explains how to do an initial deployment of CiviForm into your production cloud environment. CiviForm has the following deployment options:

* Can be deployed into AWS using [Terraform](terraform-deploy-system.md).
* Can be deployed into Azure using [Terraform](terraform-deploy-system.md).
* Can be custom deployed using in cloud or on prem using [CiviForm docker image](https://hub.docker.com/r/civiform/civiform) directly. Requires more configuration and maintainance. 
* _GCP support will be added upon request._

## Overview
This section describes the tasks necessary to deploy CiviForm new infrastructure. Many tasks can and should be done in parallel. Tasks may vary depending on the specifics of each organizations's needs, but the high-level components remain relevant.

### Information you will need 
The following details are necessary for the initial deployment. A staging environment can be brought up without most of these values, but you will need all of them for a complete production deployment. Deciding on some of them might require coordination across different departments, so it is helpful to start tackling them early.

- [ ] The infrastructure you wish to deploy on (e.g. a specific cloud provider or on-premises infrastructure).
  - [ ] If using a cloud provider, the region you wish to deploy in.
- [ ] An authentication provider for administrators (including `client_id`, `client_secret`, and `discovery_uri` details).
- [ ] An authentication provider for applicants (including `client_id`, `client_secret`, and `discovery_uri` details).
- [ ] Two domain names for your deployment (one for a staging environment, and one for the production environment).
- [ ] Government logo images for branding
- [ ] A support email address to display on the site
- [ ] An understanding of which existing program systems are necessary to integrate with via CiviForm's API.
- [ ] SSL certificates for domain names and/or load balancers.
