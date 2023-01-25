# Email configuration

CiviForm uses email to send notifications to program administrators, applicants
and for few other functionalities. Email addresses are provided in the
deployment configuration file. Below is the list of different email addresses
required by deployment and some recommendations on how to organize them.

## Email addresses

**Support email address**  Applicants see this email address in the footer of
each page as a mailto link. Config variable is
`CIVIC_ENTITY_SUPPORT_EMAIL_ADDRESS`.

**Sender email address**  This email address is used as a sender for all
notifications sent by the CiviForm. Example notifications are new applications
(sent to program admins), program status changes (sent to applicants). Config
variable are `SENDER_EMAIL_ADDRESS`.

**Notifications recipients in staging**. These email addresses are used only in
staging. Instead of sending email notifications to program admins - they are
sent to the provided email addresses. Config variables:
`STAGING_PROGRAM_ADMIN_NOTIFICATION_MAILING_LIST`,
`STAGING_TI_NOTIFICATION_MAILING_LIST`,
`STAGING_APPLICANT_NOTIFICATION_MAILING_LIST`. 

## Emails in staging

For simplicity we recommend to have a single email address for staging and use
it in all the variables listed above.

## Emails in prod

If your organization already contains tech support email - use it. Otherwise
you can create something like CiviForm@yourorganization.gov. For simplicity you
can use the same email as sender. That way admins and applicants can reply to
the email if they are having difficulties or questions about notification they
received. Remember that that someone needs to regularly check inbox for the
email addresses used in CiviForm. 

## AWS SES

CiviForm uses the AWS Simple Email Service (SES) to send emails. To send emails
from a certain address, a verified identity must be created for the address.
There are two kinds of verified identities: email-verified and domain-verified.

In a new deployment, SES starts in sandbox mode. While SES is in sandbox mode,
it can only send emails to verified identities. **SES must be taken out of
sandbox mode for prod deployment, otherwise it will not be able to send emails
to applicants, program admins, and TIs).** Follow [these
steps](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
to take SES out of sandbox mode.

We create email-verified identities for each unique email specified by
`SENDER_EMAIL_ADDRESS`, `STAGING_PROGRAM_ADMIN_NOTIFICATION_MAILING_LIST`,
`STAGING_TI_NOTIFICATION_MAILING_LIST`, and
`STAGING_APPLICANT_NOTIFICATION_MAILING_LIST`. After the initial deployment,
AWS will send 'Email Address Verification Request' emails to each created
identity. You must click the verification link in the email for the identity to
be verified. This allows you to test email sending in staging deployments
without taking SES out of sandbox mode.

### Using a no-reply email address for SENDER_EMAIL_ADDRESS

If you wish to use a no-reply address with no ability to receive emails, there
are two options:

1. Configure the no-reply address so that it can receive emails before the
   first deployment, deploy CiviForm, click the verification link in the 'Email
   Address Verification Request' email sent to the no-reply address, then
   configure the no-reply address to not receive any emails.

2. Create a domain-verified SES identity. For example, to use
   'no-reply@mystate.gov', you must create a domain-verified identity for
   'mystate.gov'.

   Follow the steps in the 'Creating a domain identity' section of [this
   guide](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html).
   To verify the domain, you will need to add CNAME records in your domain
   registrar.

## Testing emails 

After deploying CiviForm to staging or prod it's important to test that email
integration works correctly. Here is the list of things to try: 

1. Open CiviForm site as applicant and send email to the technical support
   email address provided in the footer.
2. Create a program with a status that has email content.
3. Apply as an applicant.
4. Program Admin, applicant (and TI if present) should receive the email.
4. As a Program Admin view the application and set the status.
5. The applicant (and TI if present) should receive the email.

