### MTLS Enforcement Policy

MTLS Enforcement Policy is a policy designed to be engaged in the request flow of any request that requires MTLS to be mandatory. It will perform the below tasks.

- Mandates MTLS for the request using the request context
- Mandates MTLS for the request when the transport certificate is sent as a header

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources which require MTLS enforcement. Find the details to create the policy below.

#### General Details

| Field | Description                    |
| ----- |--------------------------------|
| Name | MTLS Enforcement Policy        |
| Version | 1 (can be any)                 |
| Description | Policy to enforce MTLS validation |
| Applicable Flows | Request                        |
| Supported API Types | HTTP                           |

#### Policy File

Upload the [MTLS Enforcement Policy](https://github.com/wso2/financial-services-apim-mediation-policies/blob/main/common/mtls-enforcement/mtlsEnforcementPolicy.j2) policy file.

#### Policy Attributes

| Attribute Name              | Display Name                                                        | Description                                                                                         | Required | Type    | Example Values                  |
|-----------------------------|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|----------|---------|--------------------------------|
| transportCertAsHeaderEnabled | Is the Transport Certificate Present as a Header in the Request?    | Switch to determine if the transport certificate is sent as a header in the request                | false    | Boolean |                                |
| transportCertHeaderName     | Transport Certificate Header Name                                   | The name of the transport certificate header                                                       | false    | String  | x-wso2-client-certificate       |
| isClientCertificateEncoded  | Is the Transport Certificate Present as a Header in the Request Encoded? | Switch to determine if the transport certificate sent as a header in the request is encoded | false    | Boolean |                                |

