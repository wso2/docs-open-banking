### Dynamic Client Registration Request Policy

Dynamic Client Registration Request Policy is a policy designed to enagege in the request flow of the Dynamic Client Registration Request. It will perform the below tasks.

- Validate JWT signature in Dynamic Client Registration create and update requests
- Decode JWT Payload for DCR create and update requests with JWT payloads
- Add Mandatory parameters for Identity Server DCR API for DCR create and update requests
- Check whether the token is bound to the correct client id for DCR retrieval, update and delete requests

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources. Find the details to create the policy below.

#### General Details

| Field | Description |
| ----- | ----------- |
| Name | Dynamic Client Registration Request Policy |
| Version | 1 (can be any) |
| Description | Policy to validate and modify DCR Request |
| Applicable Flows | Request |
| Supported API Types | HTTP |

#### Policy File

Upload the dynamicClientRegistrationRequestPolicy.j2 policy file which resides inside the extracted fs-apim-mediation-artifacts-1.0.0.zip built in [Create Policies](../learn/create-policies.md) section.

#### Policy Attributes

| Attribute name | Display name | Description | Required | Type | Example Values |
| -------------- | ------------ | ----------- | -------- | ---- | -------------- |
| validateRequestJWT | Validate Request JWT | Determine whether the request JWT signature should be validated | true | Boolean | true/false |
| jwksEndpointName | JWKS Endpoint Name | JWKS Endpoint field name in the request. | true | String  | software_jwks_endpoint | 
| clientNameAttributeName |client Name Attribute Name | The field name of the attribute that should be used as the name of the application.  This value will be used if useSoftwareIdAsAppName is disabled. | true | String | software_client_name | 
| useSoftwareIdAsAppName | Use Software Id As App Name | Determine whether the software Id should be used as application name | true | Boolean | true/false |
| jwksEndpointTimeout | jwksEndpointTimeout | Timeout for the JWKS Endpoint | true | Integer | 3000 |
