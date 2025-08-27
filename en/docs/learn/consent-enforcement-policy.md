### Consent Enforcement Policy

Consent Enforcement Policy is a policy designed to be engaged in the request flow of any request that requires the consent to be validated prior to an API resource call. It will perform the below tasks.

- Creates a payload for the consent validation service
- Makes an HTTP POST call to the consent validation service
- Handles the response from the consent validation service
- Will let the API pass through if consent is valid, else respond with an error

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources which require consent enforcement. Find the details to create the policy below.

#### General Details

| Field | Description                    |
| ----- |--------------------------------|
| Name | Consent Enforcement Policy     |
| Version | 1 (can be any)                 |
| Description | Policy to validate the consent |
| Applicable Flows | Request                        |
| Supported API Types | HTTP                           |

#### Policy File

Upload the consentEnforcementPolicy.j2 policy file which resides inside the extracted fs-apim-mediation-artifacts-1.0.0.zip built in [Create Policies](../learn/create-policies.md) section.

#### Policy Attributes

| Attribute Name                    | Display Name                    | Description                                                                                          | Required | Type   | Example Values                             |
|-----------------------------------|--------------------------------|------------------------------------------------------------------------------------------------------|----------|--------|-------------------------------------------|
| consentIdClaimName                | Consent ID Claim Name          | The name of the claim that represents the consent ID on the user access token                      | true     | String | consent_id                                |
| consentServiceBasicAuthCredentials | Consent Service Basic Auth Credentials | Base64 encoded(admin-username:admin-password) basic auth credentials required to access the consent service | true     | String | aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw==      |
| consentServiceBaseUrl             | Consent Service Base URL       | Base URL of the consent service                                                                      | true     | String | https://localhost:9446                    |

