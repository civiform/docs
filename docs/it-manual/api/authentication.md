# API authentication

All API requests must use HTTPS and authenticate by passing API key credentials using [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Requests do this by setting the request header `Authorization: Basic <credentials>` where `credentials` is a secret token authenticating the request and associating it with a specific API key.

## Authorizing the request
Depending on your API client, you may need to take different steps to construct the `Authorization` header.

### Using a username and password

If your API client requires you to provide a username and password when using Basic Auth, use the _Username_ and _Password_ values provided on the API key confirmation screen. Your client will then create the `Authorization` header for you.

### Manually constructing the header

Some clients, such as `curl`, require constructing the header by hand. Use the _API Secret Token_ value provided on the API confirmation screen, and construct a header that looks like `Authorization: Basic <API Secret Token>`.

{% hint style="info" %}
Basic Auth requires that the request contain a header field in the form of `Authorization: Basic <credentials>`, where `<credentials>` is the Base64 encoding of the Username and Password in the format `username:password`. CiviForm does this encoding for you and provides it in the value of API Secret Token.
{% endhint %}

## Additional security features

Additionally, API keys have several security features beyond simply checking the ID and secret of the key. If any of the constraints specified by those features are not met, API requests will receive a 401 response code. For more information see [Api key security](/docs/user-manual/civiform-admin-guide/manage-api-keys.md#api-key-security). 

## Obtaining API credentials

The CiviForm admin creates API keys using the admin UI. See [managing API keys](/docs/user-manual/civiform-admin-guide/manage-api-keys.md) for instructions on creating API keys and obtaining an API key's credentials.

## Testing API credentials

To test your API credentials, submit a `GET` request to `/api/v1/checkAuth` with your credentials.

With `curl`, that might look like this:

{% code %}

```shell
curl staging.myciviform.gov/api/v1/checkAuth -vH "Authorization: Basic <api_key>"
```

{% endcode %}

If you recieve a `200 OK` then your key is set up correctly to access CiviForm.
