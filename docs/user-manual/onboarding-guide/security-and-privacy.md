# Security and privacy considerations

Residents seeking public assistance are often required to submit personal information to government programs without a clear sense of why that information is being submitted or how it is being used. Such a vulnerable interaction can be especially burdensome on someone in a time of need. As temporary stewards of residents' information, government programs have a responsibility to establish and maintain trust in how they manage residents' information and experiences. Here are some considerations to take into account when managing application information in CiviForm.

## Informing residents
Programs should [clearly explain](https://www.plainlanguage.gov/guidelines/) to residents how their information is being used when submitted through CiviForm, both across programs and for individual programs. For example, communicating the full application process for a given program in its description can help residents understand what happens after they submit their application, including follow-ups or any other information that may need to be provided. Additionally, explaining why certain pieces of information are required and who will be reviewing them can help give residents confidence and trust in the application process.

## How information is managed in CiviForm
When an applicant submits information via CiviForm, that information is submitted to a specific program. Administrators of that program can view any application submitted to that program, but they cannot view information the applicant has submitted to other programs. That is, from each program's perspective, the only information a program administrator can see is the information that the applicant has explicitly submitted to that program.

Once an application is submitted, the applicant's submitted information is stored in a database to be re-used when the applicant chooses to apply to another program, but it is not otherwise accessible outside of an application that has been submitted to a specific program.

When an applicant begins an application to another program, their previously-submitted information in CiviForm is used to pre-populate the new form with any questions they may have answered from other programs. Their information is not visible to the new program until the new application to that program is submitted, at which point only the information in that new program's application is visible to the new program administrators.

### Who can export information
Information in CiviForm can be exported by CiviForm Administrators, either via the [demography export UI](https://docs.civiform.us/user-manual/civiform-admin-guide/manage-questions#question-export-settings) or through [CiviForm's API](https://docs.civiform.us/it-manual/api). When API access is configured, each API key must be explicitly assigned a list programs that it has permission to access (i.e. an API key can be configured to allow access to only one program, or to multiple programs). CiviForm Administrators do not have inherent ability to view application information, but CiviForm can be configured to grant CiviForm Administrators that permission.

Program administrators can only view and export information for programs to which they are assigned. Importantly, program administrators can view and export *any application that has been submitted to their program*.

## Managing information across programs
If certain application information will be deliberately shared across programs by the organization administering CiviForm (for example, through a common intake form that is then sent to other programs as a referral), it is essential to communicate this process to residents and ask for their approval on which programs their information should or shouldn't be shared with. Providing a clear explanation for how common intake information might be used (e.g. for proactive outreach from programs) can help residents understand whether or not they see value in having their information shared with other programs.

## Working with trusted intermediaries
Trusted intermediaries can submit and modify applications on behalf of residents. When a trusted intermediary submits an application, any other staff member assigned to that trusted intermediary group can also view and modify each application submitted through that trusted intermediary.
