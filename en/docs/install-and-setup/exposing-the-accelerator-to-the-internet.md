# Exposing the Accelerator to the Internet

When deploying WSO2 Open Banking, you have the capability to isolate administrative operations from runtime traffic. By segregating administrative operations, you reduce the attack surface and prevent high-privilege operations from being exposed to the public.

## Exposing API Manager to Public Access

All endpoints published on the API Manager gateway (port 8243) should be publicly exposed.

The following endpoint needs to be exposed to the public via API Manager:

- `/devportal`

## Exposing Identity Server to Public Access

The following endpoints need to be exposed to the public via Identity Server:

- `/authenticationendpoint/*`
- `/ob/authenticationendpoint/*`
- `/consentmgr`
- `/consentmgr*`
- `/oauth2/token`
- `/oauth2/introspect`
- `/oauth2/revoke`
- `/api/openbanking/push-authorization/par`
- `/oauth2/authorize`
- `/oauth2/userinfo`
- `/oauth2/jwks`
- `/oauth2/token/.well-known/openid-configuration`
- `/commonauth`
