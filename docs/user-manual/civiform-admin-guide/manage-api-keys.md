# Manage API keys

CiviForm supports integration with external systems via its HTTP JSON API. The API authenticates requests using API keys managed by the CiviForm admin. For more details on how API keys are used and list of APIs supported, refer to [API Integration](https://docs.civiform.us/it-manual/api).

## API key security

### API key expiration

When an admin creates an API key they must specify an expiration for it. This is to ensure that API keys are rotated so that in the event a key is compromised it does not grant indefinite API access to the attacker. Requests made using credentials for an expired API key receive an HTTP 401 status code.

### API key allowed subnet

When an admin creates an API key they must specify an allowed subnet for it. Requests made from IP addresses outside of the allowed subnet receive an HTTP 401 status code.

### API key permission grants

When an admin creates an API key they must specify what CiviForm resources the key provides access to. It is highly recommended that API keys be given narrow scopes of access e.g. access to one program per key, and that keys not be shared between multiple programs or backend processing systems. Requests made using credentials for API keys that don't have access to the requested resource receive an HTTP 401 status code.

### API key retiring

Admins may retire API keys using the admin UI. Retiring is a distinct concept from expiration and provides admins with a way to revoke an API key's access. Requests made using credentials for a retired API key receive an HTTP 401 status code.

## Creating a new API key

The CiviForm admin creates API keys in the admin UI. To create a new key:

1. Login as a CiviForm admin
1. Click 'API keys' in the top nav
1. Click 'New API key'
1. Follow the on-page instructions for creating a key
1. Click 'Create'
1. Copy the API credentials string and store it somewhere secure

API key credentials are presented only once in the CiviForm UI: on the page shown immediately after the key is created. The credentials are not stored in the database or anywhere else in the system. After navigating the browser page away from that page it is impossible to recover an API key's credentials from CiviForm.

This is so that a malicious user with temporary access to a CiviForm admin account cannot simply copy the credentials of an existing API key to gain long term access to the system in a way that would be difficult to detect.

