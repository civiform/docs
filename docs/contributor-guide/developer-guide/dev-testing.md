# Development testing

Below are ways to locally evaluate how the system works with external resources.

These assume you're running a local dev server using `bin/run-dev`.

Many of these will assume you have the referenced host name in your /etc/hosts file and any browser proxies turned off as it blocks the /etc/hosts routes.

## Authentication

We run a local fake OIDC that you can use to log in with fake credentials.

1. Click the `Log In` button
1. Enter any username and password to make a new account or re-use a previous one, then click `Sign In`
1. Click `Continue` on the scopes Authorization page

You should now be logged in as a named Applicant.  You can re-login as that applicant to see previous submissions and otherwise exercise flow that require a non-guest applicant.


## Email

Sent emails can be viewed at: http://localhost.localstack.cloud:4566/_localstack/ses

To view the output nicer you can use the [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) extension

## File Upload

Make sure to add `localstack` and `azurite` to `/etc/hosts` prior to trying file upload within the dev stack. See [these docs](https://docs.civiform.us/contributor-guide/developer-guide/getting-started#setting-up-routing-for-local-testing) for details.

### AWS

**Known issue:** AWS-based file uploads which use localstack only really work with empty PNG files due to https://github.com/localstack/localstack/issues/6588. Until this is fixed, generate an empty PNG file on your machine and use this to upload:

```
touch emptyfile.png
```

### Azure

No extra configuration required.
