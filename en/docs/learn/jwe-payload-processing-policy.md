JWE Payload Processing Policy is a policy designed to be engaged in the request flow of any request that requires decrytption and encryption of the payload. This Policy has two sections.

1. JWE Payload Decryption Mediator
   
This mediator will decrypt the JWE encrypted payload in the request and set the decrypted payload back to the message. It will check the content-type of the request payload and if it is a supported content-type (application/jose+jwe), it will proceed with the decryption. In the decryption, it will use the private key of the server keystore to decrypt the payload.

2. JWE Response Payload Encryption Handler
   
This handler will encrypt the response payload using JWE and set the encrypted payload back to the message context.
This method will only proceed with the encryption if the response code is 200 or 201. In the encryption, it will use the public key of the JWKS URL provided when registering the application.

Both of the above implementations supports only `RSA-OAEP-256`, `RSA-OAEP`, `RSA-OAEP-384`, `RSA-OAEP-512` and `RSA1_5` as encryption algorithms and `A128GCM`, `A256GCM` and `A192GCM` as encryption methods.

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

2. Extract the zip `fs-apim-mediation-artifacts-1.0.0.zip` and you will notice the following folder structure.
    - `Policy .j2 files` - The mediation policy files which need to upload in API Publisher UI and engage to APIs. Below mediation policies are available in this repository.
    - `Custom sequences` - Synapse based custom sequence files which need to copy in to `<APIM_HOME>/repository/deployment/server/synapse-configs/default/sequences` folder.
    - `lib` - This folder contains the jars need to copy in to `<APIM_Home>/repository/lib` folder. It contains jars of the class mediator implementations refer from the policies and custom synapse handler implementations.
        
3. Restart the API Manager Server.

Create an API Level Policy by following the [Creating API Level Policy](../learn/create-policies.md) and add to all API resources which require JWS request header processing. Find the details to create the policy below.

#### General Details

| Field | Description                    |
| ----- |--------------------------------|
| Name |  JWE Payload Processing Policy     |
| Version | 1 (can be any)                 |
| Description | Policy to process the JWE Payload |
| Applicable Flows | Request                        |
| Supported API Types | HTTP                           |

#### Policy File

Upload the `jwePayloadProcessingRequestPolicy.j2` policy file which resides inside the extracted `fs-apim-mediation-artifacts-1.0.0.zip` built in above section.

#### Policy Attributes

| Attribute Name | Display Name | Description | Required | Type   | Example Values  |
|----------------|--------------|-------------| -------- | ------ | --------------- |
| applicationServiceBasicAuthCredentials | Application Service Basic Auth Credentials | Base64 encoded(admin-username:admin-password) basic auth credentials required to access the application service | true     | String | aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw== |
| identityServerBaseUrl | Identity Server Base URL | Base URL of the identity server | true | String | https://localhost:9446 |
| jweEncryptionAlg | JWE Encrytion Algorithm | Algorithm that is supported to use in encrypting the response paylaod.  | true | String | RSA-OAEP-256, RSA-OAEP, RSA-OAEP-384, RSA-OAEP-512, RSA1_5 |                    |
| jweEncryptionMethod | JWE Encrytion Method | Encryption Method that is supported to use in encrypting the response paylaod. | true  | String | A128GCM, A256GCM, A192GCM |
| jweEncryptionCertAlias | JWE Encrytion Certificate Alias | Alias of the private key of the server that is supported to use in encrypting the request paylaod. | true  | String | wso2carbon |
