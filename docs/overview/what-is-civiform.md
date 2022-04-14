# What is CiviForm?

CiviForm is free, open-source software that was built with support from Google.org Fellows and will be managed by a product steward outside of Google. CiviForm is deployed and maintained by civic entities themselves.&#x20;

### The Problem

Signing up for critical government services often requires reentering the same information on each application. Our research shows that the need to repeatedly navigate complex requirements and re-enter sensitive personal information can feel dehumanizing. Moreover, people seeking to help residents apply for programs, such as local administrators or community-based organizations, must spend valuable time and resources to work through duplicative data.&#x20;

In times of crisis, these problems can be particularly acute (e.g. during a public health emergency like COVID-19).

### Our Solution

CiviForm supports a more human-centered approach to public benefits applications. When someone applies to a program, their data is stored in a centralized program database so that they see questions and programs that are most relevant to their needs. Applicants can then choose to re-use that data for other applications as they see fit.&#x20;

For applicants and their trusted intermediaries, this means that once you enter personal information for one program, you won’t need to re-enter it for future assistance. For government program administrators and local staff, this means less time collecting and sorting through redundant data across programs.

CiviForm is written in Java using the [Play Framework](https://www.playframework.com) backed by a [PostgreSQL](https://www.postgresql.org) database. The application is containerized for development and deployment using Docker, and deployed using container management systems that work with all major cloud providers. For authentication, CiviForm uses OIDC and SAML to integrate with existing single-sign-on services such as Microsoft ADFS, Oracle IDCS, and LoginRadius, allowing program administrators and residents alike to authenticate with existing accounts.

All data is managed by the civic entity and thus their own security and privacy policies apply. Google does not have access to applicant data in CiviForm. It was built as a low-code solution for government employees to respond to the needs of their community without needing technical expertise.
