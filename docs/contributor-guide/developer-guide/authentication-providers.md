# Authentication Providers

This page will go over the implementation and configuration steps for currently supported authentication providers. A Civiform deployment should have exactly one admin authentication provider and one applicant authentication provider configured.

## Admin Authentication

### ADFS (OIDC)

### Azure AD (OIDC)

## Applicant Authentication

### Oracle IDCS (OIDC)

### Generic OIDC (OIDC)

You can use generic oidc implementation with any OIDC based Authentication provider. 
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

