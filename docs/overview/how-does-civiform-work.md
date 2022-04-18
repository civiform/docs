---
description: Overview of Civiform users and how the product serves them.
---

# How does CiviForm work?

## The 4 users of CiviForm

Through the Google.org Fellowship, user researchers identified 4 key users of CiviForm:

* [Applicants](how-does-civiform-work.md#applicant-experience) are residents seeking public services.
* [Trusted Intermediaries](how-does-civiform-work.md#trusted-intermediary-experience) are third-parties who help residents navigate the application process and access public services (for example, community-based organizations)
* [CiviForm Admin](how-does-civiform-work.md#civiform-admin-experience) are government employees who create and manage forms for programs.
* [Program Admin](how-does-civiform-work.md#undefined) are government employees who review and make decisions about applications.

Read on to learn about the features for each user type. You can also watch a recent demo of CiviForm below:

{% embed url="https://youtu.be/AIYZEd5WAcU" %}
Product demo in January 2022.
{% endembed %}

#### A note on data management & security:

All data is managed by the civic entity and thus their own security and privacy policies apply. For security, CiviForm is built to defend against cross-site scripting (XSS), SQL injection, cross-site request forgery (CSRF), and other common hacking tactics.

## Applicant Experience

Expand each heading below to learn more about features for applicants.

<details>

<summary><strong>Find all benefits programs in one place</strong></summary>

Rather than clicking through disparate pages to find public benefits programs, residents can explore all programs for which they may be eligible in one, centralized location.&#x20;

![](<../.gitbook/assets/Landing page of programs (1).png>)

_Click to enlarge image._

</details>

<details>

<summary>Apply online &#x26; in your language</summary>

Applying for public assistance often requires residents to go in-person to an office, download and reupload PDF files, or call an agency. CiviForm brings applications online. Applications are written in plain language and available in several languages. The status bar at the top also helps applicants track their progress, with the option to save their progress and finish the application later.\
![](<../.gitbook/assets/Filling out a field on an application.png>)

_Click to enlarge image._

</details>

<details>

<summary>Never re-enter the same information on applications</summary>

Applications for public benefits programs often require applicants to re-enter the same basic information such as address, income, or social security number.&#x20;

With CiviForm’s centralized database, once an applicant enters their information once, they do not need to re-enter it ever again. When applying for a new program, previously entered information will appear as pre-filled. Previously uploaded documents will also be available for reuse. If an applicant does want to change a data point, they can do so by editing it directly on the form.

![](<../.gitbook/assets/Starting a new application with prefilled info.png>)

_Click to enlarge image._

</details>

## Trusted Intermediary Experience

Residents often turn to local community-based organizations (CBOs) or other third parties to help navigate public benefits programs. These trusted intermediaries are juggling various databases, managing hundreds of applications, and working with several families per day. With CiviForm’s one-stop-shop for your community’s benefits applications, trusted intermediaries have their own accounts to manage their workload from a simple interface.

Expand each heading below to learn more about features for trusted intermediaries.

<details>

<summary>Apply on behalf of a residents</summary>

From their own accounts, trusted intermediaries can create, update, and manage applications on behalf of their clients. Applicant personally identifiable information (PII) created this way is stored on our secure cloud servers. Trusted intermediaries can only view the data their staff have entered.

The accounts of trusted intermediaries are added and managed by government employees.

![](<../.gitbook/assets/Adding a new trusted intermediary.png>)

_Click to enlarge image._

</details>

<details>

<summary>Manage workload from the Trusted Intermediary Dashboard</summary>

From filtering applicants by programs to tracking application status, trusted intermediaries can visualize and manage their dynamic workload from their own dashboard. Applicant information is viewable by authorized users only.

</details>

## Civiform Admin Experience

CiviForm Admin are the government employees who create and update applications. These users manage CiviForm for their civic entity, build custom applications, and can maintain the tool without ever needing to go into the code. They may be provisioned access to aggregated and anonymized data for analytics purposes.

&#x20;Expand each heading below to learn more about features for CiviForm admin.

<details>

<summary><strong>Create, update, and publish program applications in one place</strong></summary>

CiviForm Admins can use the platform’s unified application builder to create and publish applications for public benefits programs. For each program created, these users can create and define the requirements for an application.&#x20;

CiviForm Admin can also use ‘question types’ to validate that information is entered correctly. For example, if a CiviForm Admin wants addresses to be inputted in a consistent format, they can select the ‘address question type’ that CiviForm will validate for accuracy. The meaning of that address field however will be determined by the CiviForm Admin (e.g. is it the applicant’s address? an employer address? a spouse?).

When an application needs to be updated, a new version will be created with all past versions stored in the tool for future reference.

![](<../.gitbook/assets/Unified Application builder (1).png>)

_Click to enlarge image._

</details>

<details>

<summary><strong>Reuse questions from a shared question bank</strong></summary>

When a CiviForm Admin creates a new question for an application, it is saved in a global, shared question bank. This shared repository removes the need to recreate questions for applications such as date of birth or social security number.

![](<../.gitbook/assets/Question bank (1).png>)

_Click to enlarge image._

</details>

<details>

<summary>Show/hide relevant information to applicants</summary>

Many times, a form will need to ask or show people different information based on their answers. For example, an applicant with dependents below the age of 12 should see questions related to school benefits. Alternatively, an applicant below the age of 65 should not be shown benefits for seniors. CiviForm supports these scenarios through visibility conditions.&#x20;

When a CiviForm Admin creates conditions to show or hide information based on previous answers, applicants will see questions that are most relevant to their situation. For example, CiviForm can determine if additional information is needed or if the applicant can skip part of the application.&#x20;

Our team is also working on features that will show related benefits programs for which an applicant may be eligible.

![](<../.gitbook/assets/Show or hide a question.png>)

_Click to enlarge image._

</details>

## Program Admin Experience

Program Admin are government employees who review and make determinations about applications for public benefits. Using CiviForm, they can improve existing workflows and gain insights about utilization of programs.

Expand the heading below to learn more about features for Program Admin.

<details>

<summary><strong>Export and disaggregate data</strong></summary>

With CiviForm, Program Admins can review applications directly in the tool. They can also export data into a CSV file if preferred. CiviForm features allow for disaggregation of data to identify trends within applications and resident needs. Our team is currently working on several features for Program Admins to filter, make non-applicant facing notes, and integrate CiviForm into existing systems using an API.

![](<../.gitbook/assets/Viewing all applications with option to download csv (1).png>)

_Click to enlarge image._

</details>

<details>

<summary>Assign applications to the right Program Admin</summary>

The only people who can review submitted applications for a given program, including any personally identifiable information (PII), are the Program Admins assigned to manage the program.&#x20;

</details>

