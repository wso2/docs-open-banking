### Dynamic Client Registration Response Policy

Dynamic Client Registration Request Policy is a policy designed to enagege in the response flow of the Dynamic Client Registration Request. It will perform the below tasks.

- Remove added Mandatory parameters for Identity Server DCR API for DCR create and update requests

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all POST, GET and PUT resources. Find the details to create the policy below.

#### General Details

| Field | Description |
| ----- | ----------- |
| Name | Dynamic Client Registration Response Policy |
| Version | 1 (can be any) |
| Description | Policy to determine the backend of the request |
| Applicable Flows | Response |
| Supported API Types | HTTP |

#### Policy File

Upload the [Dynamic Client Registration Response Policy](https://github.com/wso2/financial-services-apim-mediation-policies/blob/main/dynamic-client-registration/dynamicClientRegistrationResponsePolicy.j2) policy file.
