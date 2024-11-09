# Civic entity staffing overview

This document describes long-term CiviForm staffing needs for a deploying civic entity. Those needs include a non-technical administrative role, and technical roles to support the functioning of the software system.

### CiviForm administrator

The CiviForm Admin user role has the ability to define questions and definitions, designate data anonymization settings, define program applications, perform anonymized bulk applicant data exports, designate program administrators, and designate trusted intermediaries.

For programs to reuse applicant data, they must have harmonized data requirements, which requires someone to coordinate those data needs across programs. This is a natural fit for the CiviForm admin.

The role requires someone who is comfortable working with computers but it is not a technical role – all tasks can be completed using the CiviForm UI. Most importantly, the role requires someone who is able to interface with a large number of program staff to understand their data needs and design user-friendly application questionnaires with the CiviForm tool.

### Technical staff

Broadly speaking there are two options for technical staffing. One option, "keep the lights on", describes a minimum level of skill and staffing to keep a CiviForm deployment usable at a basic level. The other option, "custom code and incident response self-sufficiency", describes a minimum level of skill to take advantage of the opportunities for data integration that CiviForm presents.

#### Keep the lights on

**Two part-time IT professionals minimum**

_Note: this estimate is for a CiviForm deployment to a major public cloud provider. On-prem deployments require additional resources and an assessment of the civic entity's IT capabilities for an accurate estimate of an on-prem CiviForm deployment's IT staffing needs._

We recommend at least two part-time technical staff for supporting CiviForm at a minimum viable level of service. Two is the minimum level of redundancy necessary to ensure incident response availability. The equivalent of one FTE is the anticipated minimum for maintenance and operations efforts.

At this level of staffing we expect the CiviForm deployment to stay up to date with the latest security and feature patches from the mainline project. At this level of IT staffing incident response involves contacting the mainline open source team and waiting for their availbility for resolution.

Skills needed:

* familiarity with web services and basic web application architecture
* familiarity with command line interfaces
* basic familiarity with web security (e.g. provisioning SSL certificates)
* some knowledge of computer networking – IP addresses, DNS, ports, etc
* experience maintaining web servers in a cloud environment

#### Custom code and incident response self-sufficiency

**Two full time software developers minimum**

Staffing two full time software developers or more would allow for code-level customizations and a readier incident response posture. At this level of staffing, the civic entity is able to investigate and resolve production incidents independently without relying on the mainline open source developers.

The majority of those developers' time however could be spent on feature work which could include generic features and enhancements to the core system desired by the civic entity and/or custom features such as integration with external systems for administering programs (e.g. populating entries in a vehicle licensing database with applications submitted through CiviForm).

Additional skills needed:

* proficiency in Java or another statically typed language (e.g. C#, Go, or TypeScript)
* familiarity with relational databases
* understanding of web application security best practices
* comfortable working in open-source software ecosystems
