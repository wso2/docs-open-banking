# Exposing the Accelerator to the Internet

When deploying WSO2 Open Banking, you have the capability to isolate administrative operations from runtime traffic. By segregating administrative operations, you reduce the attack surface and prevent high-privilege operations from being exposed to the public.

## Exposing API Manager to Public Access

All endpoints published on the API Manager gateway (port 8243) should be publicly exposed.

The following endpoint needs to be exposed to the public via API Manager:

- `/devportal`

## Exposing Identity Server to Public Access

The following endpoints need to be exposed to the public via Identity Server:

- `/authenticationendpoint/*`
- `/fs/authenticationendpoint/*`
- `/consentmgr`
- `/consentmgr*`
- `/oauth2/token`
- `/oauth2/introspect`
- `/oauth2/revoke`
- `/oauth2/par`
- `/oauth2/authorize`
- `/oauth2/userinfo`
- `/oauth2/jwks`
- `/oauth2/token/.well-known/openid-configuration`
- `/commonauth`

For more details on restricting public access on the Identity Server, see [Restrict public access to management operations](https://is.docs.wso2.com/en/latest/deploy/configure-console-hostname/#restrict-public-access-to-management-operations).
