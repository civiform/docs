# Authentication Providers

CiviForm supports applicant and admin authentication via OpenID Connect (OIDC). We use [pac4j](https://www.pac4j.org/) for auth which hides most of the gritty details. But many auth providers deviations from the [OpenID specifications](https://openid.net/connect/). In those cases we need to dig into the spec to debug and fix issues. You can find debugging tips at the end of this page.

Below we'll go over the implementation and configuration steps for currently supported authentication providers. A Civiform deployment should have exactly one admin authentication provider and one applicant authentication provider configured.

## Getting started exercise

To familiarize yourself with OIDC it is useful to go through a setup using any OIDC provider. Setup across all providers roughly resemble one another. For practice purpose use https://auth0.com. CiviForm uses it on staging instances. Steps:

1. **Get access to CiviForm auth0.com account.**  
   Ask someone on the team to add you to the account (Settings -> Tenant Members -> Add member).
2. **Create test app.**  
   Create a test app on auth0.com. Take a look at "CiviForm AWS Staging" app as example. Use http://localhost:9000 as your domain.
3. **Configure local CiviForm.**  
   Set  the necessary settings in [application.conf](https://github.com/civiform/civiform/blob/main/server/conf/application.conf). They include `applicant_generic_oidc.client_id`, `applicant_generic_oidc.discovery_uri`. 
4. **Run CiviForm and test log in.**  
   You should be redirected to auth0.com and go through the login process. At the end you should be redirected back to CiviForm.
   
## Admin Authentication

### Azure AD and ADFS (OIDC)

Azure Active directory (Azure AD) is an identity provider designed by Microsoft. Active Directory Federation Services(ADFS) is a companion tool for single sign on.

Below you'll find instructions on how to use Azure AD to authenticate applicants and Program admins in CiviForm. High-level steps are to create an app in Azure AD, create a group that contains CiviForm admins and finally update the CiviForm server config to use the app and the group we created. These instructions are one example of how to get basic authentication working. Administrators are encouraged to adapt Azure AD to fit their needs. 

#### Configure Azure AD

1\. Login to [Azure Portal](https://portal.azure.com/), go to "Active Directory" => "App Registrations" and create a new app. During creation set the `Redirect URI` to _https://your-civiform-domain.gov/callback/AdClient_ replacing the domain with your actual domain. The path `/callback/AdClient` is mandatory.
<details>
  <summary>Screenshots</summary>

  ![image](https://user-images.githubusercontent.com/252053/191863121-80b03cc5-dbfa-4929-b117-78c76142ceef.png)
   ![image](https://user-images.githubusercontent.com/252053/191863133-cb396bb2-04cf-45a1-9d3a-1b805bcbab1c.png)

</details>

2\. Go to the newly created app => Authentication and enable `ID tokens`. 
<details>
  <summary>Screenshots</summary>

  ![image](https://user-images.githubusercontent.com/252053/191863376-d342092d-db5e-4111-96fa-a7fa751ed15f.png)
</details>

3\. Go to the "Token configuration" section and add the following claims:
    -  Optional claims: `acct`, `email`. These determine what information about the user will be set to Civiform.
    -  Groups claims: `Security groups`. These allows Civiform to authenticate via a security group.

<details>
  <summary>Screenshots</summary>

  ![image](https://user-images.githubusercontent.com/252053/191863628-6414d71b-c396-4628-8be6-6c58939f8f9b.png)
  ![image](https://user-images.githubusercontent.com/252053/191863646-3d3c5e76-0510-48d2-9b78-bf27e18659e0.png)
</details>

4\. Go to "Certificates & secrets" and create a new secret that will be used by the CiviForm when it talks to Azure AD. Write down the secret value somewhere temporarily. You will need to provide it to CiviForm. If you don't write it down and refresh the page - the value won't be accessible anymore, but you can always create a new secret. 

<details>
  <summary>Screenshots</summary>     

  ![image](https://user-images.githubusercontent.com/252053/191864014-83385f7a-2c1b-4d29-8bbc-4506f6fd3631.png)
</details>

5\. Go to "Overview" and write down `Application (client) ID` and `OpenID Connect metadata document`. They will be used later.

<details>
  <summary>Screenshots</summary>     

  ![image](https://user-images.githubusercontent.com/252053/191864534-c79c78bd-effe-40b2-a22c-ecf6aa535698.png)
</details>

6\. We are done with setting up the Azure AD app. Now go to Azure "Groups" and create a new security group. That group will contain members that have CiviForm Admin access when they log into CiviForm. Other users, who are not members of that group, will be considered Program Admins. They need to be assigned to particular programs by a CiviForm Admin to see programs, by default they don't have access to any programs. Once you created the group write down its ID it will be used later.

<details>
  <summary>Screenshots</summary>     

  ![image](https://user-images.githubusercontent.com/252053/191864859-1cd54843-6469-4cf8-b698-adc8a9937bb9.png)
</details>

Below is the list of variables that we need after setting up Azure AD to integrate with CiviForm.

* `OpenID Connect metadata document` url from step 5.
* `Application (client) ID` from step 5.
* `Client Secret` from step 4.
* `Admin Group object ID` from step 6.

#### Configure CiviForm

Now we need to update the CiviForm server to use the values we used earlier.

1\. Open the `civiform_config.sh` file and set the following variables:
```sh
# Set to the "OpenID Connect metadata document" URL from step 5.
export ADFS_DISCOVERY_URI="https://login.microsoftonline.com/11111111-2222-3333-4444-555555555555/v2.0/.well-known/openid-configuration"

# Set to the group Object ID from step 6.
export ADFS_ADMIN_GROUP="4294249d-6d31-4ba1-871a-0cefc3f6327f"

# Set the following variables to these values to make it work with Azure AD. 
export ADFS_ADDITIONAL_SCOPES=""
export AD_GROUPS_ATTRIBUTE_NAME="groups"
```

2\. Update `Client ID` and `Client Secret`. They are not exposed in the config and can be found in the Secrets Manager. Find secrets that end with `adfs_client_id` and `adfs_secret`. 
  * Update `adfs_client_id` to be `Application (client) ID` from step 5.
  * Update `adfs_secret` to `Client Secret` value from step 4.

3\. Redeploy CiviForm to pickup the updated value. Ensure that it starts healthy.

#### Test admin authentication

To test admin authentication try the following:

1. In Azure add yourself to the security group you created at "Configure Azure AD" step 6. Go to the CiviForm login page and click `Admin login`. It should take you through the Microsoft login flow and redirect back to CiviForm. You should see tabs like "Programs" and "Questions" indicating that you logged in as CiviForm admin.
2. Logout from CiviForm. In Azure remove yourself from the security group and try logging in as an admin again. It should take you through the Microsoft login flow and redirect back to CiviForm. You should see "Your programs" and no tabs like "Programs" or "Questions".

If authentication is not working - take a look at [Debugging tips](#debugging) below.
## Applicant Authentication

### Oracle IDCS 

Oracle IDCS(Identity and Cloud Service) is a cloud service for identity and access management. It provides single sign on services.

#### Logout

Logout integration for IDCS is not using the normal flow where the logout url is read from the discovery metadata file. Instead we override logout url using `APPLICANT_OIDC_OVERRIDE_LOGOUT_URL` to a hardcoded value.

### Generic OIDC (OIDC)

You can use the generic oidc implementation with any OIDC based Authentication provider. 
See full config [in code](https://github.com/civiform/civiform/blob/d9ad85885b38d0176f85822fd472bd27cc398a95/server/conf/application.conf#L91-L115).

Important values in your civiform_config.sh:
```sh
  export APPLICANT_AUTH_PROTOCOL='oidc'   # this is a terraform configuration, to make sure resources are configured properly
  export CIVIFORM_APPLICANT_IDP='generic-oidc' # tell civiform to use the generic OIDC adaptor, enabling the `APPLICANT_OIDC_` config values
  export APPLICANT_OIDC_PROVIDER_NAME='provider_name' # this value will be appended to callback urls
  export APPLICANT_OIDC_CLIENT_ID='...'  # comes from a secrets manager
  export APPLICANT_OIDC_CLIENT_SECRET='....'  # comes from a secrets manager
  export APPLICANT_OIDC_DISCOVERY_URI='https://{auth_provider_hostname}/.well-known/openid-configuration'  # provided by your OIDC provider
 
  # Different modes (defaults shown):
  export APPLICANT_OIDC_RESPONSE_MODE='form_post'
  export APPLICANT_OIDC_RESPONSE_TYPE='id_token token'
  export APPLICANT_OIDC_ADDITIONAL_SCOPES=''
```

#### Identity Provider Configuration
Most Identity providers will need these urls:
* Login: https://{your_civiform_url}/**loginForm**
* Callback: https://{your_civiform_url}/**callback**/**${APPLICANT_OIDC_PROVIDER_NAME}**. # substitute provider name from your config.
* Logout: https://{your_civiform_url}/**logout**


### Login.gov (OIDC)

Here you'll find intstruction of how to setup login.gov authentication. It assumes that you have access to [login.gov sandbox](https://developers.login.gov/testing/). First, you'll need to create an app in the sandbox and configure it to work with your civiform instance.

1\. Create a new app. 

<details>
  <summary>Screenshots</summary>
  
  ![image](https://user-images.githubusercontent.com/252053/193155267-d97c88bf-d530-48de-b139-20fd39ea0b94.png)
</details>

2\. Use the following settings:
  * Authentication Protocol - OpenID Connect PKCE.
  * Attribute bundle - email.
  * Level of service and Default Authentication Assurance Level are up to you.

<details>
  <summary>Screenshots</summary>
  
  ![image](https://user-images.githubusercontent.com/252053/193155482-22e94d3b-43f8-415e-8c44-b0b22df2c23d.png)
</details>


3\. Decide on an Issuer string. It will be used later as the client_id variable. No need to upload certificates as we are not using protocols relying on private keys.

<details>
  <summary>Screenshots</summary>
  
  ![image](https://user-images.githubusercontent.com/252053/193155703-21bc2f0f-ae3d-45c6-b976-ac0e69fe3f2e.png)
</details>

4\. Add redirect URIs. You should add 2 URIs: _https://your-civiform-domain.gov/callback/LoginGov_ and _https://your-civiform-domain.gov/logout_. 

<details>
  <summary>Screenshots</summary>
  
  ![image](https://user-images.githubusercontent.com/252053/193155863-9591b2e2-50a0-4348-8006-7d967239f859.png)
</details>

5\. Save the app. The page might return an error on saving. Still, the data is saved (you can refresh the page to see the app you just created).

6\. Update the `Client ID` variable in your CiviForm deployment. AWS deployment: that variable is not exposed in the `civiform_config.sh`. Instead it can be found in the AWS Secrets Manager. Find the secret that ends with `applicant_oidc_client_id` and set it to the Issuer string you used on step 3.

7\. Update `civiform_config.sh`: 
  * Set `CIVIFORM_APPLICANT_IDP` to `"login-gov"`.
  * Set `APPLICANT_OIDC_DISCOVERY_URI` to `"https://idp.int.identitysandbox.gov/.well-known/openid-configuration"`. Mentioned [here](https://developers.login.gov/oidc/#auto-discovery). For production deployment that value will needs to be updated.

8\. Redeploy CiviForm to pickup the updated value. Ensure that it starts healthy.

9\. Test applicant login flow. If it is not working - take a look at [Debugging tips](#debugging) below.

#### Logout

Login.gov requires setting `state` param in logout request even though in the docs it specified as optional.


### LoginRadius (SAML)

SAML authentication involves an exchange between an Identity Provider or IdP(LoginRadius), and a Service Provider or SP (Civiform). In our application, we use SP-initiated SAML authentication, which means our application signs and sends a SAML request to LoginRadius to begin the auth process.

#### Service Provider Configuration

Follow the steps below to configure LoginRadius SAML auth on the SP side for a local dev instance:

* First create a keystore using the Java keytool using the following command. Take note of the keystore password and private key password used, and set the `LOGIN_RADIUS_PRIVATE_KEY_PASS` and `LOGIN_RADIUS_KEYSTORE_PASS` environment variables.

```bash
keytool -genkeypair -alias civiform-saml -keypass <private-key-password>  -keystore civiformSamlKeystore.jks -storepass <keystore-password>  -keyalg RSA -keysize 2048 -validity 3650
```

* Next, navigate to the [LoginRadius Dashboard](https://dashboard.loginradius.com/getting-started). Click on "Get Your API Key and Secret", copy the API key, and set the `LOGIN_RADIUS_API_KEY` environment variable to the copied value.
* Finally set the `LOGIN_RADIUS_METADATA_URI` environment variable to the link `https://<login-radius-site-url>/service/saml/idp/metadata` (e.g. `https://civiform-staging.hub.loginradius.com/service/saml/idp/metadata`).

#### Identity Provider Configuration

To configure SAML on the IDP side for LoginRadius, navigate to the "Integration" section on the left sidebar, add a SAML outbound SSO integration and follow the instructions [linked here](https://www.loginradius.com/docs/single-sign-on/tutorial/federated-sso/saml/sp-initiated/).

* When configuring the integration, make note of the `SAML App Name` field, and set the `LOGIN_RADIUS_SAML_APP_NAME` environment variable.

> ![image](https://user-images.githubusercontent.com/19631367/155665020-88d4e1ca-9dc6-41ee-a852-1ae19b080e22.png)

* For the service provider certificate field, export the locally generated public certificate, and then copy the contents of the exported file:

```bash
keytool -exportcert -alias civiform-saml  -keystore civiformSamlKeystore.jks -rfc -file test.cert
pbcopy < test.cert
```

* Set the following attributes. each attribute should have the format set to `urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified`

> ![image](https://user-images.githubusercontent.com/19631367/155667111-6ca9ac96-48cc-4f15-948b-26a615d4fa50.png)

* For local testing/development, the Service Provider Details section should have the following values.

> ![image](https://user-images.githubusercontent.com/19631367/155667445-223de285-906f-4624-bbd4-ea88612fcc14.png)

### Via Terraform Setup
The terraform setup script should walk you through each step of this process so the manual set up is less necessary. If you mess up the initial IDP set up you just have to generate the "Generate LoginRadius' Certificate and Key" via [open ssl commands documented here](https://www.loginradius.com/docs/single-sign-on/concept/saml-miscellaneous/certificate/) -- these get stored in the Id Provider Certificate Key and the Id Provider Certificate. They don't need to be stored anywhere on the civiform side. 

After that you will need to re deploy terraform and re generate the Service Provider certificate containing the sp public key which is given to the Login Radius, or the Idp (this is prompted in the setup). The setup script also takes the private key portion of the cert and puts it in a storage bucket, which is mounted as a volume that the application can access. This was implemented in [pr #2007](https://github.com/civiform/civiform/pull/2007).

When we generate the Service Provider secret/public key we password encrypt it with a "saml-keystore-pass." The private key password and the keystore password are the same value. Pac4J uses this password to protect the secret value and then knows how to grab the value via the following lines: 
```
config.setKeystoreResourceFilepath(configuration.getString("login_radius.keystore_name"));
config.setKeystorePassword(configuration.getString("login_radius.keystore_password"));
config.setPrivateKeyPassword(configuration.getString("login_radius.private_key_password"));
```

## Logout

CiviForm by default supports central logout meaning that when applicant logs out from CiviForm - they will be redirected to the auth provider logout page so that they can be logged out from the auth provider as well. That feature is especially important on shared computers. Logout integrations turned out to be somewhat complicated and each auth provider required special treatment. It's possible that new auth providers will need additional debugging/adjusting as well. If central logout is not working and blocking other work - it can be disabled by setting `APPLICANT_OIDC_PROVIDER_LOGOUT=false`.


Spec: [OpenID Connect RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html).


## Authentication code structure

### AdminAuthClient and ApplicantAuthClient

[AdminAuthClient](https://github.com/civiform/civiform/blob/main/server/app/auth/AdminAuthClient.java) and [ApplicantAuthClient](https://github.com/civiform/civiform/blob/main/server/app/auth/ApplicantAuthClient.java) are the two annotation interfaces, the former for admin auth and the latter for applicant. They both implement the [IndirectClient interface](http://www.pac4j.org/apidocs/pac4j/3.1.0/org/pac4j/core/client/IndirectClient.html). This is a Pac4j abstract class. [Saml2Client](https://www.pac4j.org/apidocs/pac4j/3.0.1/org/pac4j/saml/client/SAML2Client.html) and [OidcClient](https://www.pac4j.org/apidocs/pac4j/3.7.0/org/pac4j/oidc/client/OidcClient.html) extend this parent class, so the ApplicantAuthClient and AdminAuthClient can be either, based on the environment variables CIVIFORM\_APPLICANT\_IDP and CIVIFORM\_ADMIN\_IDP. The AdminAuthClient and ApplicantAuthClient are bound in [SecurityModule](https://github.com/civiform/civiform/blob/main/server/app/modules/SecurityModule.java) to Provider classes. Currently, we are only checking the environment variables for binding admin authentication, because ADFS/ AD (similar Azure auth providers) are the only supported admin IDPs. To add more admin IDPs, future devs can follow the example of the bindApplicantIdpProvider method. That binds to either the LoginRadiusSamlProvider class or the IdcsOidcProvider class based on the CIVIFORM\_APPLICANT\_IDP environment variable.

### Provider classes

[Provider classes](https://github.com/google/guice/wiki/ProviderBindings) implement Guice's provider interface for supplying values. The auth provider classes are found in app/auth. There is the [LoginRadiusSamlProvider](https://github.com/civiform/civiform/blob/main/server/app/auth/saml/LoginRadiusSamlProvider.java), whcih is used to create and provide the Saml2Client which can then be bound to the ApplicantAuthClient. The [IdcsOidcProvider](https://github.com/civiform/civiform/blob/main/server/app/auth/oidc/IdcsOidcProvider.java) provides the OIDC client for IDCS. The [AdOidcProvider](https://github.com/civiform/civiform/blob/main/server/app/auth/oidc/AdOidcProvider.java) is used to provide the OIDC client for Azure AD, the admin IDP. The enum [AuthIdentityProviderName](https://github.com/civiform/civiform/blob/main/server/app/auth/AuthIdentityProviderName.java) defines the various IDP names. This can be used in the code base to determine which applicant and admin IDPs are being used.

### Adding a new IDP

Adding a new IDP is fairly straightforward. First, add a new enum to the [AuthIdentityProviderName](https://github.com/civiform/civiform/blob/main/server/app/auth/AuthIdentityProviderName.java). In the app/auth folder, add a Provider for the new IDP, either in the OIDC or SAML folder. Bind that in the [SecurityModule](https://github.com/civiform/civiform/blob/main/server/app/modules/SecurityModule.java). Finally, if needed, create a new ProfileAdapter, though this should be unlikely since we already support OIDC and SAML profile adapters.

## Authority ID

Users are keyed using the authority\_id, which is unique and stable per authentication provider.

For OIDC, the authority\_id is generated by combining the iss (issuer) and sub (subject). The issuer is fetched from the [OIDCProfile](https://www.pac4j.org/apidocs/pac4j/1.9.1/org/pac4j/oidc/profile/OidcProfile.html) using `oidcProfile.getAttribute("iss", String.class)`. The subject is fetched by `oidcProfile.getId()`. The subject identifies the specific user within the issuer. It has to be fetched this way because Pac4j treats the subject as special, and users can't just get the "sub"claim. They are combined as "iss: \[issuer] sub: \[subject]".

For SAML, the authority\_id is also generated by combining the issuer and the subject (nameID). The issuer is fetched from the [Saml2Profile](https://www.pac4j.org/apidocs/pac4j/3.1.0/org/pac4j/saml/profile/SAML2Profile.html) with `profile.getIssuerEntityID()` and the subject is fetched with `profile.getId()`. It is formatted as "Issuer: \[issuerId] NameID: \[NameID]".

Previously we were keying users with their email addresses, but that goes against the OIDC spec

### LoginRadius NameID

For SAML, which is the protocol format we are using with LoginRadius, the NameID (also known as the subject) follows a format. This is set in the LoginRadius console. We want the NameID to be in the persistent format. The persistent NameID is, in theory, supposed to be stable and shouldn't be something that can be linked to the user. A transient identifier is temporary and will change. Both of these name ID formats are, according to the [SAML 2.0 spec](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html), supposed to be private pseudonyms that protect a users' anonymity. There are a few other NameID formats that are defined by the SAML spec. The other supported formats for LoginRadius are email and an unspecified format. For some reason, no matter what NameID format is chosen, LoginRadius appears to be using email address as the NameID. This isn't something we can fix but it is something to be aware of. We have selected the persistent NameID format, but it appears that email address is being used to key the users.

## Profile adapters

### SamlCiviformProfileAdapter

The SamlCiviformProfileAdapter is used to augment the [CiviformProfile](https://github.com/civiform/civiform/blob/6ac723af1498edf61390507e24e7168ba272ce68/server/app/auth/CiviFormProfile.java) with information that is found in a user’s [SAML2Profile](http://www.pac4j.org/apidocs/pac4j/3.1.0/org/pac4j/saml/profile/SAML2Profile.html). The SAML2Profile is returned by the [SAML2Client](http://www.pac4j.org/apidocs/pac4j/3.1.0/org/pac4j/saml/client/SAML2Client.html) after a user successfully authenticates using SSO. The SamlCiviformProfileAdapter extends the [AuthenticatorProfileCreator](http://www.pac4j.org/apidocs/pac4j/1.9.1/org/pac4j/core/profile/creator/AuthenticatorProfileCreator.html) and therefore inherits the create() method, which creates a profile based on credentials. In this case, the created profile will be a SAML2Profile, because the user is authenticating using LoginRadius configured for SAML2. When the SAML2Profile is returned, we check for authority ID (used to identify each user), email, locale, first name, middle name and last name. Any information that is present is then added to the CiviformProfile. If the user doesn't have a corresponding authority\_id, we should throw an exception. We then set the corresponding [Roles](https://github.com/civiform/civiform/blob/6ac723af1498edf61390507e24e7168ba272ce68/server/app/auth/Roles.java) for this user. Because LoginRadius with SAML is currently only supported for applicants, we only have to add the applicant and sometimes the trusted intermediary role– this user will never be an admin.

## Testing

OIDC for the IDCS applicant flow can be tested locally.  Out of the box, `bin/run-dev` runs a dev-oidc container and Civiform allows you to log in using it.

The logged out landing page has a Log In button that will redirect to the dev OIDC server.  Enter any user/pass you like and accept the subsequent claims page.  You'll then be redirected back to your civiform.

Logging out from this state is a little tricky, you'll need to logout then clear the local login site cookie, you can do this through an extension, or other means.

Note:
* You need to have a local IP route for the 'dev-oidc' hostname in your /etc/hosts file so your browser can find the container: EG `127.0.0.1 dev-oidc`
* You may need to disable any proxy setup in your browser if you can't access the login page when you click 'Log In'
* The Login page will ask for an artbitrary userid and email, enter anything you like.  The User Id will be used as your Account id though.
* The second page in the login is confirming the Claims, just accept the request.

## Debugging

Debugging authentication is challenging as it involves external systems that are not often well documented as well as authentication protocols have many variations and flavors. Here are few general tips. Some of them require some familiarity with the authentication protocols.

* **Verify that CiviForm uses correct IDs and urls.**  
  In browser devtools open "Network" tab and go through login flow. You'll see CiviForm redirecting to the authentication provider and back. The first redirect request (CiviForm redirects to the auth provider) and make sure that it redirects to the correct provider, that it sends correct client ID and secret. If they are not correct - check your `civiform_config.sh` and secrets and redeploy CiviForm.
  
* **Check authentication provider errors.**  
  In "Network" tab check requests where auth provider redirects back to the CiviForm. It might contain an error message explaining configuration issue.
  
* **Use jwt.io to decode token.**  
  OIDC uses [JSON Web Token](https://jwt.io/introduction) to send data from auth provider to the CiviForm. It is sent as `id_token` param in the redirect POST request from auth provider. You can decode it using [jwt.io](https://jwt.io) to see what it contains. For example for ADFS flow you'll see what groups user belongs to.

* **Test local changes on production auth.**  
  Sometimes we need to test auth provider code changes that we don't have an easy way to test locally. 
For example testing IDCS (Seattle) integration where we don't have access to the Seattle's IDCS page and can't create our own app to test with. For cases like that we can test by imitating production setup locally using proxy. Essentially we setup environment such that browser thinks that it is using production CiviForm while in fact local CiviForm is used. Let's say we want to emulate locally `staging-aws.civiform.dev` auth configuration. Here are the steps:
  1. **Set necessary auth variables for your local CiviForm server.**  
     The variables might be `applicant_generic_oidc.client_id`, `applicant_generic_oidc.discovery_uri` and others. These variables need to be copied from production config. Note that they are generally not sensitive. For example `client_id` is passed as url param during auth flow so everyone can see it. If you don't know values of these variables - ask POC in the corresponding deployments (Seattle, Bloomington, State of Arkansas).
  2. **Set `base_url` to be the production domain.**  
     In our example it should be set to `https://staging-aws.civiform.dev`. It is required so that local CiviForm uses production domain in redirect auth urls.
  4. **Setup proxy locally that redirects all traffic from production host.**  
     In our example proxy should redirect `https://staging-aws.civiform.dev` to `http://localhost:9000` where CiviForm is running. There are multiple proxies suited for that, one example is [Charles proxy](https://www.charlesproxy.com/) which Google employees have license for (search internally if you are one).
  5. **Start a new chrome instance that uses the proxy.**  
     Example command for Mac assuming proxy is running on port 8888: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=localhost:8888 --user-data-dir=$HOME/test_data --ignore-certificate-errors --allow-running-insecure-content`.
  6. **Go to production url and test.**  
     In our example url is `https://staging-aws.civiform.dev`. You should see local CiviForm. Now you can test auth. To make sure the setup is correct it's recommended to ensure that auth behavior matches production by removing all local changes to auth java code.

