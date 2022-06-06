# API authentication

All API requests must use HTTPS and authenticate by passing API key credentials using [HTTP basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Requests do this by setting the request header `Authorization: Basic <credentials>` where credentials is a string associating the request with a specific API key.

Additionally, API keys have several security features beyond simply checking the ID and secret of the key. If any of the constraints specified by those features are not met, API requests will receive a 401 response code. For more information see [Api key security](/user-manual/civiform-admin-guide/managing-api-keys#api-key-security). 

## Obtaining API key credentials

The CiviForm admin creates API keys using the admin UI. See [managing API keys](/user-manual/civiform-admin-guide/managing-api-keys) for instructions on creating API keys and obtaining an API key's credentials string.
