UK JWS Header Processing Policy is a policy designed to be engaged in the request flow of any request that requires the JWS signature header to be validated prior to an API resource call and to be appended a JWS signature header in the response. This is a Open Banking UK specific implementation and can be used as a reference to develop custom JWS requirements. It will perform the below tasks.

- Validates the JWS signature header as mentioned in the UK specification
- Appends a JWS signature header in the response as mentioned in the UK specification

Before creating policies, need to build the policy artifacts from the source.

## Building from the source

If you want to build the Financial Services APIM Mediation Policies from the source code:

1. Install Java 11 or above.

2. Install [Apache Maven 3.0.5](https://maven.apache.org/download.cgi) or above.

3. Get the Financial Services APIM Mediation Policies from [this repository](https://github.com/wso2/financial-services-apim-mediation-policies.git) by **cloning** or **downloading** the repository as a zip.
    * To **clone the solution**, copy the URL and execute the following command in a command prompt.
      `git clone <the copiedURL>`. After cloning, checkout to the **main** branch.
    * To **download the repository**, select the **main** branch first, then click **Download ZIP** and unzip the downloaded file.
    
4. Navigate to the cloned/downloaded repository using a command prompt and run the relevant Maven command:

| Command | Description      |
|---------|--------------------|
| ```mvn install```  | This starts building the repository without cleaning the folders. |
| ```mvn clean install``` | This cleans the folders and starts building the repository from scratch.  |

### How to use mediation artifacts 

1. Once the maven build is successful, navigate to the **fs-apim-mediation-artifacts/target** folder to get the zip file containing all the mediation policies,custom sequences and class mediators & handlers to copy in to WSO2 API Manager.

2. Extract the zip 'fs-apim-mediation-artifacts-1.0.0.zip' and you will notice the following folder structure.
    - Policy .j2 files - The mediation policy files which need to upload in API Publisher UI and engage to APIs. Below mediation policies are available in this repository.
    - Custom sequences- Synapse based custom sequence files which need to copy in to `<APIM_Home>/repository/deployment/synapse-cofngis/default/sequences` folder.
    - lib - This folder contains the jars need to copy in to `<APIM_Home>/repository/lib` folder. It contains jars of the class mediator implementations refer from the policies and custom synapse handler implementations.
        
3. Restart the API Manager Server.

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources which require JWS request header processing. Find the details to create the policy below.

#### General Details

| Field | Description                    |
| ----- |--------------------------------|
| Name | UK JWS Header Processing Policy     |
| Version | 1 (can be any)                 |
| Description | Policy to process the JWS header |
| Applicable Flows | Request                        |
| Supported API Types | HTTP                           |

#### Policy File

Upload the jwsHeaderProcessingPolicy.j2 policy file which resides inside the extracted fs-apim-mediation-artifacts-1.0.0.zip built in above section.

#### Policy Attributes

| Attribute Name                      | Display Name                        | Description                                                                                          | Required | Type   | Example Values                     |
|-------------------------------------|------------------------------------|------------------------------------------------------------------------------------------------------|----------|--------|------------------------------------|
| applicationServiceBasicAuthCredentials | Application Service Basic Auth Credentials | Base64 encoded(admin-username:admin-password) basic auth credentials required to access the application service | true     | String | aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw== |
| identityServerBaseUrl               | Identity Server Base URL           | Base URL of the identity server                                                                      | true     | String | https://localhost:9446             |
| jwSignatureHeaderName               | JWS Header Name                    | The name of the signature header coming in the request and to be included in the response           | true     | String | x-jws-signature                   |
| requestValidationTrustAnchor        | Trusted Trust Anchor claim         | Trusted trust anchor for validating the JWS header tan claim                                        | true     | String | openbanking.org.uk                |
| jwsSupportedAlgorithms              | JWS Supported Algorithms           | Comma separated list of algorithms that are supported to validate the request JWS signature header  | true     | String | PS256, RS256                      |
| jwsSigningCertAlias                 | JWS Signing Certificate Alias      | The alias of the signing certificate which will be used to sign the JWS response header             | true     | String | wso2carbon                        |
| jwsSigningKeyId                     | JWS Signing Key ID                 | The key ID to identify the signing key to be used when signing the JWS response header              | true     | String | 1234                               |
| jwsSigningOrgId                     | JWS Signing Organization ID        | The organization ID to be included in the response JWS header                                       | true     | String | 0015800001HQQrZAAX                |
| jwsSigningAlgorithm                 | JWS Signing Algorithm              | The algorithm to be used when signing the response JWS header                                        | true     | String | PS256                              |
| responseSigningTrustAnchor          | Trust Anchor of The ASPSP          | Trust anchor of the ASPSP to be included in the JWS response header                                 | true     | String | openbanking.org.uk                |
