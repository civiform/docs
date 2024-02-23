# Authentication

CiviForm supports two different flows for authentication:
- Applicant authentication - how residents and trusted intermediaries or community based organizations will log into CiviForm
  - Accessed by the "Log in" or "Create account" buttons at the top right of any page or in the middle of the home page
  - Examples providers include: Login.gov, Oracle IDCS, LoginRadius, Generic OIDC (i.e. Auth0 or Google Identity)
- Admin authentication - how CiviForm administrators and program administrators log into CiviForm
  - Accessed by the "Are you an administrator? Admin login" prompt at the bottom of the home page
  - Example providers include: Okta and Azure AD

Choosing an authentication provider involves various considerations, including price, existing login providers used by other sites managed by the city, and ease of use for both the city staff and the people logging in.

Once an authentication provider is chosen, it is not recommended that it is changed, since data associating an applicant to their applications would be lost.

## Authentication setup

At a high level, most authentication setups will involve:

1. Some setup through the authentication provider's website
2. Adding configuration values into the config.sh file of the deployment
3. Updating AWS Secrets Manager with the client ID and secret values

### Admin authentication setup

- Okta and generic OIDC: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#generic-oidc)
- Azure AD and ADFS : follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#configure-azure-ad)

### Applicant authentication setup

- Generic OIDC: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#generic-oidc-oidc)
  - Auth0: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#generic-oidc-example-auth0)
  - Google Identity: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#generic-oidc-example-google-identity)
- Login.gov: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#logingov-oidc)
- Login Radius: follow steps [here](https://github.com/civiform/civiform/wiki/Authentication-Providers#loginradius-saml)