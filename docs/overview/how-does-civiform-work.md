---
description: Overview of the different roles for CiviForm users.
---

# How does CiviForm work?

CiviForm is a universal application tool that lets people in need easily access and apply for essential benefits and services.

There are 4 roles associated with the use of CiviForm:

* **CiviForm Admins**—Government staff that administer the tool. They set up CiviForm, create application questions, build program forms, and manage permissions for Trusted Intermediaries and Program Admins.
* **Program Admins**—Government staff that administer benefit programs and handle applications for these programs.
* **Trusted Intermediaries**—Community-Based Organization (CBO) staff that help Applicants apply for government benefit programs.
* **Applicants**—Residents seeking to apply for government benefit programs.

Once CiviForm is deployed within a jurisdiction, the CiviForm Admin can start creating basic questions that will live in the global question bank. For example, name, address, and age questions. Once the questions are created, the CiviForm Admin can create programs residents can apply to. Programs are made up of either new questions or previously created ones selected from the deployment’s global question bank.

Questions are added to screens that are grouped into logically themed sections of data (such as contact info, employment, education, household income, etc.). Once the program’s published, it appears as a browser-based form.

Next, Trusted Intermediaries can use the form to help residents apply to services or they can alert individual Applicants that programs are open to applications. If the Applicant has applied to programs using CiviForm in the past, and they elected to save their information, CiviForm can reuse the Applicant’s stored information for future applications. In fact, Trusted Intermediaries and Applicants are not presented with questions they have already answered when applying for subsequent programs. This speeds up the application process and ensures accuracy by using previously vetted information. CiviForm also allows Trusted Intermediaries to manage multiple clients through the application process.

Once the application is submitted, the Program Admin receives an email notification that there's been a new application. They can review the application data and download it to a comma-separated values (CSV) file. Processing and approval of the application, if it meets the requirements, are done outside the CiviForm application.

Once the application is approved, an email is sent to the Applicant or Trusted Intermediary by the Program Admin. The application is marked as approved and the Applicant’s information is available for future program applications. If the CBO sets an email address for the Applicant during the application process, the Applicant can log into the account created for them by the CBO.

### CiviForm data management & security

CiviForm strives to adhere to the privacy and security standards enforced by the governments using CiviForm. Further, CiviForm makes sure Applicant data is stored on a secure cloud server. For security, CiviForm is built to defend against cross-site scripting (XSS), SQL injection, cross-site request forgery (CSRF), and other common hacking tactics.

The following specifies the data each role has access to.

#### CiviForm Admins

They might have access to aggregated and anonymized data for analytics purposes.

#### Program Admins

The only people who can review Applicants’ submitted applications for a given program, including any personally identifiable information (PII), are the Program Admins assigned to manage the program. They can also download all applications submitted to-date as a CSV. This data can be copied to Google Sheets, Microsoft Excel, or your choice of Customer Relationship Management (CRM) tools. We recommend Program Admins avoid downloading artifacts with PII to their device.

#### Trusted Intermediaries

Staff of Trusted Intermediary Groups can create profiles for their clients to help them apply for programs. Applicant PII created this way is stored on our secure cloud servers. Trusted Intermediary Groups can only view the Applicant data their staff have entered. Applicant-entered PII is not visible to other Trusted Intermediary Groups.
