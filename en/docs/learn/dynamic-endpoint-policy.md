### Dynamic Endpoint Policy

Dynamic Endpoint Policy is a policy designed to be engaged in the request flow of any request that requires to be routed to the consent manage service or the actual backend endpoint based on the provided regex expression. It will perform the below tasks.

- Routes the requests to the consent management service or the actual backend endpoint based on the provided regex expression.

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources which require this routing mechanism. Find the details to create the policy below.

#### General Details

| Field | Description                                    |
| ----- |------------------------------------------------|
| Name | Dynamic Endpoint Policy                        |
| Version | 1 (can be any)                                 |
| Description | Policy to determine the backend of the request |
| Applicable Flows | Request                                        |
| Supported API Types | HTTP                                           |

#### Policy File

Upload the dynamicEndpointPolicy.j2 policy file which resides inside the extracted fs-apim-mediation-artifacts-1.0.0.zip built in [Create Policies](../learn/create-policies.md) section.

#### Policy Attributes

| Attribute Name                     | Display Name                        | Description                                                                                                   | Required | Type   | Example Values                                                                                                                                              |
|------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------|----------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| consentServiceRoutingRegexPattern  | Consent Service Routing Regex Pattern | The regex pattern to route requests to the consent service based on the request URL                          | true     | String | Accounts: `.*\/account-access-consents.*`<br>CoF: `.*\/funds-confirmation-consents.*`<br>Payments: `.*\/payment-consents.*`                               |
| consentServiceBasicAuthCredentials | Consent Service Basic Auth Credentials | Base64 encoded(admin-username:admin-password) basic auth credentials required to access the consent service | true     | String | aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw==                                                                                                                       |
| consentServiceBaseUrl              | Consent Service Base URL            | Base URL of the consent service                                                                               | true     | String | https://localhost:9446                                                                                                                                    |
| bankBackendBaseUrl                 | Bank Backend Base URL               | Base URL of the bank back end                                                                                 | true     | String | Accounts: `https://localhost:9443/api/fs/backend/services/accounts/accountservice`<br>CoF: `https://localhost:9443/api/fs/backend/services/fundsConfirmation/fundsconfirmationservice`<br>Payments: `https://localhost:9443/api/fs/backend/services/payments/paymentservice` |
