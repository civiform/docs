---
layout: layouts/page.njk
title: CiviForm | Technical Readiness Guide
---
# CiviForm Technical Readiness Guide

## Overview

CiviForm is a powerful open-source tool for governments that helps simplify the administration of benefit programs and makes it easier for residents to access those benefits. It lets residents and community organizations find and apply to multiple services in one place.

This doc is for a technical audience. Whoever will deploy CiviForm can use this  guide to learn how to deploy the tool on a cloud provider. It includes an overview and a detailed guide of all steps needed at each stage.

To ensure a successful CiviForm implementation, read through the guide below and create your plan to deploy CiviForm.

## Understanding Your Needs and Goals

* Decide who will serve as the [CiviForm Admin](https://docs.civiform.us/overview/how-does-civiform-work#civiform-admin-experience), to lead efforts such as data integrations, across your civic entity.  
  * Decide who will own and maintain your CiviForm deployment in the long term (an IT team, Digital Services, or other).  
  * Make sure any engineers are added to all CiviForm engineering meetings.

* Ensure that you have a “Technical Champion”, “Service Owner”, “Technical Project Manager”, or similar person to ensure proper integration into your IT infrastructure and program technical workflow (including understanding APIs, monitoring, and data integrations).

* Security, Compliance, Data Privacy, and Access Controls  
  * Security: Review the [CiviForm Security Brief](https://docs.google.com/document/d/1E2FeXpnpTF-JJiiszUhFDAgF8aPVTuE7HUbD245oTpg/edit) and ensure that you understand the necessary security reviews and processes that are required from your organization.  
  * Data privacy: Implement robust security measures to protect citizen data.  
  * Compliance: Ensure adherence to relevant data protection regulations and accessibility laws.  
  * Access controls: Establish clear permissions and roles for staff to manage form access and data.

* Application Hosting  
  * Decide where the application will be hosted (e.g. cloud infrastructure, on-premise infrastructure). To ensure that CiviForm prioritizes the needs of the community, let CiviForm Governance know which Cloud, hosting, or on-premises environment that you are deploying into.

* Deployment  
  * Review the Initial Deployment Guide for technical requirements: [https://docs.civiform.us/it-manual/sre-playbook/initial-deployment](https://docs.civiform.us/it-manual/sre-playbook/initial-deployment)

* Integration with existing systems or leveraging existing data  
  * Consider which integrations may be required for key functionality such as Esri ArcGIS integration for Eligibility Checking or API integrations for referrals.  
  * Review the [CiviForm API](https://docs.civiform.us/it-manual/api).

* Authentication  
  * Review the playbook to help choose an authentication provider: [https://docs.civiform.us/it-manual/sre-playbook/initial-deployment/authentication-providers](https://docs.civiform.us/it-manual/sre-playbook/initial-deployment/authentication-providers)

* Ensure that the infrastructure will be paid for and maintained for the entire length of the project.  (Name individuals or group leads).  
  * What do each team’s project commitments look like in 6 months, 1 year, 5 years?  
  * What do each team’s staffing commitments look like in the next 6 months, 1 year, 5 years?

* Integration with Existing Systems  
  * Compatibility assessment: Evaluate how CiviForm integrates with your current systems (CRM, data hub, referral systems, GIS).  
  * Data migration: Develop a plan to transition application forms from existing systems to CiviForm.  
  * API utilization: Explore using CiviForm APIs to connect with other platforms for seamless data exchange.  
      
* Optional: Onboard engineers to CiviForm code base as per:  
  * [https://github.com/civiform/civiform/wiki/Technical-contribution-guide](https://github.com/civiform/civiform/wiki/Technical-contribution-guide)  
  * [https://github.com/civiform/civiform/wiki/New-Full-Time-SWE-Onboarding-Material](https://github.com/civiform/civiform/wiki/New-Full-Time-SWE-Onboarding-Material)

## Preparation for Launch 

* Application Production and Launch Planning  
  * Agree on the criteria that must be met before an application is publicly launched (e.g. code testing, Quality Assurance (QA), User Research, etc.)  
  * Ensure you have a plan for updating to new release versions and are comfortable doing so.  
  * Become familiar with how to turn on and off feature flags (and other settings) via the Admin Settings Panel or your deployment configuration.  
  * Plan and test a database recovery process for your deployed instance. For example, [restoring the db to a previous snapshot for AW](https://docs.civiform.us/it-manual/sre-playbook/database-disaster-recovery)S.   
  * Ensure you can access the production database for emergency repairs, eg. via [pgadmin](https://docs.civiform.us/it-manual/sre-playbook/production-database-access).  
  * Review the logs for your cloud provider as you test to catch any warnings or errors.  
  * Test rolling back to an older version of CiviForm.

* Secure a domain address for your CiviForm instance (e.g. civiform.\<location\>.gov) as well as a test or staging instance (e.g. civiform-staging.\<location\>.gov).

* Set up a [metrics dashboard](https://docs.civiform.us/it-manual/sre-playbook/monitoring) to track important technical metrics.

* Ensure you have technical staff on standby to handle any issues that may arise.

* Update your database size and task count, depending on how much traffic you expect to get

* Create a data management strategy: Plan how to store, manage, and use collected data effectively and in ways that preserve resident privacy.

* Create a staging or demo environment for your CiviForm deployment that allows initial program development which can be reviewed or demoed with internal stakeholders before deployment.

* Perform the [Initial Deployment](https://docs.civiform.us/it-manual/sre-playbook/initial-deployment).

* Understand and configure appropriate [monitoring](https://docs.civiform.us/it-manual/sre-playbook/monitoring) for CiviForm.

* Testing and Launch  
  * Thorough testing: Conduct comprehensive testing to identify and fix issues before launch.  
  * Pilot program: Consider doing a pilot launch to gather feedback and make improvements before your official launch.

* Training and Support  
  * Staff training: Provide comprehensive training to staff on deployment, troubleshooting, architecture, API usage, connection to GIS systems, form creation & management, reporting, and data analysis.  
  * User support: Offer clear instructions and support options for residents using the forms.

## Join the CiviForm community

* Understand how the CiviForm community works:   
  * [Roles, Committees, & Responsibilities | CiviForm Docs](https://docs.civiform.us/governance-and-management/governance/roles-committees-and-responsibilities)  
  * [Governance Processes | CiviForm Docs](https://docs.civiform.us/governance-and-management/governance/governance-processes)  
  * [Development Principles | CiviForm Docs](https://docs.civiform.us/governance-and-management/governance/development-principles)

* Review communication channels as detailed [https://docs.civiform.us/governance-and-management/governance/communication](https://docs.civiform.us/governance-and-management/governance/communication)  
  * Join [CiviForm Slack](https://civiform.slack.com/), join the Engineering channels, and introduce yourself in the \#introductions channel  
  * Join the appropriate mailing lists as linked above  
  * Create a [Github](https://github.com/) account so you can [file issues for bugs and/or feature requests](https://github.com/civiform/civiform/issues)

* Consider joining the CiviForm community meetings:  
  * Every other week join the CiviForm Product Design Committee to learn about new features or ask questions of fellow governments using CiviForm  
  * Monthly join CiviForm the Governance group to learn about best practices, new features and tools, as well as how other civic entities are leveraging CiviForm  
  * If engineering time is available, CiviForm welcomes contributions of new features, bug fixes, etc.

## Next steps \- Ongoing Evaluation and Improvement

* [Upgrading to a New Release](https://docs.civiform.us/it-manual/sre-playbook/upgrading-to-a-new-release)  
* [Troubleshooting Production](https://docs.civiform.us/it-manual/sre-playbook/troubleshooting-production)  
* [Production Database Access](https://docs.civiform.us/it-manual/sre-playbook/production-database-access)  
* [Database Disaster Recovery](https://docs.civiform.us/it-manual/sre-playbook/database-disaster-recovery)

## Links to other useful documentation:

* [https://docs.civiform.us/overview/what-is-civiform](https://docs.civiform.us/overview/what-is-civiform)  
* [https://docs.civiform.us/overview/how-does-civiform-work](https://docs.civiform.us/overview/how-does-civiform-work)  
* [https://docs.civiform.us/user-manual/onboarding-guide](https://docs.civiform.us/user-manual/onboarding-guide)

